"use client";

import type { MicrositeData } from "@/lib/types";
import { Building2, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  data: MicrositeData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const { prospect, companyInsight } = data;

  function scrollToFindings() {
    document
      .getElementById("research-findings")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <Building2 className="h-7 w-7 text-indigo-300" />
          </div>
          <div>
            <p className="text-indigo-300 text-sm font-medium tracking-wider uppercase">
              Personalized for
            </p>
            <p className="text-xl font-semibold">{prospect.companyName}</p>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
          How Devin AI could support{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
            {prospect.companyName}&apos;s
          </span>{" "}
          strategic technology agenda
        </h1>

        <p className="text-lg sm:text-xl text-indigo-200 max-w-3xl mb-10 leading-relaxed">
          {companyInsight.industry !== "Not publicly available"
            ? `A personalized value analysis for ${prospect.companyName} in the ${companyInsight.industry} sector, based on public company research and AI-powered opportunity mapping.`
            : `A personalized value analysis for ${prospect.companyName}, based on public company research and AI-powered opportunity mapping.`}
        </p>

        <button
          onClick={scrollToFindings}
          className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium transition-all duration-200 border border-white/20 cursor-pointer"
        >
          Explore value opportunities
          <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
        </button>

        <div className="mt-12 flex flex-wrap gap-6 text-sm text-indigo-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            Agent-generated research
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            Editable ROI assumptions
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            Source-backed insights
          </div>
        </div>
      </div>
    </section>
  );
}
