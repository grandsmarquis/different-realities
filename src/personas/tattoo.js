import TattooLayout from '../layouts/TattooLayout'

const tattoo = {
  id: 'tattoo',
  label: 'Tattoo Studio Artist',
  emoji: '🖋️',
  description: 'Every email leaves a mark.',
  fonts: ['Bebas+Neue', 'Crimson+Text'],
  cssVars: {
    '--bg': '#0d0c0b',
    '--bg2': '#161311',
    '--text': '#e8e0d5',
    '--text2': '#8a7f72',
    '--accent': '#c45c26',
    '--accent2': '#f4e4c1',
    '--accent3': '#4a1515',
    '--border': '#2a2420',
    '--card': '#12100e',
    '--font-main': "'Crimson Text', serif",
    '--font-display': "'Bebas Neue', sans-serif",
  },
  Layout: TattooLayout,
}

export default tattoo
