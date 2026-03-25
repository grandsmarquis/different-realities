import ProBowlingPlayerLayout from '../layouts/ProBowlingPlayerLayout'

const proBowlingPlayer = {
  id: 'proBowlingPlayer',
  label: 'Pro bowling player',
  emoji: '🎳',
  description: 'Retro alley desk: wood & gold lane, message rack, travel forecast, pro shop crawl.',
  fonts: ['Russo+One', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#292524',
    '--bg2': '#44403c',
    '--text': '#faf7f2',
    '--text2': '#a8a29e',
    '--accent': '#d97706',
    '--accent2': '#ea580c',
    '--accent3': '#57534e',
    '--border': '#78350f',
    '--card': '#3f2e18',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Russo One', sans-serif",
  },
  Layout: ProBowlingPlayerLayout,
}

export default proBowlingPlayer
