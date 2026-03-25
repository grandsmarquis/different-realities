import VinylLayout from '../layouts/VinylLayout'
const vinyl = {
  id: 'vinyl', label: 'Vinyl Collector', emoji: '🎵',
  description: 'Digitals are for people who gave up.',
  fonts: ['Abril+Fatface', 'Raleway:ital,wght@0,300;0,400;1,300'],
  cssVars: {
    '--bg': '#1a1210', '--bg2': '#221a16', '--text': '#e8d5a8', '--text2': '#9a8060',
    '--accent': '#c87941', '--accent2': '#e8c870', '--accent3': '#7a4a20',
    '--border': '#3a2a1e', '--card': '#201612',
    '--font-main': "'Raleway', sans-serif", '--font-display': "'Abril Fatface', serif",
  }, Layout: VinylLayout,
}
export default vinyl
