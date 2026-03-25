import BonsaiLayout from '../layouts/BonsaiLayout'
const bonsai = {
  id: 'bonsai', label: 'Bonsai Master', emoji: '🌿',
  description: 'Shape. Wait. Shape again.',
  fonts: ['Noto+Serif+JP:wght@300;400', 'Josefin+Sans:wght@300;400;600'],
  cssVars: {
    '--bg': '#f0f4ea', '--bg2': '#e4ecda', '--text': '#1a2a10', '--text2': '#5a7040',
    '--accent': '#3d6b2a', '--accent2': '#8b6020', '--accent3': '#c87030',
    '--border': '#b8cca0', '--card': '#f8faf4',
    '--font-main': "'Josefin Sans', sans-serif", '--font-display': "'Noto Serif JP', serif",
  }, Layout: BonsaiLayout,
}
export default bonsai
