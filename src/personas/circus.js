import CircusLayout from '../layouts/CircusLayout'
const circus = {
  id: 'circus', label: 'Circus Ringmaster', emoji: '🎪',
  description: 'Ladies and gentlemen, your inbox!',
  fonts: ['Lilita+One', 'Abril+Fatface'],
  cssVars: {
    '--bg': '#0f0505', '--bg2': '#1a0808', '--text': '#ffd700', '--text2': '#cc9900',
    '--accent': '#cc0000', '--accent2': '#ffd700', '--accent3': '#ffffff',
    '--border': '#5c2020', '--card': '#180808',
    '--font-main': "'Abril Fatface', serif", '--font-display': "'Lilita One', cursive",
  }, Layout: CircusLayout,
}
export default circus
