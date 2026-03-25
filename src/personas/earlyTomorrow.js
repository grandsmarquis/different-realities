import EarlyTomorrowLayout from '../layouts/EarlyTomorrowLayout'

export default {
  id: 'earlyTomorrow',
  label: "It's late — wake up early tomorrow",
  emoji: '⏰',
  description:
    'Bedside lamp glow, ticking clock, and the sacred countdown. Same inbox, weather, news & stocks — dressed for guilty pre-sleep scrolling.',
  fonts: ['Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500', 'Plus+Jakarta+Sans:wght@400;500;600;700'],
  cssVars: {
    '--bg': '#120d0a',
    '--bg2': '#1c1510',
    '--text': '#faf3e8',
    '--text2': '#c4a882',
    '--accent': '#f59e0b',
    '--accent2': '#fb7185',
    '--border': '#3d3026',
    '--card': '#231a14',
    '--font-main': "'Plus Jakarta Sans', sans-serif",
    '--font-display': "'Fraunces', Georgia, serif",
  },
  emailSelectionInModal: true,
  Layout: EarlyTomorrowLayout,
}
