import ShibuyaHellLayout from '../layouts/ShibuyaHellLayout'

const shibuyaHell = {
  id: 'shibuyaHell',
  label: 'Shibuya ad hell',
  emoji: '📣',
  description: 'Vertical neon marquees, floating promos, pure noise.',
  fonts: ['RocknRoll+One:wght@400', 'M+PLUS+Rounded+1c:wght@400;800'],
  cssVars: {
    '--bg': '#0a0612',
    '--bg2': '#160820',
    '--text': '#fff5fb',
    '--text2': '#f472b6',
    '--accent': '#fbbf24',
    '--accent2': '#ec4899',
    '--accent3': '#1e1035',
    '--border': '#4c1d95',
    '--card': '#12081f',
    '--font-main': "'M PLUS Rounded 1c', sans-serif",
    '--font-display': "'RocknRoll One', sans-serif",
  },
  Layout: ShibuyaHellLayout,
}

export default shibuyaHell
