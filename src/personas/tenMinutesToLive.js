import TenMinutesToLiveLayout from '../layouts/TenMinutesToLiveLayout'

export default {
  id: 'tenMinutesToLive',
  label: 'You only have 10 minutes to live',
  emoji: '⏳',
  description: 'Sunset countdown, bucket-list chaos, and your inbox — make every second absurdly dramatic. (Timer loops; you are fine.)',
  fonts: ['Bebas+Neue', 'Outfit:wght@400;600;700'],
  cssVars: {
    '--bg': '#1a0a12',
    '--bg2': '#2d1520',
    '--text': '#fff5f0',
    '--text2': '#fda4af',
    '--accent': '#fb7185',
    '--accent2': '#fbbf24',
    '--border': '#4c1d2e',
    '--card': '#351825',
    '--font-main': "'Outfit', sans-serif",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: TenMinutesToLiveLayout,
}
