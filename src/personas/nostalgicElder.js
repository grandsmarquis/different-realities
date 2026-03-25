import NostalgicElderLayout from '../layouts/NostalgicElderLayout'

export default {
  id: 'nostalgicElder',
  label: 'Nostalgic elder remembering the past',
  emoji: '📻',
  description: 'Sepia tones, slower days, stories between the lines.',
  fonts: ['Libre+Baskerville:ital,wght@0,400;0,700;1,400', 'Playfair+Display:ital,wght@0,500;1,500'],
  cssVars: {
    '--bg': '#3d3428',
    '--bg2': '#2c241c',
    '--text': '#f5ebe0',
    '--text2': '#c9b896',
    '--accent': '#c9a227',
    '--accent2': '#8b6914',
    '--border': '#6b5344',
    '--card': '#e8dcc8',
    '--font-main': "'Libre Baskerville', serif",
    '--font-display': "'Playfair Display', serif",
  },
  emailSelectionInModal: true,
  Layout: NostalgicElderLayout,
}
