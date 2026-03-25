import InterpolWantedLayout from '../layouts/InterpolWantedLayout'

const interpolWanted = {
  id: 'interpolWanted',
  label: 'Interpol wanted (parody)',
  emoji: '🌍',
  description: 'Red-notice war room: radar mail, extraction weather, wire-tap news & frozen-asset tickers — same inbox, international drama.',
  fonts: ['Bebas+Neue', 'JetBrains+Mono'],
  cssVars: {
    '--bg': '#030712',
    '--bg2': '#0c1829',
    '--text': '#e2e8f0',
    '--text2': '#94a3b8',
    '--accent': '#dc2626',
    '--accent2': '#2563eb',
    '--accent3': '#fbbf24',
    '--border': '#1e3a5f',
    '--card': '#0f172a',
    '--font-main': "'JetBrains Mono', monospace",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  Layout: InterpolWantedLayout,
}

export default interpolWanted
