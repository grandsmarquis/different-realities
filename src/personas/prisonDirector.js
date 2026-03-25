import PrisonDirectorLayout from '../layouts/PrisonDirectorLayout'

const prisonDirector = {
  id: 'prisonDirector',
  label: 'Prison Director',
  emoji: '🔒',
  description:
    'Warden command deck: kite mail, yard weather, contraband headlines & commissary tickers — maximum security, minimum boredom.',
  fonts: ['Bebas+Neue', 'JetBrains+Mono'],
  cssVars: {
    '--bg': '#1c1917',
    '--bg2': '#292524',
    '--text': '#e7e5e4',
    '--text2': '#a8a29e',
    '--accent': '#ea580c',
    '--accent2': '#facc15',
    '--accent3': '#166534',
    '--border': '#57534e',
    '--card': '#292524',
    '--font-main': "'JetBrains Mono', monospace",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  Layout: PrisonDirectorLayout,
}

export default prisonDirector
