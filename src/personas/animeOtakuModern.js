import AnimeOtakuModernLayout from '../layouts/AnimeOtakuModernLayout'

const animeOtakuModern = {
  id: 'animeOtakuModern',
  label: 'Anime otaku (modern)',
  emoji: '📺',
  description: 'Neon HUD · streaming queue · figure-shelf vibes',
  fonts: ['M+PLUS+Rounded+1c:wght@400;500;700;800', 'Orbitron:wght@500;700;900'],
  cssVars: {
    '--bg': '#070510',
    '--bg2': '#120a1c',
    '--text': '#e8f4ff',
    '--text2': '#94a3b8',
    '--accent': '#ff2e97',
    '--accent2': '#00f5ff',
    '--accent3': '#ffe600',
    '--border': 'color-mix(in srgb, var(--accent2) 28%, transparent)',
    '--card': 'color-mix(in srgb, #1a1030 88%, transparent)',
    '--font-main': "'M PLUS Rounded 1c', sans-serif",
    '--font-display': "'Orbitron', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: AnimeOtakuModernLayout,
}

export default animeOtakuModern
