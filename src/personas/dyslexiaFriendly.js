import DyslexiaFriendlyLayout from '../layouts/DyslexiaFriendlyLayout'

export default {
  id: 'dyslexiaFriendly',
  label: 'Dyslexia-friendly reading mode',
  emoji: '📖',
  description: 'Lexend rhythm, breathing room, gentle contrast.',
  fonts: ['Lexend:wght@400;500;600;700'],
  cssVars: {
    '--bg': '#faf8f3',
    '--bg2': '#f0ebe3',
    '--text': '#1c1917',
    '--text2': '#57534e',
    '--accent': '#0d9488',
    '--accent2': '#b45309',
    '--border': '#d6d3d1',
    '--card': '#ffffff',
    '--font-main': "'Lexend', sans-serif",
    '--font-display': "'Lexend', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: DyslexiaFriendlyLayout,
}
