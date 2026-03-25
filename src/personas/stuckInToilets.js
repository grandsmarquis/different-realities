import StuckInToiletsLayout from '../layouts/StuckInToiletsLayout'

export default {
  id: 'stuckInToilets',
  label: 'Stuck in the toilets',
  emoji: '🚽',
  description: 'Ceramic tiles, soap bubbles, notes under the door — same inbox, weather, news & stocks, stall edition.',
  fonts: ['Permanent+Marker', 'Nunito:wght@400;600;700;800'],
  cssVars: {
    '--bg': '#1a2f38',
    '--bg2': '#243e4a',
    '--text': '#eef9fc',
    '--text2': '#8eb4c0',
    '--accent': '#5ce1e6',
    '--accent2': '#ff9ecd',
    '--border': '#3d5c6b',
    '--card': '#213a44',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Permanent Marker', cursive",
  },
  emailSelectionInModal: true,
  Layout: StuckInToiletsLayout,
}
