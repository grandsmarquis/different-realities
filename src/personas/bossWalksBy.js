import BossWalksByLayout from '../layouts/BossWalksByLayout'

export default {
  id: 'bossWalksBy',
  label: 'Trying to look busy when your boss walks by',
  emoji: '📊',
  description: 'Spreadsheet camouflage. Proximity radar. Pure theater.',
  fonts: ['IBM+Plex+Mono:wght@400;500;600'],
  cssVars: {
    '--bg': '#0f172a',
    '--bg2': '#1e293b',
    '--text': '#e2e8f0',
    '--text2': '#94a3b8',
    '--accent': '#22c55e',
    '--accent2': '#3b82f6',
    '--border': '#334155',
    '--card': '#1e293b',
    '--font-main': "'IBM Plex Mono', monospace",
    '--font-display': "'IBM Plex Mono', monospace",
  },
  emailSelectionInModal: true,
  Layout: BossWalksByLayout,
}
