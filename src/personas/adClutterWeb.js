import AdClutterWebLayout from '../layouts/AdClutterWebLayout'

export default {
  id: 'adClutterWeb',
  label: 'The web is all ads',
  emoji: '📣',
  description:
    'Marquees, skyscrapers, sponsored labels, and cookie chaos — your inbox, weather, news, and stocks, buried in a loving pile of promotions.',
  fonts: ['Bungee', 'Nunito:wght@400;700;800'],
  cssVars: {
    '--font-display': "'Bungee', cursive",
    '--font-body': "'Nunito', sans-serif",
    '--ad-paper': '#faf7f2',
    '--ad-ink': '#1a0f2e',
  },
  emailSelectionInModal: true,
  Layout: AdClutterWebLayout,
}
