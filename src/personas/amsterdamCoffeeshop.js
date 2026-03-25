import AmsterdamCoffeeshopLayout from '../layouts/AmsterdamCoffeeshopLayout'

export default {
  id: 'amsterdamCoffeeshop',
  label: 'Amsterdam coffeeshop owner',
  emoji: '🌿',
  description: 'Neon grachten-nacht, prijsbord-stocks, terrasweer & café-tv nieuws (parody).',
  fonts: ['Bungee', 'Nunito:wght@400;700'],
  cssVars: {
    '--bg': '#0c1222',
    '--bg2': '#1c1917',
    '--text': '#e7e5e4',
    '--text2': '#a7f3d0',
    '--accent': '#34d399',
    '--accent2': '#e879f9',
    '--accent3': '#fb923c',
    '--border': 'rgba(52, 211, 153, 0.25)',
    '--card': 'rgba(6, 78, 59, 0.35)',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Bungee', cursive",
  },
  Layout: AmsterdamCoffeeshopLayout,
}
