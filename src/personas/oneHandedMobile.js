import OneHandedMobileLayout from '../layouts/OneHandedMobileLayout'

export default {
  id: 'oneHandedMobile',
  label: 'One-handed mobile use',
  emoji: '🤳',
  description: 'Thumb zone only. Reachable rails. The other hand is holding coffee.',
  fonts: ['DM+Sans:wght@400;500;700'],
  cssVars: {
    '--bg': '#0f1419',
    '--bg2': '#1a2332',
    '--text': '#f1f5f9',
    '--text2': '#94a3b8',
    '--accent': '#38bdf8',
    '--accent2': '#a78bfa',
    '--border': '#334155',
    '--card': '#1e293b',
    '--font-main': "'DM Sans', sans-serif",
    '--font-display': "'DM Sans', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: OneHandedMobileLayout,
}
