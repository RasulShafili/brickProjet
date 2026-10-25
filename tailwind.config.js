/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stonePaper: "#F4F0DB",
        stonePaperLight: "#FDF2DE",
        obsidianCad: "#14181D",
        graphiteText: "#262626",
        terracotta: "#C85A32",
        terracottaLight: "#E3C1AA",
        blueprint: "#1E3A5F",
        blueprintLight: "#3B60C5",
        forest: "#2E3A26",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "Courier New", "monospace"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px #262626",
        brutalSm: "2px 2px 0px 0px #262626",
        brutalLg: "8px 8px 0px 0px #262626",
        brutalBlueprint: "4px 4px 0px 0px #3B60C5",
      },
    },
  },
  plugins: [],
};
