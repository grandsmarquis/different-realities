import DataAnalystLayout from '../layouts/DataAnalystLayout'

const analyst = {
  id: 'analyst',
  label: 'Data Analyst',
  emoji: '📊',
  description: 'In God we trust. All others bring data.',
  fonts: ['Roboto:wght@300;400;500;700', 'Roboto+Mono:wght@400;600'],
  cssVars: {
    '--bg': '#f0f4f8',
    '--bg2': '#e2e8f0',
    '--text': '#1a202c',
    '--text2': '#718096',
    '--accent': '#3182ce',
    '--accent2': '#ed8936',
    '--accent3': '#48bb78',
    '--border': '#cbd5e0',
    '--card': '#ffffff',
    '--font-main': "'Roboto', sans-serif",
    '--font-display': "'Roboto', sans-serif",
  },
  Layout: DataAnalystLayout,
}

export default analyst
