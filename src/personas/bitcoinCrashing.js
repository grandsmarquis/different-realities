import BitcoinCrashingLayout from '../layouts/BitcoinCrashingLayout'

const bitcoinCrashing = {
  id: 'bitcoinCrashing',
  label: 'Bitcoin crashing',
  emoji: '📉',
  description: 'Red candles, shaking charts, margin call vibes.',
  fonts: ['Bebas+Neue', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#0a0202',
    '--bg2': '#1a0505',
    '--text': '#fecaca',
    '--text2': '#991b1b',
    '--accent': '#ef4444',
    '--accent2': '#7f1d1d',
    '--accent3': '#450a0a',
    '--border': '#7f1d1d',
    '--card': '#140505',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  Layout: BitcoinCrashingLayout,
}

export default bitcoinCrashing
