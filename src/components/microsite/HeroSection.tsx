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
  const brand = companyInsight.brandColor || "#317CFF";

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
      {/* Brand-colored gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ backgroundColor: `${brand}14` }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ backgroundColor: `${brand}0d` }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[160px] opacity-30"
          style={{ backgroundColor: `${brand}0a` }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        {/* Dual branding badge */}
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-[#317CFF]" />
            <span className="text-sm text-gray-300">Devin AI</span>
          </div>
          <span className="text-gray-600">&times;</span>
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm border"
            style={{
              backgroundColor: `${brand}15`,
              borderColor: `${brand}30`,
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: brand }}
            />
            <span className="text-sm text-white font-semibold">{prospect.companyName}</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 max-w-4xl">
          Unlock{" "}
          <span style={{ color: brand }}>
            {formatCurrency(roi.totalEstimatedValue)}
          </span>{" "}
          in annual value with Devin AI
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mb-10 leading-relaxed">
          {companyInsight.industry !== "Not publicly available"
            ? `Based on ${prospect.companyName}'s public priorities in ${companyInsight.industry}, Devin can accelerate software delivery, eliminate engineering bottlenecks, and drive measurable ROI.`
            : `Based on ${prospect.companyName}'s public priorities, Devin can accelerate software delivery, eliminate engineering bottlenecks, and drive measurable ROI.`}
        </p>

        {/* Hero ROI stats with brand accent */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mb-12">
          <div className="animate-slide-up">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4" style={{ color: brand }} />
              <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">ROI Multiple</span>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white">{roi.roiMultiple.toFixed(1)}x</p>
          </div>
          <div className="animate-slide-up delay-100">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4" style={{ color: brand }} />
              <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Payback</span>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white">{roi.paybackPeriodMonths.toFixed(1)}<span className="text-xl text-gray-400"> mo</span></p>
          </div>
          <div className="animate-slide-up delay-200">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4" style={{ color: brand }} />
              <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Est. Value</span>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white">{formatCurrency(roi.totalEstimatedValue)}</p>
          </div>
        </div>

        {/* CTA buttons with brand color */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={scrollToROI}
            className="group flex items-center gap-2 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: brand,
              boxShadow: `0 10px 15px -3px ${brand}40`,
            }}
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
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brand }} />
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
