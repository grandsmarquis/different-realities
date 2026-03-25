import BobMarleyInboxLayout from '../layouts/BobMarleyInboxLayout'

export default {
  id: 'bobMarleyInbox',
  label: 'Bob Marley inbox',
  emoji: '🎸',
  description: 'Rasta stripes, vinyl vibe, irie weather & riddim stocks, world-a-reggae news (parody).',
  fonts: ['Lilita One', 'Nunito:wght@400;700'],
  cssVars: {
    '--bg': '#14532d',
    '--bg2': '#1c1917',
    '--text': '#ecfccb',
    '--text2': '#bef264',
    '--accent': '#facc15',
    '--accent2': '#dc2626',
    '--accent3': '#15803d',
    '--border': 'rgba(101, 163, 13, 0.35)',
    '--card': 'rgba(20, 83, 45, 0.5)',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Lilita One', cursive",
  },
  Layout: BobMarleyInboxLayout,
}
