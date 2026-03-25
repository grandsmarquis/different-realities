import SuperSlowInternetLayout from '../layouts/SuperSlowInternetLayout'

export default {
  id: 'superSlowInternet',
  label: 'Internet is super slow',
  emoji: '🐌',
  description: 'Dial-up dreams, buffering panels, snail-paced packets, and a bandwidth meter that flatlines with style.',
  fonts: ['Chakra+Petch:wght@400;600;700', 'Bungee'],
  cssVars: {
    '--bg': '#0c1220',
    '--bg2': '#151d32',
    '--text': '#e8f0ff',
    '--text2': '#8b9dc3',
    '--accent': '#22d3ee',
    '--accent2': '#fbbf24',
    '--accent3': '#a78bfa',
    '--border': '#2d3a55',
    '--card': '#141c2e',
    '--font-main': "'Chakra Petch', sans-serif",
    '--font-display': "'Bungee', cursive",
  },
  emailSelectionInModal: true,
  Layout: SuperSlowInternetLayout,
}
