import EbayLayout from '../layouts/EbayLayout'

const ebayMail = {
  id: 'ebayMail',
  label: 'Auction site',
  emoji: '🏷️',
  description: 'Yellow header, bid panic, seller stars.',
  fonts: ['Comic+Neue:wght@400;700', 'Archivo+Black:wght@400'],
  cssVars: {
    '--bg': '#f7f7f7',
    '--bg2': '#ececec',
    '--text': '#1a1a1a',
    '--text2': '#555555',
    '--accent': '#ffc439',
    '--accent2': '#0064d2',
    '--accent3': '#e5e5e5',
    '--border': '#d1d1d1',
    '--card': '#ffffff',
    '--font-main': "'Comic Neue', sans-serif",
    '--font-display': "'Archivo Black', sans-serif",
  },
  Layout: EbayLayout,
}

export default ebayMail
