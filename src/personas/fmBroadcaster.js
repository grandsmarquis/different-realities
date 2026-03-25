import FmBroadcasterLayout from '../layouts/FmBroadcasterLayout'

export default {
  id: 'fmBroadcaster',
  label: 'FM broadcaster',
  emoji: '📻',
  description: 'Studio deck: ON AIR lamp, VU meters, RDS-style mail, dial stocks, news top-of-hour.',
  fonts: ['Bebas Neue', 'Newsreader:opsz,wght@6..72,400;600'],
  cssVars: {
    '--bg': '#1c1410',
    '--bg2': '#292018',
    '--text': '#fef3c7',
    '--text2': '#d6d3d1',
    '--accent': '#fbbf24',
    '--accent2': '#dc2626',
    '--accent3': '#78716c',
    '--border': 'rgba(180, 83, 9, 0.4)',
    '--card': 'rgba(0, 0, 0, 0.45)',
    '--font-main': "'Newsreader', serif",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  Layout: FmBroadcasterLayout,
}
