import FirstIpadLayout from '../layouts/FirstIpadLayout'

export default {
  id: 'firstIpad',
  label: 'Browsing on the first iPad (2010)',
  emoji: '📱',
  description: 'Linen, glossy icons, and that magical pinch-to-zoom energy — before every tablet looked the same.',
  fonts: ['Inter:wght@400;500;600;700'],
  cssVars: {
    '--bg': '#2a2a32',
    '--bg2': '#1a1a22',
    '--text': '#1c1c1e',
    '--text2': '#636366',
    '--accent': '#007aff',
    '--accent2': '#34c759',
    '--border': '#c6c6c8',
    '--card': '#f2f2f7',
    '--font-main': "'Inter', system-ui, sans-serif",
  },
  emailSelectionInModal: false,
  Layout: FirstIpadLayout,
}
