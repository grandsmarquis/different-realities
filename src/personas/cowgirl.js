import CowgirlLayout from '../layouts/CowgirlLayout'

export default {
  id: 'cowgirl',
  label: 'Cowgirl',
  emoji: '👢',
  description: 'Rodeo tickets, lasso sky, denim-bright mail corral.',
  fonts: ['Sofia+Sans:ital,wght@0,400;0,600;1,400', 'Oswald:wght@500;700'],
  cssVars: {
    '--bg': '#eff6ff',
    '--bg2': '#fce7f3',
    '--text': '#1e3a5f',
    '--text2': '#4c1d95',
    '--accent': '#db2777',
    '--accent2': '#1d4ed8',
    '--accent3': '#fce7f3',
    '--border': 'rgba(29, 78, 216, 0.35)',
    '--card': '#ffffff',
    '--font-main': "'Sofia Sans', sans-serif",
    '--font-display': "'Oswald', sans-serif",
  },
  Layout: CowgirlLayout,
}
