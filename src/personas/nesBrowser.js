import NintendoNesLayout from '../layouts/NintendoNesLayout'

const nesBrowser = {
  id: 'nesBrowser',
  label: 'Web on the NES',
  emoji: '📺',
  description: 'Family Computer goes online · RF snow · cartridge mail',
  emailSelectionInModal: true,
  fonts: ['Press+Start+2P', 'VT323'],
  cssVars: {
    '--bg': '#4a4a4a',
    '--bg2': '#2e2e2e',
    '--text': '#f5f0e6',
    '--text2': '#9ca3af',
    '--accent': '#e60012',
    '--accent2': '#ffd700',
    '--accent3': '#00e5ff',
    '--border': '#1f1f1f',
    '--card': '#252525',
    '--crt-bg': '#0a0c10',
    '--phosphor': '#7dffb3',
    '--font-main': "'VT323', monospace",
    '--font-display': "'Press Start 2P', monospace",
  },
  Layout: NintendoNesLayout,
}

export default nesBrowser
