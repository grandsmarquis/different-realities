import SmurfFanLayout from '../layouts/SmurfFanLayout'

export default {
  id: 'smurfFan',
  label: 'smurf fan',
  emoji: '💙',
  description: 'La-la-la-la-la-la inbox.',
  fonts: ['Fredoka:wght@400;600;700', 'Sniglet:wght@400;800'],
  cssVars: {
    '--bg': '#0d47a1',
    '--bg2': '#1565c0',
    '--text': '#ffffff',
    '--text2': '#bbdefb',
    '--accent': '#29b6f6',
    '--accent2': '#01579b',
    '--accent3': '#0277bd',
    '--border': '#42a5f5',
    '--card': '#e3f2fd',
    '--font-main': "'Fredoka', sans-serif",
    '--font-display': "'Sniglet', cursive",
  },
  Layout: SmurfFanLayout,
}
