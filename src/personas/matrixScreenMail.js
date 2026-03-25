import MatrixScreenLayout from '../layouts/MatrixScreenLayout'

export default {
  id: 'matrixScreenMail',
  label: 'Watching mail as a Matrix screen',
  emoji: '💊',
  description:
    'Green digital rain: inbox decrypts from the cascade — weather, wire news & Zion tickers in terminal chrome. Rabbit included.',
  fonts: ['Share+Tech+Mono', 'Orbitron:wght@400;700'],
  cssVars: {
    '--bg': '#010403',
    '--text': '#00ff66',
    '--text-dim': '#00aa44',
    '--accent': '#00ff41',
    '--font-main': "'Share Tech Mono', ui-monospace, monospace",
    '--font-display': "'Orbitron', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: MatrixScreenLayout,
}
