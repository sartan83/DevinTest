import { callLLM } from "./llm-client";
import { resolve4, resolve6 } from "node:dns/promises";
import type {
  ProspectInput,
  CompanyInsight,
  CognitionUseCase,
  ValueOpportunity,
  PersonalizedUseCase,
  DiscoveryQuestion,
  SourceReference,
} from "./types";

function isPrivateIpV4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4 || !parts.every((p) => /^\d+$/.test(p))) return true;
  const octets = parts.map(Number);
  if (octets[0] === 10) return true;
  if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) return true;
  if (octets[0] === 192 && octets[1] === 168) return true;
  if (octets[0] === 127) return true;
  if (octets[0] === 169 && octets[1] === 254) return true;
  if (octets[0] === 0) return true;
  return false;
}

function isPrivateIpV6(ip: string): boolean {
  const normalized = ip.toLowerCase();
  if (normalized === "::1") return true;
  if (normalized.startsWith("fe80:")) return true;
  if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true;
  if (normalized.startsWith("::ffff:")) return true;
  if (normalized === "::") return true;
  return false;
}

function normalizeBrandColor(color: string | undefined): string | undefined {
  if (!color) return undefined;
  const trimmed = color.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed;
  const m3 = trimmed.match(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/);
  if (m3) return `#${m3[1]}${m3[1]}${m3[2]}${m3[2]}${m3[3]}${m3[3]}`;
  return undefined;
}

function isPublicUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    const hostname = parsed.hostname;
    if (hostname === "localhost" || hostname === "[::1]") return false;
    if (hostname.startsWith("[")) return false;
    const parts = hostname.split(".");
    if (parts.length === 4 && parts.every((p) => /^\d+$/.test(p))) {
      return !isPrivateIpV4(hostname);
    }
    return true;
  } catch {
    return false;
  }
}

async function resolveAndValidate(url: string): Promise<boolean> {
  if (!isPublicUrl(url)) return false;
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.split(".");
    if (parts.length === 4 && parts.every((p) => /^\d+$/.test(p))) {
      return !isPrivateIpV4(hostname);
    }
    const [v4ips, v6ips] = await Promise.all([
      resolve4(hostname).catch(() => [] as string[]),
      resolve6(hostname).catch(() => [] as string[]),
    ]);
    if (v4ips.length === 0 && v6ips.length === 0) return false;
    if (v4ips.some((ip) => isPrivateIpV4(ip))) return false;
    if (v6ips.some((ip) => isPrivateIpV6(ip))) return false;
    return true;
  } catch {
    return false;
  }
}

async function fetchPageText(url: string): Promise<string> {
  if (!(await resolveAndValidate(url))) return "";
  try {
    const MAX_REDIRECTS = 5;
    let currentUrl = url;
    for (let i = 0; i <= MAX_REDIRECTS; i++) {
      const res = await fetch(currentUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; ProspectBot/1.0)" },
        signal: AbortSignal.timeout(10_000),
        redirect: "manual",
      });
      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get("location");
        if (!location) return "";
        const nextUrl = new URL(location, currentUrl).toString();
        if (!(await resolveAndValidate(nextUrl))) return "";
        currentUrl = nextUrl;
        continue;
      }
      if (!res.ok) return "";
      const html = await res.text();
      const text = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      return text.slice(0, 15_000);
    }
    return "";
  } catch {
    return "";
  }
}

async function extractBrandColor(url: string): Promise<string | undefined> {
  if (!(await resolveAndValidate(url))) return undefined;
  try {
    let currentUrl = url;
    for (let i = 0; i <= 3; i++) {
      const res = await fetch(currentUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; ProspectBot/1.0)" },
        signal: AbortSignal.timeout(8_000),
        redirect: "manual",
      });
      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get("location");
        if (!location) return undefined;
        const nextUrl = new URL(location, currentUrl).toString();
        if (!(await resolveAndValidate(nextUrl))) return undefined;
        currentUrl = nextUrl;
        continue;
      }
      if (!res.ok) return undefined;
      const html = await res.text();
      const themeColorMatch = html.match(
        /<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i,
      );
      if (themeColorMatch) return normalizeBrandColor(themeColorMatch[1]);
      const msColorMatch = html.match(
        /<meta[^>]*name=["']msapplication-TileColor["'][^>]*content=["']([^"']+)["']/i,
      );
      if (msColorMatch) return normalizeBrandColor(msColorMatch[1]);
      return undefined;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

export async function researchCompany(
  input: ProspectInput,
): Promise<CompanyInsight> {
  const [websiteText, extractedColor] = await Promise.all([
    fetchPageText(input.websiteUrl),
    extractBrandColor(input.websiteUrl),
  ]);
  const aboutUrl = input.websiteUrl.replace(/\/$/, "") + "/about";
  const aboutText = await fetchPageText(aboutUrl);

  const systemPrompt = `You are an expert business research analyst. Analyze publicly available company information and extract structured insights. You MUST only use facts from the provided text. If information is not available, say "Not publicly available". Never invent facts, quotes, or sources. Return valid JSON.`;

  const userPrompt = `Analyze this company and extract structured insights.

Company: ${input.companyName}
Website: ${input.websiteUrl}
${input.industry ? `Industry: ${input.industry}` : ""}
${input.country ? `Country: ${input.country}` : ""}
${input.revenue ? `Revenue: ${input.revenue}` : ""}
${input.employees ? `Employees: ${input.employees}` : ""}
${input.knownInitiatives ? `Known initiatives: ${input.knownInitiatives}` : ""}

Website content:
${websiteText.slice(0, 3000)}

About page content:
${aboutText.slice(0, 1500)}

Return JSON with this exact structure:
{
  "overview": "2-3 sentence company overview",
  "industry": "primary industry",
  "operatingModel": "brief operating model description",
  "estimatedDeveloperCount": 500,
  "brandColor": "#hexcolor",
  "strategicInitiatives": [
    {
      "title": "initiative name",
      "description": "what this initiative involves",
      "sourceUrl": "${input.websiteUrl}",
      "sourceName": "source description",
      "confidence": "High|Medium|Low"
    }
  ],
  "digitalTransformationPriorities": ["priority1", "priority2"],
  "softwareEngineeringSignals": ["signal1", "signal2"],
  "painPoints": ["pain point 1", "pain point 2"],
  "businessGoals": ["goal1", "goal2"],
  "executiveQuotes": [
    {
      "quote": "actual quote if found",
      "speaker": "name",
      "role": "title",
      "sourceUrl": "url"
    }
  ]
}

IMPORTANT: For "estimatedDeveloperCount", estimate the number of software developers/engineers at this company. Use these heuristics:
- If employee count is provided, estimate developers as a percentage: tech companies ~25-40%, banks/financial services ~10-15%, manufacturing ~5-8%, consulting ~15-20%, healthcare ~8-12%, retail ~5-10%.
- Consider the company's industry, size, and technology signals from their website.
- For large enterprises (50K+ employees), the absolute developer count can be thousands.
- For startups or pure tech companies, the ratio is higher (30-50%).
- Be conservative but realistic. A company like Stripe (~8K employees) might have ~3,000 developers. A bank like Intesa Sanpaolo (~70K employees) might have ~5,000-7,000 developers.
- Return a single integer, e.g. 500, 2000, 5000.

For "brandColor", provide the company's primary brand color as a hex code (e.g. "#635BFF" for Stripe, "#1B3D2F" for Intesa Sanpaolo, "#FF9900" for Amazon). This should be the dominant color from their logo or website. Pick a saturated, recognizable brand color — not white, black, or gray.

Include 3-5 strategic initiatives. If you cannot find specific information from the provided text, use reasonable inferences based on the industry and company type, but mark those with "Low" confidence. Never fabricate specific quotes or metrics.`;

  const result = await callLLM(systemPrompt, userPrompt);
  const parsed = JSON.parse(result);

  return {
    overview: parsed.overview ?? "Company information being analyzed.",
    industry: parsed.industry || input.industry || "Technology",
    operatingModel: parsed.operatingModel ?? "Not publicly available",
    strategicInitiatives: parsed.strategicInitiatives ?? [],
    digitalTransformationPriorities:
      parsed.digitalTransformationPriorities ?? [],
    softwareEngineeringSignals: parsed.softwareEngineeringSignals ?? [],
    painPoints: parsed.painPoints ?? [],
    businessGoals: parsed.businessGoals ?? [],
    executiveQuotes: parsed.executiveQuotes ?? [],
    estimatedDeveloperCount: parsed.estimatedDeveloperCount ?? undefined,
    brandColor: extractedColor || normalizeBrandColor(parsed.brandColor) || undefined,
  };
}

export async function searchCognitionUseCases(
  industry: string,
  companyName: string,
): Promise<CognitionUseCase[]> {
  const searchQueries = [
    `${industry} Devin AI use case`,
    `${industry} software engineering AI`,
    `${industry} modernization Devin`,
    `Devin AI enterprise customer story ${industry}`,
  ];

  const cognitionUrls = [
    "https://cognition.ai",
    "https://devin.ai",
    "https://cognition.ai/blog",
  ];

  let collectedText = "";
  for (const url of cognitionUrls) {
    const text = await fetchPageText(url);
    collectedText += text + "\n\n";
  }

  const systemPrompt = `You are an expert at finding and extracting relevant Cognition AI / Devin AI public use cases, customer stories, and demonstrations. You MUST only reference real, publicly available information. If you cannot find relevant use cases from the provided content, return an empty array. NEVER fabricate use cases, customer names, or sources.`;

  const userPrompt = `Search for Cognition/Devin AI public use cases relevant to the ${industry} industry and ${companyName}.

Search queries used: ${searchQueries.join(", ")}

Content from Cognition/Devin public pages:
${collectedText.slice(0, 3000)}

Return JSON with this structure:
{
  "useCases": [
    {
      "title": "use case title",
      "sourceUrl": "actual URL where this was found",
      "industry": "relevant industry",
      "customerName": "customer name if publicly stated, or null",
      "problemAddressed": "problem description",
      "devinCapability": "what Devin capability was demonstrated",
      "outcome": "outcome if publicly stated, or null",
      "relevanceToProspect": "why this matters for ${companyName}"
    }
  ]
}

IMPORTANT: Only include use cases you found evidence for in the provided content. If no relevant use cases are found, return {"useCases": []}.`;

  const result = await callLLM(systemPrompt, userPrompt);
  const parsed = JSON.parse(result);
  return parsed.useCases ?? [];
}

export async function mapValueOpportunities(
  companyInsight: CompanyInsight,
  cognitionUseCases: CognitionUseCase[],
  companyName: string,
): Promise<ValueOpportunity[]> {
  const systemPrompt = `You are a Devin AI value consultant focused on identifying HIGH-ROI opportunities. Your goal is to find where Devin delivers the most financial impact. Prioritize opportunities by ROI potential — developer productivity gains, cost savings from automation, and time-to-market acceleration are Devin's core strengths.

Devin AI value areas (ranked by typical ROI impact):
1. Developer productivity — Devin handles repetitive coding tasks, freeing senior engineers for strategic work. Typical uplift: 20-40% on targeted workflows
2. Migration projects — Devin accelerates code migration (COBOL, .NET, legacy ETL) by 3-5x vs manual effort
3. Legacy modernization — Automated codebase analysis, refactoring, and modernization at scale
4. Test generation — Automated unit and E2E test creation, reducing QA bottlenecks
5. Backlog acceleration — Devin tackles backlog items autonomously, shipping features faster
6. Application maintenance — Automated bug triage, CI fixes, and dependency updates
7. Security remediation — Automated vulnerability scanning and patching
8. Documentation — Auto-generated system documentation and architecture diagrams
9. Codebase analysis — Deep understanding of complex, multi-repo codebases
10. Cloud / platform engineering — Infrastructure automation and DevOps support

Be conservative and honest about confidence levels. Only reference Cognition/Devin use cases that were actually provided.`;

  const userPrompt = `Map ${companyName}'s strategic initiatives to Devin AI value opportunities. RANK THEM BY ROI POTENTIAL — put the highest financial impact opportunity first.

Industry: ${companyInsight.industry}
Initiatives: ${companyInsight.strategicInitiatives.map((i) => i.title).join(", ")}
Goals: ${companyInsight.businessGoals.join(", ")}
Pain Points: ${companyInsight.painPoints.join(", ")}

Cognition use cases: ${cognitionUseCases.length > 0 ? cognitionUseCases.map((u) => u.title).join(", ") : "None found"}

Return JSON:
{
  "opportunities": [
    {
      "businessInitiative": "the company initiative",
      "whyItMatters": "why this matters — focus on financial/business impact",
      "engineeringWork": "engineering work required",
      "howDevinHelps": "specific Devin capability and how it drives ROI — be concrete about time/cost savings",
      "relatedCognitionUseCase": null,
      "expectedImpact": "quantify the impact where possible (e.g. '30-50% faster delivery', '3x migration speed', '$500K+ annual savings')",
      "confidence": "High|Medium|Low",
      "companySourceUrl": "source URL",
      "cognitionSourceUrl": null
    }
  ]
}

Include 3-5 opportunities. Put the HIGHEST ROI opportunity first. Focus on opportunities where Devin's impact is most measurable and compelling.`;

  const result = await callLLM(systemPrompt, userPrompt);
  const parsed = JSON.parse(result);
  return parsed.opportunities ?? [];
}

export async function generatePersonalizedUseCases(
  companyInsight: CompanyInsight,
  valueOpportunities: ValueOpportunity[],
  companyName: string,
): Promise<PersonalizedUseCase[]> {
  const systemPrompt = `You are a Devin AI use case specialist focused on HIGH-ROI opportunities. Generate specific, practical use cases that demonstrate clear financial impact. For each use case, make the ROI case compelling but conservative. Focus on developer productivity gains, cost reduction, and delivery acceleration — these are Devin's core strengths that drive the fastest payback.`;

  const userPrompt = `Generate 3-5 personalized Devin AI use cases for ${companyName}. Focus on the use cases with the HIGHEST ROI potential. Each use case should make a compelling business case.

Industry: ${companyInsight.industry}
Initiatives: ${companyInsight.strategicInitiatives.map((i) => i.title).join(", ")}
Value areas: ${valueOpportunities.map((v) => v.businessInitiative).join(", ")}
Pain points: ${companyInsight.painPoints.join(", ")}

Return JSON:
{
  "useCases": [
    {
      "businessProblem": "specific business problem — frame it in terms of cost/time/risk",
      "whyItMatters": "quantify the business impact of this problem for ${companyName}",
      "howDevinHelps": "specific Devin capability and measurable improvement expected",
      "expectedImpact": "conservative but compelling ROI estimate (e.g. '40% faster migration', '$200K annual savings in developer time')",
      "companySourceUrl": "source URL",
      "cognitionSourceUrl": "if applicable, or null"
    }
  ]
}`;

  const result = await callLLM(systemPrompt, userPrompt);
  const parsed = JSON.parse(result);
  return parsed.useCases ?? [];
}

export async function generateExecutiveNarrative(
  companyInsight: CompanyInsight,
  companyName: string,
  cognitionUseCases: CognitionUseCase[],
): Promise<string> {
  const systemPrompt = `You are an executive communications specialist writing for CIOs, CTOs, and CDOs. Write concise, ROI-focused narratives that create urgency and excitement. Lead with the financial impact. Your goal is to make the reader want to start a Devin trial immediately.`;

  const userPrompt = `Write a 4-5 sentence executive summary for ${companyName} about how Devin AI could accelerate their technology agenda and deliver significant ROI.

Industry: ${companyInsight.industry}
Overview: ${companyInsight.overview}
Initiatives: ${companyInsight.strategicInitiatives.map((i) => i.title).join(", ")}

Cognition use cases found: ${cognitionUseCases.length > 0 ? "Yes" : "No"}

Return JSON:
{
  "narrative": "the executive narrative text"
}

The tone should be executive, confident, and action-oriented. Lead with the ROI opportunity. Emphasize speed to value — Devin can start delivering impact in weeks, not months. ${cognitionUseCases.length > 0 ? "Mention that the value hypothesis is informed by relevant public Cognition/Devin proof points." : ""} End with a forward-looking statement about competitive advantage.`;

  const result = await callLLM(systemPrompt, userPrompt);
  const parsed = JSON.parse(result);
  return (
    parsed.narrative ??
    `Based on ${companyName}'s public priorities, Devin could help accelerate software delivery, reduce engineering bottlenecks and support strategic technology execution.`
  );
}

export async function generateDiscoveryQuestions(
  companyInsight: CompanyInsight,
  companyName: string,
  cognitionUseCases: CognitionUseCase[],
): Promise<DiscoveryQuestion[]> {
  const systemPrompt = `You are a senior enterprise sales strategist. Generate tailored discovery questions that uncover ROI potential and create urgency. Questions should help the prospect realize the scale of the opportunity and the cost of inaction.`;

  const userPrompt = `Generate 8 discovery questions for ${companyName}. Focus on questions that uncover ROI potential and make the prospect eager to trial Devin.

Industry: ${companyInsight.industry}
Initiatives: ${companyInsight.strategicInitiatives.map((i) => i.title).join(", ")}
Goals: ${companyInsight.businessGoals.join(", ")}

Has relevant Cognition use cases: ${cognitionUseCases.length > 0 ? "Yes" : "No"}

Return JSON:
{
  "questions": [
    {
      "question": "the question text",
      "category": "strategic|technical|roi"
    }
  ]
}

Include exactly:
- 3 strategic questions (about their technology vision and competitive pressure)
- 3 technical/engineering productivity questions (about engineering bottlenecks and capacity)
- 2 ROI/business case questions (about the cost of delay and investment criteria)
${cognitionUseCases.length > 0 ? "- At least one question should validate whether the relevant Cognition/Devin proof point applies to their environment." : ""}`;

  const result = await callLLM(systemPrompt, userPrompt);
  const parsed = JSON.parse(result);
  return parsed.questions ?? [];
}

export function collectSources(
  companyInsight: CompanyInsight,
  cognitionUseCases: CognitionUseCase[],
  websiteUrl: string,
): { companySources: SourceReference[]; cognitionSources: SourceReference[] } {
  const companySources: SourceReference[] = [
    {
      title: "Company Website",
      url: websiteUrl,
      type: "company",
      description: "Primary company website",
    },
  ];

  for (const initiative of companyInsight.strategicInitiatives) {
    if (
      initiative.sourceUrl &&
      !companySources.some((s) => s.url === initiative.sourceUrl)
    ) {
      companySources.push({
        title: initiative.sourceName,
        url: initiative.sourceUrl,
        type: "company",
        description: `Source for: ${initiative.title}`,
      });
    }
  }

  const cognitionSources: SourceReference[] = cognitionUseCases.map((uc) => ({
    title: uc.title,
    url: uc.sourceUrl,
    type: "cognition" as const,
    description: uc.problemAddressed,
  }));

  return { companySources, cognitionSources };
}
