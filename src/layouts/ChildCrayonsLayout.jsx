import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const crayonColors = ['#dc2626', '#2563eb', '#16a34a', '#ea580c', '#7c3aed', '#0891b2', '#db2777', '#65a30d']
const tilts = ['-3deg', '2deg', '-1.5deg', '3.5deg', '-2.5deg', '1deg', '-3.5deg', '2.5deg']
const misspelled = {
  'Julien Moreau': 'Joolien',
  'BNP Paribas': 'THE BANK',
  'GitHub': 'Git Thingy',
  'Maman 💕': 'MOMMY!!!',
  'Amazon': 'AMAZ0N',
  'Air France': 'The Plane',
  'Netflix': 'TV SHOWS',
  'LinkedIn': 'LINK-IN',
}

function CrayonSun() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <div style={{ fontSize: '4rem', lineHeight: 1, filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.15))' }}>
        {weather.icon}
      </div>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--accent)', marginTop: 4, textShadow: '3px 3px 0 var(--accent3)' }}>
        {weather.temp}° its {weather.condition.toLowerCase()}!!!
      </p>
      <p style={{ fontFamily: 'var(--font-main)', fontSize: '1rem', color: 'var(--text2)', marginTop: 2 }}>
        in {weather.city} 🌈
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
        {weather.forecast.map((d, i) => (
          <div key={d.day} style={{
            background: crayonColors[i],
            borderRadius: '50%', width: 50, height: 50,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transform: `rotate(${tilts[i]})`,
            boxShadow: '2px 3px 0 rgba(0,0,0,0.2)',
          }}>
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{d.icon}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', color: '#fff', fontWeight: 700 }}>{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CrayonStocks() {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--accent2)', textAlign: 'center', marginBottom: '0.75rem', textShadow: '2px 2px 0 var(--border)' }}>
        THE MUNNY CHART 💰
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 12, height: 100, padding: '0 1rem' }}>
        {stocks.map((s, i) => {
          const h = Math.abs(s.changePct) * 15 + 40
          return (
            <div key={s.ticker} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--text)' }}>
                {s.changePct >= 0 ? '↑' : '↓'}
              </span>
              <div style={{
                width: 36, height: h,
                background: crayonColors[i],
                borderRadius: '8px 8px 4px 4px',
                transform: `rotate(${tilts[i]})`,
                boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '8px 8px 4px 4px',
                  background: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.15) 3px, rgba(255,255,255,0.15) 6px)'
                }} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', color: crayonColors[i], fontWeight: 700, textShadow: '1px 1px 0 rgba(0,0,0,0.2)' }}>{s.ticker}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CrayonNews() {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--accent2)', marginBottom: '0.75rem', textShadow: '2px 2px 0 var(--border)' }}>
        THINGS THAT HAPPEND!! 📰
      </p>
      {news.slice(0, 4).map((n, i) => (
        <div key={n.id} style={{
          background: crayonColors[(i + 4) % crayonColors.length] + '22',
          border: `4px solid ${crayonColors[(i + 4) % crayonColors.length]}`,
          borderRadius: 16, padding: '0.75rem 1rem', marginBottom: '0.6rem',
          transform: `rotate(${tilts[(i + 2) % tilts.length]})`,
        }}>
          <p style={{ fontFamily: 'var(--font-main)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'var(--text)', lineHeight: 1.4 }}>
            {n.emoji} {n.title.slice(0, 60)}{n.title.length > 60 ? '...' : ''}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function ChildCrayonsLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font-main)' }}>
      {/* Ruled-paper lines */}
      <div className="pointer-events-none fixed inset-0 opacity-30" aria-hidden
        style={{ backgroundImage: 'repeating-linear-gradient(180deg, transparent, transparent 31px, #93c5fd 31px, #93c5fd 32px)', backgroundSize: '100% 32px', backgroundPositionY: '60px' }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: 'clamp(1rem, 4vw, 2rem)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 8vw, 4rem)',
            color: 'var(--accent)', textShadow: '4px 4px 0 var(--accent3)',
            transform: 'rotate(-1.5deg)', display: 'inline-block', lineHeight: 1,
          }}>
            MY EMALES!!! ✉️
          </h1>
          <p style={{ fontFamily: 'var(--font-main)', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'var(--text2)', marginTop: 8 }}>
            i have {emails.filter(e => !e.read).length} new ones!!!! wow!!!
          </p>
          <button type="button" onClick={onSwitchPersona}
            style={{ marginTop: 12, background: 'var(--accent2)', color: '#fff', border: '4px solid var(--text)', borderRadius: 12, padding: '8px 20px', fontFamily: 'var(--font-display)', fontSize: 'clamp(0.8rem, 2vw, 1.1rem)', cursor: 'pointer', transform: 'rotate(1deg)' }}>
            CHANGE PERSON
          </button>
        </div>

        <CrayonSun />

        {/* Email cards */}
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: 'var(--accent2)', marginBottom: '1rem', transform: 'rotate(-0.5deg)', textShadow: '2px 2px 0 var(--border)' }}>
          LETTERS I GOT 📬
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {emails.map((email, i) => {
            const color = crayonColors[i % crayonColors.length]
            return (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                style={{
                  background: '#fff',
                  border: `6px solid ${color}`,
                  borderRadius: 20,
                  padding: '1rem',
                  transform: `rotate(${tilts[i % tilts.length]})`,
                  boxShadow: `4px 6px 0 ${color}66`,
                  cursor: 'pointer',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = `rotate(0deg) scale(1.06)` }}
                onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${tilts[i % tilts.length]})` }}
              >
                <div style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: 8 }}>{email.from.avatar}</div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.85rem, 2vw, 1.1rem)', color, lineHeight: 1.2, marginBottom: 6, textShadow: '1px 1px 0 rgba(0,0,0,0.1)' }}>
                  {misspelled[email.from.name] || email.from.name}
                </p>
                <p style={{ fontFamily: 'var(--font-main)', fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)', color: 'var(--text)', lineHeight: 1.35, marginBottom: 6 }}>
                  {email.subject}
                </p>
                {!email.read && (
                  <div style={{ background: color, color: '#fff', borderRadius: 8, padding: '2px 8px', display: 'inline-block', fontFamily: 'var(--font-display)', fontSize: '0.7rem', transform: 'rotate(-2deg)' }}>
                    NEW!!!
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <CrayonStocks />
        <CrayonNews />

        <p style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', color: 'var(--text2)', transform: 'rotate(-1deg)' }}>
          THE END 🎨 made by ME age 6
        </p>
      </div>

      {/* Email modal */}
      {selectedEmail && (() => {
        const i = emails.findIndex(e => e.id === selectedEmail.id)
        const color = crayonColors[i % crayonColors.length]
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setSelectedEmail(null)}>
            <div
              style={{
                maxWidth: 480, width: '100%', background: '#fff', border: `8px solid ${color}`,
                borderRadius: 24, padding: '2rem', transform: 'rotate(-1deg)',
                boxShadow: `8px 10px 0 ${color}88`, maxHeight: '80vh', overflowY: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '3rem' }}>{selectedEmail.from.avatar}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color, marginBottom: 8, textShadow: '2px 2px 0 rgba(0,0,0,0.1)' }}>
                {selectedEmail.subject}
              </p>
              <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.85rem', color: 'var(--text2)', marginBottom: 16 }}>
                frm: {misspelled[selectedEmail.from.name] || selectedEmail.from.name}
              </p>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '1rem', lineHeight: 2, color: 'var(--text)', whiteSpace: 'pre-line' }}>
                {selectedEmail.body}
              </div>
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <button type="button" onClick={() => setSelectedEmail(null)}
                  style={{ background: color, color: '#fff', border: `4px solid rgba(0,0,0,0.2)`, borderRadius: 12, padding: '8px 24px', fontFamily: 'var(--font-display)', fontSize: '1rem', cursor: 'pointer' }}>
                  OK DONE
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
