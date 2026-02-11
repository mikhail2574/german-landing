import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "serif"]
      },
      boxShadow: {
        card: "0 12px 30px -20px rgba(12, 74, 110, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
