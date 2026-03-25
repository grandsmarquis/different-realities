import DiscoLayout from '../layouts/DiscoLayout'

export default {
  id: 'discoWeb',
  label: 'The web is disco — make it dance',
  emoji: '🪩',
  description: 'Mirror ball, neon, and your inbox doing the hustle. No cover charge.',
  fonts: ['Monoton:wght@400', 'Outfit:wght@400;600;700'],
  cssVars: {
    '--bg': '#0f0518',
    '--bg2': '#2e1064',
    '--text': '#fdf4ff',
    '--text2': '#f0abfc',
    '--accent': '#e879f9',
    '--accent2': '#22d3ee',
    '--border': 'rgba(232, 121, 249, 0.45)',
    '--card': '#3b0764',
    '--font-main': "'Outfit', sans-serif",
    '--font-display': "'Monoton', cursive",
  },
  emailSelectionInModal: true,
  Layout: DiscoLayout,
}
