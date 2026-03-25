import AnimeOtaku90sLayout from '../layouts/AnimeOtaku90sLayout'

const animeOtaku90s = {
  id: 'animeOtaku90s',
  label: "90's anime otaku",
  emoji: '📼',
  description: 'VHS nights · neon cel-shade · fan-sub energy',
  fonts: ['Bungee', 'Mochiy+Pop+One', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#0f0220',
    '--bg2': '#1a0638',
    '--text': '#fff8ff',
    '--text2': '#c4b5e8',
    '--accent': '#ff2a6d',
    '--accent2': '#05d9e8',
    '--accent3': '#ffe600',
    '--border': '#ffffff',
    '--card': '#1e0b3a',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Bungee', cursive",
    '--font-jp': "'Mochiy Pop One', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: AnimeOtaku90sLayout,
}

export default animeOtaku90s
