import ParanoidPrivacyLayout from '../layouts/ParanoidPrivacyLayout'

const privacy = {
  id: 'privacy',
  label: 'Privacy Advocate',
  emoji: '🔐',
  description: 'Big brother is watching. VPN on.',
  fonts: ['Inconsolata:wght@400;600;700', 'Source+Code+Pro:wght@400;600'],
  cssVars: {
    '--bg': '#0d0d0d',
    '--bg2': '#141414',
    '--text': '#33ff33',
    '--text2': '#00aa00',
    '--accent': '#ff3333',
    '--accent2': '#ffaa00',
    '--accent3': '#33ff33',
    '--border': '#2a2a2a',
    '--card': '#111111',
    '--font-main': "'Inconsolata', monospace",
    '--font-display': "'Source Code Pro', monospace",
  },
  Layout: ParanoidPrivacyLayout,
}

export default privacy
