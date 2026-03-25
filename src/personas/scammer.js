import ScammerLayout from '../layouts/ScammerLayout'

const scammer = {
  id: 'scammer',
  label: 'Scammer',
  emoji: '🎣',
  description: 'CONGRATULATIONS!!! you are the 1,000,000th visitor',
  fonts: ['Share+Tech+Mono', 'Bebas+Neue:wght@400'],
  cssVars: {
    '--bg': '#0a0f0c',
    '--bg2': '#121a14',
    '--text': '#c8f5c8',
    '--text2': '#6b9b6b',
    '--accent': '#00ff66',
    '--accent2': '#ff3333',
    '--border': '#1e3324',
    '--card': '#0f1812',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: ScammerLayout,
}

export default scammer
