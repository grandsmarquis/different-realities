import SubmarineLayout from '../layouts/SubmarineLayout'

const submarine = {
  id: 'submarine',
  label: 'Deep Sea Submarine Crew',
  emoji: '🌊',
  description: 'Pressure-tested communications.',
  fonts: ['Share+Tech+Mono', 'Orbitron'],
  cssVars: {
    '--bg': '#020810',
    '--bg2': '#051820',
    '--text': '#7dffc8',
    '--text2': '#2a8a6a',
    '--accent': '#00ffaa',
    '--accent2': '#004d6b',
    '--accent3': '#001a22',
    '--border': '#0a3d4a',
    '--card': '#031218',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Orbitron', sans-serif",
  },
  Layout: SubmarineLayout,
}

export default submarine
