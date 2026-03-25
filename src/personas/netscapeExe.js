import NetscapeExeLayout from '../layouts/NetscapeExeLayout'

export default {
  id: 'netscapeExe',
  label: 'Browsing on netscape.exe',
  emoji: '🦎',
  description: 'Netscape Mail on dial-up: green chrome, throbber, satellite windows for weather, stocks, and news.',
  fonts: ['Share+Tech+Mono'],
  cssVars: {
    '--bg': '#008080',
    '--bg2': '#c0c0c0',
    '--text': '#0a0a0a',
    '--text2': '#404040',
    '--accent': '#0a5c2e',
    '--accent2': '#7fff00',
    '--border': '#808080',
    '--card': '#ffffff',
    '--font-main': "'Tahoma', 'MS Sans Serif', 'Segoe UI', sans-serif",
    '--font-mono': "'Share Tech Mono', monospace",
  },
  emailSelectionInModal: true,
  Layout: NetscapeExeLayout,
}
