/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0c11",
          900: "#0f1219",
          850: "#131722",
          800: "#1a1f2b",
          700: "#242a3a",
          600: "#2f3750",
          500: "#3a4360",
        },
        accent: {
          DEFAULT: "#a78bfa",
          soft: "#c4b5fd",
        },
        kpi: {
          acu: "#a78bfa",
          cost: "#22d3ee",
          saved: "#4ade80",
          sessions: "#f0abfc",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(167, 139, 250, 0.15), 0 8px 30px rgba(167, 139, 250, 0.08)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
