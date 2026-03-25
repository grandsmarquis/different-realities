import SixtySecondChallengeLayout from '../layouts/SixtySecondChallengeLayout'

export default {
  id: 'sixtySecondChallenge',
  label: 'Time-limited challenge (60 seconds)',
  emoji: '⏱️',
  description: 'One minute on the clock. Read fast. The bar does not negotiate.',
  fonts: ['Chakra+Petch:wght@500;600;700'],
  cssVars: {
    '--bg': '#0c0a09',
    '--bg2': '#1c1917',
    '--text': '#fef3c7',
    '--text2': '#fbbf24',
    '--accent': '#ef4444',
    '--accent2': '#f97316',
    '--border': '#451a03',
    '--card': '#292524',
    '--font-main': "'Chakra Petch', sans-serif",
    '--font-display': "'Chakra Petch', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: SixtySecondChallengeLayout,
}
