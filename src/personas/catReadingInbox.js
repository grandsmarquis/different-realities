import CatReadingInboxLayout from '../layouts/CatReadingInboxLayout'

export default {
  id: 'catReadingInbox',
  label: 'Cat reading inbox',
  emoji: '🐈‍⬛',
  description: 'POV: a cat judges your mail, weather, charts, and gossip.',
  fonts: ['Sniglet', 'Nunito:wght@400;600;700'],
  cssVars: {
    '--bg': '#1e1b4b',
    '--bg2': '#312e81',
    '--text': '#ede9fe',
    '--text2': '#c4b5fd',
    '--accent': '#a78bfa',
    '--accent2': '#e879f9',
    '--accent3': '#4c1d95',
    '--border': 'rgba(167, 139, 250, 0.35)',
    '--card': 'rgba(30, 27, 75, 0.85)',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Sniglet', cursive",
  },
  Layout: CatReadingInboxLayout,
}
