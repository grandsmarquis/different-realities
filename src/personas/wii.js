import WiiLayout from '../layouts/WiiLayout'

const wii = {
  id: 'wii',
  label: 'Wii Menu',
  emoji: '📺',
  description: 'Grab a remote. Your mail is a channel.',
  fonts: ['Fredoka:wght@400;600', 'Nunito:wght@400;700'],
  cssVars: {
    '--bg': '#b8e5ff',
    '--bg2': '#dff2ff',
    '--text': '#0c4a6e',
    '--text2': '#0369a1',
    '--accent': '#0ea5e9',
    '--accent2': '#075985',
    '--accent3': '#f0f9ff',
    '--border': '#7dd3fc',
    '--card': '#ffffff',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Fredoka', sans-serif",
  },
  Layout: WiiLayout,
}

export default wii
