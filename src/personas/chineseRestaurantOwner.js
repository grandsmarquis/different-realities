import ChineseRestaurantOwnerLayout from '../layouts/ChineseRestaurantOwnerLayout'

const chineseRestaurantOwner = {
  id: 'chineseRestaurantOwner',
  label: 'Chinese restaurant owner',
  emoji: '🥡',
  description: 'Neon alley · wall menu · receipt messages · night-market TV.',
  fonts: ['Ma+Shan+Zheng', 'Noto+Serif+SC:wght@400;600;700', 'ZCOOL+XiaoWei'],
  cssVars: {
    '--bg': '#07090f',
    '--bg2': '#121826',
    '--text': '#fefce8',
    '--text2': '#94a3b8',
    '--accent': '#ff2d2d',
    '--accent2': '#fbbf24',
    '--accent3': '#22c55e',
    '--border': '#334155',
    '--card': '#0f1419',
    '--font-main': "'Noto Serif SC', serif",
    '--font-display': "'Ma Shan Zheng', cursive",
    '--font-ui': "'ZCOOL XiaoWei', serif",
  },
  emailSelectionInModal: true,
  Layout: ChineseRestaurantOwnerLayout,
}

export default chineseRestaurantOwner
