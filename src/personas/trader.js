import TraderLayout from '../layouts/TraderLayout'

export default {
  id: 'trader',
  label: 'Trader',
  emoji: '📈',
  description: 'Terminal desk: live tickers, sparkline blocks, macro news wire, order-book inbox.',
  fonts: ['JetBrains Mono:wght@400;700', 'Orbitron:wght@500;700'],
  cssVars: {
    '--bg': '#030712',
    '--bg2': '#0f172a',
    '--text': '#e2e8f0',
    '--text2': '#94a3b8',
    '--accent': '#22c55e',
    '--accent2': '#ef4444',
    '--accent3': '#38bdf8',
    '--border': 'rgba(34, 197, 94, 0.25)',
    '--card': 'rgba(15, 23, 42, 0.85)',
    '--font-main': "'JetBrains Mono', monospace",
    '--font-display': "'Orbitron', sans-serif",
  },
  Layout: TraderLayout,
}
