import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

function WeatherCard() {
  return (
    <div className="rounded-2xl p-6 mb-6 text-center shadow-md" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
      <p className="text-5xl mb-2">{weather.icon}</p>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text)' }}>
        Good morning, dear.
      </p>
      <p style={{ color: 'var(--text2)', fontFamily: 'var(--font-main)', marginTop: '0.25rem' }}>
        It's {weather.temp}°C in {weather.city} — {weather.condition.toLowerCase()}.
      </p>
      <div className="flex justify-center gap-3 mt-4">
        {weather.forecast.map(d => (
          <div key={d.day} className="text-center">
            <div style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>{d.day}</div>
            <div style={{ fontSize: '1.1rem' }}>{d.icon}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>{d.high}°</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StockCard() {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl mb-6 overflow-hidden shadow-md" style={{ border: '1px solid var(--border)', background: 'var(--card)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 cursor-pointer"
        style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text)' }}
      >
        <span>📈 The Market, dear</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>{open ? '▲ hide' : '▼ show'}</span>
      </button>
      {open && (
        <div className="p-4 pt-0 grid grid-cols-2 gap-3">
          {stocks.map(s => (
            <div key={s.ticker} className="rounded-xl p-3" style={{ background: 'var(--bg2)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--text)' }}>{s.ticker}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>{s.name}</div>
              <div className="mt-1" style={{ fontSize: '1rem', color: s.changePct >= 0 ? '#2d6a4f' : '#c0392b', fontWeight: 500 }}>
                {s.currency}{s.price.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.7rem', color: s.changePct >= 0 ? '#2d6a4f' : '#c0392b' }}>
                {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
              </div>
              <div style={{ height: 40, marginTop: 6 }}>
                <ResponsiveContainer width="100%" height="100%" debounce={50}>
                  <LineChart data={s.series.map((v, i) => ({ v, i }))}>
                    <Line type="monotone" dataKey="v" stroke={s.changePct >= 0 ? '#2d6a4f' : '#c0392b'} dot={false} strokeWidth={1.5} />
                    <Tooltip formatter={(v) => [`${s.currency}${v}`, '']} contentStyle={{ fontSize: 10 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function NewsBoard() {
  return (
    <div className="rounded-2xl p-5 mb-6 shadow-md" style={{ background: 'var(--card)', border: '2px dashed var(--border)' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text)', marginBottom: '0.75rem' }}>
        📰 This week's little clippings
      </h3>
      <div className="space-y-3">
        {news.map(n => (
          <div key={n.id} className="flex gap-2 items-start pb-3" style={{ borderBottom: '1px dashed var(--border)' }}>
            <span style={{ fontSize: '1.2rem' }}>{n.emoji}</span>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.4 }}>{n.title}</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text2)', marginTop: '0.2rem' }}>{n.source} · {n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmailCard({ email, onClick }) {
  return (
    <div
      onClick={() => onClick(email)}
      className="rounded-2xl p-5 mb-4 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-lg"
      style={{
        background: 'var(--card)',
        border: `1px solid var(--border)`,
        opacity: email.read ? 0.8 : 1,
        transform: 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: '1.8rem' }}>{email.from.avatar}</span>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: email.read ? 400 : 600, color: 'var(--text)' }}>
              {email.from.name}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>{email.date}</p>
          </div>
        </div>
        {email.starred && <span style={{ color: 'var(--accent)' }}>★</span>}
      </div>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginTop: '0.6rem', color: 'var(--text)', fontWeight: email.read ? 400 : 600 }}>
        {email.subject}
      </p>
      <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginTop: '0.3rem', lineHeight: 1.5 }}>{email.preview}</p>
      {!email.read && (
        <div className="mt-2 inline-block rounded-full px-2 py-0.5" style={{ background: 'var(--accent)', color: '#fff', fontSize: '0.65rem' }}>
          New ✉
        </div>
      )}
    </div>
  )
}

function LetterModal({ email, onClose }) {
  if (!email) return null
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-6"
      style={{ background: 'rgba(61,43,31,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full rounded-3xl p-8 shadow-2xl"
        style={{ background: 'var(--card)', border: '2px solid var(--border)', fontFamily: 'var(--font-main)', maxHeight: '80vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-5 cursor-pointer" style={{ color: 'var(--text2)', fontSize: '1.2rem' }}>✕</button>
        <div className="text-center mb-6">
          <span style={{ fontSize: '2.5rem' }}>✉️</span>
          <div style={{ width: '100%', height: 1, background: 'var(--border)', margin: '1rem 0' }} />
        </div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text)', marginBottom: '0.5rem' }}>{email.subject}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '1.5rem' }}>
          From {email.from.name} · {email.date}
        </p>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{email.body}</div>
        <div style={{ width: '100%', height: 1, background: 'var(--border)', margin: '1.5rem 0' }} />
        <p className="text-center" style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>🌸 🌸 🌸</p>
      </div>
    </div>
  )
}

export default function GrandmotherLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', fontFamily: 'var(--font-main)' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--text)' }}>
            My Letterbox
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text2)', marginTop: '0.25rem' }}>🌹 You have {emails.filter(e => !e.read).length} new letters 🌹</p>
          <button
            onClick={onSwitchPersona}
            className="mt-4 px-4 py-1.5 rounded-full text-sm cursor-pointer transition-opacity hover:opacity-70"
            style={{ background: 'var(--bg2)', color: 'var(--text2)', border: '1px solid var(--border)' }}
          >
            Change visitor →
          </button>
        </div>

        <div style={{ borderBottom: '2px solid var(--border)', marginBottom: '2rem', textAlign: 'center', color: 'var(--border)', letterSpacing: '0.5rem' }}>✿ ✿ ✿</div>

        <WeatherCard />
        <StockCard />

        {/* Emails */}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '1rem' }}>
          Letters received
        </h2>
        {emails.map(email => (
          <EmailCard key={email.id} email={email} onClick={setSelectedEmail} />
        ))}

        <div style={{ borderTop: '2px solid var(--border)', marginTop: '2rem', paddingTop: '1.5rem', textAlign: 'center', color: 'var(--border)', letterSpacing: '0.5rem' }}>✿ ✿ ✿</div>

        <NewsBoard />
      </div>

      <LetterModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
