import NoInternetLayout from '../layouts/NoInternetLayout'

export default {
  id: 'noInternet',
  label: 'No internet',
  emoji: '📵',
  description: 'Offline.exe: grey CRT flicker, cached inbox list, window weather, newspaper stocks.',
  fonts: ['VT323', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#c0c0c0',
    '--bg2': '#a0a0a0',
    '--text': '#1a1a1a',
    '--text2': '#404040',
    '--accent': '#000080',
    '--accent2': '#800000',
    '--accent3': '#008080',
    '--border': '#808080',
    '--card': '#ffffff',
    '--font-main': "'VT323', monospace",
    '--font-display': "'Share Tech Mono', monospace",
  },
  Layout: NoInternetLayout,
}
