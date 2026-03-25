import NinetyNineYearsOldLayout from '../layouts/NinetyNineYearsOldLayout'

export default {
  id: 'ninetyNineYearsOld',
  label: 'You are 99 years old',
  emoji: '🎂',
  description: 'Tea-cosy internet: giant friendly type, letters from the family, and a wink at “the computer”.',
  fonts: [
    'Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;1,9..144,500',
    'Nunito:wght@500;700;800',
  ],
  cssVars: {
    '--bg': '#faf6f0',
    '--bg2': '#efe4d8',
    '--text': '#3d2f28',
    '--text2': '#6b5349',
    '--accent': '#c45c6a',
    '--accent2': '#2d6a4f',
    '--border': '#d4c4b0',
    '--card': '#fffefb',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Fraunces', serif",
  },
  emailSelectionInModal: true,
  Layout: NinetyNineYearsOldLayout,
}
