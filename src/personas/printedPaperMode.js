import PrintedPaperModeLayout from '../layouts/PrintedPaperModeLayout'

export default {
  id: 'printedPaperMode',
  label: 'Printed on paper mode',
  emoji: '📄',
  description: 'Warm stock, margin punch holes, and the hum of a sleepy office printer.',
  fonts: ['Courier+Prime:ital,wght@0,400;0,700;1,400'],
  cssVars: {
    '--bg': '#d4cfc4',
    '--bg2': '#c4bdb0',
    '--text': '#1c1917',
    '--text2': '#44403c',
    '--accent': '#78350f',
    '--accent2': '#57534e',
    '--border': '#a8a29e',
    '--card': '#faf8f3',
    '--font-main': "'Courier Prime', monospace",
    '--font-display': "'Courier Prime', monospace",
  },
  emailSelectionInModal: true,
  Layout: PrintedPaperModeLayout,
}
