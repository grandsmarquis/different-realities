import PixelArtLayout from '../layouts/PixelArtLayout'

export default {
  id: 'pixelArt',
  label: 'Pixel art',
  emoji: '👾',
  description: 'Game Boy greens, chunky borders, blocky charts, CRT flicker.',
  fonts: ['Press+Start+2P'],
  cssVars: {
    '--bg': '#0f380f',
    '--bg2': '#1a4d1a',
    '--text': '#9bbc0f',
    '--text2': '#8bac0f',
    '--accent': '#ffd700',
    '--accent2': '#306230',
    '--border': '#306230',
    '--card': '#0f380f',
    '--font-main': "'Press Start 2P', monospace",
    '--font-display': "'Press Start 2P', monospace",
  },
  emailSelectionInModal: true,
  Layout: PixelArtLayout,
}
