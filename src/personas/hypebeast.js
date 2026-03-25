import HypebeastLayout from '../layouts/HypebeastLayout'

const hypebeast = {
  id: 'hypebeast',
  label: 'Streetwear Hypebeast',
  emoji: '👟',
  description: 'Limited drop: your unread count.',
  fonts: ['Archivo+Black', 'Oswald'],
  cssVars: {
    '--bg': '#0a0a0a',
    '--bg2': '#141414',
    '--text': '#ffffff',
    '--text2': '#888888',
    '--accent': '#ff3b30',
    '--accent2': '#ffcc00',
    '--accent3': '#34c759',
    '--border': '#333333',
    '--card': '#111111',
    '--font-main': "'Oswald', sans-serif",
    '--font-display': "'Archivo Black', sans-serif",
  },
  Layout: HypebeastLayout,
}

export default hypebeast
