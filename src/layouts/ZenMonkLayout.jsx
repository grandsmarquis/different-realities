import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function brushDivider() {
  return <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, var(--border) 30%, var(--border) 70%, transparent 100%)', margin: '2rem 0' }} />
}

function dateToSeason(dateStr) {
  const m = new Date(dateStr).getMonth()
  if (m <= 1 || m === 11) return 'winter'
  if (m <= 4) return 'spring'
  if (m <= 7) return 'summer'
  return 'autumn'
}

function toPoeticDate(dateStr) {
  const d = new Date(dateStr)
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
  if (isNaN(d.getTime())) return 'recently'
  return `${months[d.getMonth()]} ${d.getDate()}`
}

export default function ZenMonkLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  if (selectedEmail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16" style={{ background: 'var(--bg)', fontFamily: 'var(--font-main)', animation: 'zenFade 0.6s ease' }}>
        <div style={{ maxWidth: 560, width: '100%' }}>
          <button type="button" onClick={() => setSelectedEmail(null)} style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: '3rem' }}>
            ← return
          </button>
          {brushDivider()}
          <p style={{ fontSize: '0.7rem', color: 'var(--text2)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>correspondence · {toPoeticDate(selectedEmail.date)}</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: 'var(--text)', lineHeight: 1.3, marginBottom: '0.75rem', fontWeight: 400 }}>{selectedEmail.subject}</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text2)', fontStyle: 'italic', marginBottom: '2rem' }}>from {selectedEmail.from.name}</p>
          {brushDivider()}
          <div style={{ fontSize: '1rem', lineHeight: 2.2, color: 'var(--text)', whiteSpace: 'pre-line', fontWeight: 300 }}>{selectedEmail.body}</div>
          {brushDivider()}
          <p style={{ textAlign: 'center', fontSize: '1.4rem', opacity: 0.3 }}>☽ ○ ☾</p>
        </div>
        <style>{`@keyframes zenFade { from { opacity:0 } to { opacity:1 } }`}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'clamp(2rem, 8vw, 5rem) 2rem' }}>

        {/* Weather haiku */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.35em', color: 'var(--text2)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            天気 · weather
          </p>
          <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', lineHeight: 2.2, color: 'var(--text)', fontStyle: 'italic', fontWeight: 400, margin: 0 }}>
            {weather.icon} Clouds drift over {weather.city}<br />
            {weather.temp} degrees of stillness<br />
            The inbox breathes.
          </blockquote>
        </div>

        {brushDivider()}

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            受信トレイ
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text2)', marginTop: '0.5rem', letterSpacing: '0.15em' }}>
            {emails.filter(e => !e.read).length} unread · receive without judgment
          </p>
          <button type="button" onClick={onSwitchPersona} style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-main)' }}>
            change path →
          </button>
        </div>

        {/* Email list */}
        <div>
          {emails.map((email, i) => (
            <div key={email.id}>
              <button
                type="button"
                onClick={() => setSelectedEmail(email)}
                style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '1.25rem 0', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '2rem', textAlign: 'left' }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: 'var(--text)', fontWeight: email.read ? 400 : 600, marginBottom: 4, lineHeight: 1.3 }}>
                    {email.subject}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text2)', fontStyle: 'italic' }}>from {email.from.name}</p>
                </div>
                <p style={{ fontSize: '0.68rem', color: 'var(--text2)', flexShrink: 0, fontStyle: 'italic' }}>
                  {toPoeticDate(email.date)}<br />
                  <span style={{ fontSize: '0.8rem' }}>{dateToSeason(email.date) === 'spring' ? '🌸' : dateToSeason(email.date) === 'summer' ? '☀️' : dateToSeason(email.date) === 'autumn' ? '🍂' : '❄️'}</span>
                </p>
              </button>
              {i < emails.length - 1 && <div style={{ height: 1, background: 'var(--border)', opacity: 0.5 }} />}
            </div>
          ))}
        </div>

        {brushDivider()}

        {/* Stocks — non-attachment */}
        <div style={{ textAlign: 'center', margin: '3rem 0' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.35em', color: 'var(--text2)', textTransform: 'uppercase', marginBottom: '1rem' }}>市場 · the market</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.8 }}>
            "The price of {stocks[0].ticker} rises.<br />
            The price of {stocks[2].ticker} falls.<br />
            You are neither."
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {stocks.map(s => (
              <div key={s.ticker} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--text2)', letterSpacing: '0.1em' }}>{s.ticker}</p>
                <p style={{ fontSize: '0.8rem', color: s.changePct >= 0 ? 'var(--accent2)' : 'var(--text2)', fontStyle: 'italic' }}>
                  {s.changePct >= 0 ? '↑' : '↓'} {Math.abs(s.changePct).toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {brushDivider()}

        {/* News */}
        <div style={{ marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.35em', color: 'var(--text2)', textTransform: 'uppercase', textAlign: 'center', marginBottom: '1.5rem' }}>世界 · the world</p>
          {news.slice(0, 4).map((n, i) => (
            <div key={n.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.7, fontWeight: 300, fontStyle: 'italic' }}>"{n.title}"</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--text2)', marginTop: 4 }}>— observe without attachment</p>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text2)', letterSpacing: '0.2em' }}>
          ☯ the inbox is empty · the inbox is full ☯
        </p>
      </div>
    </div>
  )
}
