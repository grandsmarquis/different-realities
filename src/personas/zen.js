import ZenMonkLayout from '../layouts/ZenMonkLayout'

const zen = {
  id: 'zen',
  label: 'Zen Monk',
  emoji: '🧘',
  description: 'The inbox is empty. So are you.',
  fonts: ['Noto+Serif:ital,wght@0,400;0,700;1,400', 'Noto+Serif+JP:wght@300;400'],
  cssVars: {
    '--bg': '#f7f3ec',
    '--bg2': '#ede7d8',
    '--text': '#1a1208',
    '--text2': '#6b5e40',
    '--accent': '#2c1810',
    '--accent2': '#7a5c3a',
    '--border': '#c8b480',
    '--card': '#faf8f2',
    '--font-main': "'Noto Serif', serif",
    '--font-display': "'Noto Serif JP', serif",
  },
  // Full-page reading mode: inbox list hidden while an email is selected
  emailSelectionInModal: true,
  Layout: ZenMonkLayout,
}

export default zen
