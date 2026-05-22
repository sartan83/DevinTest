"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type { ProspectInput, GenerationProgress } from "@/lib/types";
import { ProspectForm } from "@/components/form/ProspectForm";
import { LoadingState } from "@/components/microsite/LoadingState";
import {
  Sparkles,
  RotateCcw,
  Zap,
  ArrowRight,
  Code2,
  GitMerge,
  ShieldCheck,
  Rocket,
  BarChart3,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const VALUE_PILLARS = [
  {
    icon: Code2,
    title: "Legacy Modernization",
    description:
      "Devin analyzes and migrates legacy codebases, accelerating modernization projects that would take teams months.",
  },
  {
    icon: GitMerge,
    title: "Developer Productivity",
    description:
      "Automate repetitive engineering work — test generation, documentation, code reviews — and free your team to focus on what matters.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    description:
      "Identify vulnerabilities, apply remediation at scale, and maintain compliance across your entire codebase.",
  },
  {
    icon: Rocket,
    title: "Backlog Acceleration",
    description:
      "Clear engineering backlogs faster. Devin handles implementation so your team can ship more, with less overhead.",
  },
];

const STATS = [
  { value: "10x", label: "Faster code migrations", icon: Zap },
  { value: "<3 mo", label: "Typical payback period", icon: Clock },
  { value: "40%+", label: "Engineering time saved", icon: BarChart3 },
];

export default function Home() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<GenerationProgress>({
    status: "idle",
    message: "",
    percentage: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const isLoading =
    progress.status !== "idle" &&
    progress.status !== "complete" &&
    progress.status !== "error";

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const handleGenerate = useCallback(
    async (input: ProspectInput) => {
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
          throw new Error(
            "Connection lost during generation. Please try again.",
          );
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(message);
        setProgress({ status: "error", message, percentage: 0 });
      }
    },
    [router],
  );

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
              Something went wrong
            </h2>
            <p className="text-sm text-gray-400 mb-6">{error}</p>
            <Button
              onClick={handleReset}
              className="bg-[#317CFF] hover:bg-[#2563eb] text-white"
            >
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
      {/* ── Header ── */}
      <header className="border-b border-white/5 sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#317CFF]">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">Devin AI</span>
          </div>
          <button
            onClick={scrollToForm}
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#317CFF] hover:text-white transition-colors cursor-pointer"
          >
            Get your analysis
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[120px] bg-[#317CFF]/8" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[100px] bg-[#6366f1]/5" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-16 sm:pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#317CFF]/10 border border-[#317CFF]/20 mb-8">
              <Sparkles className="h-4 w-4 text-[#317CFF]" />
              <span className="text-sm text-[#317CFF] font-medium">
                AI-powered impact analysis
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Discover what Devin AI can do for{" "}
              <span className="text-[#317CFF]">your engineering team</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl">
              Enter your company details and our AI agent will research your
              public priorities, identify high-impact engineering opportunities,
              and build a personalized ROI analysis — in under two minutes.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToForm}
                className="group flex items-center gap-2 bg-[#317CFF] hover:bg-[#2563eb] text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-[#317CFF]/25 hover:shadow-[#317CFF]/40 cursor-pointer"
              >
                See the impact on your company
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mt-16">
            {STATS.map((stat) => (
              <div key={stat.label} className="animate-slide-up">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-[#317CFF]" />
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                    {stat.label}
                  </span>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Pillars ── */}
      <section className="border-t border-white/5 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Where Devin delivers the most impact
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Devin is the world&apos;s first AI software engineer. It works
              alongside your team to accelerate delivery, reduce bottlenecks,
              and drive measurable engineering ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUE_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#317CFF]/10 mb-4 group-hover:bg-[#317CFF]/15 transition-colors">
                  <pillar.icon className="h-5 w-5 text-[#317CFF]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="border-t border-white/5 py-20 sm:py-24 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How it works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              In three simple steps, get a personalized impact report
              for your company — powered by AI research, not guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter your company",
                desc: "Provide your company name and website. Our agent does the rest.",
              },
              {
                step: "02",
                title: "AI researches your priorities",
                desc: "Devin scans public sources to find strategic initiatives, tech signals, and engineering opportunities.",
              },
              {
                step: "03",
                title: "Get your impact report",
                desc: "Receive a personalized microsite with value opportunities, ROI estimates, and actionable insights.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center sm:text-left">
                <span className="text-5xl font-bold text-[#317CFF]/20 block mb-3">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section
        ref={formRef}
        id="impact-form"
        className="border-t border-white/5 py-20 sm:py-24"
      >
        <div className="max-w-xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#317CFF]/10 mb-4">
              <Sparkles className="h-7 w-7 text-[#317CFF]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              See the impact for your company
            </h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Enter your company details and our AI will build a personalized
              analysis with ROI estimates, value opportunities, and strategic
              recommendations.
            </p>
          </div>
          <Card className="shadow-2xl border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <CardContent className="p-8">
              <ProspectForm onSubmit={handleGenerate} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-[#317CFF]">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">Devin AI</span>
          </div>
          <p className="text-xs text-gray-600">
            Powered by Devin AI &middot; Built by Cognition
          </p>
          <p className="text-xs text-gray-700 mt-2 max-w-md mx-auto">
            This analysis is dynamically generated by an AI agent based on
            public information and editable assumptions. It is not a certified
            financial analysis.
          </p>
        </div>
      </footer>
    </div>
  );
}
