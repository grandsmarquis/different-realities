import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function Marquee({ children }) {
  return (
    <div style={{ overflow: 'hidden', background: '#000080', padding: '4px 0' }}>
      <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'retroMarquee 16s linear infinite', fontFamily: 'var(--font-main)', fontSize: '1.1rem', color: '#ffff00' }}>
        {children}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{children}
      </div>
    </div>
  )
}

export default function RetroInternetLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [counter] = useState(42069)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
      <Marquee>★ WELCOME TO MY INBOX PAGE!!! ★ BEST VIEWED IN NETSCAPE NAVIGATOR 4.0 ★ 800x600 RESOLUTION ★ DO NOT STEAL ★</Marquee>

      <div style={{ textAlign: 'center', padding: '12px 0', background: 'linear-gradient(180deg, #000080 0%, #0000ff 50%, #000080 100%)', borderBottom: '4px ridge #c0c0c0' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem, 3vw, 1.3rem)', color: '#ffff00', textShadow: '2px 2px #ff00ff', margin: 0 }}>
          ✉ MY KEWL E-MAIL INBOX!!! ✉
        </h1>
        <p style={{ color: '#00ffff', fontSize: '0.85rem', margin: '4px 0 0', fontFamily: 'var(--font-main)' }}>
          ~*~ Updated: March 2026 ~*~&nbsp;
          <span style={{ animation: 'retroBlink 1s step-end infinite', color: '#ff0000' }}>●ONLINE●</span>
        </p>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button type="button" onClick={onSwitchPersona} style={{ background: '#c0c0c0', color: '#000', border: '3px outset #e0e0e0', padding: '4px 12px', fontFamily: 'var(--font-main)', fontSize: '0.8rem', cursor: 'pointer' }}>
            CLICK HERE!!
          </button>
          <span style={{ color: '#ffff00', fontSize: '0.75rem', alignSelf: 'center' }}>Visitors: {counter.toLocaleString()} 🎉</span>
        </div>
      </div>

      {/* Under construction */}
      <div style={{ background: '#ff0000', padding: '4px', textAlign: 'center', fontFamily: 'var(--font-main)', fontSize: '0.9rem' }}>
        🚧 UNDER CONSTRUCTION 🚧 &nbsp;&nbsp; 🚧 THIS PAGE IS ALWAYS BEING UPDATED 🚧
      </div>

      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', padding: '8px', background: '#c0c0c0' }}>
        {/* Left sidebar */}
        <div style={{ width: 180, flexShrink: 0, marginRight: 8 }}>
          {/* Weather */}
          <div style={{ border: '3px ridge #e0e0e0', background: '#000080', padding: 8, marginBottom: 8, color: '#fff', fontFamily: 'var(--font-main)', fontSize: '0.82rem' }}>
            <div style={{ background: '#000080', color: '#ffff00', padding: '2px 4px', marginBottom: 4, borderBottom: '2px solid #c0c0c0', fontSize: '0.75rem' }}>
              🌤 WEATHER
            </div>
            <p>{weather.icon} {weather.temp}°C</p>
            <p style={{ color: '#00ffff', fontSize: '0.72rem' }}>{weather.city}</p>
            <p style={{ color: '#c0c0c0', fontSize: '0.7rem' }}>{weather.condition}</p>
          </div>
          {/* Stock thing */}
          <div style={{ border: '3px ridge #e0e0e0', background: '#000080', padding: 8, marginBottom: 8, color: '#fff', fontFamily: 'var(--font-main)', fontSize: '0.78rem' }}>
            <div style={{ color: '#ffff00', marginBottom: 4, fontSize: '0.75rem' }}>💰 STONKS</div>
            {stocks.map(s => (
              <div key={s.ticker} style={{ marginBottom: 3 }}>
                <span style={{ color: '#00ffff' }}>{s.ticker}</span>{' '}
                <span style={{ color: s.changePct >= 0 ? '#00ff00' : '#ff0000' }}>
                  {s.changePct >= 0 ? '▲' : '▼'}{Math.abs(s.changePct).toFixed(1)}%
                </span>
              </div>
            ))}
            <div style={{ marginTop: 6, padding: '4px', background: '#ff0000', color: '#fff', fontSize: '0.65rem', textAlign: 'center', animation: 'retroBlink 1.5s step-end infinite' }}>
              GET RICH QUICK!!!
            </div>
          </div>
          {/* Links */}
          <div style={{ border: '3px ridge #e0e0e0', background: '#000080', padding: 8, color: '#fff', fontFamily: 'var(--font-main)', fontSize: '0.78rem' }}>
            <div style={{ color: '#ffff00', marginBottom: 4 }}>🔗 KEWL LINKS</div>
            <p style={{ color: '#00ffff', margin: '2px 0' }}>⬡ My Homepage</p>
            <p style={{ color: '#00ffff', margin: '2px 0' }}>⬡ My Pets</p>
            <p style={{ color: '#00ffff', margin: '2px 0' }}>⬡ Guestbook</p>
            <p style={{ color: '#00ffff', margin: '2px 0' }}>⬡ Webring</p>
          </div>
        </div>

        {/* Main inbox */}
        <div style={{ flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-main)', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: '#000080', color: '#ffff00' }}>
                <th style={{ border: '2px ridge #c0c0c0', padding: '4px 8px', textAlign: 'left' }}>!</th>
                <th style={{ border: '2px ridge #c0c0c0', padding: '4px 8px', textAlign: 'left' }}>FROM</th>
                <th style={{ border: '2px ridge #c0c0c0', padding: '4px 8px', textAlign: 'left' }}>SUBJECT</th>
                <th style={{ border: '2px ridge #c0c0c0', padding: '4px 8px', textAlign: 'left' }}>DATE</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email, i) => (
                <tr
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  style={{
                    background: i % 2 === 0 ? '#ffffff' : '#e8e8e8',
                    cursor: 'pointer',
                    fontWeight: email.read ? 400 : 700,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#0000ff'; e.currentTarget.style.color = '#ffffff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? '#ffffff' : '#e8e8e8'; e.currentTarget.style.color = '#000000' }}
                >
                  <td style={{ border: '1px solid #808080', padding: '3px 8px', color: '#ff0000' }}>{!email.read ? '●' : ''}</td>
                  <td style={{ border: '1px solid #808080', padding: '3px 8px', color: '#000080' }}>{email.from.name}</td>
                  <td style={{ border: '1px solid #808080', padding: '3px 8px', color: '#000000', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.subject}</td>
                  <td style={{ border: '1px solid #808080', padding: '3px 8px', color: '#008000', whiteSpace: 'nowrap' }}>{email.time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* News */}
          <div style={{ marginTop: 12, border: '3px ridge #e0e0e0', background: '#000080', padding: 8 }}>
            <div style={{ color: '#ffff00', fontFamily: 'var(--font-main)', marginBottom: 6, borderBottom: '2px solid #c0c0c0', paddingBottom: 4 }}>
              📰 TODAY'S NEWS (no fake news here!!!)
            </div>
            {news.slice(0, 4).map(n => (
              <p key={n.id} style={{ color: '#ffffff', fontFamily: 'var(--font-main)', fontSize: '0.78rem', margin: '3px 0' }}>
                {n.emoji} {n.title}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Email popup */}
      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,128,0.85)' }} onClick={() => setSelectedEmail(null)}>
          <div
            style={{ width: '90%', maxWidth: 520, border: '4px ridge #c0c0c0', background: '#c0c0c0', fontFamily: 'var(--font-main)' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ background: '#000080', color: '#fff', padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem' }}>✉ {selectedEmail.subject}</span>
              <button type="button" onClick={() => setSelectedEmail(null)} style={{ background: '#c0c0c0', color: '#000', border: '2px outset #e0e0e0', padding: '0 6px', cursor: 'pointer', fontFamily: 'var(--font-main)', lineHeight: 1.4 }}>X</button>
            </div>
            <div style={{ padding: 12, background: '#ffffff', color: '#000000', fontSize: '0.82rem', maxHeight: '60vh', overflowY: 'auto' }}>
              <p><b>From:</b> {selectedEmail.from.name} &lt;{selectedEmail.from.email}&gt;</p>
              <p><b>Date:</b> {selectedEmail.date}</p>
              <hr style={{ borderColor: '#808080' }} />
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-main)', fontSize: '0.82rem', lineHeight: 1.6 }}>{selectedEmail.body}</pre>
            </div>
            <div style={{ padding: '6px', background: '#c0c0c0', display: 'flex', gap: 8 }}>
              <button type="button" style={{ border: '2px outset #e0e0e0', background: '#c0c0c0', padding: '2px 12px', cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.8rem' }}>Reply</button>
              <button type="button" onClick={() => setSelectedEmail(null)} style={{ border: '2px outset #e0e0e0', background: '#c0c0c0', padding: '2px 12px', cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.8rem' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: '#000080', color: '#c0c0c0', textAlign: 'center', padding: '6px', fontFamily: 'var(--font-main)', fontSize: '0.72rem', borderTop: '4px ridge #c0c0c0' }}>
        © 1996-2026 MY HOMEPAGE · Free Web Ring · <span style={{ color: '#ffff00' }}>Best viewed 800x600</span> · Made with ❤ in Notepad
      </div>

      <style>{`
        @keyframes retroMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes retroBlink { 50% { opacity: 0; } }
      `}</style>
    </div>
  )
}
