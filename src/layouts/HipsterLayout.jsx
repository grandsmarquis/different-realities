import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

function toPoetic(dateStr, time) {
  const d = new Date(dateStr)
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
  if (time && !dateStr.includes('-')) return time.toLowerCase()
  return `a ${days[d.getDay()]} in ${months[d.getMonth()]}`
}

export default function HipsterLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', fontFamily: 'var(--font-main)', fontWeight: 300 }}>
      {selectedEmail ? (
        /* Full-width editorial email view */
        <div className="min-h-screen" style={{ animation: 'fadeIn 0.5s ease' }}>
          <div className="max-w-2xl mx-auto px-8 py-16">
            <button
              onClick={() => setSelectedEmail(null)}
              style={{ fontSize: '0.75rem', color: 'var(--text2)', letterSpacing: '0.15rem', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '4rem', textTransform: 'uppercase' }}
            >
              ← back
            </button>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.2rem', color: 'var(--text2)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {toPoetic(selectedEmail.date, selectedEmail.time)} · {selectedEmail.from.name}
            </p>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 200, lineHeight: 1.2, color: 'var(--text)', marginBottom: '3rem', letterSpacing: '-0.02rem' }}>
              {selectedEmail.subject}
            </h1>
            <div style={{ width: 40, height: 1, background: 'var(--text)', marginBottom: '3rem' }} />
            <div style={{ fontSize: '1rem', lineHeight: 2, color: 'var(--text)', whiteSpace: 'pre-line', fontWeight: 300 }}>
              {selectedEmail.body}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto px-8" style={{ paddingTop: '10vh', paddingBottom: '10vh' }}>
          {/* Weather — one line */}
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.2rem', color: 'var(--text2)', textTransform: 'lowercase', marginBottom: '6rem' }}>
            {weather.condition.toLowerCase()}, {weather.temp}° — {weather.city.toLowerCase()}
          </p>

          {/* Site title */}
          <div style={{ marginBottom: '5rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 200, color: 'var(--text)', letterSpacing: '-0.03rem', lineHeight: 1 }}>inbox.</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--text2)', letterSpacing: '0.1rem' }}>
                {emails.filter(e => !e.read).length} unread
              </p>
              <button
                onClick={onSwitchPersona}
                style={{ fontSize: '0.68rem', color: 'var(--text2)', letterSpacing: '0.15rem', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                change →
              </button>
            </div>
          </div>

          {/* Email list — subjects only */}
          <div>
            {emails.map((email, i) => (
              <div key={email.id}>
                <button
                  onClick={() => setSelectedEmail(email)}
                  className="w-full text-left group"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '1.25rem 0', display: 'block' }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span style={{
                      fontSize: '1rem',
                      color: 'var(--text)',
                      fontWeight: email.read ? 300 : 400,
                      lineHeight: 1.4,
                      textDecoration: 'none',
                      borderBottom: '1px solid transparent',
                      transition: 'border-color 0.2s',
                    }}
                      onMouseEnter={e => e.target.style.borderBottomColor = 'var(--text)'}
                      onMouseLeave={e => e.target.style.borderBottomColor = 'transparent'}
                    >
                      {email.subject}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text2)', flexShrink: 0, fontStyle: 'italic', fontWeight: 200 }}>
                      {toPoetic(email.date, email.time)}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text2)', marginTop: '0.2rem', fontWeight: 200 }}>
                    {email.from.name.toLowerCase()}
                  </p>
                </button>
                {i < emails.length - 1 && (
                  <div style={{ height: 1, background: 'var(--border)' }} />
                )}
              </div>
            ))}
          </div>

          {/* Stock sparklines — ultra minimal */}
          <div style={{ marginTop: '6rem', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.2rem', color: 'var(--text2)', textTransform: 'lowercase', marginBottom: '1.5rem' }}>
              the market, briefly.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {stocks.map(s => (
                <div key={s.ticker}>
                  <div className="flex justify-between items-baseline" style={{ marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text2)', letterSpacing: '0.1rem' }}>{s.ticker.toLowerCase()}</span>
                    <span style={{ fontSize: '0.68rem', color: s.changePct >= 0 ? 'var(--text)' : 'var(--text2)', fontStyle: 'italic' }}>
                      {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
                    </span>
                  </div>
                  <div style={{ height: 28 }}>
                    <ResponsiveContainer width="100%" height="100%" debounce={50}>
                      <LineChart data={s.series.map((v, i) => ({ v, i }))}>
                        <Line type="monotone" dataKey="v" stroke="var(--text2)" dot={false} strokeWidth={0.8} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News — text only */}
          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.2rem', color: 'var(--text2)', textTransform: 'lowercase', marginBottom: '1.5rem' }}>
              meanwhile, in the world.
            </p>
            {news.map((n, i) => (
              <div key={n.id}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.6, padding: '0.75rem 0', fontWeight: 300 }}>
                  {n.title}
                </p>
                {i < news.length - 1 && <div style={{ height: 1, background: 'var(--border)' }} />}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '8rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.68rem', color: 'var(--text2)', letterSpacing: '0.15rem', fontStyle: 'italic' }}>
              who are you, really?
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  )
}
