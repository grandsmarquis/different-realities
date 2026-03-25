import GodLayout from '../layouts/GodLayout'

export default {
  id: 'god',
  label: 'god',
  emoji: '☁️',
  description: 'Omniscient mode: still has unread.',
  fonts: ['Cinzel:wght@400;600', 'Cormorant:ital,wght@0,400;0,600'],
  cssVars: {
    '--bg': '#1a1530',
    '--bg2': '#2d2640',
    '--text': '#fffef7',
    '--text2': '#e8dcc8',
    '--accent': '#ffd700',
    '--accent2': '#fff8dc',
    '--accent3': '#3d3558',
    '--border': 'rgba(255, 215, 120, 0.35)',
    '--card': 'rgba(255, 255, 255, 0.08)',
    '--font-main': "'Cormorant', serif",
    '--font-display': "'Cinzel', serif",
  },
  Layout: GodLayout,
}
