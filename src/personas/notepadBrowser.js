import NotepadBrowserLayout from '../layouts/NotepadBrowserLayout'

export default {
  id: 'notepadBrowser',
  label: 'Browsing in Notepad.exe',
  emoji: '📝',
  description: 'The whole internet is just .txt files if you try hard enough. Tabs, ASCII art, and a spider on your desktop.',
  fonts: [],
  cssVars: {
    '--bg': '#1b263b',
    '--bg2': '#293241',
    '--text': '#e0e1dd',
    '--text2': '#778da9',
    '--accent': '#0078d4',
    '--accent2': '#90e0ef',
    '--border': '#415a77',
    '--card': '#ececec',
    '--font-main': "'Segoe UI', 'Tahoma', system-ui, sans-serif",
    '--font-display': "'Segoe UI', 'Tahoma', system-ui, sans-serif",
  },
  emailSelectionInModal: true,
  Layout: NotepadBrowserLayout,
}
