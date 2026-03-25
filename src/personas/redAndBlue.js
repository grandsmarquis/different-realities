import RedAndBlueLayout from '../layouts/RedAndBlueLayout'

export default {
  id: 'redAndBlue',
  label: 'Red and blue',
  emoji: '🥽',
  description: 'Anaglyph stereo vibe: split panels, cyan/red shadows.',
  fonts: ['Russo+One', 'Exo+2:wght@400;700'],
  cssVars: {
    '--bg': '#0a0a12',
    '--bg2': '#1e1b4b',
    '--text': '#f8fafc',
    '--text2': '#94a3b8',
    '--accent': '#ef4444',
    '--accent2': '#3b82f6',
    '--border': '#64748b',
    '--card': '#0f172a',
    '--font-main': "'Exo 2', sans-serif",
    '--font-display': "'Russo One', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: RedAndBlueLayout,
}
