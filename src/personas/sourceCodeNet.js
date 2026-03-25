import SourceCodeNetLayout from '../layouts/SourceCodeNetLayout'

export default {
  id: 'sourceCodeNet',
  label: 'Net as source code',
  emoji: '👁️‍🗨️',
  description: 'The web decompiled: inbox as TS packets, weather as .env, news as XML, markets as Rust — matrix rain & recompile flashes.',
  fonts: ['Fira+Code:wght@400;600', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#050810',
    '--bg2': '#0d1117',
    '--text': '#c9d1d9',
    '--text2': '#8b949e',
    '--accent': '#7ee787',
    '--accent2': '#39ff7e',
    '--accent3': '#d2a8ff',
    '--border': '#30363d',
    '--card': '#161b22',
    '--font-main': "'Fira Code', ui-monospace, monospace",
    '--font-display': "'Share Tech Mono', ui-monospace, monospace",
  },
  emailSelectionInModal: true,
  Layout: SourceCodeNetLayout,
}
