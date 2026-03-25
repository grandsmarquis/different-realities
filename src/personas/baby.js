import BabyLayout from '../layouts/BabyLayout'

const baby = {
  id: 'baby',
  label: 'Baby',
  emoji: '👶',
  description: 'Goo goo ga ga (your inbox from the crib)',
  fonts: ['Fredoka:wght@400;600;700', 'Quicksand:wght@400;600;700'],
  cssVars: {
    '--bg': '#e8f4fc',
    '--bg2': '#fce4ec',
    '--text': '#4a6fa5',
    '--text2': '#7b9cc9',
    '--accent': '#ff8fab',
    '--accent2': '#a8e6cf',
    '--border': '#b8d4f0',
    '--card': '#ffffff',
    '--font-main': "'Quicksand', sans-serif",
    '--font-display': "'Fredoka', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: BabyLayout,
}

export default baby
