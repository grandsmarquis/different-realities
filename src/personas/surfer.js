import SurferLayout from '../layouts/SurferLayout'
const surfer = {
  id: 'surfer', label: 'Surf Legend', emoji: '🏄',
  description: "Hang loose bro. The inbox is totally gnarly today.",
  fonts: ['Pacifico', 'Nunito:wght@400;700;900'],
  cssVars: {
    '--bg': '#001830', '--bg2': '#002040', '--text': '#f0f8ff', '--text2': '#7fd8ff',
    '--accent': '#00d4aa', '--accent2': '#ff6b35', '--accent3': '#ffd700',
    '--border': '#003a60', '--card': '#001f40',
    '--font-main': "'Nunito', sans-serif", '--font-display': "'Pacifico', cursive",
  }, Layout: SurferLayout,
}
export default surfer
