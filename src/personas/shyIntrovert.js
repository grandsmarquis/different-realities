import ShyIntrovertLayout from '../layouts/ShyIntrovertLayout'

export default {
  id: 'shyIntrovert',
  label: 'Shy introvert',
  emoji: '🫥',
  description: 'Quiet corner. Soft light. No sudden movements.',
  fonts: ['Quicksand:wght@400;500;600'],
  cssVars: {
    '--bg': '#1a1625',
    '--bg2': '#252036',
    '--text': '#e8e4f0',
    '--text2': '#9b8fb8',
    '--accent': '#c4b5fd',
    '--accent2': '#a78bfa',
    '--border': '#3d3558',
    '--card': '#2d2640',
    '--font-main': "'Quicksand', sans-serif",
    '--font-display': "'Quicksand', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: ShyIntrovertLayout,
}
