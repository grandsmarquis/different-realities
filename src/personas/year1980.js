import Year1980Layout from '../layouts/Year1980Layout'

const year1980 = {
  id: 'year1980',
  label: '1980 — Living room HQ',
  emoji: '📼',
  description: 'Wood paneling, CRT glow, cassette mail, radar weather & neon ticker dreams — same inbox, totally tubular.',
  fonts: ['Orbitron:wght@400;600;800', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#12081f',
    '--bg2': '#1a0f2e',
    '--text': '#f0e6ff',
    '--text2': '#9b8ab8',
    '--accent': '#ff2a6d',
    '--accent2': '#05d9e8',
    '--border': '#3d2a55',
    '--card': '#1e1235',
    '--font-main': "'Share Tech Mono', ui-monospace, monospace",
    '--font-display': "'Orbitron', system-ui, sans-serif",
  },
  emailSelectionInModal: true,
  Layout: Year1980Layout,
}

export default year1980
