import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'

const tagColors = { work: '#3182ce', finance: '#ed8936', personal: '#e53e3e', dev: '#805ad5', travel: '#38a169', shopping: '#d69e2e', social: '#3182ce', newsletter: '#718096' }
const sentimentData = news.map((n, i) => ({ name: n.source.slice(0, 8), sentiment: [0.72, -0.18, 0.54, -0.43, 0.88, 0.31][i], category: n.category }))

function MetricBadge({ value, label, delta, color }) {
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.75rem 1rem', borderLeft: `4px solid ${color}` }}>
      <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 700, color, lineHeight: 1, fontFamily: "'Roboto Mono', monospace" }}>{value}</p>
      <p style={{ fontSize: '0.7rem', color: 'var(--text)', marginTop: 2 }}>{label}</p>
      {delta !== undefined && <p style={{ fontSize: '0.62rem', color: delta >= 0 ? '#38a169' : '#e53e3e', marginTop: 1 }}>{delta >= 0 ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%</p>}
    </div>
  )
}

export default function DataAnalystLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [sortCol, setSortCol] = useState('date')
  const [sortAsc, setSortAsc] = useState(false)

  const unreadRate = (emails.filter(e => !e.read).length / emails.length) * 100
  const starRate = (emails.filter(e => e.starred).length / emails.length) * 100

  const tagDist = Object.entries(
    emails.reduce((acc, e) => { acc[e.tag] = (acc[e.tag] || 0) + 1; return acc }, {})
  ).map(([name, value]) => ({ name, value }))

  const sortedEmails = [...emails].sort((a, b) => {
    if (sortCol === 'subject') return sortAsc ? a.subject.localeCompare(b.subject) : b.subject.localeCompare(a.subject)
    if (sortCol === 'from') return sortAsc ? a.from.name.localeCompare(b.from.name) : b.from.name.localeCompare(a.from.name)
    if (sortCol === 'read') return sortAsc ? (a.read ? 1 : -1) : (b.read ? 1 : -1)
    return sortAsc ? a.id - b.id : b.id - a.id
  })

  function SortBtn({ col, label }) {
    return (
      <th
        onClick={() => { if (sortCol === col) setSortAsc(!sortAsc); else { setSortCol(col); setSortAsc(true) } }}
        style={{ padding: '6px 8px', textAlign: 'left', fontSize: '0.65rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none', letterSpacing: '0.08em', color: sortCol === col ? 'var(--accent)' : 'var(--text2)', fontFamily: "'Roboto Mono', monospace" }}
      >
        {label} {sortCol === col ? (sortAsc ? '↑' : '↓') : '↕'}
      </th>
    )
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
      {/* Top bar */}
      <header style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)', padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent)' }}>📊 InboxBI</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text2)', fontFamily: "'Roboto Mono', monospace" }}>v2.4.1 · dataset: inbox_2026</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: '0.72rem', color: 'var(--text2)' }}>
          <span>n={emails.length} records · {weather.temp}°C {weather.city}</span>
          <button type="button" onClick={onSwitchPersona} style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.72rem' }}>
            Switch Dashboard
          </button>
        </div>
      </header>

      <div style={{ padding: '1rem 1.5rem' }}>
        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
          <MetricBadge value={emails.length} label="Total Records" color="var(--accent)" />
          <MetricBadge value={emails.filter(e => !e.read).length} label="Unread" delta={unreadRate - 40} color="var(--accent2)" />
          <MetricBadge value={`${unreadRate.toFixed(1)}%`} label="Unread Rate" color="#e53e3e" />
          <MetricBadge value={`${starRate.toFixed(0)}%`} label="Starred Rate" delta={2.1} color="#d69e2e" />
          <MetricBadge value={`${weather.temp}°C`} label={`${weather.city} (${weather.condition})`} color="#38a169" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '1rem' }}>
          {/* Left: email table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '0.5rem 0.75rem', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', fontSize: '0.7rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                <span>correspondence_dataset · {emails.length} rows</span>
                <span style={{ color: 'var(--text2)', fontFamily: "'Roboto Mono', monospace" }}>click headers to sort</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg2)', borderBottom: '2px solid var(--border)' }}>
                      <SortBtn col="date" label="DATE" />
                      <SortBtn col="from" label="FROM" />
                      <SortBtn col="subject" label="SUBJECT" />
                      <SortBtn col="read" label="READ" />
                      <th style={{ padding: '6px 8px', fontSize: '0.65rem', color: 'var(--text2)', fontFamily: "'Roboto Mono', monospace" }}>TAG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedEmails.map((email, i) => (
                      <tr
                        key={email.id}
                        onClick={() => setSelectedEmail(email)}
                        style={{
                          background: selectedEmail?.id === email.id ? 'rgba(49,130,206,0.08)' : i % 2 === 0 ? 'var(--card)' : 'var(--bg)',
                          cursor: 'pointer',
                          borderBottom: '1px solid var(--border)',
                        }}
                        onMouseEnter={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'rgba(49,130,206,0.05)' }}
                        onMouseLeave={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = i % 2 === 0 ? 'var(--card)' : 'var(--bg)' }}
                      >
                        <td style={{ padding: '5px 8px', fontSize: '0.72rem', color: 'var(--text2)', whiteSpace: 'nowrap', fontFamily: "'Roboto Mono', monospace" }}>{email.date}</td>
                        <td style={{ padding: '5px 8px', fontSize: '0.75rem', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.from.name}</td>
                        <td style={{ padding: '5px 8px', fontSize: '0.75rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: email.read ? 400 : 600 }}>{email.subject}</td>
                        <td style={{ padding: '5px 8px', fontSize: '0.7rem', textAlign: 'center' }}>
                          <span style={{ background: email.read ? '#38a16922' : '#e53e3e22', color: email.read ? '#38a169' : '#e53e3e', borderRadius: 4, padding: '1px 6px', fontFamily: "'Roboto Mono', monospace" }}>
                            {email.read ? 'TRUE' : 'FALSE'}
                          </span>
                        </td>
                        <td style={{ padding: '5px 8px', fontSize: '0.68rem' }}>
                          <span style={{ background: `${tagColors[email.tag]}22`, color: tagColors[email.tag], borderRadius: 4, padding: '1px 6px', fontFamily: "'Roboto Mono', monospace' " }}>
                            {email.tag}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Email detail */}
            {selectedEmail && (
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: '1rem' }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--accent)', fontFamily: "'Roboto Mono', monospace", marginBottom: 6 }}>
                  SELECT * FROM emails WHERE id={selectedEmail.id};
                </p>
                <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>{selectedEmail.subject}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text2)', marginBottom: 10 }}>from: {selectedEmail.from.name} · {selectedEmail.date}</p>
                <div style={{ fontSize: '0.8rem', lineHeight: 1.7, whiteSpace: 'pre-line', maxHeight: 150, overflowY: 'auto' }}>{selectedEmail.body}</div>
              </div>
            )}
          </div>

          {/* Right: charts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Tag distribution */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.75rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 600, marginBottom: 8, color: 'var(--text2)' }}>Fig 1. Message distribution by category</p>
              <div style={{ height: 140 }}>
                <ResponsiveContainer width="100%" height={140} debounce={50}>
                  <BarChart data={tagDist} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                    <YAxis tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                    <Tooltip contentStyle={{ fontSize: 11, fontFamily: 'var(--font-main)', borderRadius: 6 }} />
                    <Bar dataKey="value" fill="var(--accent)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stocks */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.75rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 600, marginBottom: 8, color: 'var(--text2)' }}>Fig 2. Market indices — 30D price series</p>
              {stocks.map(s => (
                <div key={s.ticker} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginBottom: 2 }}>
                    <span style={{ fontFamily: "'Roboto Mono', monospace", fontWeight: 600 }}>{s.ticker}</span>
                    <span style={{ color: s.changePct >= 0 ? '#38a169' : '#e53e3e', fontFamily: "'Roboto Mono', monospace" }}>
                      {s.currency}{s.price.toFixed(2)} ({s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%)
                    </span>
                  </div>
                  <div style={{ height: 36 }}>
                    <ResponsiveContainer width="100%" height={36} debounce={50}>
                      <LineChart data={s.series.map((v, i) => ({ v, i }))}>
                        <Line type="monotone" dataKey="v" stroke={s.changePct >= 0 ? '#38a169' : '#e53e3e'} dot={false} strokeWidth={1.5} isAnimationActive={false} />
                        <Tooltip contentStyle={{ fontSize: 10, fontFamily: 'var(--font-main)' }} formatter={v => [`${s.currency}${Number(v).toFixed(2)}`, s.ticker]} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>

            {/* News sentiment */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.75rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 600, marginBottom: 8, color: 'var(--text2)' }}>Fig 3. News sentiment analysis (NLP)</p>
              <div style={{ height: 100 }}>
                <ResponsiveContainer width="100%" height={100} debounce={50}>
                  <BarChart data={sentimentData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 9, fontFamily: 'monospace' }} />
                    <YAxis domain={[-1, 1]} tick={{ fontSize: 9, fontFamily: 'monospace' }} />
                    <Tooltip contentStyle={{ fontSize: 10, fontFamily: 'var(--font-main)', borderRadius: 6 }} formatter={v => [Number(v).toFixed(2), 'sentiment']} />
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <Bar dataKey="sentiment" fill="var(--accent2)" radius={[2, 2, 0, 0]}
                      // eslint-disable-next-line react/display-name
                      label={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginTop: 6 }}>
                {news.slice(0, 3).map((n, i) => (
                  <p key={n.id} style={{ fontSize: '0.65rem', color: 'var(--text2)', marginBottom: 2 }}>
                    {n.emoji} <span style={{ color: sentimentData[i].sentiment >= 0 ? '#38a169' : '#e53e3e' }}>[{sentimentData[i].sentiment >= 0 ? '+' : ''}{sentimentData[i].sentiment.toFixed(2)}]</span> {n.title.slice(0, 50)}...
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
