import LotteryWinnerLayout from '../layouts/LotteryWinnerLayout'

export default {
  id: 'lotteryWinner',
  label: 'Lottery winner',
  emoji: '🎰',
  description: 'Jackpot concierge: confetti sky, VIP mail, diversify tickers, society-page news.',
  fonts: ['Syne:wght@600;700;800', 'Playfair Display:ital,wght@0,700;1,700'],
  cssVars: {
    '--bg': '#2e1065',
    '--bg2': '#4c1d95',
    '--text': '#fef3c7',
    '--text2': '#e9d5ff',
    '--accent': '#fbbf24',
    '--accent2': '#f472b6',
    '--accent3': '#38bdf8',
    '--border': 'rgba(251, 191, 36, 0.4)',
    '--card': 'rgba(46, 16, 101, 0.9)',
    '--font-main': "'Syne', sans-serif",
    '--font-display': "'Playfair Display', serif",
  },
  Layout: LotteryWinnerLayout,
}
