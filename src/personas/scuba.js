import ScubaLayout from '../layouts/ScubaLayout'

const scuba = {
  id: 'scuba',
  label: 'Scuba Diving Instructor',
  emoji: '🤿',
  description: 'Surface interval = inbox time.',
  fonts: ['Outfit', 'Rubik'],
  cssVars: {
    '--bg': '#032a3a',
    '--bg2': '#054060',
    '--text': '#e0f7ff',
    '--text2': '#7ec8e3',
    '--accent': '#ff9f1c',
    '--accent2': '#00b4d8',
    '--accent3': '#023e8a',
    '--border': '#126782',
    '--card': '#023047',
    '--font-main': "'Rubik', sans-serif",
    '--font-display': "'Outfit', sans-serif",
  },
  Layout: ScubaLayout,
}

export default scuba
