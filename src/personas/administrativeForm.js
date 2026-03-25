import AdministrativeFormLayout from '../layouts/AdministrativeFormLayout'

export default {
  id: 'administrativeForm',
  label: 'The web is a government form',
  emoji: '📋',
  description:
    'Inbox, weather, news, and stocks filed as triplicate paperwork: stamps, signatures, progress bars, and zero actual red tape.',
  fonts: ['Special+Elite'],
  cssVars: {
    '--bg': '#e8dcc8',
    '--bg2': '#d4c4a8',
    '--text': '#2c2416',
    '--text2': '#6b5b45',
    '--accent': '#166534',
    '--accent2': '#991b1b',
    '--border': '#8b7355',
    '--card': '#fffdf8',
    '--font-main': "'Special Elite', 'Courier New', ui-monospace, monospace",
    '--font-display': "'Special Elite', 'Courier New', ui-monospace, monospace",
  },
  emailSelectionInModal: true,
  Layout: AdministrativeFormLayout,
}
