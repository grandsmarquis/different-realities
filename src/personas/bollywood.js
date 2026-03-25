import BollywoodLayout from '../layouts/BollywoodLayout'
const bollywood = {
  id: 'bollywood',
  label: 'Bollywood Superfan',
  emoji: '🎬',
  description: 'Masala marquee, dancing icons, and your inbox as a full-length feature.',
  fonts: ['Bungee', 'Kalam:wght@400;700'],
  cssVars: {
    '--bg': '#0f0224',
    '--bg2': '#1a0638',
    '--text': '#ffd6ef',
    '--text2': '#e9d5ff',
    '--accent': '#ff1493',
    '--accent2': '#ffd700',
    '--accent3': '#22d3ee',
    '--border': '#6b0050',
    '--card': '#1a0035',
    '--font-main': "'Kalam', cursive",
    '--font-display': "'Bungee', cursive",
  },
  Layout: BollywoodLayout,
}
export default bollywood
