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
    a.download = `microsite-${micrositeData.prospect.companyName.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleShare() {
    if (!micrositeData) return;
    if (navigator.share) {
      await navigator.share({
        title: `Devin AI Value Analysis — ${micrositeData.prospect.companyName}`,
        text: `Personalized Devin AI microsite for ${micrositeData.prospect.companyName}`,
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

  // Input form view
  if (!micrositeData && !isLoading && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 flex flex-col">
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 text-white">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Devin AI Prospect Microsite Generator
              </h1>
              <p className="text-xs text-gray-500">
                AI-powered account research and value mapping
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-xl mx-auto px-4">
            <Card className="shadow-lg border-gray-200">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100 mb-4">
                    <Sparkles className="h-7 w-7 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Generate a prospect microsite
                  </h2>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    Enter a company name and website URL to launch the research
                    agent. It will gather public information, map Devin AI
                    value opportunities, and generate a personalized microsite.
                  </p>
                </div>
                <ProspectForm onSubmit={handleGenerate} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="border-t border-gray-200 bg-white py-6">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs text-gray-400">
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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <LoadingState progress={progress} />
      </div>
    );
  }

  // Error view
  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-lg border-red-200">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-100 mb-4">
              <svg
                className="h-7 w-7 text-red-600"
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
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Generation failed
            </h2>
            <p className="text-sm text-gray-500 mb-6">{error}</p>
            <Button onClick={handleReset}>
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
        <div className="bg-gray-50 border-b border-gray-200 print:hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <ArrowLeft className="h-4 w-4" />
              New analysis
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
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

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 print:hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm text-gray-400 mb-3">
              This microsite is not manually written. It is dynamically
              generated by an agent that researches the account, identifies
              strategic initiatives, checks for relevant public Cognition/Devin
              proof points, maps them to Devin use cases, and builds a tailored
              ROI hypothesis.
            </p>
            <p className="text-xs text-gray-500">
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
