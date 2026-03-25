import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const TABS = [
  { id: 'inbox', label: 'inbox.packet.ts', emoji: '📨' },
  { id: 'weather', label: 'atmosphere.env', emoji: '🌐' },
  { id: 'news', label: 'headlines.xml', emoji: '📡' },
  { id: 'stocks', label: 'market.rs', emoji: '📈' },
]

const kw = 'text-[#ff7b72]'
const fn = 'text-[#d2a8ff]'
const str = 'text-[#a5d6ff]'
const num = 'text-[#79c0ff]'
const com = 'text-[#8b949e]'
const typ = 'text-[#ffa657]'
const ok = 'text-[#7ee787]'

function jsonStr(s) {
  return JSON.stringify(s ?? '')
}

function MatrixBackdrop() {
  const ref = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const chars = '01{}[]<>/;netRUNTIMEvoidasyncawait'
    const colW = 11
    let w = 0
    let h = 0
    let drops = []

    function resize() {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w
      canvas.height = h
      const cols = Math.max(1, Math.floor(w / colW))
      drops = Array.from({ length: cols }, () => Math.random() * -50)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    function tick() {
      ctx.fillStyle = 'rgba(5, 10, 18, 0.18)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = '10px ui-monospace, monospace'
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        const x = i * colW
        const y = drops[i] * colW
        const alpha = 0.08 + (i % 5) * 0.04
        ctx.fillStyle = `rgba(57, 255, 126, ${alpha})`
        ctx.fillText(ch, x, y)
        if (y > h && Math.random() > 0.985) drops[i] = 0
        drops[i] += 0.55 + Math.random() * 0.35
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
      aria-hidden
    />
  )
}

function LineNo({ n }) {
  return (
    <span className={`inline-block w-8 shrink-0 select-none text-right text-[11px] ${com}`} tabIndex={-1}>
      {n}
    </span>
  )
}

function CodeRow({ line, children }) {
  return (
    <div
      className="flex gap-3 border-l-2 border-transparent py-0.5 pl-1 font-mono text-[12px] leading-relaxed hover:border-[#30363d] hover:bg-[#161b22]/80"
      style={{ animation: `srcNetFade 0.5s ease ${Math.min(line, 12) * 0.04}s both` }}
    >
      <LineNo n={line} />
      <div className="min-w-0 flex-1 whitespace-pre-wrap break-words">{children}</div>
    </div>
  )
}

export default function SourceCodeNetLayout({ onSwitchPersona }) {
  const uid = useId()
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [tab, setTab] = useState('inbox')
  const [compileFlash, setCompileFlash] = useState(false)
  const [bootDone, setBootDone] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setBootDone(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const switchTab = useCallback(id => {
    setTab(id)
    setCompileFlash(true)
  }, [])

  useEffect(() => {
    if (!compileFlash) return undefined
    const t = setTimeout(() => setCompileFlash(false), 420)
    return () => clearTimeout(t)
  }, [compileFlash])

  return (
    <div
      className={`source-net-root relative min-h-dvh overflow-x-hidden pb-24 text-[#c9d1d9] ${bootDone ? 'source-net-booted' : ''}`}
      style={{
        fontFamily: 'var(--font-main)',
        background: 'linear-gradient(165deg, #050810 0%, #0d1520 42%, #060a10 100%)',
      }}
    >
      <style>{`
        @keyframes srcNetFade {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes srcNetBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes srcNetScan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes srcNetPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(57, 255, 126, 0.25); }
          50% { box-shadow: 0 0 24px 2px rgba(57, 255, 126, 0.12); }
        }
        .source-net-root .src-net-cursor::after {
          content: '▍';
          color: #7ee787;
          animation: srcNetBlink 1s step-end infinite;
          margin-left: 1px;
        }
        .source-net-booted .src-net-header-bar {
          animation: srcNetPulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        <MatrixBackdrop />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(126, 231, 135, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(126, 231, 135, 0.2) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div
          className="pointer-events-none absolute left-0 right-0 h-24 bg-gradient-to-b from-[#7ee787]/10 to-transparent"
          style={{ animation: 'srcNetScan 7s linear infinite' }}
        />
      </div>

      <div className="relative z-10 flex min-h-dvh flex-col">
        <header className="src-net-header-bar border-b border-[#30363d] bg-[#0d1117]/95 px-3 py-3 backdrop-blur-sm sm:px-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className={`m-0 font-mono text-[10px] tracking-widest ${com}`}>
                // NET.RUNTIME · viewSourceMode v∞
              </p>
              <h1 className="src-net-cursor m-0 mt-1 font-mono text-lg font-semibold tracking-tight text-[#7ee787] sm:text-xl">
                reality.compile()
              </h1>
              <p className={`m-0 mt-1 max-w-xl text-[11px] ${com}`}>
                Same inbox, weather, news &amp; tickers — exposed as the literal source of the network.{' '}
                <span className={ok}>HTTP 200</span> · tree-shaken · zero-runtime*
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                type="button"
                className="btn btn-xs border-[#30363d] bg-[#21262d] font-mono text-[#c9d1d9] hover:border-[#7ee787] hover:bg-[#161b22]"
                onClick={onSwitchPersona}
              >
                exit(0)
              </button>
              <p className={`m-0 font-mono text-[10px] ${com}`}>
                unread: <span className={ok}>{emails.filter(e => !e.read).length}</span> packets
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5" role="tablist" aria-label="Source modules">
            {TABS.map(t => {
              const on = tab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  id={`${uid}-tab-${t.id}`}
                  aria-controls={`${uid}-panel-${t.id}`}
                  className={`btn btn-xs gap-1 font-mono normal-case ${
                    on
                      ? 'border-[#7ee787] bg-[#238636]/25 text-[#7ee787]'
                      : 'border-[#30363d] bg-transparent text-[#8b949e] hover:border-[#484f58] hover:bg-[#21262d]'
                  }`}
                  onClick={() => switchTab(t.id)}
                >
                  <span aria-hidden>{t.emoji}</span>
                  {t.label}
                </button>
              )
            })}
          </div>
        </header>

        <main className="relative flex-1 px-2 py-4 sm:px-4">
          {compileFlash && (
            <div
              className="pointer-events-none absolute inset-0 z-20 flex items-start justify-center pt-8"
              aria-live="polite"
            >
              <span className="rounded border border-[#7ee787]/40 bg-[#0d1117]/90 px-3 py-1 font-mono text-xs text-[#7ee787] shadow-lg">
                recompiling… OK
              </span>
            </div>
          )}

          {/* Inbox */}
          <section
            id={`${uid}-panel-inbox`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-inbox`}
            hidden={tab !== 'inbox'}
            className="mx-auto max-w-4xl rounded-lg border border-[#30363d] bg-[#0d1117]/85 p-3 shadow-xl backdrop-blur-sm sm:p-5"
          >
            <p className={`mb-3 font-mono text-[11px] ${com}`}>/** @module net/inbox — click a packet to expand body */</p>
            <div className="space-y-0">
              {emails.map((email, i) => {
                const start = i * 8 + 1
                const rows = (
                  <>
                    <CodeRow line={start}>
                      <span className={kw}>export</span> <span className={kw}>const</span>{' '}
                      <span className={fn}>packet_{email.id}</span>
                      <span className={com}>:</span> <span className={typ}>NetMessage</span> <span className={com}>= {'{'}</span>
                    </CodeRow>
                    <CodeRow line={start + 1}>
                      {'  '}
                      <span className={fn}>from</span>
                      <span className={com}>:</span> <span className={str}>{jsonStr(email.from.name)}</span>
                      <span className={com}>,</span>
                    </CodeRow>
                    <CodeRow line={start + 2}>
                      {'  '}
                      <span className={fn}>addr</span>
                      <span className={com}>:</span> <span className={str}>{jsonStr(email.from.email)}</span>
                      <span className={com}>,</span>
                    </CodeRow>
                    <CodeRow line={start + 3}>
                      {'  '}
                      <span className={fn}>subject</span>
                      <span className={com}>:</span> <span className={str}>{jsonStr(email.subject)}</span>
                      <span className={com}>,</span>
                    </CodeRow>
                    <CodeRow line={start + 4}>
                      {'  '}
                      <span className={fn}>preview</span>
                      <span className={com}>:</span> <span className={str}>{jsonStr(email.preview.slice(0, 120))}</span>
                      <span className={com}>,</span>
                    </CodeRow>
                    <CodeRow line={start + 5}>
                      {'  '}
                      <span className={fn}>flags</span>
                      <span className={com}>:</span> {'{ '}
                      <span className={fn}>read</span>: <span className={email.read ? ok : num}>{String(email.read)}</span>
                      {', '}
                      <span className={fn}>starred</span>: <span className={email.starred ? ok : com}>{String(email.starred)}</span>
                      {' }'}
                      <span className={com}>,</span>
                    </CodeRow>
                    <CodeRow line={start + 6}>
                      {'  '}
                      <span className={fn}>timestamp</span>
                      <span className={com}>:</span> <span className={str}>{jsonStr(`${email.date} ${email.time}`)}</span>
                      <span className={com}>,</span>
                    </CodeRow>
                    <CodeRow line={start + 7}>
                      <span className={com}>{'}'}</span>
                    </CodeRow>
                  </>
                )
                return (
                  <button
                    key={email.id}
                    type="button"
                    className={`block w-full cursor-pointer rounded-md border text-left transition-all ${
                      !email.read
                        ? 'border-[#7ee787]/35 bg-[#238636]/10 hover:border-[#7ee787]/60'
                        : 'border-transparent hover:border-[#30363d] hover:bg-[#161b22]/90'
                    }`}
                    onClick={() => setSelectedEmail(email)}
                  >
                    {rows}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Weather */}
          <section
            id={`${uid}-panel-weather`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-weather`}
            hidden={tab !== 'weather'}
            className="mx-auto max-w-4xl rounded-lg border border-[#30363d] bg-[#0d1117]/85 p-3 backdrop-blur-sm sm:p-5"
          >
            <p className={`mb-3 font-mono text-[11px] ${com}`}># Atmosphere — injected at build time</p>
            <div className="font-mono text-[12px] leading-relaxed">
              {(() => {
                let n = 1
                return (
                  <>
                    <CodeRow line={n++}>
                      <span className={com}>CITY=</span>
                      <span className={str}>{jsonStr(weather.city)}</span>
                    </CodeRow>
                    <CodeRow line={n++}>
                      <span className={com}>COUNTRY=</span>
                      <span className={str}>{jsonStr(weather.country)}</span>
                    </CodeRow>
                    <CodeRow line={n++}>
                      <span className={com}>TEMP_C=</span>
                      <span className={num}>{weather.temp}</span>
                    </CodeRow>
                    <CodeRow line={n++}>
                      <span className={com}>FEELS_LIKE_C=</span>
                      <span className={num}>{weather.feels_like}</span>
                    </CodeRow>
                    <CodeRow line={n++}>
                      <span className={com}>CONDITION=</span>
                      <span className={str}>{jsonStr(weather.condition)}</span>
                    </CodeRow>
                    <CodeRow line={n++}>
                      <span className={com}>ICON=</span>
                      <span className={str}>{jsonStr(weather.icon)}</span>
                    </CodeRow>
                    <CodeRow line={n++}>
                      <span className={com}>HUMIDITY_PCT=</span>
                      <span className={num}>{weather.humidity}</span>
                    </CodeRow>
                    <CodeRow line={n++}>
                      <span className={com}>WIND_KMH=</span>
                      <span className={num}>{weather.wind}</span>
                    </CodeRow>
                    <CodeRow line={n++}>
                      <span className={com}># forecast[]</span>
                    </CodeRow>
                    {weather.forecast.map((d, i) => (
                      <CodeRow key={d.day} line={n++}>
                        <span className={fn}>FORECAST_{i}</span>
                        <span className={com}>=</span>{' '}
                        <span className={str}>{jsonStr(`${d.day} ${d.icon} ${d.high}°/${d.low}°`)}</span>
                      </CodeRow>
                    ))}
                  </>
                )
              })()}
            </div>
          </section>

          {/* News */}
          <section
            id={`${uid}-panel-news`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-news`}
            hidden={tab !== 'news'}
            className="mx-auto max-w-4xl rounded-lg border border-[#30363d] bg-[#0d1117]/85 p-3 backdrop-blur-sm sm:p-5"
          >
            <p className={`mb-3 font-mono text-[11px] ${com}`}>{'<?xml version="1.0" encoding="UTF-8"?>'}</p>
            <div className="font-mono text-[12px] leading-relaxed">
              {(() => {
                let ln = 1
                return (
                  <>
                    <CodeRow line={ln++}>
                      <span className={typ}>&lt;feed</span> <span className={fn}>xmlns</span>=
                      <span className={str}>&quot;urn:net:headlines&quot;</span>
                      <span className={typ}>&gt;</span>
                    </CodeRow>
                    {news.map(item => (
                      <div key={item.id}>
                        <CodeRow line={ln++}>
                          {'  '}
                          <span className={typ}>&lt;item</span> <span className={fn}>id</span>=
                          <span className={str}>&quot;{item.id}&quot;</span>{' '}
                          <span className={fn}>category</span>=<span className={str}>&quot;{item.category}&quot;</span>
                          <span className={typ}>&gt;</span>
                        </CodeRow>
                        <CodeRow line={ln++}>
                          {'    '}
                          <span className={typ}>&lt;title&gt;</span>
                          <span className="text-[#c9d1d9]">
                            {item.emoji} {item.title}
                          </span>
                          <span className={typ}>&lt;/title&gt;</span>
                        </CodeRow>
                        <CodeRow line={ln++}>
                          {'    '}
                          <span className={typ}>&lt;source&gt;</span>
                          <span className={str}>{item.source}</span>
                          <span className={typ}>&lt;/source&gt;</span>
                        </CodeRow>
                        <CodeRow line={ln++}>
                          {'    '}
                          <span className={typ}>&lt;pubTime&gt;</span>
                          <span className={com}>{item.time}</span>
                          <span className={typ}>&lt;/pubTime&gt;</span>
                        </CodeRow>
                        <CodeRow line={ln++}>
                          {'  '}
                          <span className={typ}>&lt;/item&gt;</span>
                        </CodeRow>
                      </div>
                    ))}
                    <CodeRow line={ln++}>
                      <span className={typ}>&lt;/feed&gt;</span>
                    </CodeRow>
                  </>
                )
              })()}
            </div>
          </section>

          {/* Stocks */}
          <section
            id={`${uid}-panel-stocks`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-stocks`}
            hidden={tab !== 'stocks'}
            className="mx-auto max-w-4xl rounded-lg border border-[#30363d] bg-[#0d1117]/85 p-3 backdrop-blur-sm sm:p-5"
          >
            <p className={`mb-3 font-mono text-[11px] ${com}`}>// Market — Rusty but honest</p>
            <div className="font-mono text-[12px] leading-relaxed">
              {(() => {
                let ln = 1
                return (
                  <>
                    <CodeRow line={ln++}>
                      <span className={kw}>struct</span> <span className={typ}>Ticker</span> <span className={com}>{'{'}</span>
                    </CodeRow>
                    <CodeRow line={ln++}>
                      {'  '}
                      <span className={fn}>symbol</span>: <span className={typ}>String</span>,
                    </CodeRow>
                    <CodeRow line={ln++}>
                      {'  '}
                      <span className={fn}>price</span>: <span className={typ}>f64</span>,
                    </CodeRow>
                    <CodeRow line={ln++}>
                      {'  '}
                      <span className={fn}>delta_pct</span>: <span className={typ}>f64</span>,
                    </CodeRow>
                    <CodeRow line={ln++}>
                      <span className={com}>{'}'}</span>
                    </CodeRow>
                    <CodeRow line={ln++}>
                      <span className={com} />
                    </CodeRow>
                    {stocks.map(s => (
                      <div key={s.ticker}>
                        <CodeRow line={ln++}>
                          <span className={kw}>let</span> <span className={fn}>{s.ticker.toLowerCase()}</span>{' '}
                          <span className={com}>=</span> <span className={typ}>Ticker</span> <span className={com}>{'{'}</span>
                        </CodeRow>
                        <CodeRow line={ln++}>
                          {'  '}
                          <span className={fn}>symbol</span>: <span className={str}>{jsonStr(s.ticker)}</span>,
                        </CodeRow>
                        <CodeRow line={ln++}>
                          {'  '}
                          <span className={fn}>price</span>: <span className={num}>{s.price}</span>,
                        </CodeRow>
                        <CodeRow line={ln++}>
                          {'  '}
                          <span className={fn}>delta_pct</span>:{' '}
                          <span className={s.changePct >= 0 ? ok : 'text-[#f85149]'}>
                            {s.changePct >= 0 ? '+' : ''}
                            {s.changePct.toFixed(2)}
                          </span>
                          ,
                        </CodeRow>
                        <CodeRow line={ln++}>
                          <span className={com}>{'}'};</span> <span className={com}>// {s.name}</span>
                        </CodeRow>
                      </div>
                    ))}
                  </>
                )
              })()}
            </div>
          </section>
        </main>

        <aside className="relative z-10 mx-auto mt-2 flex max-w-4xl flex-wrap items-center justify-between gap-2 px-3 pb-2 font-mono text-[10px] text-[#8b949e]">
          <span>
            eslint: <span className={ok}>0 errors</span> · 1 warning: hydrate(outside)
          </span>
          <span className="flex items-center gap-1" aria-hidden>
            <span className="text-lg">🦆</span>
            <span>LGTM — ship it</span>
          </span>
        </aside>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(1, 4, 9, 0.88)' }}
          onClick={() => setSelectedEmail(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Packet body"
        >
          <div
            className="max-h-[min(85vh,640px)] w-full max-w-lg overflow-y-auto rounded-lg border border-[#7ee787]/40 bg-[#0d1117] p-4 shadow-2xl shadow-[#7ee787]/10"
            onClick={e => e.stopPropagation()}
          >
            <p className={`m-0 font-mono text-[10px] ${com}`}>/* decoded body — {selectedEmail.from.name} */</p>
            <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-[#c9d1d9]">
              <span className={str}>`</span>
              {'\n'}
              {selectedEmail.body}
              {'\n'}
              <span className={str}>`</span>
            </pre>
            <button
              type="button"
              className="btn btn-sm mt-4 w-full border-[#30363d] bg-[#21262d] font-mono text-[#c9d1d9] hover:border-[#f85149] hover:text-[#f85149]"
              onClick={() => setSelectedEmail(null)}
            >
              close_stream()
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
