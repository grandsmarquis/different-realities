import BaristaLayout from '../layouts/BaristaLayout'

const barista = {
  id: 'barista',
  label: 'Coffee Snob Barista',
  emoji: '☕',
  description: 'Single-origin inbox. Notes of drama.',
  fonts: ['DM+Serif+Display', 'Nunito'],
  cssVars: {
    '--bg': '#1c1410',
    '--bg2': '#2a1f18',
    '--text': '#f5ebe0',
    '--text2': '#a89080',
    '--accent': '#c4a574',
    '--accent2': '#6b4423',
    '--accent3': '#3d2914',
    '--border': '#4a3628',
    '--card': '#231a14',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'DM Serif Display', serif",
  },
  Layout: BaristaLayout,
}

export default barista
