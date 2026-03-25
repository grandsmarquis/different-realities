import DonaldDuckInboxLayout from '../layouts/DonaldDuckInboxLayout'

export default {
  id: 'donaldDuckInbox',
  label: 'Donald Duck inbox',
  emoji: '🦆',
  description: 'Comic-panel weather & stocks, speech-bubble mail, extra news strips (parody).',
  fonts: ['Bangers', 'Comic Neue:wght@400;700'],
  cssVars: {
    '--bg': '#1e3a5f',
    '--bg2': '#172554',
    '--text': '#ffffff',
    '--text2': '#e2e8f0',
    '--accent': '#facc15',
    '--accent2': '#dc2626',
    '--accent3': '#2563eb',
    '--border': '#000000',
    '--card': '#ffffff',
    '--font-main': "'Comic Neue', sans-serif",
    '--font-display': "'Bangers', cursive",
  },
  Layout: DonaldDuckInboxLayout,
}
