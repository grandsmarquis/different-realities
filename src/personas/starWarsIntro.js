import StarWarsIntroLayout from '../layouts/StarWarsIntroLayout'

export default {
  id: 'starWarsIntro',
  label: 'Star Wars opening crawl',
  emoji: '🎬',
  description: 'Your inbox, weather, markets, and news as an epic scroll into the stars.',
  emailSelectionInModal: true,
  fonts: ['News+Cycle:wght@400;700', 'Orbitron:wght@500;700;900'],
  cssVars: {
    '--bg': '#000000',
    '--bg2': '#07070f',
    '--text': '#ffe81f',
    '--text2': '#c4b86a',
    '--accent': '#ffe81f',
    '--accent2': '#38bdf8',
    '--accent3': '#1a1a2e',
    '--border': 'rgba(255, 232, 31, 0.25)',
    '--card': 'rgba(8, 10, 20, 0.92)',
    '--font-main': "'News Cycle', Georgia, serif",
    '--font-display': "'Orbitron', sans-serif",
  },
  Layout: StarWarsIntroLayout,
}
