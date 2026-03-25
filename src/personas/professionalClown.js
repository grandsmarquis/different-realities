import ProfessionalClownLayout from '../layouts/ProfessionalClownLayout'

const professionalClown = {
  id: 'professionalClown',
  label: 'Professional Clown',
  emoji: '🤡',
  description: 'Backstage briefing: inbox, weather, stocks — with honks.',
  fonts: ['Bungee', 'Comic+Neue'],
  cssVars: {
    '--bg': '#1a0d2e',
    '--bg2': '#312e81',
    '--text': '#fff8f0',
    '--text2': '#c4b5fd',
    '--accent': '#ec4899',
    '--accent2': '#fde047',
    '--accent3': '#22d3ee',
    '--border': '#7c3aed',
    '--card': '#3b0764',
    '--font-main': "'Comic Neue', cursive",
    '--font-display': "'Bungee', cursive",
  },
  Layout: ProfessionalClownLayout,
}

export default professionalClown
