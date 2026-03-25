import DarthVadorLayout from '../layouts/DarthVadorLayout'

export default {
  id: 'darthVador',
  label: 'darth vador',
  emoji: '🖤',
  description: 'Breathing room inbox. Disturbing lack of clicks.',
  fonts: ['Orbitron:wght@400;700', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#000000',
    '--bg2': '#0a0a0a',
    '--text': '#e8e8e8',
    '--text2': '#888888',
    '--accent': '#ff2a2a',
    '--accent2': '#8b0000',
    '--accent3': '#1a0505',
    '--border': '#331111',
    '--card': '#0d0d0d',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Orbitron', sans-serif",
  },
  Layout: DarthVadorLayout,
}
