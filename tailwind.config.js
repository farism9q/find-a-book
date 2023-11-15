/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Cutive Mono"],
    },
    extend: {
      fontFamily: {
        blackops: ["Black Ops One"],
      },
    },
  },
  plugins: [],
};

//  theme: {
// fontFamily: {
//   sans: "Roboto Mono, Lato",
//   dosis: "Dosis",
// },

// fontFamily: {
// 'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
// },
