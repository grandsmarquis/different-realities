import PspMailLayout from '../layouts/PspMailLayout'

export default {
  id: 'pspMail',
  label: 'Reading mail on a Sony PSP',
  emoji: '🎮',
  description:
    'Metallic shell, XMB waves, WLAN bars & UMD dreams — same inbox, weather, RSS wire & market tickers on a glossy handheld LCD (parody).',
  fonts: ['Orbitron:wght@500;700', 'Rajdhani:wght@400;600;700'],
  cssVars: {
    '--psp-text': '#e2e8f0',
    '--psp-up': '#34d399',
    '--psp-down': '#fb7185',
    '--font-main': "'Rajdhani', sans-serif",
    '--font-display': "'Orbitron', sans-serif",
  },
  Layout: PspMailLayout,
}
