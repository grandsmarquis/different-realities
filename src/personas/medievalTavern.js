import MedievalTavernLayout from '../layouts/MedievalTavernLayout'

const medievalTavern = {
  id: 'medievalTavern',
  label: 'Medieval Tavern Keeper',
  emoji: '🍺',
  description: 'Missives on the nail, weather through the wall, bard gossip, and coin on the barrel.',
  emailSelectionInModal: true,
  fonts: ['Almendra:ital,wght@0,400;0,700;1,400', 'Cinzel+Decorative'],
  cssVars: {
    '--bg': '#1a120c',
    '--bg2': '#2a1c12',
    '--text': '#e8d4b8',
    '--text-dim': '#a89070',
    '--accent': '#c9a227',
    '--accent-warm': '#d45131',
    '--wood': '#3d2817',
    '--font-main': "'Almendra', serif",
    '--font-display': "'Cinzel Decorative', serif",
  },
  Layout: MedievalTavernLayout,
}

export default medievalTavern
