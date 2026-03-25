import NftCollectorLayout from '../layouts/NftCollectorLayout'

const nftCollector = {
  id: 'nftCollector',
  label: 'NFT Collector',
  emoji: '🖼️',
  description: 'Marketplace chrome, floor prices, wallet cosplay.',
  fonts: ['Inter'],
  cssVars: {
    '--bg': '#04111d',
    '--bg2': '#0f2435',
    '--text': '#ffffff',
    '--text2': '#8c9ba8',
    '--accent': '#2081e2',
    '--accent2': '#1868b7',
    '--accent3': '#133a4e',
    '--border': 'rgba(255, 255, 255, 0.1)',
    '--card': '#0d1e2d',
    '--font-main': "'Inter', system-ui, sans-serif",
    '--font-display': "'Inter', system-ui, sans-serif",
  },
  Layout: NftCollectorLayout,
}

export default nftCollector
