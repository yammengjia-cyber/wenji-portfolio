import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C8963E',
          dark: '#A67B32',
          light: '#F5E6C8',
          50: '#FDF8F0',
          100: '#F9EDDA',
          200: '#F0D9B0',
          300: '#E5C285',
          400: '#D4A95C',
          500: '#C8963E',
          600: '#A67B32',
          700: '#856226',
          800: '#63491C',
          900: '#423013',
        },
        cream: {
          DEFAULT: '#FDF8F0',
          dark: '#F5EDDF',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
export default config
