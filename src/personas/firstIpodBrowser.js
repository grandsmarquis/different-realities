import FirstIpodBrowserLayout from '../layouts/FirstIpodBrowserLayout'

const firstIpodBrowser = {
  id: 'firstIpodBrowser',
  label: 'First-gen iPod “Web”',
  emoji: '🎧',
  description: '160×128 monochrome dreams. The whole internet, one wheel click at a time.',
  fonts: ['Share+Tech+Mono', 'Orbitron:wght@400;700'],
  cssVars: {
    '--bg': '#c8c9ce',
    '--bg2': '#e2e3e8',
    '--text': '#1a1c20',
    '--text2': '#4b5563',
    '--accent': '#22c55e',
    '--accent2': '#14532d',
    '--border': '#9ca3af',
    '--card': '#f4f4f5',
    '--font-main': "'Share Tech Mono', monospace",
    '--font-display': "'Orbitron', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: FirstIpodBrowserLayout,
}

export default firstIpodBrowser
