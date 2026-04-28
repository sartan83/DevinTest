import { callLLM } from "./llm-client";
import type {
  ProspectInput,
  CompanyInsight,
  CognitionUseCase,
  ValueOpportunity,
  PersonalizedUseCase,
  DiscoveryQuestion,
  SourceReference,
} from "./types";

async function fetchPageText(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ProspectBot/1.0)" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.slice(0, 15_000);
  } catch {
    return "";
  }
}

export async function researchCompany(
  input: ProspectInput,
): Promise<CompanyInsight> {
  const websiteText = await fetchPageText(input.websiteUrl);
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

Include 3-5 strategic initiatives. If you cannot find specific information from the provided text, use reasonable inferences based on the industry and company type, but mark those with "Low" confidence. Never fabricate specific quotes or metrics.`;

  const result = await callLLM(systemPrompt, userPrompt);
  const parsed = JSON.parse(result);

  return {
    overview: parsed.overview ?? "Company information being analyzed.",
    industry: parsed.industry ?? input.industry ?? "Technology",
    operatingModel: parsed.operatingModel ?? "Not publicly available",
    strategicInitiatives: parsed.strategicInitiatives ?? [],
    digitalTransformationPriorities:
      parsed.digitalTransformationPriorities ?? [],
    softwareEngineeringSignals: parsed.softwareEngineeringSignals ?? [],
    painPoints: parsed.painPoints ?? [],
    businessGoals: parsed.businessGoals ?? [],
    executiveQuotes: parsed.executiveQuotes ?? [],
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
  const systemPrompt = `You are a Devin AI value consultant. Map company strategic initiatives to specific Devin AI value areas. Be conservative and honest about confidence levels. Only reference Cognition/Devin use cases that were actually provided.

Devin AI value areas:
- Legacy modernization
- Application maintenance
- Migration projects
- Codebase analysis
- Test generation
- Security remediation
- Developer productivity
- Documentation
- Backlog acceleration
- Cloud / platform engineering support`;

  const userPrompt = `Map ${companyName}'s strategic initiatives to Devin AI value opportunities.

Industry: ${companyInsight.industry}
Initiatives: ${companyInsight.strategicInitiatives.map((i) => i.title).join(", ")}
Goals: ${companyInsight.businessGoals.join(", ")}

Cognition use cases: ${cognitionUseCases.length > 0 ? cognitionUseCases.map((u) => u.title).join(", ") : "None found"}

Return JSON:
{
  "opportunities": [
    {
      "businessInitiative": "the company initiative",
      "whyItMatters": "why this matters",
      "engineeringWork": "engineering work required",
      "howDevinHelps": "how Devin helps",
      "relatedCognitionUseCase": null,
      "expectedImpact": "impact description",
      "confidence": "High|Medium|Low",
      "companySourceUrl": "source URL",
      "cognitionSourceUrl": null
    }
  ]
}

Include 3-5 opportunities.`;

  const result = await callLLM(systemPrompt, userPrompt);
  const parsed = JSON.parse(result);
  return parsed.opportunities ?? [];
}

export async function generatePersonalizedUseCases(
  companyInsight: CompanyInsight,
  valueOpportunities: ValueOpportunity[],
  companyName: string,
): Promise<PersonalizedUseCase[]> {
  const systemPrompt = `You are a Devin AI use case specialist. Generate specific, practical use cases tailored to a prospect's business context. Be concrete and conservative in impact estimates.`;

  const userPrompt = `Generate 3-5 personalized Devin AI use cases for ${companyName}.

Industry: ${companyInsight.industry}
Initiatives: ${companyInsight.strategicInitiatives.map((i) => i.title).join(", ")}
Value areas: ${valueOpportunities.map((v) => v.businessInitiative).join(", ")}

Return JSON:
{
  "useCases": [
    {
      "businessProblem": "specific business problem",
      "whyItMatters": "why this matters to ${companyName}",
      "howDevinHelps": "how Devin addresses this",
      "expectedImpact": "conservative impact estimate",
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
  const systemPrompt = `You are an executive communications specialist writing for CIOs, CTOs, and CDOs. Write concise, boardroom-ready narratives. Do not overpromise.`;

  const userPrompt = `Write a 3-4 sentence executive summary for ${companyName} about how Devin AI could support their technology agenda.

Industry: ${companyInsight.industry}
Overview: ${companyInsight.overview}
Initiatives: ${companyInsight.strategicInitiatives.map((i) => i.title).join(", ")}

Cognition use cases found: ${cognitionUseCases.length > 0 ? "Yes" : "No"}

Return JSON:
{
  "narrative": "the executive narrative text"
}

The tone should be executive, credible, and concise. Reference public priorities. ${cognitionUseCases.length > 0 ? "Mention that the value hypothesis is informed by relevant public Cognition/Devin proof points." : ""}`;

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
  const systemPrompt = `You are a senior enterprise sales strategist. Generate tailored discovery questions for a sales meeting with a prospect's technology leadership.`;

  const userPrompt = `Generate 8 discovery questions for ${companyName}.

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
- 3 strategic questions
- 3 technical/engineering productivity questions
- 2 ROI/business case questions
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
