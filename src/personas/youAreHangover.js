import YouAreHangoverLayout from '../layouts/YouAreHangoverLayout'

export default {
  id: 'youAreHangover',
  label: 'You are hangover',
  emoji: '🕶️',
  description: 'Dim stone palette, blinds overlay, soft pulse, whisper UI.',
  fonts: ['Manrope:wght@300;400;600', 'Instrument+Serif:ital@0;1'],
  cssVars: {
    '--bg': '#1c1917',
    '--bg2': '#292524',
    '--text': '#d6d3d1',
    '--text2': '#78716c',
    '--accent': '#a8a29e',
    '--accent2': '#57534e',
    '--border': '#44403c',
    '--card': '#0c0a09',
    '--font-main': "'Manrope', sans-serif",
    '--font-display': "'Instrument Serif', serif",
  },
  emailSelectionInModal: false,
  Layout: YouAreHangoverLayout,
}
