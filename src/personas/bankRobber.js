import BankRobberLayout from '../layouts/BankRobberLayout'

const bankRobber = {
  id: 'bankRobber',
  label: 'Bank Robber',
  emoji: '🎭',
  description: 'Vault reader, laser tripwires, getaway ticker.',
  fonts: ['Share+Tech+Mono', 'Oswald'],
  cssVars: {
    '--bg': '#050805',
    '--bg2': '#0c120c',
    '--text': '#dcfce7',
    '--text2': '#4ade80',
    '--accent': '#22c55e',
    '--accent2': '#ef4444',
    '--accent3': '#052e16',
    '--border': '#166534',
    '--card': '#0a140a',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Oswald', sans-serif",
  },
  Layout: BankRobberLayout,
}

export default bankRobber
