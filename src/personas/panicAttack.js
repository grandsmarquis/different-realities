import PanicAttackLayout from '../layouts/PanicAttackLayout'

export default {
  id: 'panicAttack',
  label: 'Mid-panic grounding mode',
  emoji: '🫀',
  description: 'Wobbly UI, square breathing, and your inbox — nothing here can hurt you.',
  fonts: ['Sniglet:wght@400;800', 'Nunito:wght@400;600;700'],
  cssVars: {
    '--bg': '#141022',
    '--bg2': '#1f1833',
    '--text': '#faf5ff',
    '--text2': '#c4b5fd',
    '--accent': '#f472b6',
    '--accent2': '#a78bfa',
    '--border': '#3b2f55',
    '--card': '#251d3a',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Sniglet', cursive",
  },
  emailSelectionInModal: true,
  Layout: PanicAttackLayout,
}
