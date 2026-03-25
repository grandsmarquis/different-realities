import ConspiracyTheoristLayout from '../layouts/ConspiracyTheoristLayout'

const conspiracy = {
  id: 'conspiracy',
  label: 'Conspiracy Theorist',
  emoji: '🕵️',
  description: 'They don\'t want you to know.',
  fonts: ['Special+Elite', 'Courier+Prime:ital,wght@0,400;0,700;1,400'],
  cssVars: {
    '--bg': '#1a1408',
    '--bg2': '#2a1f0e',
    '--text': '#e8d5a3',
    '--text2': '#a8924a',
    '--accent': '#cc0000',
    '--accent2': '#ff6600',
    '--border': '#5c4a1e',
    '--card': '#f5e8c0',
    '--font-main': "'Courier Prime', monospace",
    '--font-display': "'Special Elite', cursive",
  },
  emailSelectionInModal: true,
  Layout: ConspiracyTheoristLayout,
}

export default conspiracy
