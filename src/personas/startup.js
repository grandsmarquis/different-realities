import StartupBroLayout from '../layouts/StartupBroLayout'

const startup = {
  id: 'startup',
  label: 'Startup Bro',
  emoji: '🚀',
  description: 'Move fast. Break inbox.',
  fonts: ['Poppins:wght@400;600;700;800'],
  cssVars: {
    '--bg': '#ffffff',
    '--bg2': '#f8faff',
    '--text': '#0a0a1a',
    '--text2': '#6b7280',
    '--accent': '#6366f1',
    '--accent2': '#f97316',
    '--accent3': '#10b981',
    '--border': '#e5e7eb',
    '--card': '#ffffff',
    '--font-main': "'Poppins', sans-serif",
    '--font-display': "'Poppins', sans-serif",
  },
  Layout: StartupBroLayout,
}

export default startup
