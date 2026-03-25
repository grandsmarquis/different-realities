import { useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const zone = t =>
  ({
    work: 'ZONE A',
    personal: 'ZONE B',
    finance: 'ZONE C',
    promo: 'BONUS',
    newsletter: 'MARATHON',
    social: 'VERSUS',
    dev: 'DEBUG',
    shopping: 'ITEM',
    travel: 'SPRINT',
  }[t] || '???')

const COLORS = ['#00f0f0', '#f0f000', '#a000f0', '#f0a000', '#0000f0', '#f00000', '#00f000']

const TETROMINO = [
  { cells: [[0, 0], [1, 0], [2, 0], [3, 0]], color: '#00f0f0' },
  { cells: [[0, 0], [1, 0], [0, 1], [1, 1]], color: '#f0f000' },
  { cells: [[1, 0], [0, 1], [1, 1], [2, 1]], color: '#a000f0' },
  { cells: [[2, 0], [0, 1], [1, 1], [2, 1]], color: '#f0a000' },
  { cells: [[0, 0], [0, 1], [1, 1], [2, 1]], color: '#0000f0' },
  { cells: [[1, 0], [2, 0], [0, 1], [1, 1]], color: '#00f000' },
  { cells: [[0, 0], [1, 0], [1, 1], [2, 1]], color: '#f00000' },
]

const FALL_SCHEDULE = [
  { piece: 0, left: 4, delay: 0, dur: 1 },
  { piece: 2, left: 14, delay: 0.4, dur: 2 },
  { piece: 1, left: 24, delay: 1.1, dur: 3 },
  { piece: 4, left: 34, delay: 0.2, dur: 4 },
  { piece: 3, left: 44, delay: 1.8, dur: 5 },
  { piece: 5, left: 54, delay: 0.9, dur: 2 },
  { piece: 6, left: 64, delay: 2.2, dur: 3 },
  { piece: 0, left: 72, delay: 3.0, dur: 5 },
  { piece: 2, left: 82, delay: 1.4, dur: 1 },
  { piece: 1, left: 10, delay: 2.6, dur: 4 },
  { piece: 3, left: 88, delay: 0.6, dur: 2 },
  { piece: 5, left: 52, delay: 3.8, dur: 5 },
]

const CELL = 11

function TetrominoFall({ cells, color, leftPct, delay, dur }) {
  const minX = Math.min(...cells.map(c => c[0]))
  const minY = Math.min(...cells.map(c => c[1]))
  const maxX = Math.max(...cells.map(c => c[0]))
  const maxY = Math.max(...cells.map(c => c[1]))
  const w = maxX - minX + 1
  const h = maxY - minY + 1

  return (
    <div
      className={`tetris-fall tetris-fall-${dur} pointer-events-none absolute top-0 will-change-transform`}
      style={{ left: `${leftPct}%`, marginLeft: '-1.25rem', animationDelay: `${delay}s`, color }}
      aria-hidden
    >
      <div className="relative" style={{ width: w * CELL, height: h * CELL }}>
        {cells.map(([x, y], i) => (
          <div
            key={i}
            className="absolute rounded-[1px] border-2 shadow-[0_0_12px_currentColor]"
            style={{
              left: (x - minX) * CELL,
              top: (y - minY) * CELL,
              width: CELL - 2,
              height: CELL - 2,
              background: `${color}66`,
              borderColor: color,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function TetrisPlayerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const score = useMemo(() => emails.filter(e => e.read).length * 1000 + emails.length * 100, [])
  const level = useMemo(() => 1 + Math.floor(emails.filter(e => !e.read).length / 2), [])

  const wellCells = useMemo(() => {
    const rows = 9
    const cols = 10
    const filled = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const fromBottom = rows - 1 - r
        const isFilled = fromBottom < 4 || (fromBottom === 4 && c !== 0 && c !== cols - 1 && (c + r) % 2 === 0)
        filled.push({
          key: `${r}-${c}`,
          filled: isFilled,
          color: COLORS[(r * cols + c) % COLORS.length],
          delay: (r * cols + c) * 0.04,
        })
      }
    }
    return filled
  }, [])

  return (
    <div
      className="tetris-root relative min-h-dvh flex flex-col overflow-hidden"
      style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}
    >
      <div
        className={`tetris-grid-bg pointer-events-none fixed inset-0 z-0 opacity-50 ${reducedMotion ? '' : 'tetris-grid-drift'}`}
        aria-hidden
      />
      {!reducedMotion && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
          {FALL_SCHEDULE.map((cfg, i) => {
            const { cells, color } = TETROMINO[cfg.piece]
            return <TetrominoFall key={i} cells={cells} color={color} leftPct={cfg.left} delay={cfg.delay} dur={cfg.dur} />
          })}
        </div>
      )}

      {!reducedMotion && (
        <div className="tetris-mini-well pointer-events-none fixed bottom-14 right-3 z-[5] hidden md:block" aria-hidden>
          <p className="mb-1 text-center font-mono text-[8px] font-bold tracking-widest opacity-50">DEMO WELL</p>
          <div
            className="tetris-mini-well-inner overflow-hidden rounded border-2 bg-black/40 p-1 shadow-lg"
            style={{ borderColor: 'var(--accent2)', width: 10 * 14 + 8, height: 9 * 14 + 8 }}
          >
            <div className="tetris-well-rows grid h-full w-full gap-px" style={{ gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(9, 1fr)' }}>
              {wellCells.map(({ key, filled, color: wc, delay }) => (
                <div
                  key={key}
                  className={`min-h-0 min-w-0 rounded-[1px] ${filled ? 'tetris-well-row border border-white/20' : ''}`}
                  style={{
                    background: filled ? wc : 'color-mix(in srgb, var(--bg) 80%, transparent)',
                    opacity: filled ? 0.9 : 0.25,
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <header
        className={`relative z-20 shrink-0 border-b-4 px-3 py-3 md:px-5 ${reducedMotion ? '' : 'tetris-header-pulse'}`}
        style={{ borderColor: 'var(--accent)' }}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.4em] opacity-70" style={{ color: 'var(--accent)' }}>
              BLOCK-STACK MAIL
            </p>
            <h1 className="text-xl font-bold md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
              STACK YOUR INBOX
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs md:text-sm">
            <div
              className={`rounded border-2 px-3 py-1 tabular-nums ${reducedMotion ? '' : 'tetris-hud-pop'}`}
              style={{ borderColor: 'var(--accent2)', color: 'var(--accent)', animationDelay: '0s' }}
            >
              SCORE <span className="font-bold">{score.toLocaleString()}</span>
            </div>
            <div
              className={`rounded border-2 px-3 py-1 tabular-nums ${reducedMotion ? '' : 'tetris-hud-pop'}`}
              style={{ borderColor: 'var(--accent2)', color: 'var(--text)', animationDelay: '0.35s' }}
            >
              LEVEL <span className="font-bold">{level}</span>
            </div>
            <div
              className={`rounded border-2 px-3 py-1 ${reducedMotion ? '' : 'tetris-hud-pop'}`}
              style={{ borderColor: 'var(--accent2)', animationDelay: '0.7s' }}
            >
              LINES <span className="font-bold text-[var(--accent)]">{emails.filter(e => e.read).length}</span>
            </div>
            <button type="button" className="btn btn-sm border-2 font-bold uppercase tracking-wider" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }} onClick={onSwitchPersona}>
              Game Over → Home
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 min-h-0 flex-col gap-3 p-3 lg:flex-row">
        <aside className="flex shrink-0 flex-col gap-2 lg:w-44">
          <div className="rounded border-2 p-2 text-center font-mono text-[10px] font-bold tracking-widest" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
            HOLD
            <div
              className={`mx-auto mt-2 grid h-16 w-16 place-items-center border-2 text-2xl ${reducedMotion ? '' : 'tetris-hud-pop'}`}
              style={{ borderColor: 'var(--accent)' }}
            >
              {weather.icon}
            </div>
            <p className="mt-1 text-[9px] normal-case opacity-70">{weather.temp}°</p>
          </div>
          <div className={`rounded border-2 p-2 text-center font-mono text-[10px] font-bold tracking-widest ${reducedMotion ? '' : 'tetris-next-glow'}`} style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
            NEXT
            <ul className="mt-2 space-y-1 text-left text-[10px] font-normal normal-case">
              {stocks.slice(0, 3).map((s, i) => (
                <li key={s.ticker} className="flex justify-between gap-1 border-b border-base-content/10 pb-1" style={{ color: COLORS[i % COLORS.length] }}>
                  <span>{s.ticker}</span>
                  <span>{s.changePct >= 0 ? '▲' : '▼'}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <nav className="flex min-h-0 min-w-0 flex-1 flex-col border-2 lg:max-w-sm" style={{ borderColor: 'var(--accent2)', background: 'color-mix(in srgb, var(--card) 88%, transparent)' }} aria-label="Message queue">
          <div className="flex items-center justify-between border-b-2 px-2 py-1.5 text-[10px] font-bold tracking-widest" style={{ borderColor: 'var(--accent2)' }}>
            <span>QUEUE</span>
            <span style={{ color: 'var(--accent)' }}>{emails.filter(e => !e.read).length} pending</span>
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto">
            {emails.map((e, i) => {
              const on = selectedEmail?.id === e.id
              const c = COLORS[i % COLORS.length]
              return (
                <li key={e.id} className="border-b border-base-content/10">
                  <button
                    type="button"
                    aria-current={on ? 'true' : undefined}
                    onClick={() => setSelectedEmail(e)}
                    className={`tetris-row w-full px-2 py-2.5 text-left transition-colors ${on ? 'tetris-row-active' : 'hover:bg-base-300/30'}`}
                    style={{ borderLeft: on ? `4px solid ${c}` : '4px solid transparent' }}
                  >
                    <div className="flex gap-2">
                      <span className="flex size-9 shrink-0 items-center justify-center border-2 text-lg" style={{ borderColor: c, color: c }}>
                        {e.from.avatar}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="font-mono text-[9px] opacity-50">{zone(e.tag)}</span>
                        <p className="line-clamp-2 text-xs font-bold leading-snug">{e.subject}</p>
                        {!e.read && (
                          <span className="badge badge-xs mt-1 border-0 font-mono" style={{ background: c, color: 'var(--bg)' }}>
                            NEW LINE
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

        <main
          className={`flex min-h-[200px] min-w-0 flex-[2] flex-col border-2 p-2 md:p-4 ${reducedMotion ? '' : 'tetris-playfield-anim'}`}
          style={{ borderColor: 'var(--accent)', background: 'var(--bg2)', boxShadow: 'inset 0 0 40px color-mix(in srgb, var(--accent) 8%, transparent)' }}
        >
          {selectedEmail ? (
            <article className={`flex min-h-0 flex-1 flex-col overflow-hidden border-4 ${reducedMotion ? '' : 'tetris-piece-lock'}`} style={{ borderColor: 'var(--accent)' }}>
              <div className="flex flex-wrap items-start gap-3 border-b-2 p-3" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
                <span className="text-4xl">{selectedEmail.from.avatar}</span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold md:text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {selectedEmail.subject}
                  </h2>
                  <p className="mt-1 font-mono text-[11px] opacity-60">
                    {selectedEmail.from.name} · {selectedEmail.date}
                  </p>
                </div>
                <span className="badge badge-outline badge-sm font-mono" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                  {zone(selectedEmail.tag)}
                </span>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-4 text-sm leading-relaxed whitespace-pre-wrap">{selectedEmail.body}</div>
            </article>
          ) : (
            <div className="relative z-[3] flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center opacity-80">
              <p className="flex justify-center gap-1 text-4xl leading-none">
                {[0, 1, 2].map(i => (
                  <span key={i} className={reducedMotion ? '' : 'tetris-empty-block'} style={{ animationDelay: `${i * 0.12}s` }}>
                    ⬛
                  </span>
                ))}
              </p>
              <p className="font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                SELECT A PIECE
              </p>
              <p className="max-w-xs text-xs">Clear the board by reading mail. T-spin optional.</p>
            </div>
          )}
        </main>

        <aside className="shrink-0 lg:w-48">
          <div className="rounded border-2 p-3" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
            <p className="mb-2 font-mono text-[9px] font-bold tracking-widest opacity-60">HIGH SCORE — NEWS</p>
            <ul className="space-y-2 text-[11px] leading-snug">
              {news.slice(0, 5).map((n, i) => (
                <li key={i} className="border-l-2 pl-2" style={{ borderColor: COLORS[i % COLORS.length] }}>
                  {n.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <footer className="relative z-20 shrink-0 overflow-hidden border-t-4 font-mono text-[10px]" style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}>
        <div className="tetris-marquee flex whitespace-nowrap py-2 opacity-90">
          <span className="pr-16">
            {stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '+' : ''}${s.changePct}%`).join('  ·  ')} · {weather.condition} · PAUSE MENU: HOME
          </span>
          <span className="pr-16" aria-hidden>
            {stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '+' : ''}${s.changePct}%`).join('  ·  ')} · {weather.condition}
          </span>
        </div>
      </footer>
    </div>
  )
}
