import TamagotchiLayout from '../layouts/TamagotchiLayout'

const tamagotchi = {
  id: 'tamagotchi',
  label: 'Browsing on a Tamagotchi',
  emoji: '🥚',
  description: 'Pixel pet, 1-bit web, three buttons, infinite charm.',
  fonts: ['Press+Start+2P', 'VT323'],
  cssVars: {
    '--bg': '#1a1528',
    '--bg2': '#2d2640',
    '--text': '#e8f8d8',
    '--text2': '#7cb89a',
    '--accent': '#ff6eb4',
    '--accent2': '#5eead4',
    '--border': '#4a4060',
    '--card': '#0f1a14',
    '--font-main': "'VT323', monospace",
    '--font-display': "'Press Start 2P', monospace",
  },
  emailSelectionInModal: true,
  Layout: TamagotchiLayout,
}

export default tamagotchi
