import PlumberLayout from '../layouts/PlumberLayout'
const plumber = {
  id: 'plumber', label: 'Master Plumber', emoji: '🔧',
  description: "Your pipes have messages. Don't ignore the pressure.",
  fonts: ['Black+Ops+One', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#0f1a1f', '--bg2': '#162028', '--text': '#00d4ff', '--text2': '#88c0d0',
    '--accent': '#ff6b00', '--accent2': '#00d4ff', '--accent3': '#4caf50',
    '--border': '#1e4050', '--card': '#162028',
    '--font-main': "'Share Tech Mono', monospace", '--font-display': "'Black Ops One', cursive",
  }, Layout: PlumberLayout,
}
export default plumber
