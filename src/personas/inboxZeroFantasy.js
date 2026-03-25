import InboxZeroFantasyLayout from '../layouts/InboxZeroFantasyLayout'

export default {
  id: 'inboxZeroFantasy',
  label: 'Inbox Zero Fantasy',
  emoji: '✨',
  description: 'Statistically impossible peace. Confetti logic. Zero unread (in your heart).',
  fonts: ['Syne:wght@400;500;600;700', 'Instrument+Serif:ital@0;1'],
  cssVars: {
    '--bg': '#faf5ff',
    '--bg2': '#f3e8ff',
    '--text': '#3b0764',
    '--text2': '#7c3aed',
    '--accent': '#c026d3',
    '--accent2': '#e879f9',
    '--border': '#e9d5ff',
    '--card': '#ffffff',
    '--font-main': "'Syne', sans-serif",
    '--font-display': "'Instrument Serif', serif",
  },
  emailSelectionInModal: true,
  Layout: InboxZeroFantasyLayout,
}
