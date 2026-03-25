import Year1920Layout from '../layouts/Year1920Layout'

const year1920 = {
  id: 'year1920',
  label: '1920 — Roaring desk',
  emoji: '🥂',
  description: 'Art Deco wires, ticker tape, and telegrams.',
  fonts: ['Poiret+One', 'Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400'],
  cssVars: {
    '--bg': '#0e0c0a',
    '--bg2': '#161210',
    '--text': '#f5e6c8',
    '--text2': '#9a8a6e',
    '--accent': '#c9a227',
    '--accent2': '#f0d78c',
    '--border': '#4a3f2e',
    '--card': '#f8ecd4',
    '--font-main': "'Cormorant Garamond', Georgia, serif",
    '--font-display': "'Poiret One', cursive",
  },
  emailSelectionInModal: true,
  Layout: Year1920Layout,
}

export default year1920
