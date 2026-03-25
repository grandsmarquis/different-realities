import PunkLayout from '../layouts/PunkLayout'

const punk = {
  id: 'punk',
  label: 'Punk',
  emoji: '🤘',
  description: 'Flyers, studs, and inbox riot.',
  fonts: ['Rubik+Glitch:wght@400', 'Staatliches:wght@400'],
  cssVars: {
    '--bg': '#0c0c0c',
    '--bg2': '#141414',
    '--text': '#f5f5f5',
    '--text2': '#a3a3a3',
    '--accent': '#ff0040',
    '--accent2': '#ffcc00',
    '--accent3': '#1a1a1a',
    '--border': '#2a2a2a',
    '--card': '#121212',
    '--font-main': "'Staatliches', sans-serif",
    '--font-display': "'Rubik Glitch', system-ui, sans-serif",
  },
  Layout: PunkLayout,
}

export default punk
