/** @type {import('tailwindcss').Config} */
const baseTheme = {
  name: "base",
  "color-scheme": "light",
  "primary": "#2c225a", // oklch(20% 0.042 265.755) → approximate hex
  "primary-content": "#ede9fe", // oklch(93% 0.034 272.788)
  "secondary": "#e4576e", // oklch(65% 0.241 354.308)
  "secondary-content": "#fdf2f8", // oklch(94% 0.028 342.258)
  "accent": "#cacaca", // oklch(0.79 0 0)
  "accent-content": "#3b82f6", // oklch(38% 0.063 188.416)
  "neutral": "#23272f", // oklch(14% 0.005 285.823)
  "neutral-content": "#ececec", // oklch(92% 0.004 286.32)
  "base-100": "#f2f2f2", // oklch(95% 0 0)
  "base-200": "#fafafa", // oklch(98% 0 0)
  "base-300": "#ffffff", // oklch(100% 0 0)
  "base-content": "#373737", // oklch(21% 0.006 285.885)
  "info": "#60a5fa", // oklch(74% 0.16 232.661)
  "info-content": "#1e3a8a", // oklch(29% 0.066 243.157)
  "success": "#4ade80", // oklch(76% 0.177 163.223)
  "success-content": "#14532d", // oklch(37% 0.077 168.94)
  "warning": "#fbbf24", // oklch(59.27% 0.2264 26.75)
  "warning-content": "#78350f", // oklch(41% 0.112 45.904)
  "error": "#ef4444", // oklch(71% 0.194 13.428)
  "error-content": "#7f1d1d", // oklch(27% 0.105 12.094)
  "--radius-selector": "0.5rem",
  "--radius-field": "0.25rem",
  "--radius-box": "0.5rem",
  "--size-selector": "0.25rem",
  "--size-field": "0.25rem",
  "--border": "1px",
  "--depth": "1",
  "--noise": "0",
};

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ["var(--font-geist-sans)"],
        geistMono: ["var(--font-geist-mono)"],
        merriweather: ["var(--font-merriweather)"],
        lato: ["var(--font-lato)"],
      },
    },
  },
  plugins: [require("daisyui")],
  // @ts-ignore
  daisyui: {
    themes: [baseTheme],
  },
};
export default config