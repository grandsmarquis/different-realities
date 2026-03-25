import GasPricesRisingLayout from '../layouts/GasPricesRisingLayout'

const gasPricesRising = {
  id: 'gasPricesRising',
  label: 'Gas prices rising',
  emoji: '⛽',
  description: 'LED ticks up forever. Receipts in the inbox.',
  fonts: ['Orbitron:wght@500;700', 'Rajdhani:wght@500;700'],
  cssVars: {
    '--bg': '#0d0604',
    '--bg2': '#1a0f0c',
    '--text': '#fff3e0',
    '--text2': '#bcaaa4',
    '--accent': '#ff6d00',
    '--accent2': '#ffea00',
    '--accent3': '#ff3d00',
    '--border': '#5d4037',
    '--card': '#140c0a',
    '--font-main': "'Rajdhani', sans-serif",
    '--font-display': "'Orbitron', sans-serif",
  },
  Layout: GasPricesRisingLayout,
}

export default gasPricesRising
