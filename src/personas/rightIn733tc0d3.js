import RightIn733tc0d3Layout from '../layouts/RightIn733tc0d3Layout'
import { leet733Str } from '../utils/leet733'

const descriptionRaw =
  'Competitive-coding grind: problems as inbox, judge cluster weather, discuss news, benchmark tickers.'

export default {
  id: 'right-in-733tc0d3',
  label: leet733Str('Right in 733tc0d3'),
  emoji: '🧡',
  description: leet733Str(descriptionRaw),
  fonts: ['JetBrains Mono:wght@400;600;700', 'Outfit:wght@600;800'],
  cssVars: {
    '--bg': '#0a0e14',
    '--bg2': '#161b22',
    '--text': '#e8eaed',
    '--text2': '#8b949e',
    '--accent': '#ffa116',
    '--accent2': '#ff6b00',
    '--accent3': '#3fb950',
    '--border': '#30363d',
    '--card': '#161b22',
    '--font-main': "'JetBrains Mono', monospace",
    '--font-display': "'Outfit', sans-serif",
  },
  Layout: RightIn733tc0d3Layout,
}
