"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          className={cn(
            "flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-[#317CFF] focus:outline-none focus:ring-2 focus:ring-[#317CFF]/20 transition-all duration-200",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
