import BrokeStudentLayout from '../layouts/BrokeStudentLayout'

export default {
  id: 'brokeStudent',
  label: 'Broke student',
  emoji: '🍜',
  description: 'Library Wi‑Fi: cracked frame, ramen-budget inbox, painful tickers, campus bulletin.',
  fonts: ['DM Sans:wght@400;600;700', 'Outfit:wght@700;800'],
  cssVars: {
    '--bg': '#1c1917',
    '--bg2': '#292524',
    '--text': '#fef3c7',
    '--text2': '#a8a29e',
    '--accent': '#ea580c',
    '--accent2': '#fbbf24',
    '--accent3': '#38bdf8',
    '--border': 'rgba(234, 88, 12, 0.35)',
    '--card': 'rgba(41, 37, 36, 0.95)',
    '--font-main': "'DM Sans', sans-serif",
    '--font-display': "'Outfit', sans-serif",
  },
  Layout: BrokeStudentLayout,
}
