import GermanSoccerFanLayout from '../layouts/GermanSoccerFanLayout'

const germanSoccerFan = {
  id: 'germanSoccerFan',
  label: 'German soccer fan',
  emoji: '⚽',
  description: 'Schwarz-Rot-Gold · stadium energy',
  fonts: ['Bebas+Neue', 'Roboto+Condensed:wght@400;700'],
  cssVars: {
    '--bg': '#0a0a0c',
    '--bg2': '#12121a',
    '--text': '#f5f5f5',
    '--text2': '#b8b8c8',
    '--accent': '#dd0000',
    '--accent2': '#ffcc00',
    '--accent3': '#111111',
    '--border': '#2a2a35',
    '--card': '#16161f',
    '--font-main': "'Roboto Condensed', sans-serif",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  Layout: GermanSoccerFanLayout,
}

export default germanSoccerFan
