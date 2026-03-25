import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function formatPct(value) {
  return `${value.toFixed(0).padStart(2, '0')}%`
}

function CpuBar({ label, value, tone }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-14 text-right opacity-70">{label}</span>
      <div className="h-3 flex-1 overflow-hidden rounded-sm border border-[var(--border)] bg-black/40">
        <div
          className="cpu-bar-fill h-full rounded-[2px]"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${tone}, rgba(0,0,0,0.35))`,
          }}
        />
      </div>
      <span className="w-10 text-right font-semibold" style={{ color: tone }}>
        {formatPct(value)}
      </span>
    </div>
  )
}

export default function HtopMailLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [tick, setTick] = useState(0)
  const [uptimeSeconds, setUptimeSeconds] = useState(84672)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTick((t) => t + 1)
      setUptimeSeconds((t) => t + 1)
    }, 900)
    return () => window.clearInterval(timer)
  }, [])

  const cpuRows = useMemo(() => {
    return Array.from({ length: 8 }).map((_, idx) => {
      const base = 18 + idx * 6
      const pulse = (Math.sin((tick + idx * 2) * 0.58) + 1) * 17
      const noise = ((tick * 13 + idx * 9) % 11) * 1.6
      const raw = Math.min(99, Math.max(4, base + pulse + noise))
      const tone = idx % 2 === 0 ? 'var(--accent)' : 'var(--accent2)'
      return { label: `CPU${idx}`, value: raw, tone }
    })
  }, [tick])

  const memUse = 58 + ((tick * 7) % 23)
  const swapUse = 9 + ((tick * 3) % 17)

  const totalUnread = emails.filter((email) => !email.read).length
  const processRows = emails.map((email, index) => {
    const pseudoPid = 1200 + email.id * 37
    const cpu = ((index * 7 + tick * 3) % 26) + (email.read ? 2 : 18)
    const mem = ((index * 9 + tick * 5) % 36) + 8
    const time = `00:${String((index * 9 + tick) % 59).padStart(2, '0')}.${String((tick * 11 + index * 4) % 99).padStart(2, '0')}`
    return { email, pseudoPid, cpu, mem, time }
  })

  const topHeadline = news[0]?.title ?? 'No signal from the news wire.'
  const up = stocks.filter((s) => s.changePct >= 0).length
  const down = stocks.length - up
  const loadAvg = `${(1.35 + ((tick * 3) % 11) / 10).toFixed(2)} ${(1.08 + ((tick * 5) % 11) / 10).toFixed(2)} ${(0.84 + ((tick * 7) % 11) / 10).toFixed(2)}`
  const uptimeH = String(Math.floor(uptimeSeconds / 3600)).padStart(2, '0')
  const uptimeM = String(Math.floor((uptimeSeconds % 3600) / 60)).padStart(2, '0')
  const uptimeS = String(uptimeSeconds % 60).padStart(2, '0')

  return (
    <div
      className="min-h-screen p-3 sm:p-5"
      style={{
        background:
          'radial-gradient(circle at 12% 0%, rgba(20, 70, 42, 0.25) 0%, transparent 35%), radial-gradient(circle at 100% 100%, rgba(56, 189, 248, 0.12) 0%, transparent 32%), var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <style>
        {`
          @keyframes cursorBlink { 0%, 48% { opacity: 1; } 50%, 100% { opacity: 0; } }
          @keyframes panNoise { 0% { transform: translateX(0); } 50% { transform: translateX(2px); } 100% { transform: translateX(0); } }
          .scanline::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 3px,
              rgba(0,0,0,0.12) 3px,
              rgba(0,0,0,0.12) 4px
            );
            mix-blend-mode: multiply;
          }
          .cpu-bar-fill { transition: width 320ms ease; }
          .cmd-caret { animation: cursorBlink 1s steps(1, end) infinite; }
          .flicker { animation: panNoise 2s ease-in-out infinite; }
        `}
      </style>

      <div className="scanline relative mx-auto w-full max-w-[1300px] rounded-md border border-[var(--border)] bg-[var(--bg2)] p-2 shadow-[0_0_0_1px_rgba(0,0,0,0.6),0_25px_80px_rgba(0,0,0,0.55)]">
        <header className="mb-2 rounded border border-[var(--border)] bg-black/40 px-3 py-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="font-semibold text-[var(--accent)]">
              htop-mail 3.0.0 - Inbox Process Monitor
            </p>
            <div className="flex items-center gap-3 text-[11px] text-[var(--text2)]">
              <span>tasks: {emails.length} total, {totalUnread} unread spikes</span>
              <span>load average: {loadAvg}</span>
              <span>uptime: {uptimeH}:{uptimeM}:{uptimeS}</span>
            </div>
          </div>
        </header>

        <div className="grid gap-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
          <section className="rounded border border-[var(--border)] bg-black/30 p-3">
            <div className="mb-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded border border-[var(--border)] bg-black/40 p-2">
                {cpuRows.slice(0, 4).map((row) => (
                  <CpuBar key={row.label} label={row.label} value={row.value} tone={row.tone} />
                ))}
              </div>
              <div className="rounded border border-[var(--border)] bg-black/40 p-2">
                {cpuRows.slice(4).map((row) => (
                  <CpuBar key={row.label} label={row.label} value={row.value} tone={row.tone} />
                ))}
              </div>
            </div>

            <div className="mb-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded border border-[var(--border)] bg-black/40 p-2 text-xs">
                <CpuBar label="Mem" value={memUse} tone="var(--accent3)" />
                <CpuBar label="Swap" value={swapUse} tone="#f59e0b" />
              </div>
              <div className="rounded border border-[var(--border)] bg-black/40 p-2 text-xs">
                <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text2)]">alerts</p>
                <p className="flicker text-[11px] text-[var(--accent2)]">
                  New mail packets entering queue...
                </p>
                <p className="text-[11px] text-[var(--text2)]">
                  Weather daemon: {weather.condition}, {weather.temp} C, wind nominal.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded border border-[var(--border)] bg-black/40">
              <div className="grid grid-cols-[76px_1fr_88px_80px_86px_80px] border-b border-[var(--border)] bg-[var(--card)] px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--text2)]">
                <span>pid</span>
                <span>command</span>
                <span>state</span>
                <span className="text-right">cpu%</span>
                <span className="text-right">mem%</span>
                <span className="text-right">time+</span>
              </div>
              <div className="max-h-[46vh] overflow-y-auto">
                {processRows.map((row) => (
                  <button
                    key={row.email.id}
                    type="button"
                    onClick={() => setSelectedEmail(row.email)}
                    className="grid w-full grid-cols-[76px_1fr_88px_80px_86px_80px] gap-x-2 border-b border-[var(--border)] px-2 py-1.5 text-left text-xs transition hover:bg-black/35"
                  >
                    <span className="text-[var(--text2)]">{row.pseudoPid}</span>
                    <span className="truncate">
                      {row.email.read ? 'maild/read' : 'maild/unread'} --subject="{row.email.subject}"
                    </span>
                    <span style={{ color: row.email.read ? 'var(--text2)' : 'var(--accent2)' }}>
                      {row.email.read ? 'SLEEP' : 'RUN'}
                    </span>
                    <span className="text-right" style={{ color: row.cpu >= 30 ? 'var(--accent2)' : 'var(--accent)' }}>
                      {row.cpu}
                    </span>
                    <span className="text-right">{row.mem}</span>
                    <span className="text-right text-[var(--text2)]">{row.time}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-2">
            <div className="rounded border border-[var(--border)] bg-black/35 p-3 text-xs">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text2)]">netstat/weather</p>
              <p className="text-sm font-semibold text-[var(--accent3)]">
                {weather.icon} {weather.temp} C - {weather.condition}
              </p>
              <p className="mt-1 text-[11px] text-[var(--text2)]">
                packets: humidity ok, gusts low, visibility online
              </p>
            </div>

            <div className="rounded border border-[var(--border)] bg-black/35 p-3 text-xs">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text2)]">market daemon</p>
              <div className="space-y-1.5">
                {stocks.slice(0, 5).map((stock) => (
                  <p key={stock.ticker} className="flex items-center justify-between">
                    <span>{stock.ticker}</span>
                    <span style={{ color: stock.changePct >= 0 ? 'var(--accent3)' : 'var(--accent2)' }}>
                      {stock.changePct >= 0 ? '+' : ''}
                      {stock.changePct.toFixed(2)}%
                    </span>
                  </p>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-[var(--text2)]">
                breadth: {up} up / {down} down
              </p>
            </div>

            <div className="rounded border border-[var(--border)] bg-black/35 p-3 text-xs">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text2)]">news feed</p>
              <p className="text-[var(--text)]">{topHeadline}</p>
              <div className="mt-2 space-y-1 text-[11px] text-[var(--text2)]">
                {news.slice(1, 3).map((item) => (
                  <p key={item.id}>- {item.title}</p>
                ))}
              </div>
            </div>

            <div className="rounded border border-[var(--border)] bg-black/35 p-3 text-xs">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text2)]">shell</p>
              <p>
                $ tail -f /var/log/inbox.log
                <span className="cmd-caret">_</span>
              </p>
              <p className="mt-1 text-[11px] text-[var(--accent)]">
                tip: click any process row to inspect full mail body.
              </p>
              <button type="button" onClick={onSwitchPersona} className="btn btn-xs mt-3 border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--bg2)]">
                Switch Persona
              </button>
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedEmail(null)}>
          <div
            className="w-full max-w-2xl rounded border border-[var(--accent)] bg-[var(--bg2)] p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text2)]">process inspector</p>
            <h2 className="text-lg font-semibold text-[var(--accent2)]">{selectedEmail.subject}</h2>
            <p className="mb-3 mt-1 text-xs text-[var(--text2)]">
              from {selectedEmail.from.name} &lt;{selectedEmail.from.email}&gt; - {selectedEmail.date}
            </p>
            <pre className="max-h-[50vh] overflow-auto rounded border border-[var(--border)] bg-black/40 p-3 text-xs leading-relaxed text-[var(--text)]">
              {selectedEmail.body}
            </pre>
            <div className="mt-3 flex justify-end">
              <button type="button" onClick={() => setSelectedEmail(null)} className="btn btn-sm border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:border-[var(--accent)] hover:bg-black/40">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
