import LuxuryRealtorLayout from '../layouts/LuxuryRealtorLayout'

const luxuryRealtor = {
  id: 'luxuryRealtor',
  label: 'Real Estate Luxury Agent',
  emoji: '🏛️',
  description: 'Prime correspondence. Views for days.',
  fonts: ['Playfair+Display', 'Montserrat'],
  cssVars: {
    '--bg': '#0f0e0c',
    '--bg2': '#1a1814',
    '--text': '#faf6ef',
    '--text2': '#9a8f7c',
    '--accent': '#d4af37',
    '--accent2': '#f5f0e6',
    '--accent3': '#2c2416',
    '--border': '#3d3428',
    '--card': '#141210',
    '--font-main': "'Montserrat', sans-serif",
    '--font-display': "'Playfair Display', serif",
  },
  Layout: LuxuryRealtorLayout,
}

export default luxuryRealtor
