import ExtremelyLazyLayout from '../layouts/ExtremelyLazyLayout'

export default {
  id: 'extremelyLazy',
  label: 'Extremely lazy',
  emoji: '🛋️',
  description:
    'Couch HQ: TV glow, 2% motivation meter, snail-speed news crawl — same inbox, weather, headlines & stonks with zero urgency.',
  fonts: ['Fredoka:wght@400;500;600;700'],
  cssVars: {
    '--bg': '#2c2620',
    '--bg2': '#1e1a16',
    '--text': '#f4ead9',
    '--text2': '#b8a088',
    '--accent': '#f0b429',
    '--accent2': '#6ecff6',
    '--border': '#5c4d3d',
    '--card': '#3a332b',
    '--font-main': "'Fredoka', sans-serif",
    '--font-display': "'Fredoka', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: ExtremelyLazyLayout,
}
