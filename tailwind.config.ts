import { heroui } from '@heroui/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|button|input|table|divider|ripple|spinner|form|checkbox|spacer).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    fontFamily: {
      sans: [ "ui-sans-serif, system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" ],
      serif: [ "Times New Roman", "Times", "ui-serif", "Georgia", "Cambria", "serif" ]
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          primary: {
            foreground: "#000000",DEFAULT: "#FAFAFA",}
        }
      },}
  })],
};
export default config;
