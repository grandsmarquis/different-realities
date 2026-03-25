import MeditationLayout from '../layouts/MeditationLayout'

export default {
  id: 'meditation',
  label: 'Meditation breathing pace',
  emoji: '🧘',
  description: 'Inhale four. Exhale four. Read between breaths.',
  fonts: ['Cormorant+Garamond:ital,wght@0,400;0,600;1,400', 'Jost:wght@400;500'],
  cssVars: {
    '--bg': '#1a2f2a',
    '--bg2': '#243d36',
    '--text': '#ecfdf5',
    '--text2': '#a7f3d0',
    '--accent': '#6ee7b7',
    '--accent2': '#34d399',
    '--border': '#365f54',
    '--card': '#2d4a42',
    '--font-main': "'Jost', sans-serif",
    '--font-display': "'Cormorant Garamond', serif",
  },
  emailSelectionInModal: true,
  Layout: MeditationLayout,
}
