"use client";

import type { MicrositeData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

interface DiscoveryQuestionsProps {
  data: MicrositeData;
}

export function DiscoveryQuestions({ data }: DiscoveryQuestionsProps) {
  const { discoveryQuestions, prospect, companyInsight } = data;
  const brand = companyInsight.brandColor || "#317CFF";

  const categoryLabel = (c: string) => {
    if (c === "strategic") return "Strategic";
    if (c === "technical") return "Technical";
    return "ROI";
  };

  const categoryVariant = (c: string) => {
    if (c === "strategic") return "default" as const;
    if (c === "technical") return "warning" as const;
    return "success" as const;
  };

  const grouped = {
    strategic: discoveryQuestions.filter((q) => q.category === "strategic"),
    technical: discoveryQuestions.filter((q) => q.category === "technical"),
    roi: discoveryQuestions.filter((q) => q.category === "roi"),
  };

  return (
    <section id="discovery-questions" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="h-6 w-6" style={{ color: brand }} />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Suggested discovery questions
          </h2>
        </div>
        <p className="text-gray-500 mb-10 max-w-2xl">
          Tailored questions for your meeting with {prospect.companyName}
        </p>

        <div className="space-y-6">
          {(["strategic", "technical", "roi"] as const).map((category) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Badge variant={categoryVariant(category)}>
                  {categoryLabel(category)}
                </Badge>
              </h3>
              <div className="space-y-3">
                {grouped[category].map((q, i) => (
                  <Card key={i} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4 flex items-start gap-3">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs font-medium mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-700">{q.question}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
