import CounterStrike16Layout from '../layouts/CounterStrike16Layout'

const counterStrike16 = {
  id: 'counter-strike-16',
  label: 'Counter-Strike 1.6',
  emoji: '🎯',
  description: 'Intel from de_internet. Rush B (your inbox).',
  fonts: ['Share+Tech+Mono', 'Rajdhani:wght@500;600;700'],
  cssVars: {
    '--bg': '#16130f',
    '--bg2': '#221c16',
    '--panel': '#2e261d',
    '--panel2': '#3a3126',
    '--text': '#d8ccb8',
    '--text-dim': '#7a6e5c',
    '--ct': '#6abf69',
    '--t': '#e07050',
    '--gold': '#e8b84a',
    '--hud': '#b8e986',
    '--border': '#4d4336',
    '--shadow': 'rgba(0, 0, 0, 0.55)',
    '--font-mono': "'Share Tech Mono', monospace",
    '--font-hud': "'Rajdhani', sans-serif",
  },
  Layout: CounterStrike16Layout,
}

export default counterStrike16
