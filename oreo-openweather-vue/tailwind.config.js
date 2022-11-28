/** @type {import('tailwindcss').Config} */
module.exports = {
  media: false, // or 'media' or 'class'
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {

  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
