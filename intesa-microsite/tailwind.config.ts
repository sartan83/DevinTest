import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          green: "#0f2f2a",
          "green-deep": "#0a201d",
          "green-mid": "#17403a",
          "green-soft": "#1f5650",
          charcoal: "#1c1c1c",
          ivory: "#f7f4ef",
          "ivory-dim": "#ece8e0",
          orange: "#f36f21",
          "orange-soft": "#f48a48",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "Georgia",
          "ui-serif",
          "serif",
        ],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "devin-gradient":
          "linear-gradient(135deg, rgba(243,111,33,0.9) 0%, rgba(243,111,33,0.55) 40%, rgba(31,86,80,0.8) 100%)",
        "devin-gradient-soft":
          "linear-gradient(135deg, rgba(243,111,33,0.18) 0%, rgba(31,86,80,0.18) 100%)",
        "panel-vignette":
          "radial-gradient(ellipse at 20% 10%, rgba(243,111,33,0.12), transparent 55%), radial-gradient(ellipse at 90% 90%, rgba(31,86,80,0.25), transparent 60%)",
      },
      boxShadow: {
        elev: "0 20px 60px -30px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(243,111,33,0.35), 0 10px 40px -10px rgba(243,111,33,0.25)",
      },
      letterSpacing: {
        "tightish": "-0.01em",
        "displaytight": "-0.02em",
      },
    },
  },
  plugins: [],
};
export default config;
