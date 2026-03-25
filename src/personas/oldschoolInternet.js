import OldschoolInternetLayout from '../layouts/OldschoolInternetLayout'

export default {
  id: 'oldschoolInternet',
  label: 'Oldschool internet',
  emoji: '📡',
  description: 'GeoCities energy: marquees, neon borders, visitor counter.',
  fonts: ['VT323', 'Permanent+Marker'],
  cssVars: {
    '--bg': '#050508',
    '--bg2': '#111122',
    '--text': '#00ffcc',
    '--text2': '#ff99ff',
    '--accent': '#ff00aa',
    '--accent2': '#00ffff',
    '--border': '#ffff00',
    '--card': '#000033',
    '--font-main': "'VT323', monospace",
    '--font-display': "'Permanent Marker', cursive",
  },
  emailSelectionInModal: true,
  Layout: OldschoolInternetLayout,
}
