import RobloxWebLayout from '../layouts/RobloxWebLayout'

const robloxWeb = {
  id: 'robloxWeb',
  label: 'Roblox web',
  emoji: '🧱',
  description: 'Your inbox dropped into a blocky co-op lobby.',
  fonts: ['Fredoka:wght@400;600;700', 'Archivo+Black'],
  cssVars: {
    '--bg': '#1a1d21',
    '--bg2': '#23262c',
    '--text': '#f5f6f7',
    '--text2': '#9aa0a8',
    '--accent': '#00a2ff',
    '--accent2': '#f5cd00',
    '--accent3': '#00d26a',
    '--border': '#3d4249',
    '--card': '#2c3038',
    '--font-main': "'Fredoka', system-ui, sans-serif",
    '--font-display': "'Archivo Black', system-ui, sans-serif",
  },
  Layout: RobloxWebLayout,
}

export default robloxWeb
