import YouAreDrunkLayout from '../layouts/YouAreDrunkLayout'

export default {
  id: 'youAreDrunk',
  label: 'You are drunk',
  emoji: '🍺',
  description: 'Wobbly UI, double-vision glow, spinning pint, neon blur.',
  fonts: ['Shrikhand', 'Comfortaa:wght@400;700'],
  cssVars: {
    '--bg': '#4c1d95',
    '--bg2': '#581c87',
    '--text': '#faf5ff',
    '--text2': '#e9d5ff',
    '--accent': '#f472b6',
    '--accent2': '#22d3ee',
    '--border': '#a78bfa',
    '--card': '#2e1065',
    '--font-main': "'Comfortaa', sans-serif",
    '--font-display': "'Shrikhand', cursive",
  },
  emailSelectionInModal: true,
  Layout: YouAreDrunkLayout,
}
