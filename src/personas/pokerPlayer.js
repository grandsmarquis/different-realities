import PokerPlayerLayout from '../layouts/PokerPlayerLayout'

const pokerPlayer = {
  id: 'pokerPlayer',
  label: 'Poker shark',
  emoji: '🃏',
  description: 'Reads the table: inbox, tells, and the river of news',
  fonts: ['Bebas Neue', 'Source Sans 3:wght@400;600;700'],
  cssVars: {
    '--bg': '#0a120e',
    '--felt': '#0d3d2e',
    '--felt-edge': '#06261c',
    '--wood': '#4a3020',
    '--gold': '#e8c547',
    '--chip-red': '#c41e3a',
    '--chip-blue': '#1e5f8a',
    '--cream': '#f7f2ea',
    '--text': '#e8e6e1',
    '--text2': '#8fa396',
    '--font-main': "'Source Sans 3', sans-serif",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  emailSelectionInModal: false,
  Layout: PokerPlayerLayout,
}

export default pokerPlayer
