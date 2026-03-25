import MisterBeastLayout from '../layouts/MisterBeastLayout'

export default {
  id: 'misterBeast',
  label: 'Mister Beast',
  emoji: '🎁',
  description: 'Challenge-mode dashboard: countdown giveaways, stonk stunts, and ticket emails with confetti energy.',
  fonts: ['Bungee', 'Bebas Neue', 'Inter:wght@400;600;700'],
  cssVars: {
    '--bg': '#070a12',
    '--bg2': '#061b12',
    '--text': '#e6fffa',
    '--text2': '#a7f3d0',
    '--accent': '#22c55e',
    '--accent2': '#16a34a',
    '--accent3': '#fbbf24',
    '--border': '#1f2a2a',
    '--card': '#0b1a13',
    '--font-main': "'Inter', sans-serif",
    '--font-display': "'Bungee', cursive",
  },
  Layout: MisterBeastLayout,
}

