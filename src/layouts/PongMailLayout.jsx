import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const PADDLE_W = 14
const BALL_R = 7
const BASE_SPEED = 4.2
const MAX_SPEED = 11

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v))
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

export default function PongMailLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const reducedMotion = useReducedMotion()
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const stateRef = useRef({
    w: 400,
    h: 280,
    ballX: 200,
    ballY: 140,
    vx: BASE_SPEED * 0.85,
    vy: BASE_SPEED * 0.45,
    py: 100,
    aiY: 100,
    rally: 0,
    bestRally: 0,
    playerScore: 0,
    aiScore: 0,
    hitFlash: 0,
  })
  const pointerYRef = useRef(null)
  const keysRef = useRef({ up: false, down: false })

  const [hud, setHud] = useState({
    rally: 0,
    bestRally: 0,
    playerScore: 0,
    aiScore: 0,
  })

  const resetBall = useCallback((towardPlayer) => {
    const s = stateRef.current
    const ang = (Math.random() * 0.5 + 0.25) * Math.PI
    const dir = towardPlayer ? -1 : 1
    const sp = clamp(BASE_SPEED + s.rally * 0.08, BASE_SPEED, MAX_SPEED)
    s.ballX = s.w / 2
    s.ballY = s.h / 2
    s.vx = Math.cos(ang) * sp * dir
    s.vy = Math.sin(ang) * sp * (Math.random() > 0.5 ? 1 : -1)
    s.rally = 0
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let last = performance.now()
    let hudFrame = 0
    const paddleHeight = (ch) => Math.max(56, Math.min(100, ch * 0.28))

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(280, rect.width)
      const h = Math.max(220, Math.min(420, rect.width * 0.62))
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const s = stateRef.current
      const ph = paddleHeight(h)
      s.w = w
      s.h = h
      s.py = clamp(s.py, 0, h - ph)
      s.aiY = clamp(s.aiY, 0, h - ph)
    }

    const loop = (now) => {
      const dt = Math.min(32, now - last)
      last = now
      const s = stateRef.current
      const ph = paddleHeight(s.h)
      const pxL = 18
      const pxR = s.w - 18 - PADDLE_W

      if (s.hitFlash > 0) s.hitFlash -= dt * 0.004

      const pyTarget =
        pointerYRef.current != null
          ? clamp(pointerYRef.current - ph / 2, 0, s.h - ph)
          : clamp(s.py + (keysRef.current.up ? -0.14 * dt : 0) + (keysRef.current.down ? 0.14 * dt : 0), 0, s.h - ph)
      s.py += (pyTarget - s.py) * (reducedMotion ? 0.35 : 0.22)

      const aiTarget = clamp(s.ballY - ph / 2 + (Math.sin(now * 0.002) * 12), 0, s.h - ph)
      const aiLerp = reducedMotion ? 0.06 : 0.085 + Math.min(0.05, s.rally * 0.003)
      s.aiY += (aiTarget - s.aiY) * aiLerp

      s.ballX += s.vx * (dt / 16)
      s.ballY += s.vy * (dt / 16)

      if (s.ballY < BALL_R) {
        s.ballY = BALL_R
        s.vy *= -1
      } else if (s.ballY > s.h - BALL_R) {
        s.ballY = s.h - BALL_R
        s.vy *= -1
      }

      if (s.ballX < pxL + PADDLE_W && s.ballX > pxL - 4 && s.ballY > s.py && s.ballY < s.py + ph) {
        s.ballX = pxL + PADDLE_W + BALL_R
        const hit = (s.ballY - (s.py + ph / 2)) / (ph / 2)
        s.vx = Math.abs(s.vx) * 1.04
        s.vy += hit * 2.2
        s.vx = clamp(s.vx, BASE_SPEED * 0.7, MAX_SPEED)
        s.rally += 1
        s.bestRally = Math.max(s.bestRally, s.rally)
        s.hitFlash = 1
      }

      if (s.ballX > pxR - BALL_R && s.ballX < pxR + PADDLE_W + 8 && s.ballY > s.aiY && s.ballY < s.aiY + ph) {
        s.ballX = pxR - BALL_R
        const hit = (s.ballY - (s.aiY + ph / 2)) / (ph / 2)
        s.vx = -Math.abs(s.vx) * 1.04
        s.vy += hit * 2.2
        s.vx = clamp(s.vx, -MAX_SPEED, -BASE_SPEED * 0.7)
        s.rally += 1
        s.bestRally = Math.max(s.bestRally, s.rally)
        s.hitFlash = 1
      }

      if (s.ballX < -20) {
        s.aiScore += 1
        resetBall(true)
      } else if (s.ballX > s.w + 20) {
        s.playerScore += 1
        resetBall(false)
      }

      const glow = 'rgba(57, 255, 20, 0.95)'
      const glow2 = 'rgba(255, 45, 106, 0.9)'
      const lineC = 'rgba(0, 245, 255, 0.25)'

      ctx.fillStyle = '#030806'
      ctx.fillRect(0, 0, s.w, s.h)

      if (s.hitFlash > 0) {
        ctx.fillStyle = `rgba(57, 255, 20, ${s.hitFlash * 0.12})`
        ctx.fillRect(0, 0, s.w, s.h)
      }

      ctx.strokeStyle = lineC
      ctx.setLineDash([10, 14])
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(s.w / 2, 0)
      ctx.lineTo(s.w / 2, s.h)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.shadowColor = glow
      ctx.shadowBlur = reducedMotion ? 8 : 18
      ctx.fillStyle = glow
      ctx.fillRect(pxL, s.py, PADDLE_W, ph)
      ctx.shadowColor = glow2
      ctx.shadowBlur = reducedMotion ? 8 : 18
      ctx.fillStyle = glow2
      ctx.fillRect(pxR, s.aiY, PADDLE_W, ph)

      ctx.shadowColor = '#fff'
      ctx.shadowBlur = reducedMotion ? 6 : 14
      ctx.fillStyle = '#f0fff0'
      ctx.beginPath()
      ctx.arc(s.ballX, s.ballY, BALL_R, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      hudFrame += 1
      if (hudFrame % 5 === 0) {
        setHud((prev) => {
          const next = {
            rally: s.rally,
            bestRally: s.bestRally,
            playerScore: s.playerScore,
            aiScore: s.aiScore,
          }
          if (
            prev.rally === next.rally &&
            prev.bestRally === next.bestRally &&
            prev.playerScore === next.playerScore &&
            prev.aiScore === next.aiScore
          ) {
            return prev
          }
          return next
        })
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [reducedMotion, resetBall])

  const onPointerMove = (e) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const r = wrap.getBoundingClientRect()
    pointerYRef.current = e.clientY - r.top
  }

  const onPointerLeave = () => {
    pointerYRef.current = null
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') keysRef.current.up = true
    if (e.key === 'ArrowDown') keysRef.current.down = true
  }
  const onKeyUp = (e) => {
    if (e.key === 'ArrowUp') keysRef.current.up = false
    if (e.key === 'ArrowDown') keysRef.current.down = false
  }

  const unread = emails.filter((e) => !e.read).length
  const tickerNews = news.map((n) => `${n.emoji} ${n.title}`).join('   ·   ')
  const tickerStocks = stocks.map((s) => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'}${Math.abs(s.changePct).toFixed(1)}%`).join('   ')

  return (
    <div
      className="pong-mail-root relative flex min-h-dvh flex-col overflow-x-hidden"
      style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}
    >
      <div
        className={`pong-mail-grid-bg pointer-events-none fixed inset-0 z-0 opacity-40 ${reducedMotion ? '' : 'pong-mail-grid-drift'}`}
        aria-hidden
      />
      <div className={`pong-mail-crt pointer-events-none fixed inset-0 z-[1] ${reducedMotion ? 'opacity-25' : ''}`} aria-hidden />

      <header
        className={`relative z-20 border-b-2 px-3 py-3 md:px-6 ${reducedMotion ? '' : 'pong-mail-header-pulse'}`}
        style={{ borderColor: 'var(--accent)', background: 'color-mix(in srgb, var(--card) 92%, transparent)' }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`hidden size-12 shrink-0 rounded-lg border-2 sm:grid sm:place-items-center ${reducedMotion ? '' : 'pong-mail-logo-spin'}`}
              style={{ borderColor: 'var(--accent3)', background: 'var(--bg2)', boxShadow: '0 0 20px color-mix(in srgb, var(--accent) 40%, transparent)' }}
              aria-hidden
            >
              <span className="text-2xl">🏓</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold tracking-[0.35em]" style={{ color: 'var(--accent3)' }}>
                MULTITASK ARCADE · v1.0
              </p>
              <h1 className="truncate text-lg font-black tracking-tight md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                INBOX <span style={{ color: 'var(--accent2)' }}>×</span> PONG
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div
              className="badge badge-lg border-2 font-mono text-xs font-bold"
              style={{ borderColor: 'var(--accent)', background: 'var(--bg2)', color: 'var(--accent)' }}
            >
              {unread} unread
            </div>
            <div
              className="flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 font-mono text-xs"
              style={{ borderColor: 'var(--accent3)', background: 'var(--card)' }}
            >
              <span className="text-lg" aria-hidden>
                {weather.icon}
              </span>
              <div>
                <p className="text-[9px] uppercase tracking-widest opacity-60">sky</p>
                <p className="font-bold tabular-nums">
                  {weather.city} {weather.temp}°
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-sm border-2 font-bold uppercase tracking-wider"
              style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}
              onClick={onSwitchPersona}
            >
              Eject
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 min-h-0 flex-col gap-3 p-3 lg:flex-row lg:gap-4 lg:p-4">
        <nav
          className={`flex min-h-[200px] min-w-0 flex-col border-2 lg:w-[min(100%,320px)] lg:shrink-0 ${reducedMotion ? '' : 'pong-mail-inbox-glow'}`}
          style={{ borderColor: 'var(--accent2)', background: 'color-mix(in srgb, var(--card) 94%, transparent)' }}
          aria-label="Inbox stream"
        >
          <div
            className="flex items-center justify-between border-b-2 px-3 py-2"
            style={{ borderColor: 'var(--accent2)', background: 'var(--bg2)' }}
          >
            <span className="text-[10px] font-bold tracking-[0.3em]" style={{ color: 'var(--accent2)' }}>
              MESSAGE STREAM
            </span>
            <span className="font-mono text-[10px]" style={{ color: 'var(--accent3)' }}>
              {emails.length} packets
            </span>
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto">
            {emails.map((e, i) => {
              const on = selectedEmail?.id === e.id
              const hue = (i * 47) % 360
              return (
                <li key={e.id} className="border-b border-base-content/10">
                  <button
                    type="button"
                    aria-current={on ? 'true' : undefined}
                    onClick={() => setSelectedEmail(e)}
                    className={`pong-mail-row w-full px-3 py-2.5 text-left transition-colors ${on ? 'pong-mail-row-active' : 'hover:bg-base-300/20'}`}
                    style={{
                      borderLeft: on ? `4px solid hsl(${hue} 80% 55%)` : '4px solid transparent',
                    }}
                  >
                    <div className="flex gap-2">
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded border-2 text-lg"
                        style={{ borderColor: `hsl(${hue} 70% 45%)` }}
                      >
                        {e.from.avatar}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-mono text-[10px] opacity-60">{e.from.name}</p>
                        <p className="line-clamp-2 text-xs font-bold leading-snug">{e.subject}</p>
                        {!e.read && (
                          <span className="badge badge-xs mt-1 border-0 font-mono uppercase" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
                            new
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <div
            className="pong-mail-cabinet relative flex flex-1 flex-col rounded-xl border-4 p-2 shadow-2xl md:p-3"
            style={{
              borderColor: 'var(--accent)',
              background: 'linear-gradient(145deg, var(--bg2) 0%, #040a08 100%)',
              boxShadow: '0 0 0 1px color-mix(in srgb, var(--accent3) 35%, transparent), 0 24px 48px rgba(0,0,0,0.55)',
            }}
          >
            <div className={`mb-2 flex flex-wrap items-center justify-between gap-2 px-1 font-mono text-[10px] md:text-xs ${reducedMotion ? '' : 'pong-mail-hud-flicker'}`}>
              <div className="flex flex-wrap gap-2">
                <span className="rounded border border-success/40 bg-success/10 px-2 py-0.5 text-success">
                  YOU {hud.playerScore}
                </span>
                <span className="rounded border border-error/40 bg-error/10 px-2 py-0.5 text-error">
                  SPAM-BOT {hud.aiScore}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 tabular-nums">
                <span style={{ color: 'var(--accent3)' }}>RALLY {hud.rally}</span>
                <span className="opacity-60">BEST {hud.bestRally}</span>
              </div>
            </div>

            <div
              ref={wrapRef}
              className="relative flex min-h-[220px] flex-1 cursor-ns-resize touch-none outline-none md:min-h-[280px]"
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              onPointerDown={onPointerMove}
              tabIndex={0}
              role="application"
              aria-label="Pong: move pointer vertically to control your paddle, or use arrow keys when focused"
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
            >
              <canvas ref={canvasRef} className="mx-auto w-full max-w-2xl rounded-md border-2 border-base-content/20 bg-black" />
              {!reducedMotion && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-md" aria-hidden>
                  <div className="pong-mail-scan-sweep absolute h-[120%] w-full opacity-[0.07]" />
                </div>
              )}
            </div>

            <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest opacity-50">
              Pointer / touch = paddle · Focus court + ↑↓ keys · Miss = point for the bot
            </p>
          </div>

          <div className="grid shrink-0 gap-2 md:grid-cols-2">
            <div className="rounded-lg border-2 p-3 font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <p className="mb-2 text-[9px] font-bold tracking-widest opacity-60">MARKET LEDS</p>
              <ul className="space-y-1.5">
                {stocks.map((s) => (
                  <li key={s.ticker} className="flex items-center justify-between gap-2 border-b border-base-content/5 pb-1 last:border-0">
                    <span style={{ color: 'var(--accent3)' }}>{s.ticker}</span>
                    <span className={s.changePct >= 0 ? 'text-success' : 'text-error'}>
                      {s.currency}
                      {s.price.toFixed(2)} ({s.changePct >= 0 ? '+' : ''}
                      {s.changePct.toFixed(1)}%)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border-2 p-3 font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <p className="mb-2 text-[9px] font-bold tracking-widest opacity-60">HEADLINE FEED</p>
              <ul className="max-h-32 space-y-2 overflow-y-auto pr-1">
                {news.slice(0, 6).map((n, i) => (
                  <li key={i} className="flex gap-2 border-l-2 pl-2 leading-snug" style={{ borderColor: 'var(--accent)' }}>
                    <span>{n.emoji}</span>
                    <span>{n.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="hidden w-52 shrink-0 flex-col gap-3 xl:flex" aria-label="Side channel">
          <div
            className="rounded-xl border-2 p-3 text-center"
            style={{ borderColor: 'var(--accent3)', background: 'var(--bg2)' }}
          >
            <p className="font-mono text-[9px] tracking-widest opacity-60">RADAR</p>
            <p className="mt-2 text-4xl">{weather.icon}</p>
            <p className="mt-1 font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {weather.temp}°
            </p>
            <p className="text-[11px] opacity-80">{weather.condition}</p>
            <p className="mt-2 font-mono text-[10px] opacity-50">
              wind {weather.wind} km/h · {weather.humidity}% RH
            </p>
          </div>
          <div className="rounded-xl border-2 p-3 font-mono text-[10px]" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
            <p className="mb-2 font-bold tracking-widest opacity-60">TELEMETRY</p>
            <p className="leading-relaxed opacity-90">
              Simultaneous mail + ball tracking detected. Neuroscience says you are winning at neither. Keep going.
            </p>
          </div>
        </aside>
      </div>

      {selectedEmail && (
        <div className="modal modal-open z-[85]" role="dialog" aria-modal="true" aria-labelledby="pong-mail-subject">
          <div className="modal-box relative max-h-[min(85dvh,560px)] w-[calc(100%-1rem)] max-w-lg border-2 font-mono text-sm shadow-2xl sm:max-w-2xl" style={{ borderColor: 'var(--accent)', background: 'var(--card)', color: 'var(--text)' }}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close message"
              onClick={() => setSelectedEmail(null)}
            >
              ✕
            </button>
            <div className="flex flex-wrap items-start gap-3 border-b-2 border-base-content/10 pb-3 pr-10">
              <span className="text-4xl">{selectedEmail.from.avatar}</span>
              <div className="min-w-0 flex-1">
                <h2 id="pong-mail-subject" className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  {selectedEmail.subject}
                </h2>
                <p className="mt-1 text-xs opacity-60">
                  {selectedEmail.from.name} · {selectedEmail.date} {selectedEmail.time}
                </p>
              </div>
            </div>
            <div className="mt-3 max-h-[min(50dvh,360px)] overflow-y-auto whitespace-pre-wrap leading-relaxed">{selectedEmail.body}</div>
          </div>
          <button type="button" className="modal-backdrop bg-black/80" aria-label="Close message" onClick={() => setSelectedEmail(null)} />
        </div>
      )}

      <footer
        className="relative z-20 shrink-0 overflow-hidden border-t-2 font-mono text-[10px]"
        style={{ borderColor: 'var(--accent3)', background: 'var(--bg2)' }}
      >
        <div className="pong-mail-ticker flex whitespace-nowrap py-2 opacity-90">
          <span className="pr-20">
            {tickerStocks} · {weather.city} {weather.temp}° {weather.condition} · {tickerNews}
          </span>
          <span className="pr-20" aria-hidden>
            {tickerStocks} · {tickerNews}
          </span>
        </div>
      </footer>
    </div>
  )
}
