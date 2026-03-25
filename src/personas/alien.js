import AlienLayout from '../layouts/AlienLayout'
const alien = {
  id: 'alien', label: 'Alien Observer', emoji: '👽',
  description: 'TRANSLATION_UNIT_ACTIVE.',
  fonts: ['Audiowide', 'Syncopate:wght@400;700'],
  cssVars: {
    '--bg': '#010d0a', '--bg2': '#020f0c', '--text': '#7fff9e', '--text2': '#3aaa60',
    '--accent': '#00ffcc', '--accent2': '#ff00aa', '--accent3': '#ffcc00',
    '--border': '#0a3020', '--card': '#021510',
    '--font-main': "'Audiowide', sans-serif", '--font-display': "'Syncopate', sans-serif",
  }, Layout: AlienLayout,
}
export default alien
