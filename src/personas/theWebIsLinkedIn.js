import LinkedInWebLayout from '../layouts/LinkedInWebLayout'

export default {
  id: 'theWebIsLinkedIn',
  label: 'The Web is LinkedIn',
  emoji: '💼',
  description: 'Feed, endorsements, profile views, and “professional” chaos — same inbox, weather, news & stocks.',
  fonts: ['Source+Sans+3:wght@400;600;700', 'Outfit:wght@500;700;800'],
  cssVars: {
    '--bg': '#f3f2ef',
    '--bg2': '#e9e8e4',
    '--text': '#191919',
    '--text2': '#666666',
    '--accent': '#0a66c2',
    '--accent2': '#004182',
    '--border': '#e0dfdc',
    '--card': '#ffffff',
    '--font-main': "'Source Sans 3', system-ui, sans-serif",
    '--font-display': "'Outfit', system-ui, sans-serif",
  },
  emailSelectionInModal: true,
  Layout: LinkedInWebLayout,
}
