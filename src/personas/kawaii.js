import KawaiiLayout from '../layouts/KawaiiLayout'

const kawaii = {
  id: 'kawaii',
  label: 'Kawaii girl',
  emoji: '🎀',
  description: 'Pastel overload · sparkles forever',
  fonts: ['Zen+Maru+Gothic:wght@400;500;700', 'Nunito:wght@400;600;700;800'],
  cssVars: {
    '--bg': '#fff5fb',
    '--bg2': '#ffe8f4',
    '--text': '#5c3d62',
    '--text2': '#a878b0',
    '--accent': '#ff6eb4',
    '--accent2': '#b388ff',
    '--accent3': '#7fdbda',
    '--accent4': '#fff59d',
    '--border': '#ffcce0',
    '--card': '#ffffff',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Zen Maru Gothic', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: KawaiiLayout,
}

export default kawaii
