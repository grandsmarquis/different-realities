import DeathMetalLoverLayout from '../layouts/DeathMetalLoverLayout'

const deathMetalLover = {
  id: 'deathMetalLover',
  label: 'Death metal lover',
  emoji: '🤘',
  description: 'Infernal gig-poster HQ: lightning, setlist mail, corpse tickers & blasphemous headlines — same data, louder.',
  fonts: ['Metal+Mania', 'Oswald:wght@400;600;700'],
  cssVars: {
    '--bg': '#070508',
    '--bg2': '#12080e',
    '--text': '#e8e4dc',
    '--text2': '#8a8580',
    '--blood': '#c41e1e',
    '--blood2': '#7a0c0c',
    '--sulfur': '#e8c547',
    '--frost': '#6eb8c9',
    '--pit': '#1a0a12',
    '--font-main': "'Oswald', system-ui, sans-serif",
    '--font-display': "'Metal Mania', fantasy, serif",
  },
  Layout: DeathMetalLoverLayout,
}

export default deathMetalLover
