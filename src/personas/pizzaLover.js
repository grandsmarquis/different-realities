import PizzaLoverLayout from '../layouts/PizzaLoverLayout'

const pizzaLover = {
  id: 'pizzaLover',
  label: 'Pizza Lover',
  emoji: '🍕',
  description: 'Every message is another hot slice of inbox',
  fonts: ['Pacifico', 'Nunito:wght@400;700;800'],
  cssVars: {
    '--bg': '#2c1810',
    '--bg2': '#3d2418',
    '--text': '#fff8f0',
    '--text2': '#e8c4a8',
    '--accent': '#ff6b35',
    '--accent2': '#f7c948',
    '--border': '#5c3d2e',
    '--card': '#3a2218',
    '--font-main': "'Nunito', sans-serif",
    '--font-display': "'Pacifico', cursive",
  },
  emailSelectionInModal: true,
  Layout: PizzaLoverLayout,
}

export default pizzaLover
