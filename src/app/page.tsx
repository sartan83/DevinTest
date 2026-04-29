"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { ProspectInput, GenerationProgress } from "@/lib/types";
import { ProspectForm } from "@/components/form/ProspectForm";
import { LoadingState } from "@/components/microsite/LoadingState";
import {
  Sparkles,
  RotateCcw,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
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
      let gotResult = false;

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
              gotResult = true;
              const micrositeId = event.data?.id;
              setProgress({
                status: "complete",
                message: "Done! Redirecting...",
                percentage: 100,
              });
              if (micrositeId) {
                router.push(`/microsite/${micrositeId}`);
              }
            } else if (event.type === "error") {
              throw new Error(event.error);
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            throw e;
          }
        }
      }

      if (!gotResult) {
        throw new Error("Connection lost during generation. Please try again.");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      setProgress({ status: "error", message, percentage: 0 });
    }
  }, [router]);

  function handleReset() {
    setProgress({ status: "idle", message: "", percentage: 0 });
    setError(null);
  }

  if (isLoading || progress.status === "complete") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center">
        <LoadingState progress={progress} />
      </div>
    );
  }

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
