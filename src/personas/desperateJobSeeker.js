import DesperateJobSeekerLayout from '../layouts/DesperateJobSeekerLayout'

export default {
  id: 'desperateJobSeeker',
  label: 'Desperate job seeker',
  emoji: '📎',
  description: 'Cork-board chaos, hope-o-meter, flying résumés, and “one more application” energy.',
  fonts: ['Archivo+Black', 'DM+Sans:wght@400;500;600;700'],
  cssVars: {
    '--bg': '#f4ead8',
    '--bg2': '#e8dcc4',
    '--text': '#1c1917',
    '--text2': '#57534e',
    '--accent': '#0d9488',
    '--accent2': '#ea580c',
    '--border': '#a8a29e',
    '--card': '#fffef8',
    '--font-main': "'DM Sans', sans-serif",
    '--font-display': "'Archivo Black', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: DesperateJobSeekerLayout,
}
