import MjImpersonatorLayout from '../layouts/MjImpersonatorLayout'

export default {
  id: 'mjImpersonator',
  label: 'MJ tribute impersonator',
  emoji: '🎤',
  description:
    'Arena lights, dance-floor chrome, backstage inbox — weather, stocks & news for a pro pop tribute act (parody).',
  fonts: ['Monoton', 'Outfit:wght@400;600;700'],
  cssVars: {
    '--bg': '#0a0a0f',
    '--bg2': '#1c0a12',
    '--text': '#fef3c7',
    '--text2': '#fcd34d',
    '--accent': '#fbbf24',
    '--accent2': '#dc2626',
    '--accent3': '#1e293b',
    '--border': 'rgba(251, 191, 36, 0.35)',
    '--card': 'rgba(15, 10, 18, 0.85)',
    '--font-main': "'Outfit', sans-serif",
    '--font-display': "'Monoton', cursive",
  },
  Layout: MjImpersonatorLayout,
}
