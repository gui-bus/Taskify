import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        taskify: "#c5ff38",
        taskifyHover: "#deff38",
        discord: "#7289da",
        twitch: "#65459b",
        gitlab: "#fc6d26",
        spotify: "#1db954",
      },
    },
  },
  plugins: [],
};
export default config;
