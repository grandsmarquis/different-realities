import ChildCrayonsLayout from '../layouts/ChildCrayonsLayout'

const child = {
  id: 'child',
  label: 'Child with Crayons',
  emoji: '🖍️',
  description: 'I drawed it myself!!!',
  fonts: ['Caveat:wght@400;600;700', 'Schoolbell'],
  cssVars: {
    '--bg': '#fef9c3',
    '--bg2': '#fce7f3',
    '--text': '#1d4ed8',
    '--text2': '#7c3aed',
    '--accent': '#dc2626',
    '--accent2': '#16a34a',
    '--accent3': '#ea580c',
    '--border': '#f97316',
    '--card': '#ffffff',
    '--font-main': "'Caveat', cursive",
    '--font-display': "'Schoolbell', cursive",
  },
  Layout: ChildCrayonsLayout,
}

export default child
