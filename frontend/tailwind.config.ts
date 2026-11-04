import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7f4',
          100: '#d9eee7',
          600: '#16775b',
          700: '#125e49',
          900: '#123c33',
        },
      },
    },
  },
  plugins: [],
};

export default config;