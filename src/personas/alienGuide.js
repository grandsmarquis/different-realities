import AlienGuideLayout from '../layouts/AlienGuideLayout'

const alienGuide = {
  id: 'alienGuide',
  label: 'Alien Tourist Guide',
  emoji: '👽',
  description: 'Earth inbox: rated 3 stars.',
  fonts: ['Audiowide', 'Space+Grotesk'],
  cssVars: {
    '--bg': '#0a0f12',
    '--bg2': '#121c22',
    '--text': '#c8fff0',
    '--text2': '#5cffb0',
    '--accent': '#ff00aa',
    '--accent2': '#00ffcc',
    '--accent3': '#ffff00',
    '--border': '#1e3a32',
    '--card': '#0c1618',
    '--font-main': "'Space Grotesk', sans-serif",
    '--font-display': "'Audiowide', sans-serif",
  },
  Layout: AlienGuideLayout,
}

export default alienGuide
