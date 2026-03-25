import HomelessLayout from '../layouts/HomelessLayout'

const homeless = {
  id: 'homeless',
  label: 'Homeless Person',
  emoji: '🧥',
  description: 'Street chronicle — weather, news, messages that matter.',
  fonts: ['Newsreader', 'Lora'],
  cssVars: {
    '--bg': '#2a2620',
    '--bg2': '#353028',
    '--text': '#ebe6dc',
    '--text2': '#8c8578',
    '--accent': '#c9a227',
    '--accent2': '#6b5344',
    '--accent3': '#1e1c18',
    '--border': '#4a4338',
    '--card': '#322e26',
    '--font-main': "'Lora', serif",
    '--font-display': "'Newsreader', serif",
  },
  Layout: HomelessLayout,
}

export default homeless
