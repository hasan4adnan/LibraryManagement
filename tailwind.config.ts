import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme
        light: {
          bg: '#F8F9FB',
          panel: '#FFFFFF',
          border: '#E5E7EB',
          text: '#111827',
          primary: '#3B5AFF',
        },
        // Dark theme
        dark: {
          bg: '#0E1117',
          panel: '#161B22',
          border: '#2D333B',
          text: '#E5E7EB',
          primary: '#3B82F6',
        },
      },
    },
  },
  plugins: [],
};

export default config;

