/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './lib/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './pages/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './components/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        astro: '#bc52ee',
        svelte: '#f96743',
        branding: '#8714bd',
        launchfast: '#000000',
      },
      animation: {
        'fade-200': 'fadeIn200 200ms ease-in-out',
        'fade-400': 'fadeIn400 400ms ease-in-out',
        'fade-600': 'fadeIn600 600ms ease-in-out',
      },
      keyframes: () => ({
        fadeIn200: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeIn400: {
          '0%': { opacity: 0 },
          '50%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeIn600: {
          '0%': { opacity: 0 },
          '75%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
}
