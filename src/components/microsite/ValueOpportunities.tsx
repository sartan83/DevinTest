"use client";

import type { MicrositeData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, ExternalLink, ArrowRight } from "lucide-react";

interface ValueOpportunitiesProps {
  data: MicrositeData;
}

export function ValueOpportunities({ data }: ValueOpportunitiesProps) {
  const { valueOpportunities, prospect } = data;

  const confidenceVariant = (c: string) => {
    if (c === "High") return "success" as const;
    if (c === "Medium") return "warning" as const;
    return "outline" as const;
  };

  return (
    <section id="value-opportunities" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <Layers className="h-6 w-6 text-[#317CFF]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Devin value opportunities
          </h2>
        </div>
        <p className="text-gray-500 mb-10 max-w-2xl">
          How Devin AI maps to {prospect.companyName}&apos;s strategic
          priorities
        </p>

        <div className="space-y-4">
          {valueOpportunities.map((opp, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#317CFF]/10 text-[#317CFF] text-sm font-bold">
                      {i + 1}
                    </span>
                    <h3 className="text-base font-semibold text-gray-900">
                      {opp.businessInitiative}
                    </h3>
                  </div>
                  <Badge variant={confidenceVariant(opp.confidence)}>
                    {opp.confidence}
                  </Badge>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 mb-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Why it matters
                    </p>
                    <p className="text-sm text-gray-700">{opp.whyItMatters}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Engineering work
                    </p>
                    <p className="text-sm text-gray-700">
                      {opp.engineeringWork}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      How Devin helps
                    </p>
                    <p className="text-sm text-gray-700">
                      {opp.howDevinHelps}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    <ArrowRight className="h-3 w-3" />
                    {opp.expectedImpact}
                  </div>

                  {opp.companySourceUrl && (
                    <a
                      href={opp.companySourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#317CFF] hover:text-[#2563eb]"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Company source
                    </a>
                  )}

                  {opp.cognitionSourceUrl && (
                    <a
                      href={opp.cognitionSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Devin proof point
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
