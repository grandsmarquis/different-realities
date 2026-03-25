import GraffitiLayout from '../layouts/GraffitiLayout'
const graffiti = {
  id: 'graffiti', label: 'Graffiti Artist', emoji: '🎨',
  description: 'The wall is the canvas.',
  fonts: ['Permanent+Marker', 'Russo+One'],
  cssVars: {
    '--bg': '#1a1a1a', '--bg2': '#222222', '--text': '#ffffff', '--text2': '#aaaaaa',
    '--accent': '#ff2d55', '--accent2': '#ffe033', '--accent3': '#00d4ff',
    '--border': '#333333', '--card': '#1e1e1e',
    '--font-main': "'Russo One', sans-serif", '--font-display': "'Permanent Marker', cursive",
  }, Layout: GraffitiLayout,
}
export default graffiti
