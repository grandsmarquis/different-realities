import PilotLayout from '../layouts/PilotLayout'
const pilot = {
  id: 'pilot', label: 'Airline Pilot', emoji: '✈️',
  description: 'Cleared for approach. Inbox final.',
  fonts: ['B612+Mono:wght@400;700', 'B612:wght@400;700'],
  cssVars: {
    '--bg': '#000000', '--bg2': '#060606', '--text': '#00d0aa', '--text2': '#008866',
    '--accent': '#ffa500', '--accent2': '#00aaff', '--accent3': '#ff3300',
    '--border': '#0a2020', '--card': '#040404',
    '--font-main': "'B612 Mono', monospace", '--font-display': "'B612', sans-serif",
  }, Layout: PilotLayout,
}
export default pilot
