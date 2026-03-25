import { useState, useEffect } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

function StockTicker() {
  const items = [...stocks, ...stocks]
  return (
    <div className="overflow-hidden" style={{ background: '#000', borderBottom: '1px solid var(--accent)', padding: '6px 0' }}>
      <div className="flex gap-8 animate-ticker whitespace-nowrap" style={{ animation: 'ticker 20s linear infinite' }}>
        {items.map((s, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: s.changePct >= 0 ? 'var(--accent)' : 'var(--accent2)', marginRight: '2rem' }}>
            {s.ticker} {s.currency}{s.price.toFixed(0)} {s.changePct >= 0 ? '▲' : '▼'}{Math.abs(s.changePct).toFixed(2)}%
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  )
}

function WeatherBadge() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
      <span style={{ fontSize: '2rem' }}>{weather.icon}</span>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--accent)', lineHeight: 1 }}>{weather.temp}°C</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>{weather.city} · {weather.condition}</div>
      </div>
    </div>
  )
}

function NewsCards() {
  const [idx, setIdx] = useState(0)
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--text2)', marginBottom: '0.5rem', letterSpacing: '0.1rem' }}>
        LATEST DROPS
      </div>
      <div className="rounded-xl p-3" style={{ background: 'var(--bg2)', border: '1px solid var(--border)', minHeight: 80 }}>
        <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{news[idx].emoji}</div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text)', lineHeight: 1.4 }}>{news[idx].title}</p>
        <p style={{ fontSize: '0.65rem', color: 'var(--text2)', marginTop: '0.25rem' }}>{news[idx].source} · {news[idx].time}</p>
      </div>
      <div className="flex gap-2 mt-2">
        {news.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className="rounded-full cursor-pointer transition-all duration-200" style={{
            width: 8, height: 8,
            background: i === idx ? 'var(--accent)' : 'var(--border)',
            border: 'none', padding: 0,
          }} />
        ))}
      </div>
    </div>
  )
}

function EmailCard({ email, onClick }) {
  const rotation = (email.id % 3 - 1) * 1.2
  return (
    <div
      onClick={() => onClick(email)}
      className="rounded-2xl p-4 cursor-pointer flex-shrink-0 w-64 transition-all duration-200"
      style={{
        background: 'var(--card)',
        border: `1px solid var(--border)`,
        transform: `rotate(${rotation}deg)`,
        boxShadow: email.read ? 'none' : `0 0 12px var(--accent)33`,
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = `rotate(0deg) scale(1.04)`; e.currentTarget.style.boxShadow = `0 0 20px var(--accent)66` }}
      onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`; e.currentTarget.style.boxShadow = email.read ? 'none' : `0 0 12px var(--accent)33` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span style={{ fontSize: '1.6rem' }}>{email.from.avatar}</span>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--accent)', letterSpacing: '0.05rem' }}>{email.from.name}</p>
          <p style={{ fontSize: '0.65rem', color: 'var(--text2)' }}>{email.time}</p>
        </div>
        {!email.read && (
          <div className="ml-auto rounded-full w-2 h-2 flex-shrink-0" style={{ background: 'var(--accent)', animation: 'pulse 1.5s infinite' }} />
        )}
      </div>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--text)', letterSpacing: '0.02rem' }}>{email.subject}</p>
      <p style={{ fontSize: '0.72rem', color: 'var(--text2)', marginTop: '0.3rem', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{email.preview}</p>
    </div>
  )
}

function EmailOverlay({ email, onClose }) {
  if (!email) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-3xl p-6"
        style={{ background: 'var(--bg2)', border: '1px solid var(--accent)', borderBottom: 'none', animation: 'slideUp 0.3s ease', maxHeight: '75vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <style>{`@keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }`}</style>
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3 items-center">
            <span style={{ fontSize: '2rem' }}>{email.from.avatar}</span>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--accent)' }}>{email.from.name}</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>{email.date}</p>
            </div>
          </div>
          <button onClick={onClose} className="cursor-pointer" style={{ color: 'var(--text2)', fontSize: '1.2rem', background: 'none', border: 'none' }}>✕</button>
        </div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text)', marginBottom: '1rem', letterSpacing: '0.03rem' }}>{email.subject}</p>
        <div style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{email.body}</div>
        <div className="flex gap-3 mt-5">
          <button className="flex-1 py-3 rounded-xl cursor-pointer transition-all duration-200" style={{ background: 'var(--accent)', color: '#000', fontFamily: 'var(--font-display)', fontSize: '0.9rem', border: 'none' }}
            onMouseEnter={e => e.target.style.opacity = '0.8'} onMouseLeave={e => e.target.style.opacity = '1'}>
            REPLY 📩
          </button>
          <button className="px-5 py-3 rounded-xl cursor-pointer" style={{ background: 'var(--bg)', color: 'var(--text2)', border: '1px solid var(--border)', fontFamily: 'var(--font-display)', fontSize: '0.9rem' }}
            onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TeenagerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', fontFamily: 'var(--font-main)' }}>
      <StockTicker />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--accent)', letterSpacing: '0.1rem' }}>
          INBOX
        </h1>
        <div className="flex items-center gap-3">
          <span className="rounded-full px-3 py-1" style={{ background: 'var(--accent)', color: '#000', fontFamily: 'var(--font-display)', fontSize: '0.8rem', animation: 'pulse 2s infinite' }}>
            {emails.filter(e => !e.read).length} NEW
          </span>
          <button
            onClick={onSwitchPersona}
            className="px-4 py-1.5 rounded-full text-sm cursor-pointer"
            style={{ background: 'var(--bg2)', color: 'var(--text2)', border: '1px solid var(--border)', fontFamily: 'var(--font-display)', fontSize: '0.75rem' }}
          >
            SWITCH →
          </button>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex" style={{ height: 'calc(100vh - 105px)' }}>
        {/* Left sidebar */}
        <div className="flex flex-col gap-4 p-4" style={{ width: 220, borderRight: '1px solid var(--border)', overflowY: 'auto', flexShrink: 0 }}>
          <WeatherBadge />
          <NewsCards />
          {/* Mini stock charts */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--text2)', marginBottom: '0.5rem', letterSpacing: '0.1rem' }}>MARKETS</div>
            {stocks.map(s => (
              <div key={s.ticker} className="mb-3">
                <div className="flex justify-between" style={{ fontSize: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>{s.ticker}</span>
                  <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : 'var(--accent2)' }}>
                    {s.changePct >= 0 ? '▲' : '▼'}{Math.abs(s.changePct).toFixed(2)}%
                  </span>
                </div>
                <div style={{ height: 30 }}>
                  <ResponsiveContainer width="100%" height="100%" debounce={50}>
                    <LineChart data={s.series.map((v, i) => ({ v, i }))}>
                      <Line type="monotone" dataKey="v" stroke={s.changePct >= 0 ? '#00ff88' : '#ff00cc'} dot={false} strokeWidth={1.5} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email scroll area */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden" style={{ padding: '2rem 1.5rem' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text2)', fontFamily: 'var(--font-display)', marginBottom: '1rem', letterSpacing: '0.1rem' }}>
            SCROLL TO BROWSE →
          </div>
          <div className="flex gap-5 items-center" style={{ height: '100%', paddingBottom: '1rem' }}>
            {emails.map(email => (
              <EmailCard key={email.id} email={email} onClick={setSelectedEmail} />
            ))}
          </div>
        </div>
      </div>

      <EmailOverlay email={selectedEmail} onClose={() => setSelectedEmail(null)} />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
