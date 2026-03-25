import SumoLayout from '../layouts/SumoLayout'
const sumo = {
  id: 'sumo', label: 'Sumo Announcer', emoji: '🏆',
  description: '東！参ります！',
  fonts: ['Noto+Serif+JP:wght@700;900', 'Shippori+Mincho+B1:wght@400;700;800'],
  cssVars: {
    '--bg': '#faf5e4', '--bg2': '#f0e8cc', '--text': '#0a0000', '--text2': '#5a3030',
    '--accent': '#cc0000', '--accent2': '#0a0050', '--accent3': '#8b6a00',
    '--border': '#d0b080', '--card': '#ffffff',
    '--font-main': "'Noto Serif JP', serif", '--font-display': "'Noto Serif JP', serif",
  }, Layout: SumoLayout,
}
export default sumo
