import ProductivityLayout from '../layouts/ProductivityLayout'
const productivity = {
  id: 'productivity', label: 'Productivity Guru', emoji: '⏱️',
  description: 'Every second is a choice.',
  fonts: ['Rubik:wght@300;400;500;700'],
  cssVars: {
    '--bg': '#fafaf8', '--bg2': '#f0f0ec', '--text': '#1a1a16', '--text2': '#6a6a60',
    '--accent': '#ef4444', '--accent2': '#f97316', '--accent3': '#10b981',
    '--border': '#e0e0d8', '--card': '#ffffff',
    '--font-main': "'Rubik', sans-serif", '--font-display': "'Rubik', sans-serif",
  }, Layout: ProductivityLayout,
}
export default productivity
