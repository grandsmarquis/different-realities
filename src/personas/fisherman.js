import FishermanLayout from '../layouts/FishermanLayout'
const fisherman = {
  id: 'fisherman', label: 'Old Fisherman', emoji: '🎣',
  description: "Patience, patience. The inbox bites when it's ready.",
  fonts: ['Rye', 'Libre+Baskerville:ital,wght@0,400;0,700;1,400'],
  cssVars: {
    '--bg': '#0a1628', '--bg2': '#0d1e35', '--text': '#c8e6f0', '--text2': '#7ab8d0',
    '--accent': '#e8a040', '--accent2': '#4a9ebb', '--accent3': '#c0392b',
    '--border': '#1e3a52', '--card': '#0f2035',
    '--font-main': "'Libre Baskerville', serif", '--font-display': "'Rye', cursive",
  }, Layout: FishermanLayout,
}
export default fisherman
