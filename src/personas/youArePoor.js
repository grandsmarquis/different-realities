import YouArePoorLayout from '../layouts/YouArePoorLayout'

export default {
  id: 'youArePoor',
  label: 'You are poor',
  emoji: '🍜',
  description: 'Free tier jokes, dashed borders, tiny charts, coupon energy.',
  fonts: ['Courier+Prime:wght@400;700'],
  cssVars: {
    '--bg': '#e7e5e4',
    '--bg2': '#d6d3d1',
    '--text': '#44403c',
    '--text2': '#78716c',
    '--accent': '#b45309',
    '--accent2': '#57534e',
    '--border': '#a8a29e',
    '--card': '#fafaf9',
    '--font-main': "'Courier Prime', monospace",
    '--font-display': "'Courier Prime', monospace",
  },
  emailSelectionInModal: true,
  Layout: YouArePoorLayout,
}
