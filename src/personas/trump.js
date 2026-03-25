import ExecutiveInboxLayout from '../layouts/ExecutiveInboxLayout'

const trump = {
  id: 'trump',
  label: 'Donald Trump inbox',
  emoji: '🦅',
  description: 'Personal inbox · gold, caps, tremendous',
  fonts: ['Anton', 'Roboto+Condensed:wght@400;700'],
  cssVars: {
    '--bg': '#1a1510',
    '--bg2': '#0d0a08',
    '--text': '#f5f0e6',
    '--text2': '#a89880',
    '--accent': '#d4af37',
    '--accent2': '#c41e3a',
    '--accent3': '#1e3a5f',
    '--border': '#4a4035',
    '--card': '#252018',
    '--font-main': "'Roboto Condensed', sans-serif",
    '--font-display': "'Anton', sans-serif",
  },
  Layout: ExecutiveInboxLayout,
}

export default trump
