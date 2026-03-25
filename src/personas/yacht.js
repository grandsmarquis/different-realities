import YachtLayout from '../layouts/YachtLayout'

const yacht = {
  id: 'yacht',
  label: 'Luxury Yacht Broker',
  emoji: '🛥️',
  description: 'Your portfolio of messages, darling.',
  fonts: ['Cinzel', 'Cormorant+Garamond'],
  cssVars: {
    '--bg': '#061018',
    '--bg2': '#0c1a24',
    '--text': '#e8f4fc',
    '--text2': '#7a9aad',
    '--accent': '#c9a962',
    '--accent2': '#f0e6d2',
    '--accent3': '#1e4d6b',
    '--border': '#1a3a4a',
    '--card': '#0a1520',
    '--font-main': "'Cormorant Garamond', serif",
    '--font-display': "'Cinzel', serif",
  },
  Layout: YachtLayout,
}

export default yacht
