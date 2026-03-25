import DubaiEmirateLayout from '../layouts/DubaiEmirateLayout'

const dubaiEmirate = {
  id: 'dubaiEmirate',
  label: 'Dubai Emirate',
  emoji: '🏙️',
  description: 'Champagne noir, gilt frames, inbox majlis.',
  fonts: ['Cinzel', 'Noto+Sans+Arabic'],
  cssVars: {
    '--bg': '#060504',
    '--bg2': '#120f0a',
    '--text': '#fffef7',
    '--text2': '#d8c9a4',
    '--accent': '#e8c547',
    '--accent2': '#f5e6a8',
    '--accent3': '#2a2212',
    '--border': '#6b5a32',
    '--card': '#0e0c07',
    '--font-main': "'Cinzel', 'Noto Sans Arabic', serif",
    '--font-display': "'Cinzel', serif",
  },
  Layout: DubaiEmirateLayout,
}

export default dubaiEmirate
