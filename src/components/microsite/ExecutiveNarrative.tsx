"use client";

import type { MicrositeData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ExecutiveNarrativeProps {
  data: MicrositeData;
}

export function ExecutiveNarrative({ data }: ExecutiveNarrativeProps) {
  const { executiveNarrative, prospect } = data;

  return (
    <section id="executive-narrative" className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Executive narrative
          </h2>
        </div>
        <p className="text-gray-500 mb-10 max-w-2xl">
          Concise summary for {prospect.companyName}&apos;s CIO / CTO / CDO
        </p>

        <Card className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-indigo-100">
          <CardContent className="p-8 sm:p-10">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-800 leading-relaxed text-lg">
                {executiveNarrative}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
