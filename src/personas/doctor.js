import DoctorLayout from '../layouts/DoctorLayout'

export default {
  id: 'doctor',
  label: 'Doctor',
  emoji: '⚕️',
  description: 'Clinical rounds: SOAP notes, ambient weather, market vitals, journal-club news.',
  fonts: ['Lexend:wght@400;600;700', 'Libre Baskerville:ital,wght@0,700;1,700'],
  cssVars: {
    '--bg': '#ecfdf5',
    '--bg2': '#f0fdfa',
    '--text': '#0f172a',
    '--text2': '#475569',
    '--accent': '#0d9488',
    '--accent2': '#e11d48',
    '--accent3': '#0284c7',
    '--border': 'rgba(13, 148, 136, 0.25)',
    '--card': '#ffffff',
    '--font-main': "'Lexend', sans-serif",
    '--font-display': "'Libre Baskerville', serif",
  },
  Layout: DoctorLayout,
}
