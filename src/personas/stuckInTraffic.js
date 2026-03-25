import StuckInTrafficLayout from '../layouts/StuckInTrafficLayout'

export default {
  id: 'stuckInTraffic',
  label: 'Stuck in traffic',
  emoji: '🚦',
  description: 'Windshield crawl, GPS ETA anxiety, honk physics, AM radio news crawl.',
  fonts: ['Orbitron:wght@500;700', 'Exo+2:wght@400;600;700'],
  cssVars: {
    '--bg': '#0b0f14',
    '--bg2': '#151b26',
    '--text': '#f1f5f9',
    '--text2': '#94a3b8',
    '--accent': '#fb923c',
    '--accent2': '#f87171',
    '--border': '#334155',
    '--card': '#1e293b',
    '--font-main': "'Exo 2', sans-serif",
    '--font-display': "'Orbitron', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: StuckInTrafficLayout,
}
