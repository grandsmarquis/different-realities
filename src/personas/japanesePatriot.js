import JapanesePatriotLayout from '../layouts/JapanesePatriotLayout'

const japanesePatriot = {
  id: 'japanesePatriot',
  label: 'Japanese Patriot',
  emoji: '🇯🇵',
  description: 'Rising sun command center — inbox, weather, telop news, and the stock front.',
  fonts: ['Noto+Serif+JP:wght@600;900', 'M+PLUS+Rounded+1c:wght@500;800'],
  cssVars: {
    '--bg': '#f7f5f0',
    '--bg2': '#e8ecf4',
    '--text': '#0c1929',
    '--text2': '#3d4f63',
    '--accent': '#bc002d',
    '--accent2': '#1a2744',
    '--accent3': '#c9a227',
    '--border': '#c8d0dc',
    '--card': '#ffffff',
    '--font-main': "'M PLUS Rounded 1c', sans-serif",
    '--font-display': "'Noto Serif JP', serif",
  },
  Layout: JapanesePatriotLayout,
}

export default japanesePatriot
