import NorthKoreanPatriotLayout from '../layouts/NorthKoreanPatriotLayout'

const northKoreanPatriot = {
  id: 'northKoreanPatriot',
  label: 'North Korean Patriot',
  emoji: '🇰🇵',
  description: 'Victory broadcast terminal — inbox, sky report, glorious headlines, and the economic front line.',
  fonts: ['Noto+Serif+KR:wght@600;900', 'Black+Han+Sans:wght@400;900'],
  cssVars: {
    '--bg': '#070d14',
    '--bg2': '#0f1a28',
    '--text': '#f0ebe3',
    '--text2': '#9ca8b8',
    '--accent': '#c41e3a',
    '--accent2': '#d4af37',
    '--accent3': '#1e3a5f',
    '--border': '#2a3f5c',
    '--card': '#0c1520',
    '--font-main': "'Black Han Sans', sans-serif",
    '--font-display': "'Noto Serif KR', serif",
  },
  Layout: NorthKoreanPatriotLayout,
}

export default northKoreanPatriot
