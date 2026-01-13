import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <-- enable dark mode using class (or use 'media' if you prefer system)
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#3b82f6",
      },
    },
  },
  plugins: [],
};

export default config;
