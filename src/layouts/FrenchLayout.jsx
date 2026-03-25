import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, AreaChart, Area, ResponsiveContainer } from 'recharts'

function formatFrenchDate(dateStr, time) {
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  if (!dateStr.includes('-')) return time || dateStr
  const d = new Date(dateStr)
  return `le ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function LeftPanel({ onSwitchPersona }) {
  return (
    <div className="flex flex-col" style={{ width: 260, background: 'var(--bg2)', borderRight: '1px solid var(--border)', flexShrink: 0, overflowY: 'auto' }}>
      {/* Tricolour stripe */}
      <div className="flex" style={{ height: 8 }}>
        <div style={{ flex: 1, background: '#002395' }} />
        <div style={{ flex: 1, background: '#ffffff' }} />
        <div style={{ flex: 1, background: '#ED2939' }} />
      </div>

      {/* République header */}
      <div className="text-center px-6 py-8" style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: '3rem', lineHeight: 1, marginBottom: '0.5rem' }}>⚜️</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--accent)', letterSpacing: '0.15rem', textTransform: 'uppercase' }}>
          République Française
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text2)', letterSpacing: '0.1rem', marginTop: '0.25rem' }}>
          Liberté · Égalité · Fraternité
        </div>
      </div>

      {/* Weather */}
      <div className="px-6 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text2)', letterSpacing: '0.15rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Météo</p>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: '2rem' }}>{weather.icon}</span>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text)', lineHeight: 1 }}>{weather.temp}°C</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>{weather.condition_fr}</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>{weather.city}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          {weather.forecast.map(d => (
            <div key={d.day} className="text-center flex-1">
              <div style={{ fontSize: '0.6rem', color: 'var(--text2)' }}>{d.day}</div>
              <div style={{ fontSize: '0.9rem' }}>{d.icon}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text)' }}>{d.high}°</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marianne silhouette area */}
      <div className="px-6 py-5 text-center flex-1 flex flex-col items-center justify-center" style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: '5rem', lineHeight: 1, opacity: 0.15 }}>👩</div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text2)', marginTop: '0.5rem' }}>
          « La France, c'est une idée. »
        </p>
      </div>

      {/* Stock chart */}
      <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text2)', letterSpacing: '0.15rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Marchés financiers</p>
        {stocks.map(s => (
          <div key={s.ticker} style={{ marginBottom: '0.75rem' }}>
            <div className="flex justify-between items-baseline" style={{ marginBottom: '2px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', color: 'var(--text)' }}>{s.ticker}</span>
              <span style={{ fontSize: '0.7rem', color: s.changePct >= 0 ? '#145a32' : '#922b21' }}>
                {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct).toFixed(2)}%
              </span>
            </div>
            <div style={{ height: 28, position: 'relative' }}>
              <ResponsiveContainer width="100%" height={28} debounce={50}>
                <AreaChart data={s.series.map((v, i) => ({ v, i }))}>
                  <Area type="monotone" dataKey="v" stroke={s.changePct >= 0 ? '#002395' : '#ED2939'} fill={s.changePct >= 0 ? '#00239522' : '#ED293922'} dot={false} strokeWidth={1} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <button
          onClick={onSwitchPersona}
          className="w-full py-2 text-xs cursor-pointer transition-opacity hover:opacity-70"
          style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 4, fontFamily: 'var(--font-display)', letterSpacing: '0.1rem' }}
        >
          Changer de visiteur
        </button>
      </div>
    </div>
  )
}

function EmailRow({ email, active, onClick }) {
  return (
    <div
      onClick={() => onClick(email)}
      className="px-6 py-4 cursor-pointer"
      style={{
        borderBottom: '1px solid var(--border)',
        background: active ? 'var(--bg2)' : 'transparent',
        borderLeft: active ? `3px solid var(--accent)` : '3px solid transparent',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#00239508' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
    >
      <div className="flex justify-between items-baseline gap-2 mb-1">
        <span style={{ fontFamily: 'var(--font-main)', fontSize: '0.82rem', color: 'var(--text)', fontWeight: email.read ? 400 : 600 }}>
          {email.from.name}
        </span>
        <span style={{ fontSize: '0.68rem', color: 'var(--text2)', fontStyle: 'italic', flexShrink: 0 }}>
          {formatFrenchDate(email.date, email.time)}
        </span>
      </div>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', color: 'var(--text)', fontWeight: email.read ? 400 : 600, lineHeight: 1.3, marginBottom: '0.2rem' }}>
        {email.subject}
      </p>
      <p style={{ fontSize: '0.75rem', color: 'var(--text2)', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
        {email.preview}
      </p>
    </div>
  )
}

function ReadingPane({ email, onClose }) {
  if (!email) return (
    <div className="flex-1 flex items-center justify-center flex-col gap-2" style={{ color: 'var(--text2)' }}>
      <div style={{ fontSize: '2rem', opacity: 0.3 }}>✉️</div>
      <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.9rem' }}>Sélectionnez un courrier</p>
    </div>
  )
  return (
    <div className="flex-1 overflow-y-auto p-8" style={{ background: 'var(--card)', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ borderBottom: '2px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text2)', letterSpacing: '0.1rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Courrier reçu</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text)', lineHeight: 1.3, marginBottom: '1rem' }}>{email.subject}</h2>
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: '0.82rem', fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
              De : <strong>{email.from.name}</strong> — {email.from.email}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text2)', fontStyle: 'italic', marginTop: '0.2rem' }}>
              {formatFrenchDate(email.date, email.time)}
            </p>
          </div>
          <span style={{ fontSize: '2rem' }}>{email.from.avatar}</span>
        </div>
      </div>
      <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.9rem', lineHeight: 2, color: 'var(--text)', whiteSpace: 'pre-line' }}>
        {email.body}
      </div>
      <div className="flex gap-3 mt-8">
        <button style={{ padding: '0.5rem 1.5rem', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '0.85rem', letterSpacing: '0.08rem' }}>
          Répondre
        </button>
        <button style={{ padding: '0.5rem 1.5rem', background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '0.85rem' }}>
          Transférer
        </button>
      </div>
    </div>
  )
}

function NewsPanel({ onClose }) {
  return (
    <div style={{ width: 240, borderLeft: '1px solid var(--border)', overflowY: 'auto', background: 'var(--bg)', flexShrink: 0 }}>
      {/* Tricolour stripe */}
      <div className="flex" style={{ height: 4 }}>
        <div style={{ flex: 1, background: '#002395' }} />
        <div style={{ flex: 1, background: '#ffffff', border: '1px solid var(--border)' }} />
        <div style={{ flex: 1, background: '#ED2939' }} />
      </div>
      <div className="p-4">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
          La Presse
        </h3>
        {news.map((n, i) => (
          <div key={n.id} style={{ paddingBottom: '0.75rem', marginBottom: '0.75rem', borderBottom: i < news.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.1rem', color: '#ED2939', textTransform: 'uppercase', fontWeight: 600 }}>{n.category}</span>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.78rem', color: 'var(--text)', lineHeight: 1.4, marginTop: '0.2rem' }}>{n.title}</p>
            <p style={{ fontSize: '0.65rem', color: 'var(--text2)', marginTop: '0.2rem', fontStyle: 'italic' }}>{n.source} · {n.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FrenchLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="flex" style={{ height: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-main)' }}>
      <LeftPanel onSwitchPersona={onSwitchPersona} />

      {/* Center: inbox header + email list */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Tricolour top stripe */}
        <div className="flex" style={{ height: 6 }}>
          <div style={{ flex: 1, background: '#002395' }} />
          <div style={{ flex: 1, background: '#ffffff', border: '1px solid var(--border)' }} />
          <div style={{ flex: 1, background: '#ED2939' }} />
        </div>

        {/* Inbox header */}
        <div className="px-6 py-4 flex items-baseline justify-between flex-shrink-0" style={{ borderBottom: '2px solid var(--border)' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text)', lineHeight: 1 }}>Boîte de réception</h2>
            <p style={{ fontSize: '0.72rem', color: 'var(--text2)', fontStyle: 'italic', marginTop: '0.2rem' }}>
              {emails.filter(e => !e.read).length} message{emails.filter(e => !e.read).length > 1 ? 's' : ''} non lu{emails.filter(e => !e.read).length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {emails.filter(e => !e.read).length > 0 && (
              <span className="rounded px-2 py-0.5" style={{ background: '#002395', color: '#fff', fontSize: '0.7rem', fontFamily: 'var(--font-display)', letterSpacing: '0.05rem' }}>
                {emails.filter(e => !e.read).length} nouveaux
              </span>
            )}
          </div>
        </div>

        {/* Split: email list | reading pane */}
        <div className="flex flex-1 min-h-0">
          <div style={{ width: 340, borderRight: '1px solid var(--border)', overflowY: 'auto', flexShrink: 0 }}>
            {emails.map(email => (
              <EmailRow
                key={email.id}
                email={email}
                active={selectedEmail?.id === email.id}
                onClick={setSelectedEmail}
              />
            ))}
          </div>
          <ReadingPane email={selectedEmail} />
        </div>
      </div>

      {/* Right: news */}
      <NewsPanel />

      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  )
}
