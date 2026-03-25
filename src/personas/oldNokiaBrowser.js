import OldNokiaBrowserLayout from '../layouts/OldNokiaBrowserLayout'

const oldNokiaBrowser = {
  id: 'oldNokiaBrowser',
  label: 'Old Nokia WAP',
  emoji: '📟',
  description: 'GPRS at 9.6 kbps. Snake high score still unbeaten.',
  fonts: ['VT323'],
  cssVars: {
    '--bg': '#1c2220',
    '--bg2': '#2a3230',
    '--text': '#c5ff9e',
    '--text2': '#5a8f52',
    '--accent': '#e8ffc8',
    '--accent2': '#2d4a2d',
    '--border': '#3d5c45',
    '--card': '#0a140c',
    '--font-main': "'VT323', monospace",
    '--font-display': "'VT323', monospace",
  },
  emailSelectionInModal: true,
  Layout: OldNokiaBrowserLayout,
}

export default oldNokiaBrowser
