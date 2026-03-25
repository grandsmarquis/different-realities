import AllCapsLayout from '../layouts/AllCapsLayout'

const allCaps = {
  id: 'allCaps',
  label: 'Caps Lock Champion',
  emoji: '🔠',
  description: 'THEY ONLY TYPE IN ALL CAPS. NO WHISPER MODE.',
  fonts: ['Bungee', 'Anton'],
  cssVars: {
    '--bg': '#0f0120',
    '--bg2': '#1a0538',
    '--text': '#f8f4ff',
    '--text2': '#b8a8d8',
    '--accent': '#ff00aa',
    '--accent2': '#00f5ff',
    '--accent3': '#ffe600',
    '--border': '#ff00aa55',
    '--card': '#1a0a28cc',
    '--font-main': "'Anton', sans-serif",
    '--font-display': "'Bungee', cursive",
  },
  emailSelectionInModal: true,
  Layout: AllCapsLayout,
}

export default allCaps
