import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        gold: "var(--color-gold)",
        green: {
          DEFAULT: "var(--color-green)",
          hover: "var(--color-green-hover)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          secondary: "var(--color-text-secondary)",
        },
        border: "var(--color-border)",
        error: "var(--color-error)",
        copyright: "var(--color-copyright)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      transitionDuration: {
        fast: "200ms",
        base: "300ms",
      },
    },
  },
  plugins: [],
};
export default config;
