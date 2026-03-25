import TeenagerLayout from '../layouts/TeenagerLayout'

const teenager = {
  id: 'teenager',
  label: 'Teenager',
  emoji: '🎮',
  description: 'Dark, loud, chaotic energy',
  fonts: ['Bebas+Neue', 'Rajdhani:wght@400;600;700'],
  cssVars: {
    '--bg': '#0a0a0f',
    '--bg2': '#12121a',
    '--text': '#e0e0ff',
    '--text2': '#8888bb',
    '--accent': '#00ff88',
    '--accent2': '#ff00cc',
    '--border': '#2a2a3a',
    '--card': '#16161f',
    '--font-main': "'Rajdhani', sans-serif",
    '--font-display': "'Bebas Neue', cursive",
  },
  Layout: TeenagerLayout,
}

export default teenager
