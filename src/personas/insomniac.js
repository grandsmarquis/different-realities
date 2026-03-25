import InsomniacLayout from '../layouts/InsomniacLayout'

export default {
  id: 'insomniac',
  label: 'Insomniac',
  emoji: '🥱',
  description: 'Sheep, scrolling, and the cruel glow of “just one more check.”',
  fonts: ['Bungee', 'Quicksand:wght@400;600;700'],
  cssVars: {
    '--bg': '#12081f',
    '--bg2': '#1c0f2e',
    '--text': '#f5e6ff',
    '--text2': '#c4b5fd',
    '--accent': '#34d399',
    '--accent2': '#f472b6',
    '--accent3': '#fde047',
    '--border': '#4c1d95',
    '--card': '#2e1064',
    '--font-main': "'Quicksand', sans-serif",
    '--font-display': "'Bungee', cursive",
  },
  emailSelectionInModal: true,
  Layout: InsomniacLayout,
}
