/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary0: "#231942",
        primary1: "#5e548e",
        primary2: "#9f86c0",
        primary3: "#be95c4",
        primary4: "#e0b1cb",
      },
    },
  },
  plugins: [require("daisyui")],
};
