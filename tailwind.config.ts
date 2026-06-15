import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "var(--brand-pink)",
          "pink-soft": "var(--brand-pink-soft)",
          wine: "var(--brand-wine)",
          "wine-deep": "var(--brand-wine-deep)",
          strawberry: "var(--brand-strawberry)",
        },
        cream: "var(--cream)",
        surface: "var(--surface)",
        fruit: {
          matcha: "var(--fruit-matcha)",
          mango: "var(--fruit-mango)",
          blueberry: "var(--fruit-blueberry)",
          apricot: "var(--fruit-apricot)",
        },
        border: "var(--border-soft)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        hand: ["var(--font-caveat)", "cursive"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      maxWidth: { content: "1200px" },
      boxShadow: {
        soft: "0 20px 60px rgba(61, 31, 38, 0.08)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
