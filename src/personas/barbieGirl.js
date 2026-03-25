import BarbieGirlLayout from '../layouts/BarbieGirlLayout'

export default {
  id: 'barbieGirl',
  label: 'Barbie girl energy',
  emoji: '💅',
  description:
    'Parody glam-doll dashboard: dream-house pink, sparkle mail, outfit weather, magazine tea & glitter stocks.',
  fonts: ['Lilita+One', 'Nunito:wght@400;600;700;800'],
  cssVars: {
    '--bg': '#fff0f7',
    '--bg2': '#ffc2e0',
    '--text': '#4a0d2e',
    '--text2': '#9d3d6e',
    '--accent': '#ff1493',
    '--accent2': '#ff69b4',
    '--accent3': '#da70d6',
    '--border': '#ffb6d9',
    '--card': '#fffafd',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Lilita One', cursive",
  },
  Layout: BarbieGirlLayout,
}
