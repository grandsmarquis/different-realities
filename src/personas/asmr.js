import AsmrLayout from '../layouts/AsmrLayout'

const asmr = {
  id: 'asmr',
  label: 'ASMR Whisper Creator',
  emoji: '🎙️',
  description: 'Soft-spoken notifications only.',
  fonts: ['Comfortaa', 'Quicksand'],
  cssVars: {
    '--bg': '#1a1528',
    '--bg2': '#252038',
    '--text': '#f0e8ff',
    '--text2': '#b8a8d8',
    '--accent': '#e8b4f8',
    '--accent2': '#9b7ed9',
    '--accent3': '#4a3a6a',
    '--border': '#4a4060',
    '--card': '#221c32',
    '--font-main': "'Quicksand', sans-serif",
    '--font-display': "'Comfortaa', sans-serif",
  },
  Layout: AsmrLayout,
}

export default asmr
