import StackoverflowMailLayout from '../layouts/StackoverflowMailLayout'

export default {
  id: 'stackoverflowMail',
  label: 'Mail on Stack Overflow (parody)',
  emoji: '📚',
  description:
    'Q&A desk energy: inbox as “questions,” weather as runtime env, news on the hot network, stonks as bounties — orange chrome, votes, badges, and a wobbly stack mascot.',
  fonts: ['Source Sans 3:wght@400;600;700', 'JetBrains Mono:wght@400;600'],
  cssVars: {
    '--bg': '#f4f6f8',
    '--bg2': '#ffffff',
    '--text': '#242729',
    '--text2': '#6a737c',
    '--accent': '#f48024',
    '--accent2': '#bc3d00',
    '--border': '#d6d9dc',
    '--card': '#ffffff',
    '--font-main': "'Source Sans 3', system-ui, sans-serif",
    '--font-mono': "'JetBrains Mono', monospace",
  },
  Layout: StackoverflowMailLayout,
}
