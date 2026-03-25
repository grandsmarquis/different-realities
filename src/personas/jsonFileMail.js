import JsonFileMailLayout from '../layouts/JsonFileMailLayout'

export default {
  id: 'jsonFileMail',
  label: 'Watching mail in a JSON file',
  emoji: '📄',
  description:
    'Dracula-syntax reality dump: floating brackets, file watcher pulse, hot-reload toasts — inbox, weather, headlines & stonks as pretty-printed JSON.',
  fonts: ['Fira Code:wght@400;600', 'Outfit:wght@500;700'],
  cssVars: {
    '--bg': '#0d0d14',
    '--bg2': '#1e1f29',
    '--text': '#f8f8f2',
    '--text2': '#6272a4',
    '--accent': '#bd93f9',
    '--accent2': '#ff79c6',
    '--accent3': '#50fa7b',
    '--border': '#44475a',
    '--card': '#282a36',
    '--font-main': "'Fira Code', ui-monospace, monospace",
    '--font-display': "'Outfit', sans-serif",
  },
  Layout: JsonFileMailLayout,
}
