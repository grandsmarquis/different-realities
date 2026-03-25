import ExcelInboxLayout from '../layouts/ExcelInboxLayout'

export default {
  id: 'excelInbox',
  label: 'Email in EXCELL.EXE',
  emoji: '📗',
  description:
    'Outlook is overrated. Every message is a row, every feeling is a formula, and the paperclip is back from retirement.',
  fonts: [],
  cssVars: {
    '--bg': '#1d6f42',
    '--bg2': '#0f5132',
    '--text': '#f3faf6',
    '--text2': '#a8d5c4',
    '--accent': '#92d050',
    '--accent2': '#ffc000',
    '--border': '#2d8f5a',
    '--card': '#ffffff',
    '--font-main': "'Segoe UI', 'Calibri', system-ui, sans-serif",
    '--font-display': "'Segoe UI Semibold', 'Calibri', system-ui, sans-serif",
  },
  emailSelectionInModal: true,
  Layout: ExcelInboxLayout,
}
