import OnlyFansCreatorLayout from '../layouts/OnlyFansCreatorLayout'

const onlyFansCreator = {
  id: 'onlyFansCreator',
  label: 'OnlyFans creator',
  emoji: '✨',
  description: 'Subscriber HQ — fan mail, glow check, bag status & timeline tea.',
  fonts: ['Outfit:wght@400;600;700', 'Righteous'],
  cssVars: {
    '--bg': '#0f0618',
    '--bg2': '#1a0a2e',
    '--text': '#fff5fb',
    '--text2': '#e9d5ff',
    '--accent': '#ff2d95',
    '--accent2': '#22d3ee',
    '--accent3': '#a78bfa',
    '--border': 'rgba(255, 45, 149, 0.35)',
    '--card': '#16081f',
    '--font-main': "'Outfit', sans-serif",
    '--font-display': "'Righteous', cursive",
  },
  Layout: OnlyFansCreatorLayout,
}

export default onlyFansCreator
