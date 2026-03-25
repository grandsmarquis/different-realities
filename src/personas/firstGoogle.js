import FirstGoogleLayout from '../layouts/FirstGoogleLayout'

export default {
  id: 'firstGoogle',
  label: 'The web is first-version Google',
  emoji: '🔍',
  description: 'Circa 1998: white page, six rainbow letters, ten blue links — your inbox, weather, news, and stocks as “search results.”',
  fonts: ['DM+Sans:wght@400;500;700', 'Newsreader:ital,wght@0,400;0,600;1,400'],
  cssVars: {
    '--bg': '#ffffff',
    '--bg-muted': '#f8f9fa',
    '--text': '#202124',
    '--link': '#1a0dab',
    '--url-line': '#006621',
    '--snippet': '#4d5156',
    '--border': '#dadce0',
    '--google-blue': '#4285F4',
    '--google-red': '#EA4335',
    '--google-yellow': '#FBBC05',
    '--google-green': '#34A853',
    '--font-main': "'DM Sans', system-ui, sans-serif",
    '--font-serif': "'Newsreader', Georgia, 'Times New Roman', serif",
  },
  emailSelectionInModal: true,
  Layout: FirstGoogleLayout,
}
