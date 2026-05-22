"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variant === "default" &&
            "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
          variant === "outline" &&
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
          variant === "ghost" && "text-gray-600 hover:bg-gray-100",
          variant === "secondary" &&
            "bg-gray-100 text-gray-900 hover:bg-gray-200",
          size === "default" && "h-11 px-6 py-2 text-sm",
          size === "sm" && "h-9 px-4 text-sm",
          size === "lg" && "h-12 px-8 text-base",
          size === "icon" && "h-10 w-10",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
