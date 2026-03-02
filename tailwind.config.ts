import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        space: "#0a0f1c",
        neon: "#00f0ff",
        matrix: "#00ffaa"
      },
      boxShadow: {
        neon: "0 0 30px rgba(0, 240, 255, 0.3)",
        matrix: "0 0 20px rgba(0, 255, 170, 0.3)"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at center, rgba(0,240,255,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
