import Year1400Layout from '../layouts/Year1400Layout'

const year1400 = {
  id: 'year1400',
  label: '1400 — Scriptorium & sky omens',
  emoji: '📜',
  description: 'Illuminated desk, astrolabe weather, crier gossip, guild ledgers — same inbox, quill-powered.',
  fonts: ['Cinzel:wght@400;600;700', 'MedievalSharp'],
  cssVars: {
    '--bg': '#1a0f14',
    '--bg2': '#2a1520',
    '--text': '#f3e9dc',
    '--text2': '#b8a090',
    '--accent': '#c9a227',
    '--accent2': '#8b2942',
    '--accent3': '#2d5a4a',
    '--ink': '#0d0608',
    '--parchment': '#e8dcc4',
    '--border': '#6b4423',
    '--lapis': '#1e3a5f',
    '--font-main': "'Cinzel', Georgia, serif",
    '--font-display': "'MedievalSharp', cursive",
  },
  emailSelectionInModal: true,
  Layout: Year1400Layout,
}

export default year1400
