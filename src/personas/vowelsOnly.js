import VowelsOnlyLayout from '../layouts/VowelsOnlyLayout'

export default {
  id: 'vowelsOnly',
  label: 'Vowel-only vision',
  emoji: '👁️',
  description: 'Consonants vanish. Inbox, weather, news & stocks — only A, E, I, O, U (and friends) make it through.',
  fonts: ['Chewy:wght@400', 'Nunito:wght@400;600;700;800'],
  cssVars: {
    '--bg': '#1e0a3a',
    '--bg2': '#312e81',
    '--text': '#f5f3ff',
    '--text2': '#e9d5ff',
    '--accent': '#f472b6',
    '--accent2': '#a78bfa',
    '--accent3': '#38bdf8',
    '--border': 'rgba(167, 139, 250, 0.4)',
    '--card': 'rgba(49, 46, 129, 0.75)',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Chewy', cursive",
  },
  emailSelectionInModal: true,
  Layout: VowelsOnlyLayout,
}
