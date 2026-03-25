import PostApocalypseLayout from '../layouts/PostApocalypseLayout'

export default {
  id: 'postApocalypse',
  label: 'Post-apocalyptic offline archive',
  emoji: '☢️',
  description: 'Cached humanity. Green phosphor. Signal lost.',
  fonts: ['Share+Tech+Mono'],
  cssVars: {
    '--bg': '#030805',
    '--bg2': '#051208',
    '--text': '#4ade80',
    '--text2': '#22c55e',
    '--accent': '#86efac',
    '--accent2': '#166534',
    '--border': '#14532d',
    '--card': '#052e16',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Share Tech Mono', monospace",
  },
  emailSelectionInModal: true,
  Layout: PostApocalypseLayout,
}
