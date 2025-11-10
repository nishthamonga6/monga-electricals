import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1a4d91',
          dark: '#123a6d',
          light: '#2b6cc3',
        },
        accent: '#f5b50a',
      },
    },
  },
  plugins: [],
};

export default config;
