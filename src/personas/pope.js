import PopeLayout from '../layouts/PopeLayout'

const pope = {
  id: 'pope',
  label: 'the pope',
  emoji: '⛪',
  description: 'Apostolic inbox. Heaven-grade UX. One holy refresh.',
  fonts: ['Cinzel+Decorative:wght@400;700', 'Cormorant+Infant:ital,wght@0,400;0,600;1,400'],
  cssVars: {
    '--bg': '#120a1e',
    '--bg2': '#1c1230',
    '--text': '#faf6ef',
    '--text2': '#c9b8a8',
    '--accent': '#d4af37',
    '--accent2': '#f0e6c8',
    '--accent3': '#5c1a2e',
    '--papal': '#c41e3a',
    '--border': 'rgba(212, 175, 55, 0.35)',
    '--card': 'rgba(30, 20, 50, 0.85)',
    '--glass': 'rgba(255, 248, 235, 0.06)',
    '--font-main': "'Cormorant Infant', serif",
    '--font-display': "'Cinzel Decorative', serif",
  },
  Layout: PopeLayout,
}

export default pope
