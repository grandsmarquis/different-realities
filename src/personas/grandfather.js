import GrandfatherLayout from '../layouts/GrandfatherLayout'

const grandfather = {
  id: 'grandfather',
  label: 'Grandfather',
  emoji: '👴',
  description: 'The workshop Gazette & tube-radio hour',
  fonts: ['Libre+Baskerville:ital,wght@0,400;0,700;1,400', 'Special+Elite'],
  cssVars: {
    '--bg': '#e8dcc8',
    '--bg2': '#d4c4a8',
    '--text': '#2c2418',
    '--text2': '#5c4d3a',
    '--accent': '#8b4513',
    '--accent2': '#1a3a5c',
    '--border': '#a89878',
    '--card': '#f5efe4',
    '--font-main': "'Libre Baskerville', serif",
    '--font-display': "'Special Elite', monospace",
  },
  emailSelectionInModal: true,
  Layout: GrandfatherLayout,
}

export default grandfather
