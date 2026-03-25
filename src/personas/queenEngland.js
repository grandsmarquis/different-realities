import QueenEnglandLayout from '../layouts/QueenEnglandLayout'

const queenEngland = {
  id: 'queenEngland',
  label: 'Royal correspondence',
  emoji: '👑',
  description: 'Buckingham stationery · crown jewels',
  fonts: ['Cinzel+Decorative:wght@400;700', 'Cormorant+Garamond:wght@400;600;700'],
  cssVars: {
    '--bg': '#faf6ef',
    '--bg2': '#ebe4d6',
    '--text': '#1c1428',
    '--text2': '#5c4a6e',
    '--accent': '#6b2d5c',
    '--accent2': '#c9a227',
    '--accent3': '#1a2744',
    '--border': '#d4c4a8',
    '--card': '#fffdf8',
    '--font-main': "'Cormorant Garamond', serif",
    '--font-display': "'Cinzel Decorative', serif",
  },
  Layout: QueenEnglandLayout,
}

export default queenEngland
