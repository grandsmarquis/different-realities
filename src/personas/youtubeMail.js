import YoutubeMailLayout from '../layouts/YoutubeMailLayout'

export default {
  id: 'youtubeMail',
  label: 'InboxTube (video player)',
  emoji: '▶️',
  description:
    'Binge your mailbox like a stream: playlist thumbnails, fake LIVE chat, CC captions, subscribe energy — plus weather shorts, news rows & sparkline stonks in the sidebar.',
  fonts: ['Roboto:wght@400;500;700;900', 'Oswald:wght@500;700'],
  cssVars: {
    '--bg': '#0f0f0f',
    '--bg2': '#181818',
    '--text': '#f1f1f1',
    '--text2': '#aaaaaa',
    '--accent': '#ff0000',
    '--accent2': '#ff4444',
    '--accent3': '#3ea6ff',
    '--border': '#303030',
    '--card': '#212121',
    '--font-main': "'Roboto', system-ui, sans-serif",
    '--font-display': "'Oswald', 'Roboto', sans-serif",
  },
  Layout: YoutubeMailLayout,
}
