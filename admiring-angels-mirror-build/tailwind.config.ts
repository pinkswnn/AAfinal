import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: "#FFF1F9",
        onyx: "#0B0B0B",
        rose: "#D9899C",
        roseDeep: "#B65D73",
        gold: "#C9A24C"
      },
      boxShadow: {
        silk: "0 18px 45px rgba(16,17,20,.10)",
        silk2: "0 10px 24px rgba(16,17,20,.10)"
      },
      borderRadius: {
        xl2: "28px"
      }
    },
  },
  plugins: [],
} satisfies Config;
