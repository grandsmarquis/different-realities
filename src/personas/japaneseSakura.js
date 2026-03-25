import JapaneseSakuraLayout from '../layouts/JapaneseSakuraLayout'

const japaneseSakura = {
  id: 'japaneseSakura',
  label: 'Japanese Sakura Style',
  emoji: '🌸',
  description: 'Pastel hanami, soft petals, paper-light scroll.',
  fonts: ['Shippori+Mincho', 'Zen+Kaku+Gothic+New'],
  cssVars: {
    '--bg': '#fdf8fa',
    '--bg2': '#f5efff',
    '--text': '#5c5160',
    '--text2': '#9b8aa8',
    '--accent': '#f5b8c8',
    '--accent2': '#c4b5f5',
    '--accent3': '#e8f6f1',
    '--border': '#ead9ea',
    '--card': '#fffcfe',
    '--font-main': "'Zen Kaku Gothic New', sans-serif",
    '--font-display': "'Shippori Mincho', serif",
  },
  Layout: JapaneseSakuraLayout,
}

export default japaneseSakura
