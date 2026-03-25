import GrandmotherLayout from '../layouts/GrandmotherLayout'

const grandmother = {
  id: 'grandmother',
  label: 'Grand-mère',
  emoji: '👵',
  description: 'Warm, cozy, like receiving a letter',
  fonts: ['Playfair+Display:wght@400;500;700', 'Lora:wght@400;500'],
  cssVars: {
    '--bg': '#fdf6f0',
    '--bg2': '#f5e8dc',
    '--text': '#3d2b1f',
    '--text2': '#8b6655',
    '--accent': '#c0744a',
    '--accent2': '#8b4513',
    '--border': '#e8cfc0',
    '--card': '#fffaf6',
    '--font-main': "'Lora', serif",
    '--font-display': "'Playfair Display', serif",
  },
  Layout: GrandmotherLayout,
}

export default grandmother
