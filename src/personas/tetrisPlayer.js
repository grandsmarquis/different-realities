import TetrisPlayerLayout from '../layouts/TetrisPlayerLayout'

export default {
  id: 'tetrisPlayer',
  label: 'a tetris player',
  emoji: '🧱',
  description: 'Stack mail. Clear lines. No ceiling.',
  fonts: ['Press+Start+2P', 'IBM+Plex+Mono:wght@400;600'],
  cssVars: {
    '--bg': '#0a0a12',
    '--bg2': '#12121c',
    '--text': '#e8e8f0',
    '--text2': '#6a6a80',
    '--accent': '#00f0f0',
    '--accent2': '#f0f000',
    '--accent3': '#1a1a28',
    '--border': '#2a2a3c',
    '--card': '#14141f',
    '--font-main': "'IBM Plex Mono', monospace",
    '--font-display': "'Press Start 2P', monospace",
  },
  Layout: TetrisPlayerLayout,
}
