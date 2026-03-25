import UkPrimeMinisterLayout from '../layouts/UkPrimeMinisterLayout'

const ukPrimeMinister = {
  id: 'ukPrimeMinister',
  label: 'UK Prime Minister',
  emoji: '🏛️',
  description:
    'No. 10 energy: red-box mail, division bells, lobby headlines & Treasury tickers — same data, full theatre.',
  fonts: ['Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400', 'Outfit:wght@400;500;600;700'],
  cssVars: {
    '--bg': '#0a0c10',
    '--bg2': '#12151c',
    '--text': '#f4f0e8',
    '--text2': '#9ca3af',
    '--accent': '#c5a028',
    '--accent2': '#1e3a2f',
    '--accent3': '#7f1d1d',
    '--border': '#2d3544',
    '--card': '#1a1f28',
    '--font-main': "'Outfit', system-ui, sans-serif",
    '--font-display': "'Cormorant Garamond', Georgia, serif",
  },
  emailSelectionInModal: true,
  Layout: UkPrimeMinisterLayout,
}

export default ukPrimeMinister
