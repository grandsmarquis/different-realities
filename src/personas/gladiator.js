import GladiatorLayout from '../layouts/GladiatorLayout'
const gladiator = {
  id: 'gladiator', label: 'Arena Gladiator', emoji: '⚔️',
  description: 'Strength and honor. These emails will not defeat me.',
  fonts: ['Cinzel:wght@400;700;900', 'IM+Fell+English:ital@0;1'],
  cssVars: {
    '--bg': '#1a1008', '--bg2': '#241808', '--text': '#e8c870', '--text2': '#c8a040',
    '--accent': '#cc2200', '--accent2': '#e8c870', '--accent3': '#4a7a4a',
    '--border': '#5c3a10', '--card': '#201408',
    '--font-main': "'IM Fell English', serif", '--font-display': "'Cinzel', serif",
  }, Layout: GladiatorLayout,
}
export default gladiator
