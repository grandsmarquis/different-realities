import LateForWorkLayout from '../layouts/LateForWorkLayout'

export default {
  id: 'lateForWork',
  label: 'Late for work',
  emoji: '🏃',
  description: 'Sprint-mode HUD, countdown panic, coffee physics, news ticker blur.',
  fonts: ['Bebas+Neue', 'Barlow+Condensed:wght@400;600;700'],
  cssVars: {
    '--bg': '#0c1222',
    '--bg2': '#151d33',
    '--text': '#f8fafc',
    '--text2': '#94a3b8',
    '--accent': '#f97316',
    '--accent2': '#ef4444',
    '--border': '#334155',
    '--card': '#1e293b',
    '--font-main': "'Barlow Condensed', sans-serif",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: LateForWorkLayout,
}
