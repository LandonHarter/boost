import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {},
  plugins: [nextui({
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          background: {
            DEFAULT: "#ffffff",
            foreground: "#353535",
          },
          foreground: {
            DEFAULT: "#353535",
            foreground: "#ffffff",
          },
          primary: {
            50: "#dee5ff",
            100: "#afbeff",
            200: "#92a3ff",
            300: "#8395fe",
            400: "#7687fc",
            500: "#6978fa",
            600: "#5a67d9",
            700: "#4c57ba",
            800: "#3e489b",
            900: "#242a61",
            DEFAULT: "#6978fa",
            foreground: "#ffffff"
          },
        }
      }
    }
  })],
}
export default config;
