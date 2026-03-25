import CyberpunkHackerLayout from '../layouts/CyberpunkHackerLayout'

const cyberpunk = {
  id: 'cyberpunk',
  label: 'Cyberpunk Hacker',
  emoji: '💻',
  description: 'The matrix has you.',
  fonts: ['Orbitron:wght@400;500;700', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#000000',
    '--bg2': '#040d04',
    '--text': '#00ff41',
    '--text2': '#008f11',
    '--accent': '#00ff41',
    '--accent2': '#00b8ff',
    '--accent3': '#ff0066',
    '--border': '#003300',
    '--card': '#030d03',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Orbitron', sans-serif",
  },
  Layout: CyberpunkHackerLayout,
}

export default cyberpunk
