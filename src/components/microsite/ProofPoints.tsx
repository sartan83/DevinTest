"use client";

import type { MicrositeData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink, Info } from "lucide-react";

interface ProofPointsProps {
  data: MicrositeData;
}

export function ProofPoints({ data }: ProofPointsProps) {
  const { cognitionUseCases, prospect } = data;

  return (
    <section id="proof-points" className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <Award className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Relevant Devin proof points
          </h2>
        </div>
        <p className="text-gray-500 mb-10 max-w-2xl">
          Public Cognition/Devin use cases, customer stories, and demonstrations
          relevant to {prospect.companyName}&apos;s market
        </p>

        {cognitionUseCases.length === 0 ? (
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-8 text-center">
              <Info className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 max-w-lg mx-auto">
                No directly comparable public Cognition/Devin use case was found
                for this market. The value hypothesis below is based on public
                company signals and editable assumptions.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {cognitionUseCases.map((uc, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{uc.title}</CardTitle>
                    <Badge>{uc.industry}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {uc.customerName && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </p>
                      <p className="text-sm text-gray-700">
                        {uc.customerName}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Problem Addressed
                    </p>
                    <p className="text-sm text-gray-700">
                      {uc.problemAddressed}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Devin Capability
                    </p>
                    <p className="text-sm text-gray-700">
                      {uc.devinCapability}
                    </p>
                  </div>
                  {uc.outcome && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Outcome
                      </p>
                      <p className="text-sm text-gray-700">{uc.outcome}</p>
                    </div>
                  )}
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Why it matters for {prospect.companyName}
                    </p>
                    <p className="text-sm text-gray-700">
                      {uc.relevanceToProspect}
                    </p>
                  </div>
                  <a
                    href={uc.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 mt-2"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View source
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
