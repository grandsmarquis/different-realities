import CowboyLayout from '../layouts/CowboyLayout'

export default {
  id: 'cowboy',
  label: 'cowboy',
  emoji: '🤠',
  description: 'Wanted posters & desert telegrams.',
  fonts: ['Rye', 'Courier+Prime:wght@400;700'],
  cssVars: {
    '--bg': '#c9a66b',
    '--bg2': '#a67c52',
    '--text': '#2c1810',
    '--text2': '#5c3d2e',
    '--accent': '#8b4513',
    '--accent2': '#3d2817',
    '--accent3': '#e8d4b8',
    '--border': '#6b4423',
    '--card': '#f4e4c8',
    '--font-main': "'Courier Prime', monospace",
    '--font-display': "'Rye', serif",
  },
  Layout: CowboyLayout,
}
