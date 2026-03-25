import ChineseRestaurantOwnerLayout from '../layouts/ChineseRestaurantOwnerLayout'

const chineseRestaurantOwner = {
  id: 'chineseRestaurantOwner',
  label: 'Chinese restaurant owner',
  emoji: '🥡',
  description: 'Lanterns, lazy Susan inbox, wok steam, bilingual flair.',
  fonts: ['Noto+Serif+SC:wght@400;600', 'ZCOOL+XiaoWei'],
  cssVars: {
    '--bg': '#0c0a09',
    '--bg2': '#1c1917',
    '--text': '#fef3c7',
    '--text2': '#a8a29e',
    '--accent': '#dc2626',
    '--accent2': '#fbbf24',
    '--accent3': '#78350f',
    '--border': '#78350f',
    '--card': '#1c1917',
    '--font-main': "'Noto Serif SC', serif",
    '--font-display': "'ZCOOL XiaoWei', serif",
  },
  Layout: ChineseRestaurantOwnerLayout,
}

export default chineseRestaurantOwner
