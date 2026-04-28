"use client";

import type { MicrositeData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";

interface ExecutiveNarrativeProps {
  data: MicrositeData;
}

export function ExecutiveNarrative({ data }: ExecutiveNarrativeProps) {
  const { executiveNarrative, prospect } = data;

  return (
    <section id="executive-narrative" className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="h-6 w-6 text-[#317CFF]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Executive narrative
          </h2>
        </div>
        <p className="text-gray-500 mb-10 max-w-2xl">
          Concise summary for {prospect.companyName}&apos;s CIO / CTO / CDO
        </p>

        <Card className="bg-gradient-to-br from-[#317CFF]/5 via-white to-[#6366f1]/5 border-[#317CFF]/10">
          <CardContent className="p-8 sm:p-10">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-800 leading-relaxed text-lg">
                {executiveNarrative}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <a
                href="https://app.devin.ai/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#317CFF] hover:bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-[#317CFF]/25 hover:shadow-[#317CFF]/40 text-sm"
              >
                Start your Devin trial
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
