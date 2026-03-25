import AmazonParodyLayout from '../layouts/AmazonParodyLayout'

const rainforestMail = {
  id: 'rainforestMail',
  label: 'Everything inbox',
  emoji: '📦',
  description: 'Smile logo, sponsored carousel, Prime energy (parody).',
  fonts: ['DM+Sans:wght@400;500;700', 'Libre+Franklin:wght@600;800'],
  cssVars: {
    '--bg': '#eaeded',
    '--bg2': '#e3e6e6',
    '--text': '#0f1111',
    '--text2': '#565959',
    '--accent': '#ff9900',
    '--accent2': '#232f3e',
    '--accent3': '#37475a',
    '--border': '#d5d9d9',
    '--card': '#ffffff',
    '--font-main': "'DM Sans', sans-serif",
    '--font-display': "'Libre Franklin', sans-serif",
  },
  Layout: AmazonParodyLayout,
}

export default rainforestMail
