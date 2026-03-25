import Win98Layout from '../layouts/Win98Layout'

const win98 = {
  id: 'win98',
  label: 'Windows 98',
  emoji: '🖥️',
  description: 'Start me up. It\'s loading.',
  fonts: [],
  cssVars: {
    '--bg': '#008080',
    '--bg2': '#c0c0c0',
    '--text': '#000000',
    '--text2': '#808080',
    '--accent': '#000080',
    '--accent2': '#1084d0',
    '--border': '#808080',
    '--card': '#c0c0c0',
    '--font-main': "'Tahoma', 'Arial', sans-serif",
    '--font-display': "'Tahoma', 'Arial', sans-serif",
  },
  Layout: Win98Layout,
}

export default win98
