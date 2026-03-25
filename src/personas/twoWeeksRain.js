import TwoWeeksRainLayout from '../layouts/TwoWeeksRainLayout'

export default {
  id: 'twoWeeksRain',
  label: 'Raining for 2 weeks',
  emoji: '🌧️',
  description:
    'Aquatic HQ dashboard: same inbox, weather, news & stocks — delivered through fourteen days of drizzle, ducks, and denial.',
  fonts: ['Nunito:wght@400;600;700;800;900', 'Bungee'],
  cssVars: {
    '--bg': '#0f172a',
    '--bg2': '#1e293b',
    '--text': '#e2e8f0',
    '--text2': '#94a3b8',
    '--accent': '#38bdf8',
    '--accent2': '#7dd3fc',
    '--border': '#334155',
    '--card': '#1e293b',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Bungee', cursive",
  },
  emailSelectionInModal: true,
  Layout: TwoWeeksRainLayout,
}
