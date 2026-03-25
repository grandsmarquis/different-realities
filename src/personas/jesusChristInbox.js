import JesusChristInboxLayout from '../layouts/JesusChristInboxLayout'

const jesusChristInbox = {
  id: 'jesusChristInbox',
  label: "Jesus Christ's inbox",
  emoji: '✨',
  description: 'Loaves, fishes, and unread — same data, beatific UX.',
  fonts: ['Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,800;1,9..144,500', 'Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400'],
  cssVars: {
    '--bg': '#070d1c',
    '--bg2': '#0f1a32',
    '--text': '#fff9f0',
    '--text2': '#b8c5e0',
    '--accent': '#ffd54f',
    '--accent2': '#7dd3fc',
    '--accent3': '#c4a035',
    '--wine': '#8b2942',
    '--border': 'rgba(255, 213, 79, 0.28)',
    '--card': 'rgba(255, 250, 240, 0.94)',
    '--card-ink': '#1c2838',
    '--glass': 'rgba(255, 255, 255, 0.06)',
    '--font-main': "'Source Serif 4', Georgia, serif",
    '--font-display': "'Fraunces', Georgia, serif",
  },
  Layout: JesusChristInboxLayout,
}

export default jesusChristInbox
