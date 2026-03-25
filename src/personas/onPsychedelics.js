import OnPsychedelicsLayout from '../layouts/OnPsychedelicsLayout'

const onPsychedelics = {
  id: 'onPsychedelics',
  label: 'On psychedelics',
  emoji: '🌈',
  description: 'Maximum synesthesia: scanlines, vortex, marquee chaos, and inbox as cosmic joke.',
  fonts: ['Righteous', 'Nunito:wght@400;600;700'],
  cssVars: {
    '--bg': '#0a0418',
    '--bg2': '#12082c',
    '--text': '#f5f0ff',
    '--text2': '#a78bfa',
    '--accent': '#f472b6',
    '--accent2': '#22d3ee',
    '--accent3': '#a3e635',
    '--accent4': '#fbbf24',
    '--card': 'rgba(30, 15, 55, 0.65)',
    '--border': 'rgba(167, 139, 250, 0.35)',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Righteous', cursive",
  },
  Layout: OnPsychedelicsLayout,
}

export default onPsychedelics
