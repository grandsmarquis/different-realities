import TinderWebLayout from '../layouts/TinderWebLayout'

export default {
  id: 'tinderWeb',
  label: 'Swipe app (parody)',
  emoji: '🔥',
  description:
    'Parody dating-app UI: swipe your inbox, “chat” the news, flex weather vibes & gold-tier stocks.',
  fonts: ['Outfit:wght@400;500;600;700;800', 'Fredoka:wght@400;600;700'],
  emailSelectionInModal: true,
  cssVars: {
    '--bg': '#0c0a0a',
    '--bg2': '#1a1412',
    '--text': '#fff7f5',
    '--text2': '#c9b8b0',
    '--accent': '#fe3c72',
    '--accent2': '#ff6b4a',
    '--accent3': '#00d4aa',
    '--border': '#3d2f2c',
    '--card': '#1e1816',
    '--font-main': "'Outfit', sans-serif",
    '--font-display': "'Fredoka', sans-serif",
  },
  Layout: TinderWebLayout,
}
