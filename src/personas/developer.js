import DeveloperLayout from '../layouts/DeveloperLayout'

export default {
  id: 'developer',
  label: 'Developer',
  emoji: '💻',
  description: 'IDE workspace: file-tree inbox, TS editor, weather.json, package quotes, RSS panel, terminal.',
  fonts: ['JetBrains Mono:wght@400;600', 'Inter:wght@400;600'],
  cssVars: {
    '--bg': '#1e1e1e',
    '--bg2': '#252526',
    '--text': '#d4d4d4',
    '--text2': '#858585',
    '--accent': '#569cd6',
    '--accent2': '#4ec9b0',
    '--accent3': '#c586c0',
    '--border': '#3c3c3c',
    '--card': '#252526',
    '--font-main': "'JetBrains Mono', monospace",
    '--font-display': "'Inter', sans-serif",
  },
  Layout: DeveloperLayout,
}
