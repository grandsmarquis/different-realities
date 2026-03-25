import BlindFriendlyLayout from '../layouts/BlindFriendlyLayout'

export default {
  id: 'blindFriendly',
  label: 'Blind-friendly · Echo Briefing',
  emoji: '📻',
  description: 'Screen-reader first: landmarks, live updates, high contrast, playful sound-wave vibe.',
  fonts: ['Lexend:wght@400;500;600;700'],
  cssVars: {
    '--bg': '#0c0a14',
    '--bg2': '#16122a',
    '--text': '#f0ebff',
    '--text2': '#a898cc',
    '--accent': '#22d3ee',
    '--accent2': '#e879f9',
    '--border': '#3d3558',
    '--card': '#1a1530',
    '--font-main': "'Lexend', sans-serif",
    '--font-display': "'Lexend', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: BlindFriendlyLayout,
}
