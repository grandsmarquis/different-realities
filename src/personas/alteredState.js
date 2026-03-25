import AlteredStateLayout from '../layouts/AlteredStateLayout'

const alteredState = {
  id: 'alteredState',
  label: 'Altered state',
  emoji: '🌀',
  description: 'Nothing lines up. Double vision, slow drift.',
  fonts: ['Syne+Mono:wght@400;600', 'Syne:wght@400;600'],
  cssVars: {
    '--bg': '#08060a',
    '--bg2': '#100818',
    '--text': '#e8e0f0',
    '--text2': '#7c6b8a',
    '--accent': '#c084fc',
    '--accent2': '#22d3ee',
    '--accent3': '#1e1030',
    '--border': '#2d2640',
    '--card': '#120c1c',
    '--font-main': "'Syne Mono', monospace",
    '--font-display': "'Syne', sans-serif",
  },
  Layout: AlteredStateLayout,
}

export default alteredState
