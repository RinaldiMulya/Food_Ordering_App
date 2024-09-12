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
        primary: "#393E46", //black
        secondary: "#6D9886", //green
        accent: "#F7F7F7", //white
        dark: "#ECE8DD", //beige
      },
      boxShadow: {
        '4xl': '0 40px 70px rgba(0, 0, 0, 0.35)', // Shadow besar ke-4
        '5xl': '0 50px 80px rgba(0, 0, 0, 0.4)',  // Shadow paling besar ke-5
      },
    },
  },
  plugins: [],
};
