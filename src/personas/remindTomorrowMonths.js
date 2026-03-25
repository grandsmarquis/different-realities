import RemindTomorrowMonthsLayout from '../layouts/RemindTomorrowMonthsLayout'

export default {
  id: 'remindTomorrowMonths',
  label: 'Clicking "remind me tomorrow" for 3 months',
  emoji: '📅',
  description: 'Ninety layers of “tomorrow.” The snooze button owes you rent.',
  fonts: ['Indie+Flower', 'Quicksand:wght@400;500;600'],
  cssVars: {
    '--bg': '#fef9c3',
    '--bg2': '#fef08a',
    '--text': '#422006',
    '--text2': '#854d0e',
    '--accent': '#ea580c',
    '--accent2': '#c2410c',
    '--border': '#fbbf24',
    '--card': '#fffbeb',
    '--font-main': "'Quicksand', sans-serif",
    '--font-display': "'Indie Flower', cursive",
  },
  emailSelectionInModal: true,
  Layout: RemindTomorrowMonthsLayout,
}
