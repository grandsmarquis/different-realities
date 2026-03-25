import EmojiOnlyReaderLayout from '../layouts/EmojiOnlyReaderLayout'

export default {
  id: 'emojiOnlyReader',
  label: 'Emoji-only reader',
  emoji: '🫥',
  description: 'No letters. Inbox, weather, news & stocks — pure glyphs, vibes, and motion.',
  fonts: ['Fredoka:wght@400;600;700'],
  cssVars: {
    '--bg': '#1a1625',
    '--bg2': '#2d2640',
    '--text': '#faf5ff',
    '--text2': '#e9d5ff',
    '--accent': '#f472b6',
    '--accent2': '#22d3ee',
    '--accent3': '#a78bfa',
    '--border': 'rgba(244, 114, 182, 0.35)',
    '--card': 'rgba(45, 38, 64, 0.88)',
    '--font-main': "'Fredoka', sans-serif",
    '--font-display': "'Fredoka', sans-serif",
  },
  Layout: EmojiOnlyReaderLayout,
}
