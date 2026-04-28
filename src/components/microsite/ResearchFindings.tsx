"use client";

import type { MicrositeData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ExternalLink,
  Quote,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";

interface ResearchFindingsProps {
  data: MicrositeData;
}

export function ResearchFindings({ data }: ResearchFindingsProps) {
  const { companyInsight, prospect } = data;

  const confidenceVariant = (c: string) => {
    if (c === "High") return "success" as const;
    if (c === "Medium") return "warning" as const;
    return "outline" as const;
  };

  return (
    <section id="research-findings" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <Search className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            What the agent found
          </h2>
        </div>
        <p className="text-gray-500 mb-10 max-w-2xl">
          Structured insights extracted from public sources about{" "}
          {prospect.companyName}
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <p className="text-gray-700 leading-relaxed text-base">
              {companyInsight.overview}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge>{companyInsight.industry}</Badge>
              {companyInsight.operatingModel !==
                "Not publicly available" && (
                <Badge variant="outline">{companyInsight.operatingModel}</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-indigo-600" />
          Strategic Initiatives
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {companyInsight.strategicInitiatives.map((initiative, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">
                    {initiative.title}
                  </CardTitle>
                  <Badge variant={confidenceVariant(initiative.confidence)}>
                    {initiative.confidence}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  {initiative.description}
                </p>
                <a
                  href={initiative.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700"
                >
                  <ExternalLink className="h-3 w-3" />
                  {initiative.sourceName}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {companyInsight.digitalTransformationPriorities.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo-600" />
              Digital Transformation Priorities
            </h3>
            <div className="flex flex-wrap gap-2">
              {companyInsight.digitalTransformationPriorities.map(
                (priority, i) => (
                  <Badge key={i} variant="outline">
                    {priority}
                  </Badge>
                ),
              )}
            </div>
          </div>
        )}

        {companyInsight.businessGoals.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Business Goals
            </h3>
            <ul className="space-y-2">
              {companyInsight.businessGoals.map((goal, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        )}

        {companyInsight.executiveQuotes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Quote className="h-5 w-5 text-indigo-600" />
              Executive Quotes
            </h3>
            <div className="space-y-4">
              {companyInsight.executiveQuotes.map((eq, i) => (
                <Card key={i} className="bg-indigo-50 border-indigo-100">
                  <CardContent className="p-5">
                    <blockquote className="text-sm text-gray-700 italic mb-2">
                      &ldquo;{eq.quote}&rdquo;
                    </blockquote>
                    <p className="text-xs text-gray-500">
                      &mdash; {eq.speaker}, {eq.role}
                      {eq.sourceUrl && (
                        <>
                          {" "}
                          &middot;{" "}
                          <a
                            href={eq.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:underline"
                          >
                            Source
                          </a>
                        </>
                      )}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
