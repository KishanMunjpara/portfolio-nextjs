/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        harbour: {
          950: '#0a0f1a',
          900: '#0f1629',
          800: '#1a2438',
          700: '#243044',
          600: '#2f3d52',
        },
        sand: {
          200: '#f5e6c8',
          300: '#edd9a8',
          400: '#e8b86d',
          500: '#d4a054',
        },
        harbourTeal: {
          400: '#5eb3c9',
          500: '#3d9cb5',
          600: '#2d7a8f',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          500: '#3d9cb5',
          600: '#2d7a8f',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
        },
        surface: 'var(--surface)',
        text: {
          DEFAULT: 'var(--text)',
          secondary: 'var(--text-secondary)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        harbour: '0 25px 50px -12px rgba(10, 15, 26, 0.45)',
        sand: '0 0 40px -8px rgba(232, 184, 109, 0.25)',
      },
    },
  },
  plugins: [],
};
