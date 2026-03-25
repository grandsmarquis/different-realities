import ArabThemedWebLayout from '../layouts/ArabThemedWebLayout'

const arabThemedWeb = {
  id: 'arabThemedWeb',
  label: 'The web is all Arabic themed',
  emoji: '🕌',
  description: 'RTL souq of pixels — lanterns, geometry, and your same inbox in gold and lapis.',
  fonts: [
    'El+Messiri:wght@400;500;600;700',
    'Amiri:wght@400;700',
    'Reem+Kufi+Ink',
  ],
  cssVars: {
    '--bg': '#070f1c',
    '--bg2': '#0f2847',
    '--text': '#fef9e7',
    '--text2': '#c9b896',
    '--accent': '#d4af37',
    '--accent2': '#2dd4bf',
    '--accent3': '#1a365d',
    '--border': 'rgba(212, 175, 55, 0.28)',
    '--card': 'rgba(15, 40, 71, 0.92)',
    '--font-main': "'El Messiri', serif",
    '--font-ar': "'Amiri', serif",
    '--font-display': "'Reem Kufi Ink', sans-serif",
  },
  Layout: ArabThemedWebLayout,
}

export default arabThemedWeb
