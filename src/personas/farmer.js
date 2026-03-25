import FarmerLayout from '../layouts/FarmerLayout'

export default {
  id: 'farmer',
  label: 'Farmer',
  emoji: '🚜',
  description:
    'Homestead HQ: fence-post mail, sky & field weather, co-op radio news, and commodity-shed tickers — same data, dirt under the nails.',
  fonts: ['Fraunces:ital,wght@0,400;0,600;0,700;1,400', 'Outfit:wght@400;500;600;700'],
  cssVars: {
    '--bg': '#c8e6c9',
    '--bg2': '#81c784',
    '--text': '#1b3d1f',
    '--text2': '#2e5c33',
    '--accent': '#c62828',
    '--accent2': '#f9a825',
    '--accent3': '#5d4037',
    '--border': '#6d4c41',
    '--card': '#fff8e7',
    '--font-main': "'Outfit', sans-serif",
    '--font-display': "'Fraunces', Georgia, serif",
  },
  Layout: FarmerLayout,
}
