import FlowerLoverLayout from '../layouts/FlowerLoverLayout'

const flowerLover = {
  id: 'flowerLover',
  label: 'Flower Lover',
  emoji: '🌷',
  description: 'Pink greenhouse, petals everywhere, bouquet inbox.',
  fonts: ['Fraunces', 'Nunito'],
  cssVars: {
    '--bg': '#1a0f18',
    '--bg2': '#2d1528',
    '--text': '#fdf2f8',
    '--text2': '#f9a8d4',
    '--accent': '#fb7185',
    '--accent2': '#f472b6',
    '--accent3': '#4a1942',
    '--border': '#831843',
    '--card': '#25101f',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Fraunces', serif",
  },
  Layout: FlowerLoverLayout,
}

export default flowerLover
