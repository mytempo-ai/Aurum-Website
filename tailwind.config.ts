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
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-warm": "var(--surface-warm)",
        "surface-gold": "var(--surface-gold)",
        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",
        "gold-dark": "var(--gold-dark)",
        "gold-pale": "var(--gold-pale)",
        "text-main": "var(--text)",
        "text-brown": "var(--text-brown)",
        "text-muted": "var(--text-muted)",
        "text-light": "var(--text-light)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        "hero-bg": "var(--hero-bg)",
        "hero-text": "var(--hero-text)",
        "hero-gold": "var(--hero-gold)",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
      },
      letterSpacing: {
        "2": "2px",
        "2.5": "2.5px",
        "3": "3px",
        "4": "4px",
        "5": "5px",
        "6": "6px",
      },
    },
  },
  plugins: [],
};
export default config;
