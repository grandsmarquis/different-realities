import AndroidTvInboxLayout from '../layouts/AndroidTvInboxLayout'

const androidTvInbox = {
  id: 'androidTvInbox',
  label: 'Android TV home inbox',
  emoji: '📺',
  description: 'Couch mode launcher: mail, weather, headlines, and markets as cinematic tiles.',
  fonts: ['Outfit:wght@400;500;700', 'Space+Grotesk:wght@500;700'],
  cssVars: {
    '--bg': '#040716',
    '--bg2': '#09122e',
    '--text': '#e2f8ff',
    '--text2': '#93c5fd',
    '--accent': '#22d3ee',
    '--accent2': '#0ea5e9',
    '--accent3': '#1e293b',
    '--border': '#1e3a8a',
    '--card': '#0a1028',
    '--font-main': "'Outfit', sans-serif",
    '--font-display': "'Space Grotesk', sans-serif",
  },
  Layout: AndroidTvInboxLayout,
}

export default androidTvInbox
