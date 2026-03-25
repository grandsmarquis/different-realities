import IslandLostLayout from '../layouts/IslandLostLayout'

export default {
  id: 'islandLost',
  label: 'Lost on an island',
  emoji: '🏝️',
  description: 'SOS driftwood: message-in-a-bottle inbox, survival forecast, rock charts, coconut radio.',
  fonts: ['Castoro:ital@0;1', 'Gelasio:ital,wght@0,600;1,600'],
  cssVars: {
    '--bg': '#fef3c7',
    '--bg2': '#fde68a',
    '--text': '#422006',
    '--text2': '#78350f',
    '--accent': '#ea580c',
    '--accent2': '#0ea5e9',
    '--accent3': '#16a34a',
    '--border': 'rgba(120, 53, 15, 0.25)',
    '--card': '#fffbeb',
    '--font-main': "'Castoro', serif",
    '--font-display': "'Gelasio', serif",
  },
  Layout: IslandLostLayout,
}
