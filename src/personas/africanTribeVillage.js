import AfricanTribeVillageLayout from '../layouts/AfricanTribeVillageLayout'

export default {
  id: 'africanTribeVillage',
  label: 'Small village · savanna council',
  emoji: '🥁',
  description:
    'Savanna HQ: drum-line ticker, messenger calabashes, sky-watcher weather, council-fire headlines, and bead-market tickers — same inbox, weather, news & stocks.',
  fonts: ['Ubuntu:ital,wght@0,400;0,500;0,700;1,400', 'Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400'],
  cssVars: {
    '--bg': '#1a0f2e',
    '--bg2': '#2d1b4e',
    '--text': '#fff8f0',
    '--text2': '#e8dcc8',
    '--accent': '#e85d04',
    '--accent2': '#faa307',
    '--accent3': '#9d4edd',
    '--border': '#5c3d2e',
    '--card': '#2f2419',
    '--font-main': "'Ubuntu', sans-serif",
    '--font-display': "'Fraunces', Georgia, serif",
  },
  Layout: AfricanTribeVillageLayout,
}
