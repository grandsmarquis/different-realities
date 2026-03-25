import JungleDwellerLayout from '../layouts/JungleDwellerLayout'

export default {
  id: 'jungleDweller',
  label: 'Living in the jungle',
  emoji: '🦜',
  description:
    'Canopy HQ: leaf-mail vine, shaman sky report, river-stone tickers & campfire gossip — same inbox, totally wild.',
  fonts: ['Sniglet', 'Lexend:wght@400;600;700'],
  cssVars: {
    '--bg': '#0f2918',
    '--bg2': '#1a3d28',
    '--text': '#ecfccb',
    '--text2': '#bef264',
    '--accent': '#84cc16',
    '--accent2': '#fbbf24',
    '--accent3': '#34d399',
    '--border': 'rgba(190, 242, 100, 0.22)',
    '--card': 'rgba(22, 60, 36, 0.92)',
    '--font-main': "'Lexend', sans-serif",
    '--font-display': "'Sniglet', cursive",
  },
  Layout: JungleDwellerLayout,
}
