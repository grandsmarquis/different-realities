import SerialKillerLayout from '../layouts/SerialKillerLayout'

const serialKiller = {
  id: 'serialKiller',
  label: 'Serial Killer (movie trope)',
  emoji: '🔪',
  description: 'Slasher-flick parody UI — meticulous, dramatic, totally fictional.',
  fonts: ['Metal+Mania', 'DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400'],
  cssVars: {
    '--bg': '#0c0a0a',
    '--bg2': '#141010',
    '--text': '#f5f5f4',
    '--text2': '#a8a29e',
    '--accent': '#dc2626',
    '--accent2': '#f87171',
    '--border': '#44403c',
    '--card': '#171717',
    '--font-main': "'DM Sans', sans-serif",
    '--font-display': "'Metal Mania', cursive",
  },
  emailSelectionInModal: true,
  Layout: SerialKillerLayout,
}

export default serialKiller
