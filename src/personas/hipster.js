import HipsterLayout from '../layouts/HipsterLayout'

const hipster = {
  id: 'hipster',
  label: 'Minimalist Hipster',
  emoji: '🌿',
  description: 'Less is more. Silence is design.',
  fonts: ['DM+Sans:ital,wght@0,200;0,300;0,400;1,200;1,300'],
  cssVars: {
    '--bg': '#f9f8f6',
    '--bg2': '#f0ede8',
    '--text': '#1a1a18',
    '--text2': '#9c9990',
    '--accent': '#1a1a18',
    '--accent2': '#555550',
    '--border': '#e2ddd8',
    '--card': '#f9f8f6',
    '--font-main': "'DM Sans', sans-serif",
    '--font-display': "'DM Sans', sans-serif",
  },
  Layout: HipsterLayout,
}

export default hipster
