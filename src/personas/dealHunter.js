import DealHunterLayout from '../layouts/DealHunterLayout'

export default {
  id: 'dealHunter',
  label: 'Budget-conscious deal hunter',
  emoji: '🏷️',
  description: 'Stack coupons, clip savings, never pay full price.',
  fonts: ['Bebas+Neue', 'DM+Sans:wght@400;600;700'],
  cssVars: {
    '--bg': '#0f172a',
    '--bg2': '#1e293b',
    '--text': '#f8fafc',
    '--text2': '#94a3b8',
    '--accent': '#22c55e',
    '--accent2': '#facc15',
    '--border': '#334155',
    '--card': '#ffffff',
    '--font-main': "'DM Sans', sans-serif",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: DealHunterLayout,
}
