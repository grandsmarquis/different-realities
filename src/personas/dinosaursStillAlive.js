import DinosaursStillAliveLayout from '../layouts/DinosaursStillAliveLayout'

export default {
  id: 'dinosaursStillAlive',
  label: 'If dinosaurs were still alive',
  emoji: '🦖',
  description: 'Mesozoic terminal: amber inbox, herd stocks, canopy weather, swamp news.',
  fonts: ['Abril Fatface', 'Nunito:wght@400;700'],
  cssVars: {
    '--bg': '#0c1912',
    '--bg2': '#14532d',
    '--text': '#ecfdf5',
    '--text2': '#a7f3d0',
    '--accent': '#fbbf24',
    '--accent2': '#34d399',
    '--accent3': '#422006',
    '--border': 'rgba(6, 78, 59, 0.5)',
    '--card': 'rgba(20, 83, 45, 0.45)',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Abril Fatface', serif",
  },
  Layout: DinosaursStillAliveLayout,
}
