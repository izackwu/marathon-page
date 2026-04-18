/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#F5F4F1",
        card: "#FAFAF8",
        line: "#E2DED9",
        primary: "#1B6B45",
        "primary-badge": "#155436",
        "primary-badge-bg": "#E8F4EE",
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
