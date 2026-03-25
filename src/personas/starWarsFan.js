import StarWarsFanLayout from '../layouts/StarWarsFanLayout'

export default {
  id: 'starWarsFan',
  label: 'Star Wars fan',
  emoji: '⭐',
  description: 'HoloNet inbox, hyperspace vibes, and an opening crawl for the news.',
  fonts: ['Audiowide', 'Exo+2:wght@400;600;700'],
  cssVars: {
    '--bg': '#050a14',
    '--bg2': '#0c1629',
    '--text': '#e8f4ff',
    '--text2': '#7dd3fc',
    '--accent': '#ffe81f',
    '--accent2': '#38bdf8',
    '--accent3': '#1e3a5f',
    '--border': 'rgba(56, 189, 248, 0.35)',
    '--card': 'rgba(12, 22, 41, 0.85)',
    '--font-main': "'Exo 2', sans-serif",
    '--font-display': "'Audiowide', sans-serif",
  },
  Layout: StarWarsFanLayout,
}
