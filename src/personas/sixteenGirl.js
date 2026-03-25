import SixteenGirlLayout from '../layouts/SixteenGirlLayout'

const sixteenGirl = {
  id: 'sixteenGirl',
  label: "You're 16 (girl era)",
  emoji: '🦋',
  description: 'Y2K locker · holographic chrome · polaroid inbox · washi-tape tea',
  fonts: ['Satisfy', 'Plus+Jakarta+Sans:wght@400;500;600;700;800'],
  cssVars: {
    '--bg': '#fff5fb',
    '--bg2': '#f5f3ff',
    '--text': '#3b1f4a',
    '--text2': '#7c6b8a',
    '--accent': '#ec4899',
    '--accent2': '#a855f7',
    '--accent3': '#22d3ee',
    '--border': '#e9d5ff',
    '--card': 'rgba(255, 255, 255, 0.92)',
    '--font-main': "'Plus Jakarta Sans', sans-serif",
    '--font-display': "'Satisfy', cursive",
  },
  emailSelectionInModal: true,
  Layout: SixteenGirlLayout,
}

export default sixteenGirl
