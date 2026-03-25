import BookMailLayout from '../layouts/BookMailLayout'

export default {
  id: 'mailAsBook',
  label: 'Reading your mail as a book',
  emoji: '📖',
  description:
    'Leather binding, ribbon bookmarks, and chapter headings: inbox as literature — plus almanac weather, chronicle news, and merchant ledger stocks.',
  fonts: ['Playfair+Display:ital,wght@0,400;0,700;0,900;1,400', 'Crimson+Pro:ital,wght@0,400;0,600;1,400', 'Dancing+Script:wght@600;700'],
  cssVars: {
    '--bg': '#1a100c',
    '--bg2': '#261810',
    '--text': '#f7eeda',
    '--text2': '#c4a88a',
    '--muted': '#a89078',
    '--accent': '#c9a227',
    '--accent-soft': 'rgba(201, 162, 39, 0.15)',
    '--border': 'rgba(201, 162, 39, 0.25)',
    '--card': 'rgba(42, 28, 20, 0.85)',
    '--font-display': "'Playfair Display', Georgia, serif",
    '--font-body': "'Crimson Pro', Georgia, 'Times New Roman', serif",
    '--font-note': "'Dancing Script', cursive",
  },
  Layout: BookMailLayout,
}
