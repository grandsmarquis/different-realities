import MagicianLayout from '../layouts/MagicianLayout'
const magician = {
  id: 'magician', label: 'Grand Illusionist', emoji: '🎩',
  description: 'Nothing is real. Your emails least of all.',
  fonts: ['Cinzel+Decorative:wght@400;700;900', 'Cormorant+Garamond:ital,wght@0,400;1,400;1,700'],
  cssVars: {
    '--bg': '#08000f', '--bg2': '#100018', '--text': '#e8d5ff', '--text2': '#b388ff',
    '--accent': '#9c27b0', '--accent2': '#ffd700', '--accent3': '#00e5ff',
    '--border': '#3d0060', '--card': '#12001e',
    '--font-main': "'Cormorant Garamond', serif", '--font-display': "'Cinzel Decorative', serif",
  }, Layout: MagicianLayout,
}
export default magician
