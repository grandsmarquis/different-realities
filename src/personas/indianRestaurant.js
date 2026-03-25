import IndianRestaurantLayout from '../layouts/IndianRestaurantLayout'
const indianRestaurant = {
  id: 'indianRestaurant', label: 'Indian Restaurant Owner', emoji: '🍛',
  description: 'Aaj ka special: biryani aur inbox dono hot hai!',
  fonts: ['Tiro+Devanagari+Hindi:ital@0;1', 'Cinzel:wght@400;700;900'],
  cssVars: {
    '--bg': '#1a0800', '--bg2': '#2d0f00', '--text': '#ffd080', '--text2': '#ff8c00',
    '--accent': '#ff4500', '--accent2': '#ffd700', '--accent3': '#2d8b00',
    '--border': '#8b3a00', '--card': '#2a1000',
    '--font-main': "Georgia, serif", '--font-display': "'Cinzel', serif",
  }, Layout: IndianRestaurantLayout,
}
export default indianRestaurant
