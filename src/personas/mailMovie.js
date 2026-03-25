import MovieMailLayout from '../layouts/MovieMailLayout'

export default {
  id: 'mailMovie',
  label: 'Watching your mails as a movie',
  emoji: '🍿',
  description:
    'Cinema night for your inbox: scene changes, spotlight beams, popcorn physics, marquee tickers — plus weather as atmosphere, news as end credits, and stocks as box-office posters.',
  fonts: ['Bebas+Neue', 'Saira+Condensed:wght@400;600;700'],
  cssVars: {
    '--bg': '#07060a',
    '--bg2': '#120b18',
    '--text': '#f6f1ff',
    '--text2': '#b9a7d6',
    '--accent': '#ff3cac',
    '--accent2': '#2bd2ff',
    '--accent3': '#fbbf24',
    '--border': 'rgba(255, 255, 255, 0.12)',
    '--card': 'rgba(20, 12, 30, 0.72)',
    '--font-main': "'Saira Condensed', system-ui, sans-serif",
    '--font-display': "'Bebas Neue', system-ui, sans-serif",
  },
  Layout: MovieMailLayout,
}
