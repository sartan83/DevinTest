"use client";

import type { MicrositeData } from "@/lib/types";
import { calculateROI } from "@/lib/roi-engine";
import { formatCurrency } from "@/lib/utils";
import { ArrowDown, Zap, TrendingUp, Clock } from "lucide-react";

interface HeroSectionProps {
  data: MicrositeData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const { prospect, companyInsight, roiAssumptions } = data;
  const roi = calculateROI(roiAssumptions);

  function scrollToROI() {
    document
      .getElementById("roi-calculator")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToFindings() {
    document
      .getElementById("research-findings")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#317CFF]/8 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#317CFF]/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        {/* Devin branding badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
          <Zap className="h-4 w-4 text-[#317CFF]" />
          <span className="text-sm text-gray-300">
            Personalized for <span className="text-white font-semibold">{prospect.companyName}</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 max-w-4xl">
          Unlock{" "}
          <span className="text-[#317CFF]">
            {formatCurrency(roi.totalEstimatedValue)}
          </span>{" "}
          in annual value with Devin AI
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mb-10 leading-relaxed">
          {companyInsight.industry !== "Not publicly available"
            ? `Based on ${prospect.companyName}'s public priorities in ${companyInsight.industry}, Devin can accelerate software delivery, eliminate engineering bottlenecks, and drive measurable ROI.`
            : `Based on ${prospect.companyName}'s public priorities, Devin can accelerate software delivery, eliminate engineering bottlenecks, and drive measurable ROI.`}
        </p>

        {/* Hero ROI stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mb-12">
          <div className="animate-slide-up">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-[#317CFF]" />
              <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">ROI Multiple</span>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white">{roi.roiMultiple.toFixed(1)}x</p>
          </div>
          <div className="animate-slide-up delay-100">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-[#317CFF]" />
              <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Payback</span>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white">{roi.paybackPeriodMonths.toFixed(1)}<span className="text-xl text-gray-400"> mo</span></p>
          </div>
          <div className="animate-slide-up delay-200">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-[#317CFF]" />
              <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Est. Value</span>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white">{formatCurrency(roi.totalEstimatedValue)}</p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={scrollToROI}
            className="group flex items-center gap-2 bg-[#317CFF] hover:bg-[#2563eb] text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-[#317CFF]/25 hover:shadow-[#317CFF]/40 cursor-pointer"
          >
            See your ROI breakdown
            <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={scrollToFindings}
            className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-200 border border-white/10 cursor-pointer"
          >
            View research findings
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            AI-powered research
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#317CFF]" />
            Editable ROI model
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Source-verified insights
          </div>
        </div>
      </div>
    </section>
  );
}
