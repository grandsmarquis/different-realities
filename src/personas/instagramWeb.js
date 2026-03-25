import InstagramWebLayout from '../layouts/InstagramWebLayout'

export default {
  id: 'instagramWeb',
  label: 'Photo app (parody)',
  emoji: '📸',
  description:
    'Parody social feed: stories for weather & headlines, feed & reels for news & stonks, DMs are your inbox.',
  fonts: ['Inter:wght@400;500;600;700;800', 'Grand+Hotel'],
  emailSelectionInModal: true,
  cssVars: {
    '--bg': '#000000',
    '--bg2': '#121212',
    '--text': '#fafafa',
    '--text2': '#a8a8a8',
    '--accent': '#e1306c',
    '--accent2': '#0095f6',
    '--accent3': '#feda75',
    '--border': '#262626',
    '--card': '#121212',
    '--font-main': "'Inter', sans-serif",
    '--font-display': "'Grand Hotel', cursive",
  },
  Layout: InstagramWebLayout,
}
