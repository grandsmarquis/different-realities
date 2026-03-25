import PixelArtLayout from '../layouts/PixelArtLayout'

export default {
  id: 'pixelArt',
  label: 'Pixel art',
  emoji: '👾',
  description: '16-bit desktop fantasy: marquee news, hopping slime, LCD weather, treasure stocks.',
  fonts: ['Press+Start+2P', 'VT323'],
  cssVars: {
    '--bg': '#0f380f',
    '--bg2': '#1a4d1a',
    '--text': '#9bbc0f',
    '--text2': '#8bac0f',
    '--accent': '#ffd700',
    '--accent2': '#306230',
    '--border': '#306230',
    '--card': '#0f380f',
    '--font-main': "'VT323', monospace",
    '--font-display': "'Press Start 2P', monospace",
  },
  emailSelectionInModal: true,
  Layout: PixelArtLayout,
}
