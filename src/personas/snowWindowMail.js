import SnowWindowMailLayout from '../layouts/SnowWindowMailLayout'

export default {
  id: 'snowWindowMail',
  label: 'Watching mails by the snow window',
  emoji: '❄️',
  description: 'A frosted-glass inbox: snowfall outside, condensation inside, and weather/news/stocks pinned like winter postcards.',
  fonts: ['Fraunces', 'Plus Jakarta Sans:wght@400;600;800'],
  cssVars: {
    '--bg': '#070b18',
    '--bg2': '#0b1730',
    '--text': '#eaf3ff',
    '--text2': '#9bb7e8',
    '--accent': '#60a5fa',
    '--accent2': '#7dd3fc',
    '--accent3': '#93c5fd',
    '--border': 'rgba(147, 197, 253, 0.25)',
    '--card': 'rgba(10, 18, 40, 0.55)',
    '--font-main': "'Plus Jakarta Sans', system-ui, sans-serif",
    '--font-display': "'Fraunces', serif",
  },
  Layout: SnowWindowMailLayout,
}

