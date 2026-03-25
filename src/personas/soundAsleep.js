import SoundAsleepLayout from '../layouts/SoundAsleepLayout'

export default {
  id: 'soundAsleep',
  label: 'Sound asleep — inbox can wait',
  emoji: '😴',
  description: 'Night mode. Emails snoozed. The world keeps spinning without you.',
  fonts: ['Nunito:wght@400;600;700;800'],
  cssVars: {
    '--bg': '#0c0820',
    '--bg2': '#16102e',
    '--text': '#f3e8ff',
    '--text2': '#a78bfa',
    '--accent': '#c4b5fd',
    '--accent2': '#fde68a',
    '--border': '#3b2f5c',
    '--card': '#1e1638',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Nunito', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: SoundAsleepLayout,
}
