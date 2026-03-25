import Year1800Layout from '../layouts/Year1800Layout'

const year1800 = {
  id: 'year1800',
  label: '1800 — Gentleman\'s study',
  emoji: '🕯️',
  description: 'Parchment, wax seals, barometer, and the morning broadsheet.',
  fonts: ['IM+Fell+English:ital@0;1', 'IM+Fell+English+SC'],
  cssVars: {
    '--bg': '#1c120c',
    '--bg2': '#2a1a12',
    '--text': '#f0e6d8',
    '--text2': '#a89078',
    '--accent': '#c9a06a',
    '--accent2': '#e8d4a8',
    '--ink': '#1a0f08',
    '--parchment': '#ede4d3',
    '--border': '#5c4030',
    '--font-main': "'IM Fell English', Georgia, serif",
    '--font-display': "'IM Fell English SC', 'IM Fell English', serif",
  },
  emailSelectionInModal: true,
  Layout: Year1800Layout,
}

export default year1800
