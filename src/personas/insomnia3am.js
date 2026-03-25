import Insomnia3amLayout from '../layouts/Insomnia3amLayout'

export default {
  id: 'insomnia3am',
  label: '3 AM insomnia scrolling',
  emoji: '🌙',
  description: 'Blue light guilt. One more inbox. The void hums.',
  fonts: ['Spline+Sans:wght@400;500;600'],
  cssVars: {
    '--bg': '#0c1222',
    '--bg2': '#151d32',
    '--text': '#fde68a',
    '--text2': '#a5b4fc',
    '--accent': '#fbbf24',
    '--accent2': '#818cf8',
    '--border': '#2e3a5c',
    '--card': '#1e293b',
    '--font-main': "'Spline Sans', sans-serif",
    '--font-display': "'Spline Sans', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: Insomnia3amLayout,
}
