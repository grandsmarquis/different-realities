import BlackAndWhiteLayout from '../layouts/BlackAndWhiteLayout'

export default {
  id: 'blackAndWhite',
  label: 'Black and white',
  emoji: '📰',
  description: 'Newspaper columns, halftone texture, print jitter.',
  fonts: ['Libre+Baskerville:ital,wght@0,400;0,700;1,400', 'Newsreader:opsz,wght@6..72,400;6..72,700'],
  cssVars: {
    '--bg': '#f5f5f5',
    '--bg2': '#eaeaea',
    '--text': '#111111',
    '--text2': '#444444',
    '--accent': '#000000',
    '--accent2': '#333333',
    '--border': '#000000',
    '--card': '#ffffff',
    '--font-main': "'Newsreader', Georgia, serif",
    '--font-display': "'Libre Baskerville', Georgia, serif",
  },
  emailSelectionInModal: false,
  Layout: BlackAndWhiteLayout,
}
