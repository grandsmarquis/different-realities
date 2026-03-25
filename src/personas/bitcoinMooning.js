import BitcoinMooningLayout from '../layouts/BitcoinMooningLayout'

const bitcoinMooning = {
  id: 'bitcoinMooning',
  label: 'Bitcoin mooning',
  emoji: '🚀',
  description: 'Parabolic chart, starfield, pure euphoria.',
  fonts: ['Syne:wght@600;800', 'Exo+2:wght@500;700'],
  cssVars: {
    '--bg': '#030b06',
    '--bg2': '#0f1f14',
    '--text': '#ecfccb',
    '--text2': '#65a30d',
    '--accent': '#fbbf24',
    '--accent2': '#a3e635',
    '--accent3': '#14532d',
    '--border': '#365314',
    '--card': '#052e16',
    '--font-main': "'Exo 2', sans-serif",
    '--font-display': "'Syne', sans-serif",
  },
  Layout: BitcoinMooningLayout,
}

export default bitcoinMooning
