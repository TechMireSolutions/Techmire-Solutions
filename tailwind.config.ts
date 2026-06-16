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
        orange: {
          DEFAULT: "#e8522a",
          hover: "#d4471f",
        },
        dark: "#0a0a0a",
        light: "#fcfdff",
        warmgray: "#e0e1e3",
        body: "#7f7f7f",
        card: "#141414",
        border: "#222222",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(56px,8vw,112px)", { lineHeight: "1.0", fontWeight: "400" }],
        h2: ["clamp(32px,4vw,48px)", { lineHeight: "1.1", fontWeight: "400" }],
        h3: ["28px", { lineHeight: "1.2", fontWeight: "400" }],
        overline: ["11px", { lineHeight: "1.5", letterSpacing: "0.1em" }],
      },
      borderRadius: {
        pill: "999px",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
};

export default config;
