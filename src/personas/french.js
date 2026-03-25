import FrenchLayout from '../layouts/FrenchLayout'

const french = {
  id: 'french',
  label: 'Français',
  emoji: '🇫🇷',
  description: 'La République. L\'élégance. La patrie.',
  fonts: ['Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500', 'Libre+Baskerville:ital,wght@0,400;0,700;1,400'],
  cssVars: {
    '--bg': '#f8f7f4',
    '--bg2': '#eeecea',
    '--text': '#1a1a2e',
    '--text2': '#5a5a7a',
    '--accent': '#002395',
    '--accent2': '#ED2939',
    '--border': '#dcdae0',
    '--card': '#ffffff',
    '--font-main': "'Cormorant Garamond', serif",
    '--font-display': "'Libre Baskerville', serif",
  },
  Layout: FrenchLayout,
}

export default french
