import DogLoverLayout from '../layouts/DogLoverLayout'

export default {
  id: 'dogLover',
  label: 'Dog lover',
  emoji: '🐕',
  description: 'Fetch the mail — park weather, treat tickers, neighborhood news.',
  fonts: ['Fredoka:wght@400;600', 'Nunito:wght@400;700'],
  cssVars: {
    '--bg': '#f0f9ff',
    '--bg2': '#fff7ed',
    '--text': '#0c4a6e',
    '--text2': '#0369a1',
    '--accent': '#0284c7',
    '--accent2': '#ea580c',
    '--accent3': '#e0f2fe',
    '--border': 'rgba(14, 165, 233, 0.35)',
    '--card': '#ffffff',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Fredoka', sans-serif",
  },
  Layout: DogLoverLayout,
}
