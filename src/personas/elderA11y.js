import ElderA11yLayout from '../layouts/ElderA11yLayout'

export default {
  id: 'elderA11y',
  label: 'Elder accessibility mode',
  emoji: '🔊',
  description: 'Big type, clear taps, nothing hiding in fine print.',
  fonts: ['Atkinson+Hyperlegible:wght@400;700'],
  cssVars: {
    '--bg': '#ffffff',
    '--bg2': '#f3f4f6',
    '--text': '#111827',
    '--text2': '#374151',
    '--accent': '#1d4ed8',
    '--accent2': '#b91c1c',
    '--border': '#000000',
    '--card': '#ffffff',
    '--font-main': "'Atkinson Hyperlegible', sans-serif",
    '--font-display': "'Atkinson Hyperlegible', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: ElderA11yLayout,
}
