import YouAreAFishLayout from '../layouts/YouAreAFishLayout'

export default {
  id: 'youAreAFish',
  label: 'You are a fish',
  emoji: '🐠',
  description:
    'Aquarium POV: plankton-mail, lid-light weather, current gossip & shiny-pebble stonks — glub-glub HUD with bubbles and bioluminescence.',
  fonts: ['Sniglet', 'Nunito:wght@400;600;700;800'],
  cssVars: {
    '--bg': '#031a2c',
    '--bg2': '#0a3d5c',
    '--text': '#e0f7fa',
    '--text2': '#4dd0e1',
    '--accent': '#ffab40',
    '--accent2': '#b388ff',
    '--accent3': '#69f0ae',
    '--deep': '#010b14',
    '--glass': 'rgba(38, 198, 218, 0.12)',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Sniglet', cursive",
  },
  Layout: YouAreAFishLayout,
}
