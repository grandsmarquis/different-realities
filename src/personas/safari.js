import SafariLayout from '../layouts/SafariLayout'
const safari = {
  id: 'safari', label: 'Safari Guide', emoji: '🦁',
  description: 'Stay quiet. Subject approaching inbox.',
  fonts: ['Cabin:wght@400;500;600;700', 'Teko:wght@400;500;600'],
  cssVars: {
    '--bg': '#f5e4b8', '--bg2': '#ead8a0', '--text': '#2c1800', '--text2': '#7a4a18',
    '--accent': '#8b4513', '--accent2': '#556b2f', '--accent3': '#c8860a',
    '--border': '#c8a060', '--card': '#faf0d8',
    '--font-main': "'Cabin', sans-serif", '--font-display': "'Teko', sans-serif",
  }, Layout: SafariLayout,
}
export default safari
