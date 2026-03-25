import OhShitItsMondayLayout from '../layouts/OhShitItsMondayLayout'

export default {
  id: 'ohShitItsMonday',
  label: "Oh shit it's monday",
  emoji: '⏰',
  description: 'Grey rain mood, alarm shake, mandatory inbox stack.',
  fonts: ['Special+Elite', 'IBM+Plex+Sans:wght@400;600'],
  cssVars: {
    '--bg': '#334155',
    '--bg2': '#1e293b',
    '--text': '#e2e8f0',
    '--text2': '#94a3b8',
    '--accent': '#f59e0b',
    '--accent2': '#64748b',
    '--border': '#475569',
    '--card': '#0f172a',
    '--font-main': "'IBM Plex Sans', sans-serif",
    '--font-display': "'Special Elite', cursive",
  },
  emailSelectionInModal: false,
  Layout: OhShitItsMondayLayout,
}
