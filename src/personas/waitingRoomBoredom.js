import WaitingRoomBoredomLayout from '../layouts/WaitingRoomBoredomLayout'

export default {
  id: 'waitingRoomBoredom',
  label: 'Waiting room boredom',
  emoji: '🪑',
  description: 'Institutional beige. A clock that lies. Magazines from 2019.',
  fonts: ['Libre+Franklin:wght@400;500;600', 'Libre+Baskerville:ital,wght@0,400;1,400'],
  cssVars: {
    '--bg': '#e8e4dc',
    '--bg2': '#ddd8ce',
    '--text': '#3d3830',
    '--text2': '#6b6560',
    '--accent': '#8b7355',
    '--accent2': '#5c7c6f',
    '--border': '#c9c2b4',
    '--card': '#f5f2eb',
    '--font-main': "'Libre Franklin', sans-serif",
    '--font-display': "'Libre Baskerville', serif",
  },
  emailSelectionInModal: true,
  Layout: WaitingRoomBoredomLayout,
}
