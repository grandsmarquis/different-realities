import MedievalLayout from '../layouts/MedievalLayout'
const medieval = {
  id: 'medieval', label: 'Middle Ages', emoji: '🏰',
  description: 'Illuminated manuscript inbox, candlelight, and town-crier news.',
  fonts: ['UnifrakturMaguntia', 'IM+Fell+English:ital@0;1'],
  cssVars: {
    '--bg': '#f4e4b0', '--bg2': '#eddfa0', '--text': '#2c1008', '--text2': '#6b3818',
    '--accent': '#8b1a1a', '--accent2': '#c87941', '--accent3': '#2c6b2a',
    '--border': '#c8a060', '--card': '#faf0d0',
    '--font-main': "'IM Fell English', serif", '--font-display': "'UnifrakturMaguntia', cursive",
  }, Layout: MedievalLayout,
}
export default medieval
