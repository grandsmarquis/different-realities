import MyspaceComLayout from '../layouts/MyspaceComLayout'

export default {
  id: 'myspaceCom',
  label: 'myspace.com',
  emoji: '🎸',
  description: 'Glitter gradients, Top 8, auto-play bar, pink borders.',
  fonts: ['Pacifico', 'Bangers'],
  cssVars: {
    '--bg': '#1a0a14',
    '--bg2': '#2d1520',
    '--text': '#1f2937',
    '--text2': '#6b7280',
    '--accent': '#db2777',
    '--accent2': '#a855f7',
    '--border': '#000000',
    '--card': '#ffffff',
    '--font-main': "'Pacifico', cursive",
    '--font-display': "'Bangers', cursive",
  },
  emailSelectionInModal: true,
  Layout: MyspaceComLayout,
}
