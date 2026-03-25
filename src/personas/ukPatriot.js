import UkPatriotLayout from '../layouts/UkPatriotLayout'

const ukPatriot = {
  id: 'ukPatriot',
  label: 'UK patriot',
  emoji: '🇬🇧',
  description: 'Proper post, proper weather chat, queue for the FTSE (metaphorically).',
  fonts: ['Alfa+Slab+One', 'Newsreader:ital,wght@0,400;0,600;0,700;1,400'],
  cssVars: {
    '--bg': '#0c1220',
    '--bg2': '#151d2e',
    '--text': '#f4f1ea',
    '--text2': '#a8b0c4',
    '--accent': '#c8102e',
    '--accent2': '#012169',
    '--accent3': '#ffd700',
    '--border': '#2d3a52',
    '--card': '#faf6ef',
    '--font-main': "'Newsreader', Georgia, serif",
    '--font-display': "'Alfa Slab One', serif",
  },
  emailSelectionInModal: true,
  Layout: UkPatriotLayout,
}

export default ukPatriot
