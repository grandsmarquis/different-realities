import MinecraftWebLayout from '../layouts/MinecraftWebLayout'

const theWebIsMinecraft = {
  id: 'theWebIsMinecraft',
  label: 'The Web is Minecraft',
  emoji: '🧱',
  description: 'Chest mail, biome weather, village news · blocky HUD',
  fonts: ['Press+Start+2P', 'VT323'],
  cssVars: {
    '--bg': '#87ceeb',
    '--bg2': '#6b9c3d',
    '--text': '#1e1e1e',
    '--text2': '#4a4a4a',
    '--accent': '#55aa55',
    '--accent2': '#3d4c38',
    '--accent3': '#8b6914',
    '--border': '#555555',
    '--card': '#c6c6c6',
    '--font-main': "'VT323', monospace",
    '--font-display': "'Press Start 2P', monospace",
  },
  Layout: MinecraftWebLayout,
}

export default theWebIsMinecraft
