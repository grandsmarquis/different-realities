import PirateLayout from '../layouts/PirateLayout'
const pirate = {
  id: 'pirate', label: 'Pirate Captain', emoji: '🏴‍☠️',
  description: 'Yarr. The seas be full of messages.',
  fonts: ['Pirata+One', 'Crimson+Text:ital,wght@0,400;0,600;1,400'],
  cssVars: {
    '--bg': '#c8a06a', '--bg2': '#b89050', '--text': '#1a0800', '--text2': '#5c3010',
    '--accent': '#8b1a00', '--accent2': '#2a4a8b', '--accent3': '#1a3a1a',
    '--border': '#8b6030', '--card': '#dabb88',
    '--font-main': "'Crimson Text', serif", '--font-display': "'Pirata One', cursive",
  }, Layout: PirateLayout,
}
export default pirate
