import NintendoN64Layout from '../layouts/NintendoN64Layout'

const nintendoN64 = {
  id: 'nintendoN64',
  label: 'Browsing on N64',
  emoji: '🕹️',
  description: 'World Wide Web at 320×240. Expansion Pak recommended.',
  fonts: ['Russo+One', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#12081f',
    '--text': '#e8e0d5',
    '--accent': '#f4c430',
    '--accent2': '#c0392b',
    '--accent3': '#4a90d9',
    '--border': '#4a4855',
    '--card': '#25242e',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Russo One', sans-serif",
  },
  Layout: NintendoN64Layout,
}

export default nintendoN64
