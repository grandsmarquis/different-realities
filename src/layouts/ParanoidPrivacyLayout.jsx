import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function sha256fake(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0 }
  return Math.abs(h).toString(16).padStart(8, '0').repeat(4).slice(0, 40)
}

function WarningBanner({ text }) {
  return (
    <div style={{ background: 'var(--accent)', color: '#000', padding: '4px 12px', fontSize: '0.7rem', fontFamily: 'var(--font-main)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
      ⚠ {text}
    </div>
  )
}

export default function ParanoidPrivacyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [decrypted, setDecrypted] = useState({})
  const [showStocks, setShowStocks] = useState(false)
  const [showWeather, setShowWeather] = useState(false)

  function decrypt(id) {
    setDecrypted(d => ({ ...d, [id]: true }))
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
      <WarningBanner text="THIS SESSION IS NOT END-TO-END ENCRYPTED · 47 TRACKERS BLOCKED · TOR RECOMMENDED" />
      <WarningBanner text="YOUR ISP MAY BE LOGGING THIS PAGE · METADATA EXPOSED · USE VPN" />

      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--border)', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg2)' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--accent3)', letterSpacing: '0.08em' }}>
            [ENCRYPTED INBOX] 🔒
          </p>
          <p style={{ fontSize: '0.68rem', color: 'var(--text2)' }}>
            {emails.filter(e => !e.read).length} unencrypted message(s) detected · handle with care
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: '0.72rem' }}>
          <span style={{ color: 'var(--accent3)' }}>● VPN: ACTIVE</span>
          <span style={{ color: 'var(--accent2)' }}>● DNS: BLOCKED</span>
          <button type="button" onClick={onSwitchPersona} style={{ color: 'var(--text2)', background: 'none', border: '1px solid var(--border)', padding: '4px 10px', cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.7rem' }}>
            [SWITCH IDENTITY]
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 260px', gap: 0, height: 'calc(100vh - 82px)' }}>
        {/* Left: stats */}
        <div style={{ borderRight: '1px solid var(--border)', padding: '1rem', overflowY: 'auto' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--accent3)', marginBottom: 8 }}>SYSTEM STATUS</p>
          {[
            ['Trackers blocked', '47', 'var(--accent3)'],
            ['DNS leaks', '0', 'var(--accent3)'],
            ['WebRTC leaks', '0', 'var(--accent3)'],
            ['IP exposed', '0.0.0.0', 'var(--accent3)'],
            ['Canvas fingerprint', 'SPOOFED', 'var(--accent2)'],
            ['User-agent', 'RANDOMIZED', 'var(--accent2)'],
          ].map(([k, v, c]) => (
            <div key={k} style={{ marginBottom: 6, fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ color: 'var(--text2)' }}>{k}</span>
              <span style={{ color: c, fontWeight: 600 }}>{v}</span>
            </div>
          ))}

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: 8 }}>WEATHER</p>
            {!showWeather ? (
              <div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text2)', marginBottom: 6 }}>⚠ Location data NOT shared with server.</p>
                <button type="button" onClick={() => setShowWeather(true)} style={{ fontSize: '0.68rem', color: 'var(--accent2)', background: 'none', border: '1px solid var(--accent2)', padding: '3px 8px', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>
                  [load local sensor]
                </button>
              </div>
            ) : (
              <div style={{ fontSize: '0.75rem' }}>
                <p>{weather.icon} {weather.temp}°C</p>
                <p style={{ color: 'var(--text2)', fontSize: '0.68rem' }}>{weather.condition}</p>
                <p style={{ color: 'var(--accent3)', fontSize: '0.65rem', marginTop: 4 }}>✓ Data from local sensor</p>
              </div>
            )}
          </div>
        </div>

        {/* Center: encrypted email list */}
        <div style={{ overflowY: 'auto' }}>
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', fontSize: '0.7rem', color: 'var(--text2)', display: 'flex', gap: 16 }}>
            <span>INBOX // {emails.length} objects // SHA-256 verified</span>
            <span style={{ color: 'var(--accent2)' }}>⚠ Metadata visible to adversaries</span>
          </div>
          {emails.map(email => {
            const isDecrypted = !!decrypted[email.id]
            const hash = sha256fake(email.subject)
            return (
              <div
                key={email.id}
                style={{
                  borderBottom: '1px solid var(--border)',
                  padding: '0.85rem 1rem',
                  cursor: 'pointer',
                  background: selectedEmail?.id === email.id ? 'var(--bg2)' : 'transparent',
                }}
                onClick={() => { if (isDecrypted) setSelectedEmail(email) }}
                onMouseEnter={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = '#1a1a1a' }}
                onMouseLeave={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
                  {isDecrypted ? (
                    <span style={{ fontSize: '0.82rem', color: 'var(--accent3)', fontWeight: email.read ? 400 : 700 }}>{email.subject}</span>
                  ) : (
                    <span style={{ fontSize: '0.78rem', color: 'var(--text2)', fontFamily: 'var(--font-main)', letterSpacing: '0.04em' }}>
                      [ENCRYPTED] {hash.slice(0, 24)}...
                    </span>
                  )}
                  <span style={{ fontSize: '0.65rem', color: 'var(--text2)', flexShrink: 0 }}>{email.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {isDecrypted ? (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>{email.from.name} · {email.from.email}</span>
                  ) : (
                    <span style={{ fontSize: '0.68rem', color: '#555' }}>from: {sha256fake(email.from.email).slice(0, 16)}...</span>
                  )}
                  {!isDecrypted && (
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); decrypt(email.id) }}
                      style={{ fontSize: '0.62rem', color: 'var(--accent2)', background: 'none', border: '1px solid var(--accent2)', padding: '2px 8px', cursor: 'pointer', fontFamily: 'var(--font-main)' }}
                    >
                      [DECRYPT]
                    </button>
                  )}
                  {!email.read && !isDecrypted && (
                    <span style={{ fontSize: '0.6rem', color: 'var(--accent)', marginLeft: 6 }}>●</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: detail + widgets */}
        <div style={{ borderLeft: '1px solid var(--border)', overflowY: 'auto' }}>
          {selectedEmail && decrypted[selectedEmail.id] ? (
            <div style={{ padding: '1rem' }}>
              <p style={{ fontSize: '0.6rem', color: 'var(--accent3)', letterSpacing: '0.2em', marginBottom: 8 }}>✓ DECRYPTED · PGPVERIFIED</p>
              <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)', marginBottom: 4 }}>{selectedEmail.subject}</p>
              <p style={{ fontSize: '0.68rem', color: 'var(--text2)', marginBottom: 12 }}>{selectedEmail.from.name}</p>
              <div style={{ fontSize: '0.78rem', lineHeight: 1.7, color: 'var(--text)', whiteSpace: 'pre-line' }}>{selectedEmail.body}</div>
              <button type="button" onClick={() => setSelectedEmail(null)} style={{ marginTop: 12, fontSize: '0.68rem', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>
                [wipe from memory]
              </button>
            </div>
          ) : (
            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text2)', fontSize: '0.75rem', marginTop: '2rem' }}>
              <p style={{ fontSize: '1.5rem', marginBottom: 8 }}>🔒</p>
              <p>Decrypt a message to read it.</p>
            </div>
          )}

          <div style={{ borderTop: '1px solid var(--border)', padding: '1rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: 8 }}>MARKET DATA</p>
            {!showStocks ? (
              <div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text2)', marginBottom: 6 }}>
                  ⚠ External API call would expose IP. Blocked.
                </p>
                <button type="button" onClick={() => setShowStocks(true)} style={{ fontSize: '0.68rem', color: 'var(--accent2)', background: 'none', border: '1px solid var(--accent2)', padding: '3px 8px', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>
                  [route via TOR]
                </button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '0.65rem', color: 'var(--accent3)', marginBottom: 8 }}>✓ Routed anonymously</p>
                {stocks.map(s => (
                  <div key={s.ticker} style={{ fontSize: '0.72rem', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text)' }}>{s.ticker}</span>
                    <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent)' }}>
                      {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', padding: '1rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: 8 }}>NEWS SOURCES</p>
            {news.slice(0, 4).map(n => (
              <div key={n.id} style={{ marginBottom: 8, fontSize: '0.72rem' }}>
                <span style={{ color: 'var(--accent2)', fontSize: '0.6rem' }}>⚠ UNVERIFIED SOURCE · </span>
                <span style={{ color: 'var(--text2)' }}>{n.title.slice(0, 55)}...</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
