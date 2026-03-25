import SoonReplacedByAiDevLayout from '../layouts/SoonReplacedByAiDevLayout'

export default {
  id: 'soonReplacedByAiDev',
  label: 'Soon replaced by AI (dev)',
  emoji: '🤖',
  description:
    'Deprecation HUD: ticket inbox, streaming “AI summary,” WEATHER.runtime, CHANGELOG news, and positions-you-still-grok stonks — with amber panic chrome.',
  fonts: ['Space Grotesk:wght@500;700', 'JetBrains Mono:wght@400;600'],
  cssVars: {
    '--bg': '#0f1419',
    '--bg2': '#151c24',
    '--text': '#e2e8f0',
    '--text2': '#94a3b8',
    '--accent': '#fbbf24',
    '--accent2': '#22d3ee',
    '--border': 'rgba(251, 191, 36, 0.25)',
    '--card': 'rgba(30, 41, 59, 0.6)',
    '--font-main': "'JetBrains Mono', monospace",
    '--font-display': "'Space Grotesk', sans-serif",
  },
  Layout: SoonReplacedByAiDevLayout,
}
