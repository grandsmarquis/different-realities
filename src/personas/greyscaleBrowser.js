import GreyscaleBrowserLayout from '../layouts/GreyscaleBrowserLayout'

export default {
  id: 'greyscaleBrowser',
  label: 'Greyscale browser',
  emoji: '◐',
  description: 'AchromaNet chrome, halftone, rods cheering, zero saturation.',
  fonts: ['Space+Grotesk:wght@400;600;700', 'JetBrains+Mono:wght@400;500'],
  cssVars: {
    '--bg': '#252528',
    '--bg2': '#1a1a1d',
    '--text': '#e8e8ea',
    '--text2': '#9898a0',
    '--accent': '#d4d4d8',
    '--accent2': '#71717a',
    '--border': '#3f3f46',
    '--card': '#2e2e32',
    '--font-main': "'Space Grotesk', system-ui, sans-serif",
    '--font-mono': "'JetBrains Mono', ui-monospace, monospace",
  },
  emailSelectionInModal: true,
  Layout: GreyscaleBrowserLayout,
}
