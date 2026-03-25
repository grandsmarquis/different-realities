import PongMailLayout from '../layouts/PongMailLayout'

export default {
  id: 'pongMail',
  label: 'Watching mail while playing Pong',
  emoji: '🏓',
  description:
    'Arcade cabinet multitask: neon court, live Pong vs the spam-bot, inbox stream, weather radar, news crawl & ticker stonks.',
  fonts: ['Orbitron:wght@400;700;900', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#05080a',
    '--bg2': '#0a1218',
    '--text': '#e8fff4',
    '--text2': '#5c7a6e',
    '--accent': '#39ff14',
    '--accent2': '#ff2d6a',
    '--accent3': '#00f5ff',
    '--border': '#1a3d2e',
    '--card': '#0c1812',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Orbitron', sans-serif",
  },
  Layout: PongMailLayout,
}
