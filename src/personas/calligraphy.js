import CalligraphyLayout from '../layouts/CalligraphyLayout'

const calligraphy = {
  id: 'calligraphy',
  label: 'Calligraphy lover',
  emoji: '🖋️',
  description: 'Feathered ink, swirling flourishes, and your inbox written like poetry — with weather, news, and stonks in tasteful script.',
  fonts: ['Great+Vibes', 'Cormorant+Garamond:wght@400;600;700'],
  cssVars: {
    '--bg': '#fff7e6',
    '--bg2': '#fce7f3',
    '--text': '#231a12',
    '--text2': '#5b4631',
    '--accent': '#7c2d12',
    '--accent2': '#0ea5e9',
    '--border': '#d9b98a',
    '--card': '#fffaf1',
    '--font-main': "'Cormorant Garamond', serif",
    '--font-display': "'Great Vibes', cursive",
  },
  emailSelectionInModal: true,
  Layout: CalligraphyLayout,
}

export default calligraphy

