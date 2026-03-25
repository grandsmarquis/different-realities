import ExpertModeLayout from '../layouts/ExpertModeLayout'

export default {
  id: 'expertMode',
  label: 'Hardcore expert mode (no explanations)',
  emoji: '⌘',
  description: 'Data only. Assume competence. No hand-holding.',
  fonts: ['IBM+Plex+Mono:wght@400;600'],
  cssVars: {
    '--bg': '#050505',
    '--bg2': '#0a0a0a',
    '--text': '#e5e5e5',
    '--text2': '#737373',
    '--accent': '#ffffff',
    '--accent2': '#a3a3a3',
    '--border': '#262626',
    '--card': '#0f0f0f',
    '--font-main': "'IBM Plex Mono', monospace",
    '--font-display': "'IBM Plex Mono', monospace",
  },
  emailSelectionInModal: true,
  Layout: ExpertModeLayout,
}
