import RussianPatriotLayout from '../layouts/RussianPatriotLayout'

const russianPatriot = {
  id: 'russianPatriot',
  label: 'Russian Patriot',
  emoji: '🇷🇺',
  description: 'Glory, tricolor, and inbox with bear-level confidence.',
  fonts: ['Russo+One', 'PT+Serif:wght@400;700'],
  cssVars: {
    '--bg': '#0d1b2a',
    '--bg2': '#1a237e',
    '--text': '#fff8e7',
    '--text2': '#b8c5e0',
    '--accent': '#d32f2f',
    '--accent2': '#ffc107',
    '--border': '#3949ab',
    '--card': '#fafafa',
    '--font-main': "'PT Serif', serif",
    '--font-display': "'Russo One', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: RussianPatriotLayout,
}

export default russianPatriot
