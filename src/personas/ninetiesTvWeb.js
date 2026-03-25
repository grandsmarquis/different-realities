import NinetiesTvWebLayout from '../layouts/NinetiesTvWebLayout'

const ninetiesTvWeb = {
  id: 'ninetiesTvWeb',
  label: '90s TV browser',
  emoji: '📺',
  description: 'WebTV on a fuzzy CRT from the couch. Change the channel for mail, weather, news, and stocks.',
  fonts: ['Audiowide', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#0d0a12',
    '--bg2': '#1a1528',
    '--text': '#c8f0e0',
    '--text2': '#6b9e8c',
    '--accent': '#00ffc8',
    '--accent2': '#1a3d36',
    '--border': '#2a4a44',
    '--card': '#0a1620',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Audiowide', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: NinetiesTvWebLayout,
}

export default ninetiesTvWeb
