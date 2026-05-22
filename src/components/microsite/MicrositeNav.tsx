"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "research-findings", label: "Research" },
  { id: "proof-points", label: "Proof Points" },
  { id: "value-opportunities", label: "Value Map" },
  { id: "roi-calculator", label: "ROI" },
  { id: "use-cases", label: "Use Cases" },
  { id: "executive-narrative", label: "Executive" },
  { id: "discovery-questions", label: "Questions" },
  { id: "sources", label: "Sources" },
];

export function MicrositeNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={cn(
                "flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 cursor-pointer",
                active === section.id
                  ? "bg-[#317CFF]/10 text-[#317CFF]"
                  : "text-gray-400 hover:text-white hover:bg-white/5",
              )}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
