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
        obsidian: "#090909",
        charcoal: "#171615",
        "charcoal-light": "#21201D",
        "champagne-gold": "#D6B875",
        "muted-gold": "#8F7848",
        "warm-ivory": "#F4EFE5",
        "fire-amber": "#F28C28",
        "ember-red": "#A83420",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        modal: "24px",
        pill: "999px",
      },
      boxShadow: {
        "gold-glow": "0 0 30px -5px rgba(214, 184, 117, 0.25)",
        "fire-glow": "0 0 40px 0px rgba(242, 140, 40, 0.35)",
        "amber-subtle": "0 8px 32px 0 rgba(168, 52, 32, 0.2)",
      },
      animation: {
        "float-gentle": "float 6s ease-in-out infinite",
        "pulse-ember": "pulseEmber 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseEmber: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
