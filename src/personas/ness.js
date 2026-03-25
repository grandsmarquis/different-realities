import NessLayout from '../layouts/NessLayout'

const ness = {
  id: 'ness',
  label: 'PK kid (Onett)',
  emoji: '🌟',
  description: 'Retro RPG battle menu · SMAAAASH that inbox',
  fonts: ['Press+Start+2P', 'VT323'],
  cssVars: {
    '--bg': '#1a2f1a',
    '--bg2': '#0f1f12',
    '--text': '#f8ffe8',
    '--text2': '#9bc49a',
    '--accent': '#7cff6a',
    '--accent2': '#ff6b9d',
    '--accent3': '#ffd93d',
    '--border': '#3d5c3d',
    '--card': '#243824',
    '--font-main': "'VT323', monospace",
    '--font-display': "'Press Start 2P', monospace",
  },
  Layout: NessLayout,
}

export default ness
