import MushroomKingdomLayout from '../layouts/MushroomKingdomLayout'

const mushroomKingdom = {
  id: 'mushroomKingdom',
  label: 'Mushroom Kingdom',
  emoji: '🍄',
  description: 'Coins, clouds, pipes · jump into your mail',
  fonts: ['Bungee', 'Nunito:wght@600;700;800'],
  cssVars: {
    '--bg': '#5c94fc',
    '--bg2': '#2038ec',
    '--text': '#1a1a2e',
    '--text2': '#2d3a5c',
    '--accent': '#e52521',
    '--accent2': '#f8d030',
    '--accent3': '#c84c0c',
    '--border': '#b8d4f8',
    '--card': '#ffffff',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Bungee', cursive",
  },
  Layout: MushroomKingdomLayout,
}

export default mushroomKingdom
