import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const STAR_SPOTS = [
  { t: '8%', l: '6%', d: '0s' },
  { t: '14%', l: '22%', d: '0.4s' },
  { t: '11%', l: '78%', d: '0.9s' },
  { t: '18%', l: '92%', d: '0.2s' },
  { t: '22%', l: '44%', d: '1.1s' },
  { t: '6%', l: '55%', d: '0.6s' },
  { t: '26%', l: '12%', d: '1.4s' },
  { t: '5%', l: '88%', d: '0.3s' },
]

function PixelCloud({ className = '' }) {
  return (
    <svg
      viewBox="0 0 32 16"
      className={`h-8 w-16 shrink-0 [image-rendering:pixelated] opacity-80 ${className}`}
      aria-hidden
    >
      <rect x="4" y="8" width="6" height="4" fill="#8bac0f" />
      <rect x="8" y="6" width="8" height="6" fill="#9bbc0f" />
      <rect x="14" y="8" width="10" height="4" fill="#8bac0f" />
      <rect x="20" y="6" width="6" height="4" fill="#9bbc0f" />
      <rect x="2" y="10" width="4" height="2" fill="#306230" />
      <rect x="26" y="10" width="4" height="2" fill="#306230" />
    </svg>
  )
}

function PixelSun() {
  return (
    <svg viewBox="0 0 16 16" className="size-14 shrink-0 [image-rendering:pixelated]" aria-hidden>
      <rect x="6" y="2" width="4" height="2" fill="#ffd700" />
      <rect x="4" y="4" width="8" height="8" fill="#ffd700" />
      <rect x="6" y="12" width="4" height="2" fill="#c9a000" />
      <rect x="2" y="6" width="2" height="4" fill="#ffd700" />
      <rect x="12" y="6" width="2" height="4" fill="#ffd700" />
      <rect x="7" y="7" width="2" height="2" fill="#fff8b0" />
    </svg>
  )
}

function PixelSlime() {
  return (
    <svg viewBox="0 0 10 12" className="size-16 [image-rendering:pixelated]" aria-hidden>
      <title>Slime</title>
      <rect x="2" y="4" width="6" height="6" fill="#55aa55" />
      <rect x="1" y="6" width="1" height="3" fill="#3d8c3d" />
      <rect x="8" y="6" width="1" height="3" fill="#3d8c3d" />
      <rect x="3" y="2" width="4" height="3" fill="#6ee7a8" />
      <rect x="3" y="9" width="1" height="2" fill="#2d6a2d" />
      <rect x="6" y="9" width="1" height="2" fill="#2d6a2d" />
      <rect x="3" y="5" width="1" height="1" fill="#0f380f" />
      <rect x="6" y="5" width="1" height="1" fill="#0f380f" />
      <rect x="4" y="7" width="2" height="1" fill="#0f380f" />
    </svg>
  )
}

function BlockySpark({ series, up }) {
  if (!series?.length) return null
  const last = 12
  const slice = series.slice(-last)
  const min = Math.min(...slice)
  const max = Math.max(...slice)
  const r = max - min || 1
  const barW = 6
  const gap = 2
  const h = 32
  return (
    <svg width={slice.length * (barW + gap)} height={h} aria-hidden className="shrink-0 [image-rendering:pixelated]">
      {slice.map((v, i) => {
        const bh = Math.max(2, ((v - min) / r) * (h - 4))
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={h - bh}
            width={barW}
            height={bh}
            fill={up ? '#6ee7a8' : '#f87171'}
          />
        )
      })}
    </svg>
  )
}

export default function PixelArtLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const unread = useMemo(() => emails.filter(e => !e.read).length, [])
  const marqueeText = useMemo(() => news.map(n => `${n.emoji} ${n.title}`).join('   ★   '), [])

  const skyClass = reducedMotion ? '' : 'pixel-art-sky-pulse'
  const scanClass = reducedMotion ? 'pointer-events-none absolute inset-0 opacity-30' : 'pixel-art-scan-sweep pointer-events-none absolute inset-0 opacity-30'

  return (
    <div
      className={`pixel-crt-flicker relative min-h-dvh overflow-x-hidden pb-10 ${skyClass}`}
      style={{
        fontFamily: 'var(--font-main)',
        color: '#9bbc0f',
        background: 'linear-gradient(180deg, #153d15 0%, #0f380f 38%, #0a280a 100%)',
        imageRendering: 'pixelated',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {!reducedMotion && (
          <>
            <div className="pixel-art-cloud-slide absolute left-[5%] top-12 flex gap-2 opacity-50">
              <PixelCloud />
              <PixelCloud />
            </div>
            <div className="pixel-art-cloud-slide-delay absolute right-[-20px] top-24 flex gap-3 opacity-40">
              <PixelCloud />
              <PixelCloud />
              <PixelCloud />
            </div>
          </>
        )}
        {STAR_SPOTS.map((s, i) => (
          <span
            key={i}
            className={`absolute size-2 bg-[#c4f090] shadow-[0_0_6px_#9bbc0f] ${reducedMotion ? '' : 'pixel-art-star-twinkle'}`}
            style={{ top: s.t, left: s.l, animationDelay: reducedMotion ? undefined : s.d }}
          />
        ))}
        <div
          className="absolute bottom-0 left-0 right-0 h-14 opacity-90 sm:h-20"
          style={{
            background: `
              repeating-linear-gradient(90deg, #306230 0px, #306230 8px, #245024 8px, #245024 16px),
              linear-gradient(180deg, transparent 0%, #1a4d1a 40%)
            `,
            backgroundBlendMode: 'normal',
          }}
        />
      </div>

      <div className={scanClass} aria-hidden />

      <div
        className="pointer-events-none fixed bottom-20 right-3 z-[5] sm:bottom-24 sm:right-6"
        aria-hidden
      >
        <div className={reducedMotion ? '' : 'pixel-art-mascot-bob'}>
          <PixelSlime />
        </div>
        <p className="m-0 text-center text-sm font-bold text-[#8bac0f]">HELP!</p>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-2 pt-4 sm:px-4">
        {!reducedMotion ? (
          <div
            className="pixel-art-panel-pop mb-3 overflow-hidden border-y-4 border-[#306230] bg-[#0f380f]/95 py-2"
            style={{ animationDelay: '0.05s' }}
          >
            <div className="pixel-art-marquee-track font-mono text-sm text-[#8bac0f]">
              <span className="whitespace-nowrap">{marqueeText}</span>
              <span className="whitespace-nowrap" aria-hidden>
                {marqueeText}
              </span>
            </div>
          </div>
        ) : (
          <p className="mb-3 border-y-4 border-[#306230] bg-[#0f380f]/95 py-2 text-center text-sm text-[#8bac0f]">
            {news[0]?.emoji} {news[0]?.title}
          </p>
        )}

        <header
          className="pixel-art-panel-pop mb-4 flex flex-wrap items-center justify-between gap-3 border-4 border-[#306230] bg-[#8bac0f] p-3 text-[#0f380f] shadow-[6px_6px_0_#0f380f]"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="min-w-0">
            <p className="m-0 text-[10px] opacity-80" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}>
              PIXELFORGE OS
            </p>
            <h1 className="m-0 flex flex-wrap items-baseline gap-1 text-sm sm:text-base" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
              <span>INBOX.EXE</span>
              {!reducedMotion && <span className="pixel-art-blink-cursor text-[#306230]">▌</span>}
            </h1>
            <p className="m-0 mt-1 text-base leading-tight opacity-90">Same mail &amp; widgets — every pixel placed by hand.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div
              className={`rounded-none border-4 border-[#0f380f] bg-[#0f380f] px-3 py-1.5 text-center text-base tabular-nums text-[#9bbc0f] ${unread > 0 && !reducedMotion ? 'pixel-art-new-ping' : ''}`}
              title="Unread damage"
            >
              DMG {unread * 7}
            </div>
            <div className="rounded-none border-4 border-[#0f380f] bg-[#9bbc0f] px-3 py-1.5 text-center text-base tabular-nums font-bold text-[#0f380f]">
              GOLD {emails.length * 3}
            </div>
            <button
              type="button"
              className="btn btn-sm rounded-none border-4 border-[#0f380f] bg-[#ffd700] px-4 text-sm font-bold uppercase text-[#0f380f] shadow-[4px_4px_0_#0f380f] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0f380f]"
              onClick={onSwitchPersona}
            >
              Quit to title
            </button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-12">
          <main
            className="pixel-art-panel-pop lg:col-span-7"
            style={{ animationDelay: '0.15s' }}
          >
            <div className="border-4 border-[#306230] bg-[#0f380f] p-3 shadow-[6px_6px_0_#306230]">
              <div className="mb-3 flex items-center justify-between gap-2 border-b-4 border-[#306230] pb-2">
                <p className="m-0 text-base text-[#8bac0f]" style={{ fontFamily: 'var(--font-display)', fontSize: '11px' }}>
                  DUNGEON MAIL
                </p>
                <span className="badge badge-warning badge-sm rounded-none border-2 border-[#0f380f] font-mono text-xs">
                  {emails.length} LOOT
                </span>
              </div>
              <ul className="m-0 list-none space-y-2 p-0">
                {emails.map((e, i) => (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className="group flex w-full items-start gap-3 border-4 border-[#306230] bg-[#1a4d1a] p-3 text-left transition-transform duration-150 hover:z-[1] hover:-translate-y-0.5 hover:border-[#9bbc0f] hover:bg-[#245024] hover:shadow-[5px_5px_0_#0f380f] active:translate-y-0"
                      style={{
                        animation: reducedMotion ? undefined : `pixelArtPanelPop 0.4s ease-out ${0.2 + i * 0.04}s both`,
                      }}
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center border-4 border-[#9bbc0f] bg-[#0f380f] text-2xl transition-transform group-hover:scale-105">
                        {e.from.avatar}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="m-0 text-base text-[#8bac0f]">
                          STAGE {String(i + 1).padStart(2, '0')} · {e.from.name}
                        </p>
                        <p className={`m-0 text-lg leading-snug ${e.read ? 'text-[#9bbc0f]' : 'text-[#ffd700]'}`}>{e.subject}</p>
                        <p className="m-0 mt-1 line-clamp-2 text-base opacity-75">{e.preview}</p>
                      </div>
                      {!e.read && (
                        <span className="badge badge-warning badge-sm shrink-0 rounded-none border-2 border-[#0f380f] font-mono text-[10px] uppercase">
                          NEW
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </main>

          <aside className="space-y-4 lg:col-span-5">
            <div
              className="pixel-art-panel-pop border-4 border-[#306230] bg-[#0f380f] p-4 shadow-[6px_6px_0_#306230]"
              style={{ animationDelay: '0.2s' }}
            >
              <p className="m-0 text-[11px] text-[#8bac0f]" style={{ fontFamily: 'var(--font-display)' }}>
                LCD · WEATHER
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 border-4 border-[#306230] bg-[#1a2f1a] p-3">
                <div className={reducedMotion ? '' : 'pixel-art-coin-float'}>
                  <PixelSun />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="m-0 font-mono text-3xl font-bold leading-none text-[#9bbc0f]">
                    {weather.temp}°C
                  </p>
                  <p className="m-0 mt-1 text-xl text-[#8bac0f]">
                    {weather.icon} {weather.condition}
                  </p>
                  <p className="m-0 text-base opacity-80">
                    {weather.city}, {weather.country}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {weather.forecast.map(d => (
                  <div
                    key={d.day}
                    className="flex min-w-[3.5rem] flex-col items-center border-4 border-[#306230] bg-[#1a4d1a] px-2 py-2 text-center"
                  >
                    <span className="text-[10px] text-[#8bac0f]" style={{ fontFamily: 'var(--font-display)' }}>
                      {d.day}
                    </span>
                    <span className="text-xl">{d.icon}</span>
                    <span className="font-mono text-sm tabular-nums">
                      {d.high}°
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="pixel-art-panel-pop border-4 border-[#306230] bg-[#0f380f] p-4 shadow-[6px_6px_0_#306230]"
              style={{ animationDelay: '0.25s' }}
            >
              <p className="m-0 flex items-center gap-2 text-[11px] text-[#8bac0f]" style={{ fontFamily: 'var(--font-display)' }}>
                <span className={reducedMotion ? '' : 'pixel-art-coin-float'} aria-hidden>
                  💰
                </span>
                TREASURE · STOCKS
              </p>
              <div className="mt-2 space-y-3">
                {stocks.map(s => (
                  <div
                    key={s.ticker}
                    className="flex flex-wrap items-center justify-between gap-2 border-t-4 border-[#306230] pt-3 first:border-t-0 first:pt-0"
                  >
                    <div>
                      <p className="m-0 font-mono text-lg font-bold text-[#9bbc0f]">{s.ticker}</p>
                      <p className="m-0 text-base opacity-70">{s.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-lg tabular-nums ${s.changePct >= 0 ? 'text-[#6ee7a8]' : 'text-[#f87171]'}`}>
                        {s.changePct > 0 ? '+' : ''}
                        {s.changePct}%
                      </span>
                      <BlockySpark series={s.series} up={s.changePct >= 0} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="pixel-art-panel-pop border-4 border-[#306230] bg-[#0f380f] p-4 text-base leading-snug shadow-[6px_6px_0_#306230]"
              style={{ animationDelay: '0.3s' }}
            >
              <p className="m-0 text-[11px] text-[#8bac0f]" style={{ fontFamily: 'var(--font-display)' }}>
                QUEST LOG · NEWS
              </p>
              <ul className="m-0 mt-3 list-none space-y-3 p-0">
                {news.map((n, i) => (
                  <li
                    key={n.id}
                    className="border-l-4 border-[#ffd700] pl-3 transition-colors hover:bg-[#1a4d1a]/80"
                    style={{
                      animation: reducedMotion ? undefined : `pixelArtPanelPop 0.35s ease-out ${0.35 + i * 0.06}s both`,
                    }}
                  >
                    <span className="text-xl">{n.emoji}</span>{' '}
                    <span className="text-lg text-[#9bbc0f]">{n.title}</span>
                    <span className="mt-1 block text-base opacity-60">
                      {n.source} · {n.category} · {n.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="modal modal-open pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pixel-mail-title"
        >
          <button type="button" className="modal-backdrop bg-[#0f380f]/90" aria-label="Close message" onClick={() => setSelectedEmail(null)} />
          <div className="modal-box max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-none border-4 border-[#9bbc0f] bg-[#1a4d1a] text-[#9bbc0f] shadow-[8px_8px_0_#306230]">
            <p className="m-0 text-[11px] opacity-80" style={{ fontFamily: 'var(--font-display)' }}>
              MESSAGE BUFFER
            </p>
            <h2 id="pixel-mail-title" className="m-0 mt-2 text-base sm:text-lg" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="m-0 mt-2 text-base opacity-80">
              From: {selectedEmail.from.name} · {selectedEmail.time}
            </p>
            <pre className="mt-4 max-h-[50vh] overflow-y-auto whitespace-pre-wrap border-4 border-[#306230] bg-[#0f380f] p-3 font-mono text-base leading-relaxed">
              {selectedEmail.body}
            </pre>
            <div className="modal-action mt-4">
              <button
                type="button"
                className="btn rounded-none border-4 border-[#9bbc0f] bg-[#0f380f] text-lg text-[#9bbc0f] hover:bg-[#306230]"
                onClick={() => setSelectedEmail(null)}
              >
                Close (B)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
