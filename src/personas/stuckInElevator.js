import StuckInElevatorLayout from '../layouts/StuckInElevatorLayout'

export default {
  id: 'stuckInElevator',
  label: 'Stuck in an elevator',
  emoji: '🛗',
  description: 'Brushed metal, panic LED, muzak energy — same inbox, weather, news & stocks, vertical edition.',
  fonts: ['Share+Tech+Mono', 'Outfit:wght@400;600;700;800'],
  cssVars: {
    '--bg': '#14110e',
    '--bg2': '#1f1a15',
    '--text': '#faf6f0',
    '--text2': '#9c8f82',
    '--accent': '#f59e0b',
    '--accent2': '#22d3ee',
    '--border': '#3d342c',
    '--card': '#221c17',
    '--font-main': "'Outfit', sans-serif",
    '--font-display': "'Share Tech Mono', monospace",
  },
  emailSelectionInModal: true,
  Layout: StuckInElevatorLayout,
}
