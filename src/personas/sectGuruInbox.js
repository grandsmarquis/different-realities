import SectGuruInboxLayout from '../layouts/SectGuruInboxLayout'

const sectGuruInbox = {
  id: 'sectGuruInbox',
  label: 'Sect guru inbox',
  emoji: '🕯️',
  description: 'Incense, omens, treasury charts, and the flock’s mail.',
  fonts: ['Cormorant+Garamond:wght@500;600', 'Cinzel+Decorative:wght@400;700'],
  cssVars: {
    '--bg': '#07040b',
    '--bg2': '#1a0f24',
    '--text': '#faf5ff',
    '--text2': '#c4b5fd',
    '--accent': '#a855f7',
    '--accent2': '#fbbf24',
    '--accent3': '#581c87',
    '--border': '#6b21a8',
    '--card': '#12081c',
    '--font-main': "'Cormorant Garamond', serif",
    '--font-display': "'Cinzel Decorative', serif",
  },
  Layout: SectGuruInboxLayout,
}

export default sectGuruInbox
