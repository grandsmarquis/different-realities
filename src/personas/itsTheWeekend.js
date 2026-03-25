import ItsTheWeekendLayout from '../layouts/ItsTheWeekendLayout'

export default {
  id: 'itsTheWeekend',
  label: "It's the weekend",
  emoji: '🎉',
  description: 'Sunset gradients, confetti, OOO banner, tilted cards.',
  fonts: ['Fredoka:wght@400;600;700', 'Bungee'],
  cssVars: {
    '--bg': '#fef08a',
    '--bg2': '#fda4af',
    '--text': '#1e1b4b',
    '--text2': '#4c1d95',
    '--accent': '#db2777',
    '--accent2': '#ea580c',
    '--border': '#f472b6',
    '--card': '#ffffff',
    '--font-main': "'Fredoka', sans-serif",
    '--font-display': "'Bungee', cursive",
  },
  emailSelectionInModal: true,
  Layout: ItsTheWeekendLayout,
}
