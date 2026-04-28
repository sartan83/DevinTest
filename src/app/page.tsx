"use client";

import { useState, useCallback } from "react";
import type { ProspectInput, MicrositeData, GenerationProgress } from "@/lib/types";
import { ProspectForm } from "@/components/form/ProspectForm";
import { LoadingState } from "@/components/microsite/LoadingState";
import { HeroSection } from "@/components/microsite/HeroSection";
import { ResearchFindings } from "@/components/microsite/ResearchFindings";
import { ProofPoints } from "@/components/microsite/ProofPoints";
import { ValueOpportunities } from "@/components/microsite/ValueOpportunities";
import { ROICalculator } from "@/components/microsite/ROICalculator";
import { PersonalizedUseCases } from "@/components/microsite/PersonalizedUseCases";
import { ExecutiveNarrative } from "@/components/microsite/ExecutiveNarrative";
import { DiscoveryQuestions } from "@/components/microsite/DiscoveryQuestions";
import { SourcesAssumptions } from "@/components/microsite/SourcesAssumptions";
import { MicrositeNav } from "@/components/microsite/MicrositeNav";
import {
  Sparkles,
  ArrowLeft,
  Download,
  Share2,
  RotateCcw,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [micrositeData, setMicrositeData] = useState<MicrositeData | null>(
    null,
  );
  const [progress, setProgress] = useState<GenerationProgress>({
    status: "idle",
    message: "",
    percentage: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const isLoading =
    progress.status !== "idle" && progress.status !== "complete" && progress.status !== "error";

  const handleGenerate = useCallback(async (input: ProspectInput) => {
    setError(null);
    setMicrositeData(null);
    setProgress({
      status: "researching",
      message: "Starting research...",
      percentage: 5,
    });

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error ?? "Failed to generate microsite");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6);
          try {
            const event = JSON.parse(json);
            if (event.type === "progress") {
              setProgress({
                status: event.status,
                message: event.message,
                percentage: event.percentage,
              });
            } else if (event.type === "result") {
              setMicrositeData(event.data);
              setProgress({
                status: "complete",
                message: "Done!",
                percentage: 100,
              });
            } else if (event.type === "error") {
              throw new Error(event.error);
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            throw e;
          }
        }
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      setProgress({ status: "error", message, percentage: 0 });
    }
  }, []);

  function handleReset() {
    setMicrositeData(null);
    setProgress({ status: "idle", message: "", percentage: 0 });
    setError(null);
  }

  function handleExport() {
    if (!micrositeData) return;
    const blob = new Blob([JSON.stringify(micrositeData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devin-value-analysis-${micrositeData.prospect.companyName.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleShare() {
    if (!micrositeData) return;
    if (navigator.share) {
      await navigator.share({
        title: `Devin AI Value Analysis — ${micrositeData.prospect.companyName}`,
        text: `See how Devin AI could unlock ${micrositeData.prospect.companyName}'s engineering potential`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  }

  function handlePrint() {
    window.print();
  }

  // Input form view — only show when truly idle (no progress, no data, no error)
  if (!micrositeData && progress.status === "idle" && !error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        <header className="border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#317CFF]">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">
                Devin AI
              </h1>
              <p className="text-xs text-gray-500">
                AI-powered value analysis
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-xl mx-auto px-4">
            <Card className="shadow-2xl border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#317CFF]/10 mb-4">
                    <Sparkles className="h-7 w-7 text-[#317CFF]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Generate a prospect microsite
                  </h2>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">
                    Enter a company name and website URL. Our AI agent will
                    research the company, map Devin value opportunities,
                    and build a personalized ROI analysis.
                  </p>
                </div>
                <ProspectForm onSubmit={handleGenerate} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="border-t border-white/5 py-6">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs text-gray-600">
              Powered by Devin AI &middot; Built by Cognition
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Loading view
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center">
        <LoadingState progress={progress} />
      </div>
    );
  }

  // Error view
  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-lg border-red-900/30 bg-white/[0.02]">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 mb-4">
              <svg
                className="h-7 w-7 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">
              Generation failed
            </h2>
            <p className="text-sm text-gray-400 mb-6">{error}</p>
            <Button onClick={handleReset} className="bg-[#317CFF] hover:bg-[#2563eb] text-white">
              <RotateCcw className="h-4 w-4" />
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Microsite view
  if (micrositeData) {
    return (
      <div className="min-h-screen bg-white">
        <MicrositeNav />

        {/* Toolbar */}
        <div className="bg-[#0a0a0a] border-b border-white/5 print:hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-gray-400 hover:text-white hover:bg-white/5">
              <ArrowLeft className="h-4 w-4" />
              New analysis
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport} className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint} className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Print</span>
              </Button>
            </div>
          </div>
        </div>

        <HeroSection data={micrositeData} />
        <ResearchFindings data={micrositeData} />
        <ProofPoints data={micrositeData} />
        <ValueOpportunities data={micrositeData} />
        <ROICalculator data={micrositeData} />
        <PersonalizedUseCases data={micrositeData} />
        <ExecutiveNarrative data={micrositeData} />
        <DiscoveryQuestions data={micrositeData} />
        <SourcesAssumptions data={micrositeData} />

        {/* Trial CTA Section */}
        <section className="bg-[#0a0a0a] py-20 print:hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to see Devin in action?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Start a free trial and experience how Devin can accelerate your engineering team&apos;s delivery velocity.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://app.devin.ai/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#317CFF] hover:bg-[#2563eb] text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-[#317CFF]/25 hover:shadow-[#317CFF]/40"
              >
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://www.cognition.ai/get-started#company"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-200 border border-white/10"
              >
                Contact sales
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0a0a0a] border-t border-white/5 py-12 print:hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm text-gray-500 mb-3">
              This microsite is not manually written. It is dynamically
              generated by an AI agent that researches the account, identifies
              strategic initiatives, checks for relevant Cognition/Devin
              proof points, maps them to Devin use cases, and builds a tailored
              ROI hypothesis.
            </p>
            <p className="text-xs text-gray-600">
              Generated on{" "}
              {new Date(micrositeData.generatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              &middot; Powered by Devin AI &middot; Built by Cognition
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return null;
}
