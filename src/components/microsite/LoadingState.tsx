"use client";

import type { GenerationProgress } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  progress: GenerationProgress;
}

const steps = [
  { status: "researching", label: "Researching company from public sources" },
  { status: "mapping", label: "Mapping value opportunities" },
  { status: "calculating", label: "Building ROI model" },
  { status: "generating", label: "Generating personalized content" },
  { status: "complete", label: "Microsite ready" },
];

export function LoadingState({ progress }: LoadingStateProps) {
  const currentIndex = steps.findIndex((s) => s.status === progress.status);

  return (
    <div className="max-w-lg mx-auto px-4 py-20">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#317CFF]/10 mb-4">
          <div className="w-8 h-8 border-3 border-[#317CFF] border-t-transparent rounded-full animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Generating your microsite
        </h2>
        <p className="text-sm text-gray-400">{progress.message}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#317CFF] to-[#6366f1] rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 text-right mt-1">
          {progress.percentage}%
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, i) => {
          const isActive = i === currentIndex;
          const isComplete = i < currentIndex;

          return (
            <div
              key={step.status}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                isActive && "bg-[#317CFF]/5 border border-[#317CFF]/20",
                isComplete && "opacity-60",
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                  isActive &&
                    "bg-[#317CFF] text-white scale-110",
                  isComplete && "bg-emerald-500 text-white",
                  !isActive &&
                    !isComplete &&
                    "bg-white/10 text-gray-500",
                )}
              >
                {isComplete ? (
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  "text-sm",
                  isActive && "text-[#317CFF] font-medium",
                  isComplete && "text-gray-500",
                  !isActive && !isComplete && "text-gray-500",
                )}
              >
                {step.label}
              </span>
              {isActive && (
                <div className="ml-auto">
                  <div className="w-4 h-4 border-2 border-[#317CFF] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
