import PineapplePizzaLayout from '../layouts/PineapplePizzaLayout'

export default {
  id: 'pineapplePizza',
  label: 'Pineapple on pizza',
  emoji: '🍍',
  description: 'Sweet vs sauce split-screen — controversial tickers included.',
  fonts: ['Bangers', 'Nunito:wght@400;700;800'],
  cssVars: {
    '--bg': '#1c1917',
    '--bg2': '#292524',
    '--text': '#fffbeb',
    '--text2': '#fde68a',
    '--accent': '#ea580c',
    '--accent2': '#facc15',
    '--accent3': '#15803d',
    '--border': 'rgba(250, 204, 21, 0.3)',
    '--card': 'rgba(28, 25, 23, 0.95)',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Bangers', cursive",
  },
  Layout: PineapplePizzaLayout,
}
