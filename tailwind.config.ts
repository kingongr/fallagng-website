import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0B0D",
        surface: "#0F1115",
        glass: "rgba(255,255,255,0.06)",
        stroke: "rgba(255,255,255,0.12)",
        text: "#E7E8EA",
        muted: "#9AA0A6",
        electric: "#FF4444",
        gold: "#CC0000",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-merriweather)", "serif", "Georgia", "Times New Roman"],
        "permanent-marker": ["var(--font-permanent-marker)", "cursive", "serif"],
        allison: ["var(--font-allison)", "cursive", "serif"],
        merriweather: ["var(--font-merriweather)", "serif", "Georgia", "Times New Roman"],
      },
      spacing: {
        "8": "2rem",
        "12": "3rem",
        "16": "4rem",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;

