import AcademicResearcherLayout from '../layouts/AcademicResearcherLayout'

const academic = {
  id: 'academic',
  label: 'Academic Researcher',
  emoji: '📚',
  description: 'Cite your sources. All of them.',
  fonts: ['EB+Garamond:ital,wght@0,400;0,600;1,400;1,600', 'Libre+Baskerville:ital,wght@0,400;0,700;1,400'],
  cssVars: {
    '--bg': '#f8f5ee',
    '--bg2': '#eeeada',
    '--text': '#1a1510',
    '--text2': '#5a5040',
    '--accent': '#1e3a5f',
    '--accent2': '#8b6914',
    '--border': '#d4c8a0',
    '--card': '#ffffff',
    '--font-main': "'EB Garamond', serif",
    '--font-display': "'Libre Baskerville', serif",
  },
  Layout: AcademicResearcherLayout,
}

export default academic
