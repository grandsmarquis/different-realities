import YouDontKnowHowToReadLayout from '../layouts/YouDontKnowHowToReadLayout'

export default {
  id: 'youDontKnowHowToRead',
  label: "You don't know how to read",
  emoji: '🧩',
  description: 'Letters become shape clues. Sounds become color beads. Your inbox, weather, news, and stocks turn into a puzzle you can “guess”.',
  fonts: ['Caveat:wght@400;600', 'Permanent Marker:wght@400'],
  cssVars: {
    '--bg': '#fbf3e6',
    '--bg2': '#eef2ff',
    '--text': '#24160f',
    '--text2': '#4b2a20',
    '--accent': '#7c3aed',
    '--accent2': '#f59e0b',
    '--accent3': '#22c55e',
    '--border': 'rgba(124, 58, 237, 0.35)',
    '--card': 'rgba(255, 255, 255, 0.62)',
    '--font-main': "'Caveat', cursive",
    '--font-display': "'Permanent Marker', cursive",
  },
  emailSelectionInModal: true,
  Layout: YouDontKnowHowToReadLayout,
}

