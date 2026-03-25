import TattooLayout from '../layouts/TattooLayout'

const tattoo = {
  id: 'tattoo',
  label: 'Tattoo Studio Artist',
  emoji: '🖋️',
  description: 'Flash wall · stencil mail · neon after-hours studio.',
  fonts: ['Permanent+Marker', 'Syne:wght@400;600;700;800'],
  cssVars: {
    '--bg': '#030306',
    '--bg2': '#0c0e14',
    '--text': '#f1f5f9',
    '--text2': '#64748b',
    '--accent': '#a855f7',
    '--accent2': '#22d3ee',
    '--accent3': '#f472b6',
    '--border': '#1e293b',
    '--card': '#0f1118',
    '--font-main': "'Syne', sans-serif",
    '--font-display': "'Permanent Marker', cursive",
  },
  emailSelectionInModal: true,
  Layout: TattooLayout,
}

export default tattoo
