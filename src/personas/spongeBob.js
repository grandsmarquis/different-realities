import SpongeBobLayout from '../layouts/SpongeBobLayout'

export default {
  id: 'spongeBob',
  label: 'Sponge bob shift',
  emoji: '🧽',
  description: 'Bikini-bottom-style dashboard: bubbling ocean, sponge-mail, kelp tickers & shell-phone news (parody).',
  fonts: ['Chewy', 'Fredoka:wght@400;600;700'],
  cssVars: {
    '--bg': '#0c4a6e',
    '--bg2': '#164e63',
    '--text': '#ecfeff',
    '--text2': '#a5f3fc',
    '--accent': '#fbbf24',
    '--accent2': '#f472b6',
    '--accent3': '#34d399',
    '--sand': '#e8c078',
    '--font-main': "'Fredoka', sans-serif",
    '--font-display': "'Chewy', cursive",
  },
  Layout: SpongeBobLayout,
}
