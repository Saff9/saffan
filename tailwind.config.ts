import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#000000",
          900: "#080808",
          850: "#0f0f10",
          800: "#171718",
          700: "#262628",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "'SF Pro Display'",
          "'Inter'",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "'SF Mono'",
          "'JetBrains Mono'",
          "ui-monospace",
          "monospace",
        ],
      },
      boxShadow: {
        "obsidian-card": "inset 0 1px 0 0 rgba(255, 255, 255, 0.14), inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 20px 50px -15px rgba(0, 0, 0, 0.95)",
        "obsidian-hover": "inset 0 1px 0 0 rgba(255, 255, 255, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.12), 0 25px 50px -12px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
