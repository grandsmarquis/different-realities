import YogaTeacherLayout from '../layouts/YogaTeacherLayout'

export default {
  id: 'yogaTeacher',
  label: 'Yoga Teacher',
  emoji: '🧘‍♀️',
  description: 'Sunrise studio: lotus mail, prana weather, cork-board sangha news & abundance flow tickers.',
  fonts: ['Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400', 'Nunito:wght@400;600;700'],
  cssVars: {
    '--bg': '#fdf6f0',
    '--bg2': '#f2ebe3',
    '--text': '#2a2218',
    '--text2': '#6e5f52',
    '--accent': '#c45c3e',
    '--accent2': '#5d8a6a',
    '--accent3': '#9b7ebd',
    '--border': '#dcc8b8',
    '--card': '#fffaf6',
    '--font-main': "'Nunito', system-ui, sans-serif",
    '--font-display': "'Fraunces', Georgia, serif",
  },
  emailSelectionInModal: true,
  Layout: YogaTeacherLayout,
}
