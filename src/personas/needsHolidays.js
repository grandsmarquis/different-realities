import NeedsHolidaysLayout from '../layouts/NeedsHolidaysLayout'

export default {
  id: 'needsHolidays',
  label: 'Desperately needs holidays',
  emoji: '🏖️',
  description: 'Sun, sand, departure boards, and inbox-as-luggage-tags — your brain is already at the gate.',
  fonts: ['Pacifico', 'Nunito:wght@400;600;700;800'],
  cssVars: {
    '--bg': '#e0f7fa',
    '--bg2': '#fff8e7',
    '--text': '#0c4a6e',
    '--text2': '#0369a1',
    '--accent': '#f97316',
    '--accent2': '#0ea5e9',
    '--border': '#bae6fd',
    '--card': '#ffffff',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Pacifico', cursive",
  },
  emailSelectionInModal: true,
  Layout: NeedsHolidaysLayout,
}
