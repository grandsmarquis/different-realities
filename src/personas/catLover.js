import CatLoverLayout from '../layouts/CatLoverLayout'

export default {
  id: 'catLover',
  label: 'Cat lover',
  emoji: '🐈',
  description: 'Yarn, keyboard sits, window weather, and sparkly tickers.',
  fonts: ['Patrick+Hand', 'Quicksand:wght@400;600'],
  cssVars: {
    '--bg': '#fdf2f8',
    '--bg2': '#faf5ff',
    '--text': '#5b21b6',
    '--text2': '#7c3aed',
    '--accent': '#db2777',
    '--accent2': '#a855f7',
    '--accent3': '#fce7f3',
    '--border': 'rgba(168, 85, 247, 0.3)',
    '--card': '#ffffff',
    '--font-main': "'Quicksand', sans-serif",
    '--font-display': "'Patrick Hand', cursive",
  },
  Layout: CatLoverLayout,
}
