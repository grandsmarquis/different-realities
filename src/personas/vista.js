import VistaLayout from '../layouts/VistaLayout'

const vista = {
  id: 'vista',
  label: 'Windows Vista',
  emoji: '🔷',
  description: 'Aero Glass. Dream. Crash.',
  fonts: ['Nunito:wght@300;400;500;600;700'],
  cssVars: {
    '--bg': '#0a1628',
    '--bg2': 'rgba(255,255,255,0.08)',
    '--text': '#ffffff',
    '--text2': 'rgba(255,255,255,0.65)',
    '--accent': '#4fb3e8',
    '--accent2': '#2a7dd4',
    '--accent3': '#70c8a8',
    '--border': 'rgba(255,255,255,0.22)',
    '--card': 'rgba(255,255,255,0.1)',
    '--font-main': "'Nunito', 'Segoe UI', sans-serif",
    '--font-display': "'Nunito', 'Segoe UI', sans-serif",
  },
  Layout: VistaLayout,
}

export default vista
