import Xbox360Layout from '../layouts/Xbox360Layout'

const xbox360 = {
  id: 'xbox360',
  label: 'Xbox 360',
  emoji: '🎮',
  description: 'Achievement unlocked: Inbox.',
  fonts: ['Exo+2:wght@400;600;700', 'Orbitron:wght@400;700'],
  cssVars: {
    '--bg': '#060806',
    '--bg2': '#0e120c',
    '--text': '#e5f5d8',
    '--text2': '#6b7f62',
    '--accent': '#9bf00b',
    '--accent2': '#2d5016',
    '--accent3': '#152210',
    '--border': '#2a3528',
    '--card': '#0c100a',
    '--font-main': "'Exo 2', sans-serif",
    '--font-display': "'Orbitron', sans-serif",
  },
  Layout: Xbox360Layout,
}

export default xbox360
