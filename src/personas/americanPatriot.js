import AmericanPatriotLayout from '../layouts/AmericanPatriotLayout'

const americanPatriot = {
  id: 'americanPatriot',
  label: 'American Patriot',
  emoji: '🦅',
  description: 'Liberty, inbox, and the pursuit of notifications.',
  fonts: ['Bebas+Neue', 'Merriweather:ital,wght@0,400;0,700;1,400'],
  cssVars: {
    '--bg': '#0a1628',
    '--bg2': '#132238',
    '--text': '#f1f5f9',
    '--text2': '#94a3b8',
    '--accent': '#dc2626',
    '--accent2': '#fbbf24',
    '--border': '#334155',
    '--card': '#1e293b',
    '--font-main': "'Merriweather', Georgia, serif",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: AmericanPatriotLayout,
}

export default americanPatriot
