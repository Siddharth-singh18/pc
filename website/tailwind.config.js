/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        site: "#f5f5f5",
        code: "#111827",
      },
      boxShadow: {
        panel: "0 1px 0 rgba(15, 23, 42, 0.08)",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        math: ['"Times New Roman"', "Georgia", "serif"],
        mono: ['"Courier New"', "monospace"],
      },
    },
  },
  plugins: [],
};
