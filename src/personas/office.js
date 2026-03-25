import OfficeLayout from '../layouts/OfficeLayout'

const office = {
  id: 'office',
  label: 'Office Worker',
  emoji: '💼',
  description: 'Efficient, corporate, no-nonsense',
  fonts: ['Inter:wght@300;400;500;600'],
  cssVars: {
    '--bg': '#f0f2f5',
    '--bg2': '#e4e6ea',
    '--text': '#1c1e21',
    '--text2': '#65676b',
    '--accent': '#0f4c81',
    '--accent2': '#1877f2',
    '--border': '#dde0e4',
    '--card': '#ffffff',
    '--font-main': "'Inter', sans-serif",
    '--font-display': "'Inter', sans-serif",
  },
  Layout: OfficeLayout,
}

export default office
