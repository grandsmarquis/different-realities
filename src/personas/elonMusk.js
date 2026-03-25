import ElonMuskLayout from '../layouts/ElonMuskLayout'

export default {
  id: 'elonMusk',
  label: 'Elon Musk · mission control',
  emoji: '🚀',
  description: 'Multiplanetary dashboard: rocket HUD, meme stocks, neural inbox, global sim feed.',
  fonts: ['Rajdhani:wght@400;600;700', 'Orbitron:wght@500;700;900'],
  cssVars: {
    '--bg': '#050508',
    '--bg2': '#0c1220',
    '--text': '#e2e8f0',
    '--text2': '#94a3b8',
    '--accent': '#22d3ee',
    '--accent2': '#f97316',
    '--accent3': '#a78bfa',
    '--border': 'rgba(34, 211, 238, 0.2)',
    '--card': 'rgba(8, 12, 20, 0.92)',
    '--font-main': "'Rajdhani', sans-serif",
    '--font-display': "'Orbitron', sans-serif",
  },
  Layout: ElonMuskLayout,
}
