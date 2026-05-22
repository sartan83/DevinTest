"use client";

import type { MicrositeData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ExternalLink } from "lucide-react";

interface PersonalizedUseCasesProps {
  data: MicrositeData;
}

export function PersonalizedUseCases({ data }: PersonalizedUseCasesProps) {
  const { personalizedUseCases, prospect, companyInsight } = data;
  const brand = companyInsight.brandColor || "#317CFF";

  return (
    <section id="use-cases" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <Lightbulb className="h-6 w-6" style={{ color: brand }} />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Personalized use cases
          </h2>
        </div>
        <p className="text-gray-500 mb-10 max-w-2xl">
          Specific Devin AI use cases tailored to {prospect.companyName}&apos;s
          context
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {personalizedUseCases.map((uc, i) => (
            <Card
              key={i}
              className="hover:shadow-md transition-shadow flex flex-col"
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold" style={{ backgroundColor: `${brand}1a`, color: brand }}>
                    {i + 1}
                  </span>
                  <CardTitle className="text-base">
                    {uc.businessProblem}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Why it matters
                    </p>
                    <p className="text-sm text-gray-700">{uc.whyItMatters}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      How Devin helps
                    </p>
                    <p className="text-sm text-gray-700">{uc.howDevinHelps}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expected impact
                    </p>
                    <p className="text-sm text-emerald-700 font-medium">
                      {uc.expectedImpact}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-100">
                  {uc.companySourceUrl && (
                    <a
                      href={uc.companySourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs hover:underline"
                      style={{ color: brand }}
                    >
                      <ExternalLink className="h-3 w-3" />
                      Company source
                    </a>
                  )}
                  {uc.cognitionSourceUrl && (
                    <a
                      href={uc.cognitionSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#6366f1] hover:text-[#4f46e5]"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Devin source
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
