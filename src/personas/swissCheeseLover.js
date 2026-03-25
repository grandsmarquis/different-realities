import SwissCheeseLoverLayout from '../layouts/SwissCheeseLoverLayout'

export default {
  id: 'swissCheeseLover',
  label: 'Swiss cheese lover',
  emoji: '🧀',
  description: 'Alpine emmental UI: hole-y cards, fondue weather, market holes, chalet news.',
  fonts: ['Fraunces:opsz,wght@9..144,400;700', 'Outfit:wght@400;600'],
  cssVars: {
    '--bg': '#115e59',
    '--bg2': '#134e4a',
    '--text': '#f0fdfa',
    '--text2': '#ccfbf1',
    '--accent': '#fde68a',
    '--accent2': '#dc2626',
    '--accent3': '#fbbf24',
    '--border': 'rgba(245, 158, 11, 0.4)',
    '--card': 'rgba(253, 230, 138, 0.9)',
    '--font-main': "'Outfit', sans-serif",
    '--font-display': "'Fraunces', serif",
  },
  Layout: SwissCheeseLoverLayout,
}
