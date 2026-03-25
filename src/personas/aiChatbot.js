import AiChatbotLayout from '../layouts/AiChatbotLayout'

export default {
  id: 'aiChatbot',
  label: 'You are an AI chatbot',
  emoji: '💬',
  description:
    'ChatOS cockpit: prompts as inbox, tool calls for weather & stonks, RAG-flavored news — orb mascot, token sparkles, and optimistic lies.',
  fonts: ['Syne:wght@400;600;800', 'JetBrains+Mono:wght@400;500;600'],
  cssVars: {
    '--bg': '#0c0a12',
    '--bg2': '#161022',
    '--surface': 'rgba(255, 255, 255, 0.04)',
    '--surface-strong': 'rgba(255, 255, 255, 0.08)',
    '--text': '#f4f0ff',
    '--text-dim': '#9d8ec4',
    '--mint': '#5fffd8',
    '--violet': '#a78bfa',
    '--pink': '#fb7185',
    '--amber': '#fcd34d',
    '--border': 'rgba(167, 139, 250, 0.25)',
    '--glow-mint': 'rgba(95, 255, 216, 0.35)',
    '--glow-violet': 'rgba(167, 139, 250, 0.4)',
    '--font-display': "'Syne', sans-serif",
    '--font-mono': "'JetBrains Mono', monospace",
  },
  Layout: AiChatbotLayout,
}
