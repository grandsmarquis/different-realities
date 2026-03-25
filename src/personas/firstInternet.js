import FirstInternetLayout from '../layouts/FirstInternetLayout'

export default {
  id: 'firstInternet',
  label: 'First day using the internet',
  emoji: '🌐',
  description: 'Under construction. Visitor count. So many buttons.',
  fonts: ['Comic+Neue:wght@400;700', 'Press+Start+2P'],
  cssVars: {
    '--bg': '#000080',
    '--bg2': '#000060',
    '--text': '#ffff00',
    '--text2': '#00ffff',
    '--accent': '#ff00ff',
    '--accent2': '#00ff00',
    '--border': '#ffffff',
    '--card': '#c0c0c0',
    '--font-main': "'Comic Neue', sans-serif",
    '--font-display': "'Press Start 2P', monospace",
  },
  emailSelectionInModal: true,
  Layout: FirstInternetLayout,
}
