import SmartwatchMailLayout from '../layouts/SmartwatchMailLayout'

export default {
  id: 'smartwatchMail',
  label: 'Mail on a smartwatch',
  emoji: '⌚',
  description:
    'Tiny bezel, giant chaos: wrist HUD with complications, crown scroll, ticker news, sparkline stonks & bubble mail.',
  fonts: ['Orbitron:wght@500;700', 'Nunito:wght@400;600;700'],
  cssVars: {
    '--bg': '#070b14',
    '--bg2': '#0f172a',
    '--text': '#e2e8f0',
    '--text2': '#94a3b8',
    '--accent': '#38bdf8',
    '--accent2': '#a78bfa',
    '--border': '#334155',
    '--card': '#1e293b',
    '--watch-screen': '#020617',
    '--sw-up': '#34d399',
    '--sw-down': '#fb7185',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Orbitron', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: SmartwatchMailLayout,
}
