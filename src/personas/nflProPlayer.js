import NflProPlayerLayout from '../layouts/NflProPlayerLayout'

const nflProPlayer = {
  id: 'nflProPlayer',
  label: 'NFL pro player',
  emoji: '🏈',
  description: 'Turf, yard markers, playbook inbox, scoreboard weather.',
  fonts: ['Oswald:wght@500;700', 'Anton'],
  cssVars: {
    '--bg': '#020617',
    '--bg2': '#0f172a',
    '--text': '#f8fafc',
    '--text2': '#94a3b8',
    '--accent': '#f59e0b',
    '--accent2': '#22c55e',
    '--accent3': '#1e293b',
    '--border': '#334155',
    '--card': '#0f172a',
    '--font-main': "'Oswald', sans-serif",
    '--font-display': "'Anton', sans-serif",
  },
  Layout: NflProPlayerLayout,
}

export default nflProPlayer
