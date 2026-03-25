import YakuzaBossLayout from '../layouts/YakuzaBossLayout'

const yakuzaBoss = {
  id: 'yakuzaBoss',
  label: 'Yakuza boss (kumicho HQ)',
  emoji: '🐉',
  description:
    'Neon-noir family office parody: hanko mail, rainy harbor sky, CRT telop news, and turf tickers — same inbox, weather, news & stocks.',
  fonts: ['Shippori+Mincho:wght@600;800', 'Zen+Kaku+Gothic+New:wght@400;700'],
  cssVars: {
    '--bg': '#0a0608',
    '--bg2': '#120a0e',
    '--text': '#f5e6dc',
    '--text2': '#b8a090',
    '--accent': '#c41e3a',
    '--accent2': '#8b0000',
    '--accent3': '#d4af37',
    '--border': '#3d2528',
    '--card': '#140c10',
    '--font-main': "'Zen Kaku Gothic New', sans-serif",
    '--font-display': "'Shippori Mincho', serif",
  },
  Layout: YakuzaBossLayout,
}

export default yakuzaBoss
