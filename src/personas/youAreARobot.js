import YouAreARobotLayout from '../layouts/YouAreARobotLayout'

export default {
  id: 'youAreARobot',
  label: 'You are a robot',
  emoji: '🤖',
  description:
    'Servo inbox, sensor weather, headline parsing, and stonks as torque curves — beep boop, mission nominal.',
  fonts: ['Orbitron:wght@400;700;900', 'Share+Tech+Mono'],
  cssVars: {
    '--bg': '#0a0e14',
    '--bg2': '#121a24',
    '--panel': '#0f1620',
    '--text': '#c8e6ff',
    '--text-dim': '#5c7a9e',
    '--accent': '#00e5ff',
    '--accent-hot': '#ff2d6a',
    '--accent-warm': '#ffc107',
    '--border': '#1e3a5f',
    '--glow': 'rgba(0, 229, 255, 0.35)',
    '--font-main': "'Orbitron', sans-serif",
    '--font-mono': "'Share Tech Mono', monospace",
  },
  Layout: YouAreARobotLayout,
}
