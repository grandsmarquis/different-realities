import SpaceLayout from '../layouts/SpaceLayout'
const space = {
  id: 'space', label: 'Mission Control', emoji: '🚀',
  description: 'T-minus. Telemetry nominal.',
  fonts: ['Space+Mono:wght@400;700', 'Exo+2:wght@300;400;600;700'],
  cssVars: {
    '--bg': '#030b1a', '--bg2': '#050f22', '--text': '#e8a040', '--text2': '#8a6020',
    '--accent': '#00d4ff', '--accent2': '#ffa040', '--accent3': '#00ff88',
    '--border': '#0a2040', '--card': '#030d20',
    '--font-main': "'Space Mono', monospace", '--font-display': "'Exo 2', sans-serif",
  }, Layout: SpaceLayout,
}
export default space
