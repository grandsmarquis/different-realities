import CasinoLayout from '../layouts/CasinoLayout'

const casino = {
  id: 'casino',
  label: 'Vegas gambler',
  emoji: '🎰',
  description: 'Neon, felt, and lady luck',
  fonts: ['Limelight', 'Oswald:wght@300;400;500;600;700'],
  cssVars: {
    '--bg': '#12080c',
    '--bg2': '#1f0f14',
    '--text': '#f5e6c8',
    '--text2': '#b8a88c',
    '--accent': '#ffd700',
    '--accent2': '#ff2a6d',
    '--accent3': '#00ffc8',
    '--border': '#5c4033',
    '--card': '#1a1218',
    '--felt': '#0d2818',
    '--font-main': "'Oswald', sans-serif",
    '--font-display': "'Limelight', cursive",
  },
  Layout: CasinoLayout,
}

export default casino
