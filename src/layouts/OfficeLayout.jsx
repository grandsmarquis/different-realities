import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

const folders = [
  { name: 'Inbox', icon: '📥', count: emails.filter(e => !e.read).length },
  { name: 'Starred', icon: '⭐', count: emails.filter(e => e.starred).length },
  { name: 'Sent', icon: '📤', count: 0 },
  { name: 'Drafts', icon: '📝', count: 1 },
  { name: 'Spam', icon: '🚫', count: 3 },
  { name: 'Trash', icon: '🗑️', count: 0 },
]

const tags = ['work', 'finance', 'personal', 'dev', 'travel', 'shopping', 'social', 'newsletter']

function Sidebar({ onSwitchPersona }) {
  const [activeFolder, setActiveFolder] = useState('Inbox')
  const [activeTag, setActiveTag] = useState(null)

  return (
    <div className="flex flex-col" style={{ width: 200, borderRight: '1px solid var(--border)', background: 'var(--bg)', flexShrink: 0, overflowY: 'auto' }}>
      <div className="p-3 mb-1">
        <button className="w-full py-2 rounded cursor-pointer text-sm font-semibold transition-colors duration-150"
          style={{ background: 'var(--accent2)', color: '#fff', border: 'none' }}>
          + Compose
        </button>
      </div>

      <div className="px-2">
        <p style={{ fontSize: '0.65rem', color: 'var(--text2)', padding: '0.5rem 0.5rem 0.25rem', textTransform: 'uppercase', letterSpacing: '0.08rem' }}>Folders</p>
        {folders.map(f => (
          <button
            key={f.name}
            onClick={() => setActiveFolder(f.name)}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded cursor-pointer text-left"
            style={{
              background: activeFolder === f.name ? 'var(--bg2)' : 'transparent',
              border: 'none',
              fontSize: '0.8rem',
              color: activeFolder === f.name ? 'var(--accent)' : 'var(--text)',
            }}
          >
            <span>{f.icon} {f.name}</span>
            {f.count > 0 && <span className="rounded-full px-1.5 py-0.5 text-xs" style={{ background: 'var(--accent2)', color: '#fff' }}>{f.count}</span>}
          </button>
        ))}
      </div>

      <div className="px-2 mt-3">
        <p style={{ fontSize: '0.65rem', color: 'var(--text2)', padding: '0.5rem 0.5rem 0.25rem', textTransform: 'uppercase', letterSpacing: '0.08rem' }}>Tags</p>
        {tags.map(t => (
          <button
            key={t}
            onClick={() => setActiveTag(t === activeTag ? null : t)}
            className="w-full flex items-center px-2 py-1 rounded cursor-pointer text-left"
            style={{ background: 'transparent', border: 'none', fontSize: '0.75rem', color: t === activeTag ? 'var(--accent)' : 'var(--text2)' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', marginRight: 6, opacity: 0.6 }} />
            {t}
          </button>
        ))}
      </div>

      <div className="p-3 mt-auto" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 mb-2">
          <span style={{ fontSize: '1.2rem' }}>{weather.icon}</span>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text)', fontWeight: 500 }}>{weather.temp}°C · {weather.city}</p>
            <p style={{ fontSize: '0.65rem', color: 'var(--text2)' }}>{weather.condition}</p>
          </div>
        </div>
        <button
          onClick={onSwitchPersona}
          className="w-full py-1 rounded text-xs cursor-pointer"
          style={{ background: 'var(--bg2)', color: 'var(--text2)', border: '1px solid var(--border)' }}
        >
          Switch view
        </button>
      </div>
    </div>
  )
}

function EmailRow({ email, active, onClick }) {
  return (
    <div
      onClick={() => onClick(email)}
      className="flex items-center gap-3 px-3 py-2.5 cursor-pointer border-b"
      style={{
        borderColor: 'var(--border)',
        background: active ? 'var(--bg2)' : 'transparent',
        fontWeight: email.read ? 400 : 600,
        borderLeft: active ? `3px solid var(--accent2)` : '3px solid transparent',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg2)44' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
    >
      <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{email.from.avatar}</span>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline gap-2">
          <span style={{ fontSize: '0.78rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 120 }}>
            {email.from.name}
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text2)', flexShrink: 0 }}>{email.time}</span>
        </div>
        <p style={{ fontSize: '0.72rem', color: email.read ? 'var(--text2)' : 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {email.subject}
        </p>
        <p style={{ fontSize: '0.68rem', color: 'var(--text2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {email.preview}
        </p>
      </div>
      {email.starred && <span style={{ color: '#f0ad4e', fontSize: '0.75rem', flexShrink: 0 }}>★</span>}
    </div>
  )
}

function ReadingPane({ email }) {
  if (!email) return (
    <div className="flex-1 flex items-center justify-center" style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>
      Select an email to read
    </div>
  )
  return (
    <div className="flex-1 overflow-y-auto p-6" style={{ background: 'var(--card)' }}>
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', color: 'var(--text)', marginBottom: '0.5rem' }}>{email.subject}</h2>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: '1.5rem' }}>{email.from.avatar}</span>
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text)', fontWeight: 500 }}>{email.from.name} <span style={{ color: 'var(--text2)', fontWeight: 400 }}>{'<'}{email.from.email}{'>'}</span></p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>To: me · {email.date}</p>
          </div>
        </div>
      </div>
      <div style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-line' }}>{email.body}</div>
      <div className="flex gap-2 mt-6">
        <button className="px-4 py-1.5 rounded text-sm cursor-pointer" style={{ background: 'var(--accent2)', color: '#fff', border: 'none' }}>↩ Reply</button>
        <button className="px-4 py-1.5 rounded text-sm cursor-pointer" style={{ background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--border)' }}>→ Forward</button>
        <button className="px-4 py-1.5 rounded text-sm cursor-pointer" style={{ background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--border)' }}>🗑 Delete</button>
      </div>
    </div>
  )
}

function StatusBar() {
  return (
    <div className="flex items-center gap-6 px-4" style={{ height: 44, borderTop: '1px solid var(--border)', background: 'var(--bg)', flexShrink: 0, overflowX: 'auto' }}>
      {/* News ticker */}
      <div className="flex-1 overflow-hidden relative">
        <div style={{ fontSize: '0.68rem', color: 'var(--text2)', whiteSpace: 'nowrap', animation: 'newsticker 25s linear infinite' }}>
          {news.map(n => `${n.emoji} ${n.title}   ·   `).join('')}
        </div>
        <style>{`@keyframes newsticker { from { transform: translateX(100%) } to { transform: translateX(-100%) } }`}</style>
      </div>
      {/* Stocks mini */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {stocks.map(s => (
          <div key={s.ticker} className="flex items-center gap-1">
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text)' }}>{s.ticker}</span>
            <div style={{ width: 48, height: 20 }}>
              <ResponsiveContainer width={48} height={20} debounce={50}>
                <LineChart data={s.series.slice(-15).map((v, i) => ({ v, i }))}>
                  <Line type="monotone" dataKey="v" stroke={s.changePct >= 0 ? '#27ae60' : '#c0392b'} dot={false} strokeWidth={1} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <span style={{ fontSize: '0.62rem', color: s.changePct >= 0 ? '#27ae60' : '#c0392b' }}>
              {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: '0.65rem', color: 'var(--text2)', flexShrink: 0 }}>
        {emails.length} messages · <span style={{ color: 'var(--accent2)', fontWeight: 600 }}>{emails.filter(e => !e.read).length} unread</span>
      </div>
    </div>
  )
}

export default function OfficeLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="flex flex-col" style={{ height: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-main)' }}>
      {/* Top bar */}
      <div className="flex items-center gap-4 px-4 py-2 flex-shrink-0" style={{ background: 'var(--accent)', color: '#fff', height: 40 }}>
        <span style={{ fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.02rem' }}>📧 Outlook</span>
        <div className="flex gap-4 ml-2" style={{ fontSize: '0.75rem' }}>
          {['File', 'Home', 'Send / Receive', 'Folder', 'View', 'Help'].map(m => (
            <span key={m} className="opacity-80 cursor-pointer hover:opacity-100">{m}</span>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2" style={{ fontSize: '0.72rem' }}>
          <span className="opacity-70 cursor-pointer" title="Ctrl+K">🔍 Search</span>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 min-h-0">
        <Sidebar onSwitchPersona={onSwitchPersona} />

        {/* Email list */}
        <div style={{ width: 280, borderRight: '1px solid var(--border)', overflowY: 'auto', flexShrink: 0 }}>
          <div className="px-3 py-2 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)' }}>Inbox</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text2)' }}>All · Unread · From</span>
          </div>
          {emails.map(email => (
            <EmailRow
              key={email.id}
              email={email}
              active={selectedEmail?.id === email.id}
              onClick={setSelectedEmail}
            />
          ))}
        </div>

        {/* Reading pane */}
        <ReadingPane email={selectedEmail} />
      </div>

      <StatusBar />
    </div>
  )
}
