"use client";

import type { MicrositeData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, AlertTriangle } from "lucide-react";
import { formatCurrency, formatPercentage, formatNumber } from "@/lib/utils";

interface SourcesAssumptionsProps {
  data: MicrositeData;
}

export function SourcesAssumptions({ data }: SourcesAssumptionsProps) {
  const { companySources, cognitionSources, roiAssumptions, prospect } = data;

  return (
    <section id="sources" className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Sources and assumptions
          </h2>
        </div>
        <p className="text-gray-500 mb-10 max-w-2xl">
          Full transparency on all data sources and model assumptions
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Badge variant="success">Fact — sourced from public data</Badge>
          <Badge variant="warning">
            Hypothesis — inferred from public signals
          </Badge>
          <Badge variant="outline">Assumption — editable estimate</Badge>
        </div>

        {/* Company sources */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Company Sources
          </h3>
          <div className="space-y-2">
            {companySources.map((source, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {source.title}
                    </p>
                    {source.description && (
                      <p className="text-xs text-gray-500">
                        {source.description}
                      </p>
                    )}
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Open
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cognition sources */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cognition/Devin Sources
          </h3>
          {cognitionSources.length === 0 ? (
            <p className="text-sm text-gray-500">
              No relevant Cognition/Devin public use cases were found for{" "}
              {prospect.companyName}&apos;s market.
            </p>
          ) : (
            <div className="space-y-2">
              {cognitionSources.map((source, i) => (
                <Card key={i}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {source.title}
                      </p>
                      {source.description && (
                        <p className="text-xs text-gray-500">
                          {source.description}
                        </p>
                      )}
                    </div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Open
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* ROI Assumptions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            ROI Model Assumptions
          </h3>
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Number of developers</span>
                  <span className="font-medium">
                    {formatNumber(roiAssumptions.numberOfDevelopers)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Fully loaded developer cost
                  </span>
                  <span className="font-medium">
                    {formatCurrency(roiAssumptions.fullyLoadedDeveloperCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Repetitive work percentage
                  </span>
                  <span className="font-medium">
                    {formatPercentage(roiAssumptions.repetitiveWorkPercentage)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Productivity uplift</span>
                  <span className="font-medium">
                    {formatPercentage(roiAssumptions.productivityUplift)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Initiatives impacted</span>
                  <span className="font-medium">
                    {roiAssumptions.numberOfInitiatives}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Months accelerated</span>
                  <span className="font-medium">
                    {roiAssumptions.monthsAccelerated}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Monthly business value
                  </span>
                  <span className="font-medium">
                    {formatCurrency(roiAssumptions.monthlyBusinessValue)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Annual Devin investment
                  </span>
                  <span className="font-medium">
                    {formatCurrency(roiAssumptions.annualDevinInvestment)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-5 rounded-xl bg-amber-50 border border-amber-200">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800 space-y-2">
            <p className="font-medium">Important Disclaimer</p>
            <ul className="space-y-1 text-xs list-disc ml-4">
              <li>
                All company-specific claims are based on publicly available
                information.
              </li>
              <li>
                Cognition/Devin proof points reference only verified public
                sources.
              </li>
              <li>
                ROI estimates are based on conservative, editable assumptions.
              </li>
              <li>
                This analysis separates verified facts, inferred hypotheses, and
                assumptions.
              </li>
              <li>No facts, initiatives, quotes, or sources are fabricated.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
