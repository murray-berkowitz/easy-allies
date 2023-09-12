import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: '#17bf94',
        brandPurple: '#AD0DBF',
        brandDark: '#10062A',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
}
export default config
