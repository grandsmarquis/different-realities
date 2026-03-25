import HystericKareenLayout from '../layouts/HystericKareenLayout'

const hystericKareen = {
  id: 'hystericKareen',
  label: 'Hysteric Kareen',
  emoji: '📣',
  description: 'Manager velocity. Siren UI. Zero patience.',
  fonts: ['Bebas+Neue', 'Anton'],
  cssVars: {
    '--bg': '#1a0505',
    '--bg2': '#2a0a0a',
    '--text': '#fff5f5',
    '--text2': '#fca5a5',
    '--accent': '#ef4444',
    '--accent2': '#fbbf24',
    '--accent3': '#450a0a',
    '--border': '#7f1d1d',
    '--card': '#1c0808',
    '--font-main': "'Bebas Neue', sans-serif",
    '--font-display': "'Anton', sans-serif",
  },
  Layout: HystericKareenLayout,
}

export default hystericKareen
