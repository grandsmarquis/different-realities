import MythologyLayout from '../layouts/MythologyLayout'
const mythology = {
  id: 'mythology', label: 'Mythology Storyteller', emoji: '⚡',
  description: 'From the age before memory.',
  fonts: ['Cinzel:wght@400;600;700', 'Cinzel+Decorative:wght@400;700'],
  cssVars: {
    '--bg': '#080512', '--bg2': '#0d0a1c', '--text': '#e8d5a3', '--text2': '#a89060',
    '--accent': '#c8a855', '--accent2': '#8060c0', '--accent3': '#d44040',
    '--border': '#2a2040', '--card': '#0d0a1c',
    '--font-main': "'Cinzel', serif", '--font-display': "'Cinzel Decorative', serif",
  }, Layout: MythologyLayout,
}
export default mythology
