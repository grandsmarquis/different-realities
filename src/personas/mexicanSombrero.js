import MexicanSombreroLayout from '../layouts/MexicanSombreroLayout'

export default {
  id: 'mexicanSombrero',
  label: 'Mexican sombrero',
  emoji: '🌮',
  description: 'Fiesta inbox around the sombrero — papel picado, charts, noticias.',
  fonts: ['Passion+One', 'Quicksand:wght@400;600'],
  cssVars: {
    '--bg': '#0f172a',
    '--bg2': '#14532d',
    '--text': '#fef3c7',
    '--text2': '#fde68a',
    '--accent': '#facc15',
    '--accent2': '#f97316',
    '--accent3': '#166534',
    '--border': 'rgba(250, 204, 21, 0.35)',
    '--card': 'rgba(15, 23, 42, 0.92)',
    '--font-main': "'Quicksand', sans-serif",
    '--font-display': "'Passion One', cursive",
  },
  emailSelectionInModal: true,
  Layout: MexicanSombreroLayout,
}
