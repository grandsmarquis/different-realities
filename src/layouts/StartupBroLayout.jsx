import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

const priorities = { work: 'P0', finance: 'P1', travel: 'P1', dev: 'P0', personal: 'P2', shopping: 'P2', social: 'P2', newsletter: 'P3' }
const buzzwords = ['Let\'s sync', 'Take offline', 'Ship it 🚀', 'Async follow-up', 'Circle back']

function KpiCard({ value, label, sub, color }) {
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem 1.25rem', borderTop: `3px solid ${color}` }}>
      <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color, lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', marginTop: 4 }}>{label}</p>
      {sub && <p style={{ fontSize: '0.68rem', color: 'var(--text2)', marginTop: 2 }}>{sub}</p>}
    </div>
  )
}

export default function StartupBroLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter(e => !e.read).length

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
      {/* Top nav */}
      <header style={{ borderBottom: '1px solid var(--border)', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)' }}>⚡ InboxOS</span>
          <span style={{ fontSize: '0.7rem', background: 'var(--accent)', color: '#fff', borderRadius: 20, padding: '2px 8px' }}>PRO</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>
            🌤 {weather.temp}°C {weather.city} — {weather.condition}. <span style={{ color: 'var(--accent3)', fontWeight: 600 }}>Conditions: OPTIMAL</span>
          </span>
          <button type="button" onClick={onSwitchPersona} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '6px 14px', fontSize: '0.78rem', cursor: 'pointer', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
            Switch →
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1.5rem' }}>
        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <KpiCard value={unread} label="Action Required" sub="unread messages" color="var(--accent)" />
          <KpiCard value={emails.filter(e => e.starred).length} label="Starred" sub="high priority" color="var(--accent2)" />
          <KpiCard value={`${Math.round((1 - unread / emails.length) * 100)}%`} label="Read Rate" sub="inbox zero progress" color="var(--accent3)" />
          <KpiCard value={emails.length} label="Total" sub="messages this sprint" color="var(--border)" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem' }}>
          {/* Emails */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Action Items</h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>sorted by priority · last synced just now</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[...emails].sort((a, b) => (priorities[a.tag] || 'P3').localeCompare(priorities[b.tag] || 'P3')).map(email => {
                const prio = priorities[email.tag] || 'P3'
                const prioColor = prio === 'P0' ? 'var(--accent)' : prio === 'P1' ? 'var(--accent2)' : prio === 'P2' ? 'var(--accent3)' : 'var(--border)'
                return (
                  <button
                    key={email.id}
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12, padding: '0.9rem 1rem',
                      background: selectedEmail?.id === email.id ? 'var(--bg2)' : 'var(--card)',
                      border: `1px solid ${selectedEmail?.id === email.id ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius: 10, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-main)',
                      borderLeft: `3px solid ${prioColor}`,
                    }}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{email.from.avatar}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontWeight: email.read ? 500 : 700, fontSize: '0.85rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.subject}</span>
                        <span style={{ fontSize: '0.6rem', fontWeight: 700, color: prioColor, flexShrink: 0, border: `1px solid ${prioColor}`, borderRadius: 4, padding: '1px 5px' }}>{prio}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.from.name} · {email.time}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Detail pane */}
            {selectedEmail ? (
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem' }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6 }}>READING MODE</p>
                <div style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: '1.8rem' }}>{selectedEmail.from.avatar}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>{selectedEmail.subject}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>from {selectedEmail.from.name}</p>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--text)', whiteSpace: 'pre-line', maxHeight: 200, overflowY: 'auto', marginBottom: '0.75rem' }}>{selectedEmail.body}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {buzzwords.slice(0, 3).map(w => (
                    <button key={w} type="button" style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: 20, border: '1px solid var(--accent)', color: 'var(--accent)', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>{w}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
                <p style={{ fontSize: '2rem' }}>📭</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginTop: 8 }}>Select an action item to get unblocked.</p>
              </div>
            )}

            {/* Stocks */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: 10 }}>📈 Portfolio Performance</p>
              {stocks.map(s => (
                <div key={s.ticker} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 2 }}>
                    <span style={{ fontWeight: 600 }}>{s.ticker}</span>
                    <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent2)', fontWeight: 600 }}>
                      {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
                    </span>
                  </div>
                  <div style={{ height: 30 }}>
                    <ResponsiveContainer width="100%" height={30} debounce={50}>
                      <LineChart data={s.series.map((v, i) => ({ v, i }))}>
                        <Line type="monotone" dataKey="v" stroke={s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent2)'} dot={false} strokeWidth={1.5} isAnimationActive={false} />
                        <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid var(--border)' }} formatter={v => [`${s.currency}${Number(v).toFixed(2)}`, '']} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>

            {/* News */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: 10 }}>🌐 Market Intelligence</p>
              {news.slice(0, 4).map(n => (
                <div key={n.id} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text)', lineHeight: 1.4 }}>{n.emoji} {n.title}</p>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text2)', marginTop: 2 }}>{n.source} · {n.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
