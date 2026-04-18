/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F5F4F1",
        card: "#FAFAF8",
        border: "#E2DED9",
        accent: "#1B6B45",
        "accent-badge": "#155436",
        "accent-badge-bg": "#E8F4EE",
        muted: "#999892",
        body: "#555550",
        heading: "#1A1A17",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
