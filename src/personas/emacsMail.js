import EmacsMailLayout from '../layouts/EmacsMailLayout'

export default {
  id: 'emacsMail',
  label: 'Emacs mail',
  emoji: '🐃',
  description: 'Gnus-style splits, *scratch* weather as Lisp, compilation stocks, RSS buffer — M-x butterfly included.',
  fonts: ['IBM Plex Mono:wght@400;600', 'Instrument Sans:wght@400;600'],
  cssVars: {
    '--bg': '#1c1b22',
    '--bg2': '#252430',
    '--text': '#e8e6f0',
    '--text2': '#8b8699',
    '--accent': '#7c5cff',
    '--accent2': '#5ce0c8',
    '--accent3': '#ffb86b',
    '--border': '#3d3a4f',
    '--card': '#23212e',
    '--font-main': "'IBM Plex Mono', ui-monospace, monospace",
    '--font-display': "'Instrument Sans', system-ui, sans-serif",
  },
  Layout: EmacsMailLayout,
}
