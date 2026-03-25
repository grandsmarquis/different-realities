import YouAreRichLayout from '../layouts/YouAreRichLayout'

export default {
  id: 'youAreRich',
  label: 'You are rich',
  emoji: '💎',
  description: 'Gold ticker, marble-dark panels, concierge copy, large sparklines.',
  fonts: ['Cormorant+Garamond:ital,wght@0,300;0,600;1,400', 'Playfair+Display:ital,wght@0,400;0,700;1,400'],
  cssVars: {
    '--bg': '#0c0a09',
    '--bg2': '#1c1917',
    '--text': '#fafaf9',
    '--text2': '#a8a29e',
    '--accent': '#d4af37',
    '--accent2': '#b45309',
    '--border': '#78350f',
    '--card': '#292524',
    '--font-main': "'Cormorant Garamond', serif",
    '--font-display': "'Playfair Display', serif",
  },
  emailSelectionInModal: true,
  Layout: YouAreRichLayout,
}
