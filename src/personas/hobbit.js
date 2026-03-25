import HobbitLayout from '../layouts/HobbitLayout'

export default {
  id: 'hobbit',
  label: 'hobbit',
  emoji: '🫖',
  description: 'Letters by the round door.',
  fonts: ['Libre+Baskerville:ital,wght@0,400;0,700;1,400', 'Alegreya+Sans:wght@500;700'],
  cssVars: {
    '--bg': '#558b2f',
    '--bg2': '#33691e',
    '--text': '#1b3d0a',
    '--text2': '#2e4a18',
    '--accent': '#7cb342',
    '--accent2': '#3e2723',
    '--accent3': '#c5e1a5',
    '--border': '#689f38',
    '--card': '#fff8e7',
    '--font-main': "'Alegreya Sans', sans-serif",
    '--font-display': "'Libre Baskerville', serif",
  },
  Layout: HobbitLayout,
}
