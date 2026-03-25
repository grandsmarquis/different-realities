import RetroInternetLayout from '../layouts/RetroInternetLayout'

const retro = {
  id: 'retro',
  label: '90s Kid',
  emoji: '💾',
  description: 'You\'ve got mail! AOL 4ever',
  fonts: ['VT323', 'Press+Start+2P'],
  cssVars: {
    '--bg': '#000080',
    '--bg2': '#008080',
    '--text': '#ffffff',
    '--text2': '#ffff00',
    '--accent': '#ff00ff',
    '--accent2': '#00ffff',
    '--border': '#c0c0c0',
    '--card': '#ffffff',
    '--font-main': "'VT323', monospace",
    '--font-display': "'Press Start 2P', monospace",
  },
  Layout: RetroInternetLayout,
}

export default retro
