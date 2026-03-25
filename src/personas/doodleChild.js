import DoodleChildLayout from '../layouts/DoodleChildLayout'

const doodleChild = {
  id: 'doodle-child',
  label: 'Kid Who Doodles',
  emoji: '✏️',
  description: 'Sketchbook weather, scribble stocks, bubble news',
  fonts: ['Indie+Flower', 'Permanent+Marker'],
  cssVars: {
    '--bg': '#faf8f3',
    '--bg2': '#f0ebe3',
    '--text': '#2d2a32',
    '--text2': '#5c565e',
    '--accent': '#ff6b6b',
    '--accent2': '#4ecdc4',
    '--accent3': '#ffd93d',
    '--border': '#c9b1ff',
    '--card': '#ffffff',
    '--font-main': "'Indie Flower', cursive",
    '--font-display': "'Permanent Marker', cursive",
  },
  emailSelectionInModal: true,
  Layout: DoodleChildLayout,
}

export default doodleChild
