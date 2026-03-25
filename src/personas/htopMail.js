import HtopMailLayout from '../layouts/HtopMailLayout'

export default {
  id: 'htopMail',
  label: 'Watching mail in htop',
  emoji: '📟',
  description:
    'Process-table inbox: animated CPU bars, RUN/SLEEP mail daemons, weather netstat, news feed, and stonks as background threads.',
  fonts: ['IBM+Plex+Mono:wght@400;600', 'Space+Grotesk:wght@500;700'],
  cssVars: {
    '--bg': '#050a08',
    '--bg2': '#0b1410',
    '--text': '#d7ffe8',
    '--text2': '#6f9a82',
    '--accent': '#39ff88',
    '--accent2': '#ff4d6d',
    '--accent3': '#7cf9ff',
    '--border': '#1f3a2c',
    '--card': '#0f1f18',
    '--font-main': "'IBM Plex Mono', ui-monospace, monospace",
    '--font-display': "'Space Grotesk', sans-serif",
  },
  Layout: HtopMailLayout,
}
