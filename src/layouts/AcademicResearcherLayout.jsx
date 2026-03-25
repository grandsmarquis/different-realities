import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

function cite(n) { return `[${n}]` }

const categories = [...new Set(emails.map(e => e.tag))]

export default function AcademicResearcherLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
      {/* Paper header */}
      <div style={{ borderBottom: '3px double var(--border)', padding: '2rem 3rem 1.5rem', background: 'var(--card)' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text2)', marginBottom: 8 }}>
          JOURNAL OF DIGITAL CORRESPONDENCE STUDIES · VOL. 14, NO. 3 · MARCH 2026
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 700, marginBottom: 6, lineHeight: 1.3, color: 'var(--text)' }}>
          INBOX: A LONGITUDINAL ANALYSIS OF DIGITAL CORRESPONDENCE PATTERNS<br />
          IN THE CONTEMPORARY INFORMATION ECOSYSTEM
        </h1>
        <p style={{ fontSize: '0.78rem', color: 'var(--text2)', fontStyle: 'italic', marginBottom: 12 }}>
          Anonymous Author(s) · <span style={{ color: 'var(--text2)' }}>Submitted: March 25, 2026</span> · <span style={{ color: 'var(--accent3 )', color: 'var(--accent)' }}>Peer Review: Under Review</span>
        </p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={onSwitchPersona} style={{ fontSize: '0.72rem', color: 'var(--accent)', background: 'none', border: '1px solid var(--accent)', padding: '3px 12px', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>
            ← Change Subject
          </button>
          <p style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>
            <em>Keywords:</em> inbox, correspondence, {categories.join(', ')}
          </p>
        </div>
      </div>

      {/* Two-column paper layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', maxWidth: 1100, margin: '0 auto' }}>
        {/* Left column */}
        <div style={{ padding: '2rem 2rem 2rem 3rem', borderRight: '1px solid var(--border)' }}>
          {/* Abstract */}
          <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Abstract</h2>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--text)', textAlign: 'justify' }}>
              This paper presents an empirical examination of {emails.length} digital correspondence items
              received over a representative sampling period. Findings indicate {emails.filter(e => !e.read).length} ({Math.round(emails.filter(e => !e.read).length / emails.length * 100)}%)
              items remain unactioned, consistent with prior literature on inbox overload{cite(1)}.
              Weather conditions at time of observation: {weather.condition}, {weather.temp}°C ({weather.city}).
            </p>
          </div>

          {/* Email corpus */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
              1. Corpus of Correspondence
            </h2>
            {emails.map((email, i) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                style={{
                  marginBottom: '0.75rem', paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  background: selectedEmail?.id === email.id ? 'rgba(30,58,95,0.06)' : 'transparent',
                  padding: '0.5rem 0.5rem',
                  borderLeft: selectedEmail?.id === email.id ? '3px solid var(--accent)' : '3px solid transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,58,95,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.background = selectedEmail?.id === email.id ? 'rgba(30,58,95,0.06)' : 'transparent' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <p style={{ fontWeight: email.read ? 400 : 700, fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.3, flex: 1 }}>
                    {cite(i + 1)} {email.subject}
                  </p>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text2)', flexShrink: 0 }}>{email.date}</span>
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text2)', marginTop: 2, fontStyle: 'italic' }}>
                  {email.from.name} <span style={{ color: 'var(--text2)' }}>({email.from.email})</span>
                  {' · '}
                  <em>{email.tag}</em>
                  {!email.read && <span style={{ color: 'var(--accent)', fontStyle: 'normal' }}> · UNREAD</span>}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ padding: '2rem 3rem 2rem 2rem' }}>
          {/* Selected email detail */}
          {selectedEmail && (
            <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                2. Item Under Review
              </h2>
              <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--text2)', marginBottom: 8 }}>"{selectedEmail.subject}"</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text2)', marginBottom: 12 }}>
                Correspondent: {selectedEmail.from.name} · {selectedEmail.date}
              </p>
              <div style={{ fontSize: '0.82rem', lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-line', textAlign: 'justify', maxHeight: 220, overflowY: 'auto' }}>
                {selectedEmail.body}
              </div>
            </div>
          )}

          {/* Market data — Figure 1 */}
          <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '0.72rem', color: 'var(--text2)', fontStyle: 'italic', marginBottom: 8 }}>
              Figure 1. Selected market indices, 30-day price series (n=30 observations per instrument).
            </h3>
            {stocks.slice(0, 2).map(s => (
              <div key={s.ticker} style={{ marginBottom: 12 }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                  {s.name} ({s.ticker}): {s.currency}{s.price.toFixed(2)} <em style={{ fontWeight: 400, color: 'var(--text2)' }}>(Δ {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%)</em>
                </p>
                <div style={{ height: 56 }}>
                  <ResponsiveContainer width="100%" height={56} debounce={50}>
                    <LineChart data={s.series.map((v, i) => ({ v, i }))}>
                      <Line type="monotone" dataKey="v" stroke="var(--accent)" dot={false} strokeWidth={1.5} isAnimationActive={false} />
                      <Tooltip contentStyle={{ fontSize: 10, fontFamily: 'var(--font-main)' }} formatter={v => [`${s.currency}${Number(v).toFixed(2)}`, s.ticker]} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
            <p style={{ fontSize: '0.65rem', color: 'var(--text2)', fontStyle: 'italic', textAlign: 'center', marginTop: 4 }}>
              Source: Hardcoded Research Institute, 2026. All figures approximate.
            </p>
          </div>

          {/* Literature review (news) */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
              3. Literature Review
            </h2>
            {news.map((n, i) => (
              <div key={n.id} style={{ marginBottom: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--text)', lineHeight: 1.5 }}>{n.title}</p>
                <p style={{ fontSize: '0.65rem', color: 'var(--text2)', fontStyle: 'italic', marginTop: 2 }}>
                  {n.source}, {n.time}. {cite(emails.length + i + 1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '3px double var(--border)', padding: '1rem 3rem', fontSize: '0.65rem', color: 'var(--text2)', background: 'var(--card)', display: 'flex', justifyContent: 'space-between' }}>
        <span>Correspondence address: anonymous@institution.edu · DOI: 10.9999/inbox.2026.03</span>
        <span>Page 1 of 1 · © 2026 The Author(s)</span>
      </div>
    </div>
  )
}
