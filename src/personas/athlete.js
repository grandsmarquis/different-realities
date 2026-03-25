import AthleteLayout from '../layouts/AthleteLayout'

export default {
  id: 'athlete',
  label: 'Athlete',
  emoji: '🏃',
  description: 'Training camp: track lanes, coach mail, outdoor session weather, sponsor tickers, wire news.',
  fonts: ['Oswald:wght@500;700', 'Bebas Neue'],
  cssVars: {
    '--bg': '#7c2d12',
    '--bg2': '#9a3412',
    '--text': '#ffffff',
    '--text2': '#fed7aa',
    '--accent': '#fb923c',
    '--accent2': '#a3e635',
    '--accent3': '#22d3ee',
    '--border': 'rgba(255, 255, 255, 0.2)',
    '--card': 'rgba(0, 0, 0, 0.35)',
    '--font-main': "'Oswald', sans-serif",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  Layout: AthleteLayout,
}
