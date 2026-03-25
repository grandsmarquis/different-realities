import SwissPatriotLayout from '../layouts/SwissPatriotLayout'

export default {
  id: 'swissPatriot',
  label: 'Swiss patriot',
  emoji: '🇨🇭',
  description: 'Bundes-Inbox on alpine time: flag geometry, SIX-style tickers, MeteoSchweiz flair, and a ringing cowbell.',
  fonts: ['Syne:wght@400;600;800', 'IBM+Plex+Mono:wght@400;600'],
  cssVars: {
    '--bg': '#450a0a',
    '--bg2': '#7f1d1d',
    '--text': '#fef2f2',
    '--text2': '#fecaca',
    '--accent': '#ffffff',
    '--accent2': '#f97316',
    '--accent3': '#fde047',
    '--border': 'rgba(255, 255, 255, 0.2)',
    '--card': 'rgba(127, 29, 29, 0.92)',
    '--font-main': "'Syne', sans-serif",
    '--font-display': "'Syne', sans-serif",
    '--font-mono': "'IBM Plex Mono', monospace",
  },
  Layout: SwissPatriotLayout,
}
