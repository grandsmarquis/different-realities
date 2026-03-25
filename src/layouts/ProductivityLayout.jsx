import { useContext, useState, useEffect } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const POMODORO = 25 * 60
const tagContext = t => ({ work:'@work', personal:'@personal', finance:'@finance', promo:'@inbox', newsletter:'@reading' }[t] || '@someday')
const priority = e => !e.read ? 'P1' : e.tag === 'work' ? 'P2' : 'P3'
const priorityColor = p => ({ P1:'var(--accent)', P2:'var(--accent2)', P3:'var(--accent3)' }[p] || '#888')
const quotes = [
  'Your inbox is not your todo list.',
  'Focus is the currency of achievement.',
  'Eat the frog first.',
  'Deep work = rare value.',
  'Eliminate before you delegate.',
]

export default function ProductivityLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [seconds, setSeconds] = useState(POMODORO)
  const [running, setRunning] = useState(false)
  const [streak, setStreak] = useState(3)
  const [quoteIdx] = useState(Math.floor(Math.random() * quotes.length))

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000)
    return () => clearInterval(t)
  }, [running])

  const mins = String(Math.floor(seconds/60)).padStart(2,'0')
  const secs = String(seconds%60).padStart(2,'0')
  const pct = ((POMODORO - seconds) / POMODORO) * 100

  const sorted = [...emails].sort((a,b) => {
    const pa = priority(a), pb = priority(b)
    return pa < pb ? -1 : pa > pb ? 1 : 0
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>

      {/* Command header */}
      <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: 'var(--border)', background: '#ffffff' }}>
        <div>
          <div className="text-lg font-bold" style={{ color: 'var(--text)' }}>⏱ INBOX COMMAND CENTER</div>
          <div className="text-xs opacity-50 italic">"{quotes[quoteIdx]}"</div>
        </div>

        {/* Pomodoro timer */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <svg viewBox="0 0 48 48" className="absolute inset-0">
              <circle cx="24" cy="24" r="20" fill="none" stroke="#e0e0d8" strokeWidth="4" />
              <circle cx="24" cy="24" r="20" fill="none" stroke="var(--accent)" strokeWidth="4"
                strokeDasharray={`${2*Math.PI*20}`}
                strokeDashoffset={`${2*Math.PI*20 * (1 - pct/100)}`}
                strokeLinecap="round"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">{mins}:{secs}</div>
          </div>
          <div>
            <button onClick={() => setRunning(r => !r)}
              className="block text-xs px-2 py-0.5 rounded font-bold mb-0.5"
              style={{ background: running ? 'var(--accent)' : 'var(--accent3)', color: '#fff' }}>
              {running ? '⏸ PAUSE' : '▶ FOCUS'}
            </button>
            <button onClick={() => { setSeconds(POMODORO); setRunning(false) }} className="block text-xs opacity-40 hover:opacity-80">RESET</button>
          </div>
          <div className="text-center">
            <div className="text-lg">{'🔥'.repeat(Math.min(streak,5))}</div>
            <div className="text-xs opacity-40">{streak}-day streak</div>
          </div>
        </div>

        {/* Metrics bar */}
        <div className="flex items-center gap-4 text-xs">
          {[
            ['TOTAL', emails.length, 'var(--text)'],
            ['UNREAD', emails.filter(e=>!e.read).length, 'var(--accent)'],
            ['PROCESSED', emails.filter(e=>e.read).length, 'var(--accent3)'],
          ].map(([k,v,c]) => (
            <div key={k} className="text-center border-l pl-4" style={{ borderColor: 'var(--border)' }}>
              <div className="text-2xl font-bold" style={{ color: c }}>{v}</div>
              <div className="opacity-40">{k}</div>
            </div>
          ))}
        </div>

        <button onClick={onSwitchPersona} className="text-xs opacity-40 hover:opacity-80 border px-3 py-1 rounded"
          style={{ borderColor: 'var(--border)' }}>
          Switch System
        </button>
      </div>

      <div className="flex" style={{ minHeight: 'calc(100vh - 76px)' }}>
        {/* GTD inbox */}
        <div className="w-80 shrink-0 overflow-y-auto border-r" style={{ borderColor: 'var(--border)' }}>
          <div className="px-4 py-2 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
            <span className="text-xs font-bold opacity-60 tracking-wider">NEXT ACTIONS</span>
            <span className="text-xs opacity-40">sorted by priority</span>
          </div>
          {sorted.map(e => {
            const p = priority(e)
            return (
              <div key={e.id} onClick={() => setSelectedEmail(e)}
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-50"
                style={{
                  borderColor: 'var(--border)',
                  background: selectedEmail?.id === e.id ? '#fef2f2' : 'transparent',
                  borderLeftWidth: 3,
                  borderLeftColor: priorityColor(p),
                }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: priorityColor(p) + '22', color: priorityColor(p) }}>{p}</span>
                  <span className="text-xs opacity-50">{tagContext(e.tag)}</span>
                  <span className="ml-auto text-xs opacity-40">{e.date}</span>
                </div>
                <div className="font-semibold text-sm truncate">{e.subject}</div>
                <div className="text-xs opacity-50 truncate">{e.from.name}</div>
              </div>
            )
          })}
        </div>

        {/* Selected email + action items */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedEmail ? (
            <div className="max-w-2xl">
              {/* Email card */}
              <div className="border rounded-lg overflow-hidden mb-4" style={{ borderColor: 'var(--border)' }}>
                <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', background: '#f8f8f6' }}>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded"
                        style={{ background: priorityColor(priority(selectedEmail)) + '22', color: priorityColor(priority(selectedEmail)) }}>
                        {priority(selectedEmail)}
                      </span>
                      <span className="text-xs opacity-50">{tagContext(selectedEmail.tag)}</span>
                    </div>
                    <h2 className="font-bold text-base">{selectedEmail.subject}</h2>
                    <div className="text-xs opacity-50">{selectedEmail.from.name} · {selectedEmail.date}</div>
                  </div>
                  <button onClick={() => setSelectedEmail(null)} className="text-xs opacity-40 hover:opacity-80">✕</button>
                </div>
                <div className="p-4 text-sm leading-relaxed">{selectedEmail.body}</div>
              </div>

              {/* Action items */}
              <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs font-bold opacity-60 mb-3 tracking-wider">NEXT ACTIONS</div>
                {['Reply within 24h', 'Add to project tracker', 'Archive or delegate'].map((a,i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 border-b text-sm" style={{ borderColor: 'var(--border)' }}>
                    <div className="w-4 h-4 rounded border-2" style={{ borderColor: 'var(--border)' }} />
                    <span className="opacity-70">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center opacity-20">
                <div className="text-6xl mb-3">⏱</div>
                <div className="text-lg font-bold">SELECT A TASK</div>
                <div className="text-sm opacity-60 mt-1">Capture · Clarify · Engage</div>
              </div>
            </div>
          )}
        </div>

        {/* Right: stats + market pulse */}
        <div className="w-56 shrink-0 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: 'var(--border)' }}>
          {/* Weather */}
          <div className="border rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs font-bold opacity-50 mb-2 tracking-wider">CONDITIONS</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{weather.icon}</span>
              <div className="text-xs">
                <div className="font-semibold">{weather.condition}</div>
                <div className="opacity-50">{weather.temp}°C · {weather.wind}kph</div>
              </div>
            </div>
          </div>

          {/* Priority breakdown */}
          <div className="border rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs font-bold opacity-50 mb-2 tracking-wider">PRIORITY BREAKDOWN</div>
            {['P1','P2','P3'].map(p => {
              const count = emails.filter(e => priority(e) === p).length
              return (
                <div key={p} className="flex items-center gap-2 py-1 text-xs">
                  <span className="w-7 font-bold" style={{ color: priorityColor(p) }}>{p}</span>
                  <div className="flex-1 h-1.5 rounded" style={{ background: 'var(--border)' }}>
                    <div className="h-full rounded" style={{ width: `${count/emails.length*100}%`, background: priorityColor(p) }} />
                  </div>
                  <span className="opacity-50 w-4 text-right">{count}</span>
                </div>
              )
            })}
          </div>

          {/* Market pulse */}
          <div className="border rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs font-bold opacity-50 mb-2 tracking-wider">MARKET PULSE</div>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between text-xs py-1">
                <span className="opacity-60">{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent)' }}>
                  {s.changePct >= 0 ? '+' : ''}{s.changePct}%
                </span>
              </div>
            ))}
          </div>

          {/* News briefing */}
          <div className="border rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs font-bold opacity-50 mb-2 tracking-wider">BRIEFING</div>
            {news.slice(0,3).map((n,i) => (
              <div key={i} className="mb-2 pb-2 border-b text-xs opacity-60 leading-snug" style={{ borderColor: 'var(--border)' }}>
                {n.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
