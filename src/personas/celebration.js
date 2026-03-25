import CelebrationLayout from '../layouts/CelebrationLayout'

export default {
  id: 'celebration',
  label: 'Celebration / confetti mode',
  emoji: '🎉',
  description: 'Every message is a party. Confetti tax included.',
  fonts: ['Fredoka:wght@400;600;700'],
  cssVars: {
    '--bg': '#4c1d95',
    '--bg2': '#5b21b6',
    '--text': '#fef3c7',
    '--text2': '#fde68a',
    '--accent': '#f472b6',
    '--accent2': '#38bdf8',
    '--border': '#a78bfa',
    '--card': '#faf5ff',
    '--font-main': "'Fredoka', sans-serif",
    '--font-display': "'Fredoka', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: CelebrationLayout,
}
