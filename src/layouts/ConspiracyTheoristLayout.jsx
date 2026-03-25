import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const redactedNews = [
  'They KNOW. The patterns don\'t lie. [REDACTED] confirmed.',
  'Follow the money. AAPL, NVDA — who really controls these numbers?',
  '████████ has been silenced. The media won\'t cover this.',
  'Event at [CLASSIFIED LOCATION] not a coincidence. Do your research.',
  'Cannes 2026 lineup = predictive programming. Wake up.',
  'TSMC facility — Cui bono? Always ask who benefits.',
]

const corkBg = `radial-gradient(ellipse at 30% 30%, #b8860b22 0%, transparent 50%),
  radial-gradient(ellipse at 70% 80%, #8b6914 11 0%, transparent 40%),
  repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(139,105,20,0.05) 4px, rgba(139,105,20,0.05) 8px)`

const tilts = ['-2deg', '1.5deg', '-1deg', '2.5deg', '-1.8deg', '1deg', '-2.2deg', '0.8deg']

export default function ConspiracyTheoristLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [revealStocks, setRevealStocks] = useState(false)

  return (
    <div className="min-h-screen" style={{
      background: `${corkBg}, #1a1408`,
      backgroundBlendMode: 'normal',
      fontFamily: 'var(--font-main)',
      color: 'var(--text)',
    }}>
      {/* Top string */}
      <div className="w-full h-1" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent2), var(--accent), transparent)' }} />

      <header className="px-6 py-5 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.2 }}>
            THEY DON'T WANT<br />YOU TO SEE THIS
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '0.8rem', marginTop: 4, fontStyle: 'italic' }}>
            {emails.filter(e => !e.read).length} intercepted transmissions · STAY VIGILANT
          </p>
        </div>
        <button type="button" onClick={onSwitchPersona}
          style={{ border: '1px solid var(--border)', background: 'rgba(0,0,0,0.5)', color: 'var(--text2)', padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.78rem' }}>
          [CHANGE IDENTITY]
        </button>
      </header>

      <div className="px-6 pb-10">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Corkboard — emails as pinned cards */}
          <main className="lg:col-span-8">
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: '1rem' }}>
              ★ EVIDENCE BOARD — DO NOT SHARE ★
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem', position: 'relative' }}>
              {emails.map((email, i) => (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid #c8b870',
                    padding: '1.25rem',
                    transform: `rotate(${tilts[i % tilts.length]})`,
                    boxShadow: '4px 4px 12px rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                    position: 'relative',
                    color: '#1a1408',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(0deg) scale(1.04)'; e.currentTarget.style.boxShadow = '6px 6px 20px rgba(0,0,0,0.7)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${tilts[i % tilts.length]})`; e.currentTarget.style.boxShadow = '4px 4px 12px rgba(0,0,0,0.5)' }}
                >
                  {/* Push pin */}
                  <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', fontSize: '1.2rem', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))' }}>📌</div>
                  {!email.read && (
                    <div style={{ position: 'absolute', top: 8, right: 8, background: 'var(--accent)', color: '#fff', fontSize: '0.55rem', padding: '1px 4px', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
                      UNREAD
                    </div>
                  )}
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', color: '#8b6914', letterSpacing: '0.15em', marginBottom: 6 }}>
                    SOURCE: {email.from.name.toUpperCase()}
                  </p>
                  <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.85rem', fontWeight: email.read ? 400 : 700, lineHeight: 1.35, marginBottom: 6, color: '#1a1408' }}>
                    {email.subject}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: '#5c4a1e', lineHeight: 1.4 }}>
                    {email.preview.slice(0, 90)}...
                  </p>
                  <div style={{ marginTop: 8, paddingTop: 6, borderTop: '1px dashed #c8b870', fontSize: '0.62rem', color: '#8b6914', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{email.date}</span>
                    <span>{email.tag?.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Sidebar: classified files */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Weather */}
            <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border)', padding: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>⚠ ATMOSPHERIC REPORT</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text)' }}>{weather.icon} {weather.temp}°C — <span style={{ fontStyle: 'italic' }}>"{weather.condition}." Or so they claim.</span></p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text2)', marginTop: 4 }}>CHEMTRAIL ACTIVITY: <span style={{ color: 'var(--accent2)' }}>ELEVATED</span></p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>HAARP STATUS: <span style={{ color: 'var(--accent)' }}>MONITORING</span></p>
            </div>

            {/* Stocks */}
            <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border)', padding: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>💰 CABAL MARKET MANIPULATION</p>
              {!revealStocks ? (
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text2)', fontStyle: 'italic', marginBottom: 8 }}>The numbers are controlled. Click to see how deep it goes.</p>
                  <button type="button" onClick={() => setRevealStocks(true)} style={{ fontSize: '0.7rem', color: 'var(--accent)', background: 'none', border: '1px solid var(--accent)', padding: '4px 10px', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>
                    [DECRYPT DATA]
                  </button>
                </div>
              ) : (
                stocks.map(s => (
                  <div key={s.ticker} style={{ marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', color: 'var(--text2)' }}>{s.ticker} </span>
                    <span style={{ color: s.changePct >= 0 ? 'var(--accent2)' : 'var(--accent)', fontSize: '0.8rem' }}>
                      {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}% — {s.changePct >= 0 ? 'PUMP' : 'DUMP'} protocol active
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* News / decoded */}
            <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border)', padding: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>📋 DECODED TRANSMISSIONS</p>
              {news.map((n, i) => (
                <div key={n.id} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: i < news.length - 1 ? '1px dashed var(--border)' : 'none' }}>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text)', lineHeight: 1.4, fontStyle: 'italic' }}>"{redactedNews[i]}"</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Email detail modal */}
      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setSelectedEmail(null)}>
          <div
            style={{ maxWidth: 540, width: '100%', background: 'var(--card)', border: '2px solid var(--accent)', padding: '2rem', color: '#1a1408', maxHeight: '80vh', overflowY: 'auto', transform: 'rotate(-0.5deg)' }}
            onClick={e => e.stopPropagation()}
          >
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              ★ CLASSIFIED DOCUMENT ★
            </p>
            <div style={{ borderBottom: '1px dashed #c8b870', paddingBottom: 8, marginBottom: 8 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', lineHeight: 1.3 }}>{selectedEmail.subject}</p>
              <p style={{ fontSize: '0.72rem', color: '#5c4a1e', marginTop: 4 }}>ORIGIN: {selectedEmail.from.name} · {selectedEmail.date}</p>
            </div>
            <pre style={{ fontFamily: 'var(--font-main)', fontSize: '0.82rem', whiteSpace: 'pre-wrap', lineHeight: 1.8, color: '#1a1408' }}>{selectedEmail.body}</pre>
            <p style={{ marginTop: 12, fontSize: '0.65rem', color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>DO YOUR OWN RESEARCH · SHARE THIS WITH EVERYONE YOU TRUST</p>
            <button type="button" onClick={() => setSelectedEmail(null)}
              style={{ marginTop: 8, background: 'none', border: '1px solid #5c4a1e', color: '#5c4a1e', padding: '4px 14px', cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.78rem' }}>
              [BURN AFTER READING]
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
