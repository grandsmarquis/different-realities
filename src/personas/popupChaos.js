import PopupChaosLayout from '../layouts/PopupChaosLayout'

export default {
  id: 'popupChaos',
  label: 'Popup apocalypse mode',
  emoji: '🪟',
  description: 'Blinking chrome, marquees, and a swarm of windows — same inbox, weather, news, and stocks underneath the noise.',
  fonts: ['Titan+One:wght@400', 'DM+Sans:wght@400;700'],
  cssVars: {
    '--pop-bg': '#0f0718',
    '--pop-text': '#f8fafc',
    '--pop-font-display': "'Titan One', sans-serif",
    '--pop-font-body': "'DM Sans', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: PopupChaosLayout,
}
