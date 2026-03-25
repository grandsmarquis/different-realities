import StartupFounderLayout from '../layouts/StartupFounderLayout'

const startupFounder = {
  id: 'startupFounder',
  label: 'You are a startup founder',
  emoji: '🦄',
  description:
    'Pitch-deck war room: runway glow, hockey-stick charts, “deal flow” inbox, offsite weather & signal ticker — same data, founder brain.',
  fonts: ['Syne:wght@400;600;700;800', 'DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400'],
  cssVars: {
    '--bg': '#070a12',
    '--bg2': '#0f1424',
    '--text': '#e2e8f0',
    '--text2': '#94a3b8',
    '--accent': '#c084fc',
    '--accent2': '#fb7185',
    '--accent3': '#34d399',
    '--border': '#1e293b',
    '--card': '#111827',
    '--font-main': "'DM Sans', sans-serif",
    '--font-display': "'Syne', sans-serif",
  },
  Layout: StartupFounderLayout,
}

export default startupFounder
