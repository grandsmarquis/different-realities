import DominatrixLayout from '../layouts/DominatrixLayout'

export default {
  id: 'dominatrix',
  label: 'Dominatrix',
  emoji: '⛓️',
  description: 'Velvet protocol desk — weather, markets, and press on your terms.',
  fonts: ['Cinzel:wght@500;700', 'Cormorant+Garamond:ital,wght@0,400;0,600;1,400'],
  cssVars: {
    '--bg': '#0a0508',
    '--bg2': '#1a0a12',
    '--text': '#f5e6e8',
    '--text2': '#c4a8b0',
    '--accent': '#e11d48',
    '--accent2': '#9ca3af',
    '--accent3': '#2d0a14',
    '--border': 'rgba(156, 163, 175, 0.25)',
    '--card': '#140810',
    '--font-main': "'Cormorant Garamond', serif",
    '--font-display': "'Cinzel', serif",
  },
  Layout: DominatrixLayout,
}
