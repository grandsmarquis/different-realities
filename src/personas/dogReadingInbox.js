import DogReadingInboxLayout from '../layouts/DogReadingInboxLayout'

export default {
  id: 'dogReadingInbox',
  label: 'Dog reading inbox',
  emoji: '🐕‍🦺',
  description: 'POV: walk weather, treat economy, smell-mail, yard gossip.',
  fonts: ['Chewy', 'Nunito:wght@400;700'],
  cssVars: {
    '--bg': '#292524',
    '--bg2': '#422006',
    '--text': '#fffbeb',
    '--text2': '#fde68a',
    '--accent': '#fbbf24',
    '--accent2': '#f59e0b',
    '--accent3': '#451a03',
    '--border': 'rgba(251, 191, 36, 0.35)',
    '--card': 'rgba(41, 37, 36, 0.9)',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Chewy', cursive",
  },
  Layout: DogReadingInboxLayout,
}
