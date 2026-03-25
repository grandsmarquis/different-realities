import Year2000Layout from '../layouts/Year2000Layout'

export default {
  id: 'year2000',
  label: 'Year 2000 millennium',
  emoji: '✨',
  description: 'Y2K chrome portal: IE window, bubble mesh, stock ticker, HotMail vibes, and a spinning “Y2K OK” seal.',
  fonts: ['Audiowide', 'Orbitron'],
  cssVars: {
    '--bg': '#1a0a2e',
    '--bg2': '#533483',
    '--text': '#eef8ff',
    '--text2': '#b8a0ff',
    '--accent': '#00ffff',
    '--accent2': '#ff00cc',
    '--border': '#9966cc',
    '--card': '#ffffff',
    '--font-main': "'Orbitron', sans-serif",
    '--font-display': "'Audiowide', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: Year2000Layout,
}
