import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "sml": {"max": "479px"},
        "sm639": {"max": "767px"},
        "sml639": {"max": "639px"},
      },
      spacing: {
        "right-18": "4.5rem"
      }
    },
  },
  plugins: [],
};
export default config;
