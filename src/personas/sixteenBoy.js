import SixteenBoyLayout from '../layouts/SixteenBoyLayout'

const sixteenBoy = {
  id: 'sixteenBoy',
  label: "You're 16 (boy era)",
  emoji: '🎮',
  description: 'Neon basement HQ · quest inbox · lobby weather · side-quest news · stonks speedrun',
  fonts: ['Orbitron:wght@500;700;900', 'Rajdhani:wght@500;600;700'],
  cssVars: {
    '--bg': '#07060a',
    '--bg2': '#12101c',
    '--text': '#e8f4ff',
    '--text2': '#7a8fa3',
    '--accent': '#39ff14',
    '--accent2': '#ff2d95',
    '--accent3': '#00f0ff',
    '--border': 'rgba(0, 240, 255, 0.35)',
    '--card': 'rgba(18, 16, 28, 0.92)',
    '--font-main': "'Rajdhani', sans-serif",
    '--font-display': "'Orbitron', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: SixteenBoyLayout,
}

export default sixteenBoy
