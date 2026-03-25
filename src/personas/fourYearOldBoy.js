import FourYearOldBoyLayout from '../layouts/FourYearOldBoyLayout'

const fourYearOldBoy = {
  id: 'fourYearOldBoy',
  label: '4-Year-Old Boy',
  emoji: '🦖',
  description: 'Playroom HQ: trains, block towers, and super important letters',
  fonts: ['Fredoka:wght@400;600;700', 'Baloo+2:wght@400;600;800'],
  cssVars: {
    '--bg': '#9fd3ff',
    '--bg2': '#fff9e6',
    '--text': '#2d3436',
    '--text2': '#636e72',
    '--accent': '#e17055',
    '--accent2': '#00b894',
    '--accent3': '#fdcb6e',
    '--border': '#0984e3',
    '--card': '#ffffff',
    '--font-main': "'Fredoka', sans-serif",
    '--font-display': "'Baloo 2', cursive",
  },
  emailSelectionInModal: true,
  Layout: FourYearOldBoyLayout,
}

export default fourYearOldBoy
