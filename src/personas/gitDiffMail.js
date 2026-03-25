import GitDiffMailLayout from '../layouts/GitDiffMailLayout'

export default {
  id: 'gitDiffMail',
  label: 'Reading mail as git diff',
  emoji: '📟',
  description:
    'Unified hunks, blame headers, and a fake commit graph — inbox as patches, weather as sky.yml, news as git log, stonks as green/red lines.',
  fonts: ['JetBrains Mono:wght@400;600;700', 'Space+Grotesk:wght@500;600'],
  cssVars: {
    '--bg': '#0d1117',
    '--bg2': '#161b22',
    '--text': '#c9d1d9',
    '--text2': '#8b949e',
    '--accent': '#58a6ff',
    '--accent2': '#3fb950',
    '--accent3': '#a371f7',
    '--border': '#30363d',
    '--card': '#161b22',
    '--font-main': "'JetBrains Mono', ui-monospace, monospace",
    '--font-display': "'Space Grotesk', sans-serif",
  },
  Layout: GitDiffMailLayout,
}
