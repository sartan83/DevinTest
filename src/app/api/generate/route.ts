import { NextResponse } from "next/server";
import type { ProspectInput, MicrositeData } from "@/lib/types";
import {
  researchCompany,
  searchCognitionUseCases,
  mapValueOpportunities,
  generatePersonalizedUseCases,
  generateExecutiveNarrative,
  generateDiscoveryQuestions,
  collectSources,
} from "@/lib/research-agent";
import { getDefaultAssumptions, calculateROI } from "@/lib/roi-engine";
import { generateMicrositeId, saveMicrosite } from "@/lib/microsite-store";

export async function POST(request: Request) {
  try {
    const input: ProspectInput = await request.json();

    if (!input.companyName || !input.websiteUrl) {
      return NextResponse.json(
        { error: "Company name and website URL are required" },
        { status: 400 },
      );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const keepalive = setInterval(() => {
          try {
            controller.enqueue(encoder.encode(": keepalive\n\n"));
          } catch { /* stream closed */ }
        }, 10_000);

        function sendProgress(
          status: string,
          message: string,
          percentage: number,
        ) {
          const data = JSON.stringify({ type: "progress", status, message, percentage });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        }

        function sendResult(data: MicrositeData) {
          const payload = JSON.stringify({ type: "result", data });
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        }

        function sendError(error: string) {
          const payload = JSON.stringify({ type: "error", error });
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        }

        try {
          sendProgress(
            "researching",
            `Researching ${input.companyName} from public sources...`,
            10,
          );

          const [companyInsight, cognitionUseCases] = await Promise.all([
            researchCompany(input),
            searchCognitionUseCases(
              input.industry || "Technology",
              input.companyName,
            ),
          ]);

          sendProgress(
            "mapping",
            "Mapping strategic initiatives to Devin AI value opportunities...",
            40,
          );

          const valueOpportunities = await mapValueOpportunities(
            companyInsight,
            cognitionUseCases,
            input.companyName,
          );

          sendProgress(
            "calculating",
            "Building ROI model with conservative assumptions...",
            60,
          );

          let estimatedDevs: number | undefined =
            companyInsight.estimatedDeveloperCount;
          if (!estimatedDevs && input.employees) {
            const parsed = parseInt(
              input.employees.replace(/[^0-9]/g, ""),
              10,
            );
            if (!isNaN(parsed)) {
              estimatedDevs = Math.max(10, Math.round(parsed * 0.15));
            }
          }

          const roiAssumptions = getDefaultAssumptions(estimatedDevs);
          roiAssumptions.numberOfInitiatives = Math.max(
            valueOpportunities.length,
            3,
          );
          const roiResults = calculateROI(roiAssumptions);

          sendProgress(
            "generating",
            "Generating personalized microsite content...",
            75,
          );

          const [personalizedUseCases, executiveNarrative, discoveryQuestions] =
            await Promise.all([
              generatePersonalizedUseCases(
                companyInsight,
                valueOpportunities,
                input.companyName,
              ),
              generateExecutiveNarrative(
                companyInsight,
                input.companyName,
                cognitionUseCases,
              ),
              generateDiscoveryQuestions(
                companyInsight,
                input.companyName,
                cognitionUseCases,
              ),
            ]);

          const { companySources, cognitionSources } = collectSources(
            companyInsight,
            cognitionUseCases,
            input.websiteUrl,
          );

          const micrositeId = generateMicrositeId();
          const micrositeData: MicrositeData = {
            id: micrositeId,
            prospect: input,
            companyInsight,
            cognitionUseCases,
            valueOpportunities,
            roiAssumptions,
            roiResults,
            personalizedUseCases,
            executiveNarrative,
            discoveryQuestions,
            companySources,
            cognitionSources,
            generatedAt: new Date().toISOString(),
          };

          await saveMicrosite(micrositeId, micrositeData);
          sendResult(micrositeData);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Unknown error occurred";
          try { sendError(message); } catch { /* stream closed */ }
        } finally {
          clearInterval(keepalive);
          try { controller.close(); } catch { /* already closed */ }
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
