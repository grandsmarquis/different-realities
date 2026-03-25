import { useEffect, useMemo, useRef, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const KATA =
  'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

const NEO_QUIPS = [
  'The mail has you.',
  'Follow the unread rabbit.',
  'There is no inbox.',
  'Déjà vu: same newsletter, different subject line.',
  'Spoon boy says: bend the filter, not the rules.',
  'Residual self-image: still using default avatar.',
]

function tokenizeForRain() {
  const words = new Set()
  const add = (s) => {
    String(s)
      .split(/\W+/)
      .filter(Boolean)
      .forEach((w) => {
        const u = w.toUpperCase().replace(/[^A-Z0-9]/g, '')
        if (u.length >= 2 && u.length <= 12) words.add(u)
      })
  }
  emails.forEach((e) => {
    add(e.subject)
    add(e.preview)
  })
  news.forEach((n) => add(n.title))
  stocks.forEach((s) => words.add(s.ticker))
  return Array.from(words)
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return reduced
}

function MatrixRainCanvas({ extraPool, reducedMotion }) {
  const ref = useRef(null)
  const raf = useRef(0)
  const poolRef = useRef('')

  useEffect(() => {
    poolRef.current = KATA + '01ｦﾘｧﾎﾟｮ<>[]{}|;:.=+*_#@¥$€' + extraPool.join('')
  }, [extraPool])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || reducedMotion) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const colW = 15
    let w = 0
    let h = 0
    let drops = []
    let cols = 0

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.max(1, Math.floor(w / colW))
      const next = Array.from({ length: cols }, () => Math.random() * -80)
      if (drops.length === 0) drops = next
      else {
        while (drops.length < cols) drops.push(Math.random() * -80)
        drops = drops.slice(0, cols)
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    function pickChar() {
      const p = poolRef.current
      return p[Math.floor(Math.random() * p.length)] || '0'
    }

    function tick() {
      ctx.fillStyle = 'rgba(1, 4, 3, 0.16)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = '13px var(--font-main), ui-monospace, monospace'
      for (let i = 0; i < cols; i++) {
        const x = i * colW
        const y = drops[i] * colW
        const ch = pickChar()
        const head = y > 0 && y < h * 0.92
        ctx.fillStyle = head ? 'rgba(180, 255, 200, 0.95)' : 'rgba(0, 255, 90, 0.22)'
        ctx.fillText(ch, x + 1, y)
        if (Math.random() > 0.988 && head) {
          ctx.fillStyle = 'rgba(255, 255, 220, 0.35)'
          ctx.fillRect(x, y - colW + 2, colW - 2, colW - 4)
        }
        if (y > h + colW * 6 && Math.random() > 0.975) drops[i] = Math.random() * -40
        drops[i] += 0.42 + Math.random() * 0.55
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf.current)
      ro.disconnect()
    }
  }, [reducedMotion])

  if (reducedMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,80,0.03) 2px, rgba(0,255,80,0.03) 4px), radial-gradient(ellipse at 50% 0%, rgba(0,80,40,0.35) 0%, transparent 55%)',
        }}
        aria-hidden
      />
    )
  }

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
}

function sparkPath(series, w, h) {
  if (!series?.length) return ''
  const min = Math.min(...series)
  const max = Math.max(...series)
  const pad = 2
  const span = max - min || 1
  const denom = Math.max(1, series.length - 1)
  return series
    .map((v, i) => {
      const x = pad + (i / denom) * (w - pad * 2)
      const y = h - pad - ((v - min) / span) * (h - pad * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

export default function MatrixScreenLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const reducedMotion = useReducedMotion()
  const [panel, setPanel] = useState('inbox')
  const [quipIx, setQuipIx] = useState(0)
  const [bluePill, setBluePill] = useState(false)
  const [bootDone, setBootDone] = useState(reducedMotion)

  const rainPool = useMemo(() => tokenizeForRain(), [])

  useEffect(() => {
    if (reducedMotion) {
      setBootDone(true)
      return undefined
    }
    const t = window.setTimeout(() => setBootDone(true), 2200)
    return () => window.clearTimeout(t)
  }, [reducedMotion])

  useEffect(() => {
    const t = window.setInterval(() => setQuipIx((i) => (i + 1) % NEO_QUIPS.length), 7000)
    return () => window.clearInterval(t)
  }, [])

  const ticker = useMemo(() => {
    const n = news.map((x) => `${x.emoji} ${x.title}`).join('  //  ')
    const s = stocks.map((x) => `${x.ticker} ${x.changePct >= 0 ? '+' : ''}${x.changePct.toFixed(1)}%`).join('  ·  ')
    return `${n}  ||  ${s}`
  }, [])

  const accent = bluePill ? 'rgba(56, 189, 248, 0.9)' : 'rgba(0, 255, 100, 0.95)'
  const accentDim = bluePill ? 'rgba(34, 150, 200, 0.5)' : 'rgba(0, 180, 70, 0.45)'

  return (
    <div
      className="matrix-root relative min-h-dvh overflow-x-hidden pb-28 text-[#b8ffc8]"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'radial-gradient(ellipse 120% 80% at 50% -20%, #063018 0%, #010806 45%, #000 100%)',
      }}
    >
      <style>{`
        @keyframes matrix-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes matrix-flicker {
          0%, 100% { opacity: 1; }
          48% { opacity: 0.97; }
          50% { opacity: 0.88; }
          52% { opacity: 0.98; }
        }
        @keyframes matrix-boot-line {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes matrix-glitch {
          0%, 90%, 100% { transform: translate(0); text-shadow: 0 0 14px rgba(0, 255, 100, 0.45); }
          92% { transform: translate(-2px, 1px); text-shadow: 2px 0 rgba(0, 255, 255, 0.5), -2px 0 rgba(255, 0, 200, 0.35); }
          94% { transform: translate(2px, -1px); text-shadow: -2px 0 rgba(0, 255, 255, 0.5), 2px 0 rgba(255, 0, 200, 0.35); }
        }
        @keyframes matrix-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .matrix-root .matrix-boot-overlay {
          animation: matrix-flicker 4s ease-in-out infinite;
        }
      `}</style>

      <MatrixRainCanvas extraPool={rainPool} reducedMotion={reducedMotion} />

      {/* Scanlines + vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.12) 50%), linear-gradient(90deg, rgba(0,255,80,0.03), transparent 8%, transparent 92%, rgba(0,255,80,0.04))',
          backgroundSize: '100% 3px, 100% 100%',
          mixBlendMode: 'overlay',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] animate-[matrix-flicker_6s_ease-in-out_infinite]"
        style={{
          boxShadow: 'inset 0 0 120px rgba(0,0,0,0.85), inset 0 0 40px rgba(0,40,20,0.4)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[3] overflow-hidden opacity-30"
        aria-hidden
      >
        <div
          className="h-[40%] w-full bg-gradient-to-b from-[#00ff6640] to-transparent"
          style={{ animation: reducedMotion ? 'none' : 'matrix-scan 7s linear infinite' }}
        />
      </div>

      {!bootDone && (
        <div
          className="matrix-boot-overlay fixed inset-0 z-[60] flex cursor-pointer flex-col justify-end bg-black/92 p-6 font-mono text-sm text-[#00ff66] sm:p-10"
          aria-live="polite"
          onClick={() => setBootDone(true)}
          onKeyDown={(e) => e.key === 'Enter' && setBootDone(true)}
          role="button"
          tabIndex={0}
          title="Skip boot sequence"
        >
          {['INITIALIZING CONSTRUCT…', 'LOADING MAIL.SIMULATION…', 'PATCHING REALITY.EXE…', 'OK.'].map((line, i) => (
            <p
              key={line}
              className="m-0 py-0.5"
              style={{
                animation: `matrix-boot-line 0.45s ease ${i * 0.35}s both`,
              }}
            >
              {'> '}
              {line}
            </p>
          ))}
          <p className="mt-6 text-[10px] uppercase tracking-widest text-[#00aa44]">Click or Enter · skip</p>
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-5xl flex-col px-3 pt-4 sm:px-6 sm:pt-6">
        <header className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-[var(--accent)]/25 pb-4">
          <div>
            <p
              className="m-0 font-[family-name:var(--font-display)] text-[10px] uppercase tracking-[0.35em] sm:text-xs"
              style={{ color: accentDim }}
            >
              NEBUCHADNEZZAR // SUBSYS
            </p>
            <h1
              className="m-0 mt-1 font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-tight sm:text-3xl"
              style={{
                color: accent,
                animation: reducedMotion ? 'none' : 'matrix-glitch 5s ease-in-out infinite',
              }}
            >
              MAIL_STREAM
              <span className="ml-1 inline-block w-2 animate-pulse align-middle bg-[var(--accent)]" />
            </h1>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#6ad88a]/90 sm:text-sm">{NEO_QUIPS[quipIx]}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn btn-ghost btn-sm border border-success/30 text-success hover:bg-success/10"
              onClick={() => setBluePill((v) => !v)}
              title="Toggle simulation tint"
            >
              {bluePill ? '🔵 blue pill' : '🔴 red pill'}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm border border-success/30 text-success hover:bg-success/10"
              onClick={() => setSelectedEmail(null)}
            >
              clear focus
            </button>
            <button type="button" className="btn btn-outline btn-success btn-sm" onClick={onSwitchPersona}>
              exit construct
            </button>
          </div>
        </header>

        <div
          role="tablist"
          className="tabs tabs-boxed mb-4 w-full flex-wrap gap-1 bg-black/50 p-1 sm:gap-2"
          style={{ border: `1px solid ${accentDim}` }}
        >
          {[
            { id: 'inbox', label: 'INBOX.DAT' },
            { id: 'weather', label: 'ATMOS.BIN' },
            { id: 'news', label: 'WIRE.LOG' },
            { id: 'stocks', label: 'ZION.TKR' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={panel === t.id}
              className={`tab tab-sm flex-1 font-mono text-[11px] uppercase sm:text-xs ${panel === t.id ? 'tab-active !bg-success/25 !text-success' : 'text-[#6ad88a]/70'}`}
              onClick={() => setPanel(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <main className="min-h-0 flex-1 rounded-lg border border-success/20 bg-black/55 p-3 shadow-[0_0_40px_rgba(0,255,100,0.06)] backdrop-blur-sm sm:p-5">
          {panel === 'inbox' && (
            <ul className="m-0 list-none space-y-2 p-0">
              {emails.map((e, i) => {
                const active = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`flex w-full flex-col gap-1 rounded-md border px-3 py-3 text-left transition-all sm:flex-row sm:items-center sm:justify-between ${active ? 'border-success bg-success/15 shadow-[0_0_20px_rgba(0,255,100,0.12)]' : 'border-success/15 bg-black/30 hover:border-success/40 hover:bg-success/5'}`}
                      style={{ animationDelay: `${i * 0.04}s` }}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="text-xl shrink-0">{e.from.avatar}</span>
                        <span className="min-w-0">
                          <span className="block truncate font-mono text-sm font-semibold text-[#d8ffe4]">
                            {!e.read && (
                              <span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-success align-middle" />
                            )}
                            {e.subject}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-[11px] text-[#5cbf7a]">{e.preview}</span>
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-[#4a9966] sm:text-xs">
                        {e.time} · {e.tag}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {panel === 'weather' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-success/25 bg-black/40 p-4 font-mono">
                <p className="m-0 text-[10px] uppercase tracking-widest text-[#5cbf7a]">NODE // LOCAL</p>
                <p className="mt-2 text-4xl font-bold text-[#e8fff0] sm:text-5xl">
                  {weather.icon} {weather.temp}°C
                </p>
                <p className="mt-1 text-sm text-[#8ee0a8]">{weather.city}, {weather.country}</p>
                <p className="mt-2 text-xs text-[#6ad88a]/90">{weather.condition}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-[#5cbf7a]">
                  <div>
                    FEELS_LIKE: <span className="text-[#c8ffd8]">{weather.feels_like}°C</span>
                  </div>
                  <div>
                    WIND: <span className="text-[#c8ffd8]">{weather.wind} km/h</span>
                  </div>
                  <div>
                    HUMIDITY: <span className="text-[#c8ffd8]">{weather.humidity}%</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-success/25 bg-black/40 p-4 font-mono text-[11px] text-[#8ee0a8]">
                <p className="m-0 text-[10px] uppercase tracking-widest text-[#5cbf7a]">FORECAST.SERIES</p>
                <ul className="mt-3 space-y-2">
                  {weather.forecast.map((d) => (
                    <li key={d.day} className="flex items-center justify-between border-b border-success/10 py-1.5">
                      <span>
                        {d.icon} {d.day}
                      </span>
                      <span className="text-[#d8ffe4]">
                        {d.high}° / {d.low}°
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {panel === 'news' && (
            <ul className="m-0 list-none space-y-3 p-0">
              {news.map((n) => (
                <li
                  key={n.id}
                  className="rounded-lg border border-success/20 bg-gradient-to-r from-black/60 to-success/5 px-3 py-3 font-mono sm:px-4"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-[#5cbf7a]">
                    <span className="badge badge-success badge-outline badge-sm border-success/40">{n.category}</span>
                    <span>{n.source}</span>
                    <span className="opacity-70">{n.time}</span>
                  </div>
                  <p className="mt-2 m-0 text-sm leading-snug text-[#e0ffe8] sm:text-base">
                    <span className="mr-2">{n.emoji}</span>
                    {n.title}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {panel === 'stocks' && (
            <div className="grid gap-3 sm:grid-cols-2">
              {stocks.map((s) => {
                const up = s.changePct >= 0
                return (
                  <div
                    key={s.ticker}
                    className="rounded-lg border border-success/20 bg-black/45 p-3 font-mono sm:p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="m-0 text-lg font-bold text-[#e8fff0]">{s.ticker}</p>
                        <p className="m-0 max-w-[12rem] truncate text-[10px] text-[#6ad88a]">{s.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="m-0 text-base text-[#e8fff0]">
                          {s.currency}
                          {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </p>
                        <p className={`m-0 text-xs ${up ? 'text-success' : 'text-error'}`}>
                          {up ? '▲' : '▼'} {Math.abs(s.changePct).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                    <svg className="mt-2 h-14 w-full" viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden>
                      <path
                        d={sparkPath(s.series, 120, 40)}
                        fill="none"
                        stroke={up ? 'rgba(52, 211, 153, 0.85)' : 'rgba(248, 113, 113, 0.85)'}
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                )
              })}
            </div>
          )}
        </main>

        {/* Rabbit + marquee */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-sm gap-2 text-[#7dcea8] hover:bg-success/10 hover:text-success"
            onClick={() => setSelectedEmail(emails[Math.floor(Math.random() * emails.length)])}
            aria-label="Random message — follow the rabbit"
          >
            <span className="text-2xl" aria-hidden>
              🐇
            </span>
            follow the white rabbit
          </button>
          <div className="relative w-full overflow-hidden rounded border border-success/20 bg-black/70 py-2 font-mono text-[10px] text-[#7dcea8] sm:text-xs">
            <div
              className="whitespace-nowrap pl-4"
              style={{
                animation: reducedMotion ? 'none' : 'matrix-marquee 48s linear infinite',
              }}
            >
              <span className="inline-block pr-16">{ticker}</span>
              <span className="inline-block pr-16" aria-hidden>
                {ticker}
              </span>
            </div>
          </div>
        </div>
      </div>

      {selectedEmail && (
        <div className="modal modal-open z-[80] pointer-events-auto" role="dialog" aria-modal="true" aria-labelledby="matrix-mail-title">
          <button
            type="button"
            className="modal-backdrop bg-black/85"
            aria-label="Close message"
            onClick={() => setSelectedEmail(null)}
          />
          <div className="modal-box max-h-[85vh] max-w-lg overflow-y-auto border-2 border-success/50 bg-[#030806] font-mono text-[#c8ffd8] shadow-[0_0_60px_rgba(0,255,100,0.15)]">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-success"
              aria-label="Close"
              onClick={() => setSelectedEmail(null)}
            >
              ✕
            </button>
            <div className="pr-8">
              <p className="m-0 text-[10px] uppercase tracking-[0.2em] text-success/70">DECRYPTED_PACKET</p>
              <h2 id="matrix-mail-title" className="mt-2 text-lg font-bold leading-snug text-[#f0fff4]">
                {selectedEmail.subject}
              </h2>
              <p className="mt-1 text-xs text-[#6ad88a]">
                FROM: {selectedEmail.from.name} &lt;{selectedEmail.from.email}&gt;
              </p>
              <p className="text-[11px] text-[#5cbf7a]">
                {selectedEmail.date} · {selectedEmail.time} · TAG:{selectedEmail.tag.toUpperCase()}
              </p>
              <div className="divider my-3 border-success/20" />
              <pre className="m-0 whitespace-pre-wrap text-sm leading-relaxed text-[#b8ffc8]">{selectedEmail.body}</pre>
            </div>
            <div className="modal-action">
              <button type="button" className="btn btn-success btn-sm" onClick={() => setSelectedEmail(null)}>
                ACK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
