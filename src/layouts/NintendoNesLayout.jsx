import { useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const portLabel = t =>
  ({
    work: 'CH ① WORK',
    personal: 'CH ② HOME',
    finance: 'CH ③ COIN',
    promo: 'CH ④ ADS',
    newsletter: 'CH ⑤ ZINE',
    social: 'CH ⑥ PARTY',
    dev: 'CH ⑦ CODE',
    shopping: 'CH ⑧ MART',
    travel: 'CH ⑨ TRIP',
    promo: 'CH ⑩ DEAL',
  }[t] || 'CH ? MYST')

function NesSpark({ series, up }) {
  if (!series?.length) return null
  const last = 10
  const slice = series.slice(-last)
  const min = Math.min(...slice)
  const max = Math.max(...slice)
  const r = max - min || 1
  const barW = 4
  const gap = 1
  const h = 24
  return (
    <svg width={slice.length * (barW + gap)} height={h} aria-hidden className="shrink-0 [image-rendering:pixelated] opacity-90">
      {slice.map((v, i) => {
        const bh = Math.max(2, ((v - min) / r) * (h - 3))
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={h - bh}
            width={barW}
            height={bh}
            fill={up ? 'var(--phosphor)' : '#ff6b6b'}
          />
        )
      })}
    </svg>
  )
}

export default function NintendoNesLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [cartOk, setCartOk] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setCartOk(true)
      return
    }
    const t = requestAnimationFrame(() => setCartOk(true))
    return () => cancelAnimationFrame(t)
  }, [reducedMotion])

  const unread = useMemo(() => emails.filter(e => !e.read).length, [])
  const ticker = useMemo(
    () => [...stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'}${Math.abs(s.changePct)}%`), ...news.map(n => n.title)].join('  ★  '),
    [],
  )

  return (
    <div
      className="nes-console-page relative min-h-dvh overflow-x-hidden pb-6"
      style={{
        background: 'linear-gradient(180deg, #6b6b6b 0%, #4a4a4a 18%, #3d3d3d 55%, #454545 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="nes-vent-strip pointer-events-none absolute left-0 right-0 top-0 z-[1] h-3 opacity-40" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-3 pt-4 md:px-6">
        <header className="mb-3 flex flex-wrap items-end justify-between gap-3 border-b-4 border-[#1a1a1a] pb-3">
          <div>
            <p
              className="mb-1 text-[8px] leading-tight tracking-[0.35em] text-[#d4d4d4] md:text-[9px]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              NINTENDO
            </p>
            <h1 className="m-0 text-lg font-normal tracking-tight text-[#f5f5f5] drop-shadow-[2px_2px_0_#1a1a1a] md:text-xl" style={{ fontFamily: 'var(--font-display)' }}>
              WEB SYSTEM
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded border-2 border-[#1f1f1f] bg-[#2a2a2a] px-2 py-1 shadow-[inset_0_2px_0_rgba(255,255,255,0.06)]">
              <span
                className={`size-2.5 shrink-0 rounded-full border border-[#333] ${reducedMotion ? 'bg-[#ff4444]' : 'nes-power-led'}`}
                aria-hidden
              />
              <span className="text-xs text-[#b8b8b8]">POWER</span>
            </div>
            <button
              type="button"
              className="btn btn-xs border-2 border-[#1a1a1a] bg-[#e60012] text-[10px] font-bold uppercase tracking-wider text-white shadow-[2px_2px_0_#1a1a1a] hover:brightness-110"
              style={{ fontFamily: 'var(--font-display)' }}
              onClick={onSwitchPersona}
            >
              RESET
            </button>
          </div>
        </header>

        {/* Cartridge slot */}
        <div
          className="relative mb-4 overflow-hidden rounded-sm border-4 border-[#1a1a1a] bg-[#1e1e1e] shadow-[inset_0_4px_12px_rgba(0,0,0,0.65)]"
          aria-hidden
        >
          <div className="flex h-8 items-stretch gap-0 border-b-2 border-[#333] bg-[#0d0d0d]">
            {['#c40000', '#ffd700', '#00b4d8', '#7dffb3', '#ff6b9d'].map((c, i) => (
              <div key={i} className="h-full flex-1" style={{ background: c, opacity: 0.85 }} />
            ))}
          </div>
          <div className="relative px-2 py-2">
            <div
              className={`nes-cart-label mx-auto flex max-w-md flex-col gap-1 border-2 border-[#c9a227] bg-gradient-to-b from-[#2a2418] to-[#1a1510] px-3 py-2 shadow-[0_4px_0_#0a0a0a] ${cartOk ? 'nes-cart-inserted' : 'nes-cart-pending'}`}
            >
              <span className="text-center text-[9px] tracking-widest text-[#ffd700]" style={{ fontFamily: 'var(--font-display)' }}>
                OFFICIAL WEB KIT
              </span>
              <span className="text-center text-sm tracking-wide text-[#f5e6c8]">INBOX QUEST + WX + NEWS + GOLD</span>
              <div className="mt-1 flex justify-center gap-1">
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="h-1.5 w-2 rounded-[1px] bg-gradient-to-b from-[#d4af37] to-[#8a7020]" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CRT */}
        <div className="nes-crt-chassis rounded-lg border-4 border-[#1a1a1a] bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f] p-3 shadow-[0_12px_0_#333,0_16px_24px_rgba(0,0,0,0.45)] md:p-4">
          <div className="relative rounded-md border-[6px] border-[#0a0a0a] bg-black p-1 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]">
            <div
              className="nes-crt-inner relative overflow-hidden rounded-sm"
              style={{
                background: 'var(--crt-bg)',
                boxShadow: 'inset 0 0 80px rgba(0, 40, 30, 0.35)',
              }}
            >
              {!reducedMotion && (
                <>
                  <div className="nes-crt-flicker pointer-events-none absolute inset-0 z-[4]" aria-hidden />
                  <div className="nes-rf-snow pointer-events-none absolute inset-0 z-[3] mix-blend-screen opacity-[0.04]" aria-hidden />
                </>
              )}
              <div
                className={`pointer-events-none absolute inset-0 z-[2] opacity-[0.12] ${reducedMotion ? '' : 'nes-scanlines'}`}
                aria-hidden
              />
              <div className="nes-pixel-clouds pointer-events-none absolute inset-0 z-[1] opacity-30" aria-hidden />

              <div className="relative z-10 flex min-h-[min(70dvh,520px)] flex-col md:min-h-[min(72dvh,560px)]">
                <div
                  className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1a3d2e] bg-[#0f1418] px-2 py-2 md:px-3"
                  style={{ color: 'var(--phosphor)' }}
                >
                  <span className="text-[10px] md:text-xs" style={{ fontFamily: 'var(--font-display)' }}>
                    NES-NET v0.β
                  </span>
                  <span className="text-xs opacity-80">
                    UNREAD {unread}/{emails.length}
                  </span>
                  {!reducedMotion && (
                    <span className="nes-blink-tag hidden text-[9px] sm:inline" style={{ fontFamily: 'var(--font-display)' }}>
                      ©1989 FANTASY
                    </span>
                  )}
                </div>

                <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 p-2 lg:grid-cols-12 lg:gap-3 lg:p-3">
                  <nav className="flex min-h-0 flex-col lg:col-span-4" aria-label="Messages">
                    <p className="mb-2 text-[10px] tracking-widest opacity-70" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                      ▼ SELECT FILE
                    </p>
                    <ul className="nes-mail-scroll min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
                      {emails.map(e => {
                        const on = selectedEmail?.id === e.id
                        return (
                          <li key={e.id}>
                            <button
                              type="button"
                              onClick={() => setSelectedEmail(e)}
                              aria-current={on ? 'true' : undefined}
                              className={`nes-mail-row flex w-full gap-2 border-2 p-2 text-left transition-transform active:scale-[0.99] ${
                                on ? 'nes-mail-row-on' : 'border-[#2a4a3a] bg-[#0a1210] hover:border-[#3d6b55]'
                              }`}
                              style={{
                                borderColor: on ? 'var(--phosphor)' : undefined,
                                boxShadow: on ? '0 0 0 1px var(--phosphor), 4px 4px 0 #050808' : '2px 2px 0 #050808',
                                color: on ? 'var(--phosphor)' : '#b8e0c8',
                              }}
                            >
                              <span className="flex size-9 shrink-0 items-center justify-center border-2 border-[#2a4a3a] bg-[#050808] text-lg [image-rendering:pixelated]">
                                {e.from.avatar}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="flex flex-wrap items-center gap-1">
                                  {!e.read && (
                                    <span
                                      className={`rounded px-1 py-0.5 text-[8px] font-bold ${reducedMotion ? '' : 'nes-new-pulse'}`}
                                      style={{
                                        fontFamily: 'var(--font-display)',
                                        background: 'var(--accent)',
                                        color: '#fff',
                                      }}
                                    >
                                      NEW
                                    </span>
                                  )}
                                  <span className="line-clamp-2 text-sm font-bold leading-tight">{e.subject}</span>
                                </span>
                                <span className="mt-0.5 block text-xs opacity-60">{e.from.name}</span>
                                <span className="mt-0.5 block text-[10px] opacity-40">{portLabel(e.tag)}</span>
                              </span>
                              {on && <span className="nes-cursor-bob shrink-0 text-lg leading-none text-[var(--accent2)]">▶</span>}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>

                  <main className="flex min-h-[200px] min-w-0 flex-col border-2 border-[#1a3d2e] bg-[#060908] p-2 lg:col-span-5" style={{ color: '#d8f5e8' }}>
                    {selectedEmail ? (
                      <>
                        <div className="mb-2 border-b-2 border-dashed border-[#2a4a3a] pb-2">
                          <p className="text-[10px] opacity-50" style={{ fontFamily: 'var(--font-display)' }}>
                            FROM: {selectedEmail.from.name}
                          </p>
                          <h2 className="mt-1 text-base leading-snug md:text-lg" style={{ color: 'var(--accent3)', fontFamily: 'var(--font-display)' }}>
                            {selectedEmail.subject}
                          </h2>
                          <p className="mt-1 text-xs opacity-50">
                            {selectedEmail.date} · {portLabel(selectedEmail.tag)}
                          </p>
                        </div>
                        <div className="nes-body-scroll flex-1 overflow-y-auto text-base leading-relaxed whitespace-pre-wrap [text-shadow:0_0_1px_rgba(125,255,179,0.2)]">
                          {selectedEmail.body}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 border-t-2 border-[#1a3d2e] pt-2">
                          <button
                            type="button"
                            className="btn btn-xs border-2 border-[#2a4a3a] bg-transparent text-[var(--phosphor)] hover:bg-[#0f1814]"
                            style={{ fontFamily: 'var(--font-display)' }}
                            onClick={() => setSelectedEmail(null)}
                          >
                            B BACK
                          </button>
                          <span className="text-xs opacity-45" style={{ fontFamily: 'var(--font-display)' }}>
                            A READ
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                        <div className="nes-attract-title text-4xl md:text-5xl" aria-hidden>
                          ✦
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed opacity-70" style={{ fontFamily: 'var(--font-display)', fontSize: '11px', lineHeight: 1.9 }}>
                          INSERT YOUR ATTENTION. PICK A FILE WITH ▲▼ THEN PRESS A.
                        </p>
                        {!reducedMotion && (
                          <p className="nes-press-start text-xs tracking-[0.4em] text-[var(--accent2)]" style={{ fontFamily: 'var(--font-display)' }}>
                            PRESS START
                          </p>
                        )}
                      </div>
                    )}
                  </main>

                  <aside className="flex flex-col gap-2 lg:col-span-3">
                    <div className="border-2 border-[#2a4a3a] bg-[#080c0a] p-2" style={{ color: 'var(--phosphor)' }}>
                      <p className="mb-1 text-[9px] tracking-widest opacity-60" style={{ fontFamily: 'var(--font-display)' }}>
                        SKY CHANNEL
                      </p>
                      <div className={`flex items-center gap-2 ${reducedMotion ? '' : 'nes-weather-wobble'}`}>
                        <span className="text-3xl [image-rendering:pixelated]">{weather.icon}</span>
                        <div>
                          <p className="m-0 text-lg font-bold">{weather.temp}°</p>
                          <p className="m-0 text-xs opacity-70">{weather.condition}</p>
                          <p className="m-0 text-[10px] opacity-45">WIND {weather.wind} KPH</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-2 border-[#2a4a3a] bg-[#080c0a] p-2">
                      <p className="mb-2 text-[9px] tracking-widest opacity-60" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                        GOLD BAR
                      </p>
                      <ul className="space-y-2">
                        {stocks.map(s => (
                          <li key={s.ticker} className="flex items-center justify-between gap-2 border-b border-dashed border-[#1a3d2e] pb-2 last:border-0 last:pb-0">
                            <div className="min-w-0">
                              <span className="font-mono text-sm" style={{ color: 'var(--phosphor)' }}>
                                {s.ticker}
                              </span>
                              <span
                                className={`ml-2 font-mono text-sm ${s.changePct >= 0 ? 'text-[#7dffb3]' : 'text-[#ff8a8a]'}`}
                              >
                                {s.changePct >= 0 ? '+' : ''}
                                {s.changePct}%
                              </span>
                            </div>
                            <NesSpark series={s.series} up={s.changePct >= 0} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1 overflow-hidden border-2 border-[#2a4a3a] bg-[#050808] p-2">
                      <p className="mb-1 text-[9px] tracking-widest opacity-50" style={{ fontFamily: 'var(--font-display)' }}>
                        NEWS TAPE
                      </p>
                      <ul className="max-h-40 space-y-2 overflow-y-auto text-xs leading-snug opacity-85 md:max-h-none">
                        {news.slice(0, 6).map(n => (
                          <li key={n.id} className="border-l-2 pl-2" style={{ borderColor: 'var(--accent3)' }}>
                            <span className="mr-1">{n.emoji}</span>
                            {n.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                </div>

                <footer
                  className="border-t-2 border-[#1a3d2e] bg-[#070a09] py-1.5"
                  style={{ color: 'var(--phosphor)' }}
                  aria-label="Stocks and news ticker"
                >
                  {reducedMotion ? (
                    <p className="m-0 truncate px-2 text-center text-[10px] opacity-70">{ticker}</p>
                  ) : (
                    <div className="nes-ticker-track flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
                      <div className="nes-ticker-marquee flex shrink-0 whitespace-nowrap text-[10px]">
                        <span className="pr-16">{ticker}</span>
                        <span className="pr-16" aria-hidden>
                          {ticker}
                        </span>
                      </div>
                    </div>
                  )}
                </footer>
              </div>
            </div>
          </div>
        </div>

        {/* Controller */}
        <div className="mx-auto mt-6 max-w-lg">
          <div
            className="relative rounded-2xl border-4 border-[#1a1a1a] bg-gradient-to-b from-[#d4d4d4] to-[#9a9a9a] p-4 shadow-[0_6px_0_#333,0_10px_20px_rgba(0,0,0,0.35)]"
            aria-hidden
          >
            <div className="flex items-start justify-between gap-4">
              <div className="relative">
                <div className="grid grid-cols-3 gap-1 opacity-40">
                  <span />
                  <span className="h-6 w-6 rounded border border-[#555] bg-[#666]" />
                  <span />
                  <span className="h-6 w-6 rounded border border-[#555] bg-[#666]" />
                  <span className="h-6 w-6 rounded border border-[#555] bg-[#777]" />
                  <span className="h-6 w-6 rounded border border-[#555] bg-[#666]" />
                  <span />
                  <span className="h-6 w-6 rounded border border-[#555] bg-[#666]" />
                  <span />
                </div>
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-[#444]">+</span>
              </div>
              <div className="flex flex-col items-end gap-3 pt-1">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <span className="h-10 w-10 rounded-full border-4 border-[#8b0000] bg-[#e60012] shadow-[inset_0_-4px_0_rgba(0,0,0,0.25)]" />
                    <span className="text-[9px] font-bold text-[#333]">B</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className={`h-10 w-10 rounded-full border-4 border-[#5c4033] bg-[#c40000] shadow-[inset_0_-4px_0_rgba(0,0,0,0.25)] ${reducedMotion ? '' : 'nes-btn-a-pulse'}`} />
                    <span className="text-[9px] font-bold text-[#333]">A</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="rounded border-2 border-[#555] bg-[#888] px-3 py-1 text-[9px] font-bold text-[#222]">SELECT</div>
                  <div className="rounded border-2 border-[#555] bg-[#888] px-3 py-1 text-[9px] font-bold text-[#222]">START</div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-[10px] text-[#444]">Nintendo-style fantasy controller · not affiliated</p>
          </div>
        </div>
      </div>
    </div>
  )
}
