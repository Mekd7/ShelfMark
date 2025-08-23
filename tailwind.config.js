/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      colors: { 
        'apricot': '#FFE4C4',
        'cream': '#F5F5DC',
        'peach': '#FFDAB9',
        'terracotta': '#E2725B',
      },
       fontFamily: {
        
        sans: ['var(--font-inter)', 'sans-serif'],

        kalnia: ['var(--font-kalnia)', 'serif'], // 'serif' is a fallback
      },
    },
  },
  plugins: [],
}

