import EarlyFacebookLayout from '../layouts/EarlyFacebookLayout'

export default {
  id: 'earlyFacebook',
  label: 'Early Facebook',
  emoji: '👤',
  description: 'Classic blue header, wall posts, sidebar, Poke button.',
  fonts: [],
  cssVars: {
    '--bg': '#e9eaed',
    '--bg2': '#f6f7f9',
    '--text': '#1c1e21',
    '--text2': '#606770',
    '--accent': '#3b5998',
    '--accent2': '#365899',
    '--border': '#d3d6db',
    '--card': '#ffffff',
    '--font-main': 'Tahoma, Geneva, Verdana, sans-serif',
    '--font-display': 'Tahoma, Geneva, Verdana, sans-serif',
  },
  emailSelectionInModal: false,
  Layout: EarlyFacebookLayout,
}
