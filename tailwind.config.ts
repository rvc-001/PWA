import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Work around transient Windows/OneDrive EBUSY lock on this route file during scan.
    "!./app/tournaments/[[]id[]]/checkout/page.tsx",
    "!./app/tournaments/[[]id[]]/page.tsx", // <--- Add this line
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ["Zalando Sans", "var(--font-dm-sans)", "DM Sans", "sans-serif"],
        body: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
      },
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        surface: "var(--color-surface)",
        "surface-elevated": "var(--color-surface-elevated)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        button: "var(--radius-button)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        nav: "var(--shadow-nav)",
      },
    },
  },
  plugins: [],
};

export default config;
