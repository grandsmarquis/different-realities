import ChineseNewspaperLayout from '../layouts/ChineseNewspaperLayout'

const chineseNewspaper = {
  id: 'chineseNewspaper',
  label: 'The web is a Chinese newspaper',
  emoji: '📰',
  description: 'Masthead, newsprint, vertical columns — same inbox as front-page drama.',
  fonts: [
    'Ma+Shan+Zheng',
    'Noto+Serif+SC:wght@400;600;700',
    'ZCOOL+QingKe+HuangYou',
  ],
  cssVars: {
    '--bg': '#f4ecd8',
    '--bg2': '#e8dcc4',
    '--text': '#1c1917',
    '--text2': '#57534e',
    '--accent': '#b91c1c',
    '--accent2': '#7f1d1d',
    '--accent3': '#15803d',
    '--border': '#a8a29e',
    '--card': '#faf6eb',
    '--font-main': "'Noto Serif SC', serif",
    '--font-display': "'Ma Shan Zheng', cursive",
    '--font-headline': "'ZCOOL QingKe HuangYou', sans-serif",
  },
  emailSelectionInModal: true,
  Layout: ChineseNewspaperLayout,
}

export default chineseNewspaper
