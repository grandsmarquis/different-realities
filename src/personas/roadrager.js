import RoadragerLayout from '../layouts/RoadragerLayout'

const roadrager = {
  id: 'roadrager',
  label: 'Roadrager',
  emoji: '🚗',
  description: 'Windshield HUD, lane stripes, horn-ready mail.',
  fonts: ['Russo+One', 'Exo+2'],
  cssVars: {
    '--bg': '#0a0a0c',
    '--bg2': '#141418',
    '--text': '#f8fafc',
    '--text2': '#94a3b8',
    '--accent': '#f97316',
    '--accent2': '#ef4444',
    '--accent3': '#1e293b',
    '--border': '#334155',
    '--card': '#0f172a',
    '--font-main': "'Exo 2', sans-serif",
    '--font-display': "'Russo One', sans-serif",
  },
  Layout: RoadragerLayout,
}

export default roadrager
