import OnePercentBatteryLayout from '../layouts/OnePercentBatteryLayout'

export default {
  id: 'onePercentBattery',
  label: 'You have 1% battery',
  emoji: '🪫',
  description: 'Low Power Mode: extreme. Flicker, panic stats, and the same inbox — just way more dramatic.',
  fonts: ['Orbitron:wght@500;700;900', 'Exo+2:wght@400;600;700'],
  cssVars: {
    '--bg': '#070708',
    '--bg2': '#121014',
    '--text': '#fef2f2',
    '--text2': '#a8a29e',
    '--accent': '#ef4444',
    '--accent2': '#fbbf24',
    '--accent-dim': '#7f1d1d',
    '--border': '#3f3f46',
    '--card': '#18181b',
    '--glow-red': 'rgba(239, 68, 68, 0.45)',
    '--font-main': "'Exo 2', sans-serif",
    '--font-display': "'Orbitron', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: OnePercentBatteryLayout,
}
