import PowerPointBrowserLayout from '../layouts/PowerPointBrowserLayout'

export default {
  id: 'powerpointBrowser',
  label: 'Browsing via PowerPoint',
  emoji: '📊',
  description:
    'Your inbox, weather, headlines, and tickers — delivered as a slide deck with laser pointer, speaker notes, and unnecessary transitions.',
  fonts: [],
  cssVars: {
    '--bg': '#1c1c1c',
    '--bg2': '#0f0f0f',
    '--text': '#fafafa',
    '--text2': '#a3a3a3',
    '--accent': '#ea580c',
    '--accent2': '#f97316',
    '--border': '#404040',
    '--card': '#ffffff',
    '--font-main': "'Segoe UI', 'Calibri', system-ui, sans-serif",
    '--font-display': "'Segoe UI Semibold', system-ui, sans-serif",
  },
  emailSelectionInModal: true,
  Layout: PowerPointBrowserLayout,
}
