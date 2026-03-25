import PrincessLayout from '../layouts/PrincessLayout'

export default {
  id: 'princess',
  label: 'princess',
  emoji: '👑',
  description: 'Royal scrolls. Sparkle included.',
  fonts: ['Cormorant+Garamond:ital,wght@0,500;0,700;1,400', 'Great+Vibes'],
  cssVars: {
    '--bg': '#fff5f8',
    '--bg2': '#ffe4ec',
    '--text': '#4a1942',
    '--text2': '#9d5c8f',
    '--accent': '#e91e8c',
    '--accent2': '#b8860b',
    '--accent3': '#fce4ec',
    '--border': '#f8bbd9',
    '--card': '#ffffff',
    '--font-main': "'Cormorant Garamond', serif",
    '--font-display': "'Great Vibes', cursive",
  },
  Layout: PrincessLayout,
}
