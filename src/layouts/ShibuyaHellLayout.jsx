import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const adLines = [
  '今すぐCHECK!!',
  '激安SALE',
  '限定TIME',
  'NEW OPEN',
  '無料配送',
  'POINT 10倍',
  '会員様ONLY',
  '再入荷',
]

function sideMarquee(seed) {
  const rot = [...adLines]
  rot.push(...rot.splice(seed % rot.length))
  return [...rot, ...rot, ...rot].join(' · ')
}

const popupTitles = ['激安!', 'WIN!!', '今だけ', 'CLICK', '無料', 'SALE', 'NEW', '限定']

function randomPopupPayload() {
  const line = adLines[Math.floor(Math.random() * adLines.length)]
  const extra = news.length ? news[Math.floor(Math.random() * news.length)].title.slice(0, 36) : ''
  return Math.random() > 0.45 ? line : extra || line
}

export default function ShibuyaHellLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [popups, setPopups] = useState([])
  const popupIdRef = useRef(0)

  const dismissPopup = useCallback(id => {
    setPopups(p => p.filter(x => x.id !== id))
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    let alive = true
    const timeouts = []

    function spawn() {
      const id = ++popupIdRef.current
      const hue = Math.floor(Math.random() * 360)
      const left = 4 + Math.random() * 62
      const top = 12 + Math.random() * 58
      const w = 140 + Math.floor(Math.random() * 90)
      const blinkDur = `${(0.28 + Math.random() * 0.55).toFixed(2)}s`
      const next = {
        id,
        leftPct: left,
        topPct: top,
        width: w,
        title: popupTitles[Math.floor(Math.random() * popupTitles.length)],
        body: randomPopupPayload(),
        hue,
        blinkDur,
      }
      if (!alive) return
      setPopups(p => [...p, next].slice(-8))
      const life = 3200 + Math.random() * 5200
      const t = window.setTimeout(() => {
        if (alive) dismissPopup(id)
      }, life)
      timeouts.push(t)
    }

    spawn()
    const tick = window.setInterval(() => {
      if (Math.random() > 0.35) spawn()
    }, 900 + Math.random() * 1100)

    return () => {
      alive = false
      timeouts.forEach(clearTimeout)
      window.clearInterval(tick)
    }
  }, [dismissPopup])

  const floatAds = useMemo(
    () =>
      news.slice(0, 6).map((n, i) => ({
        id: i,
        text: n.title.slice(0, 28) + (n.title.length > 28 ? '…' : ''),
        x: `${8 + (i * 17) % 75}%`,
        y: `${10 + (i * 23) % 70}%`,
        hue: (i * 47) % 360,
      })),
    [],
  )

  return (
    <div
      className="relative flex min-h-full flex-col overflow-hidden"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        {floatAds.map(a => (
          <div
            key={a.id}
            className={`absolute text-[9px] md:text-[10px] font-black px-2 py-1 rounded border-2 max-w-[140px] leading-tight ${reducedMotion ? '' : 'shibuya-ad-tilt'}`}
            style={{
              left: a.x,
              top: a.y,
              borderColor: `hsl(${a.hue} 90% 55%)`,
              color: `hsl(${(a.hue + 40) % 360} 95% 92%)`,
              background: `hsl(${a.hue} 70% 20% / 0.85)`,
              animationDelay: `${a.id * 0.4}s`,
              writingMode: a.id % 2 === 0 ? 'horizontal-tb' : 'vertical-rl',
            }}
          >
            {a.text}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-1 min-h-0">
        <div
          className="hidden md:flex w-11 shrink-0 border-r-2 overflow-hidden relative"
          style={{ borderColor: 'var(--accent2)', background: 'var(--bg2)' }}
          aria-hidden
        >
          <div className="relative h-full min-h-[200px] w-full flex justify-center overflow-hidden">
            <div
              className={reducedMotion ? 'flex flex-col py-4' : 'flex flex-col shibuya-marquee-up'}
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.25em',
                color: 'var(--accent)',
              }}
            >
              <span className="whitespace-nowrap py-2">{sideMarquee(1)}</span>
              {!reducedMotion && <span className="whitespace-nowrap py-2">{sideMarquee(1)}</span>}
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 min-w-0 flex-col">
          <header
            className="relative z-50 shrink-0 px-3 py-2 flex flex-wrap items-center justify-between gap-2 border-b-4"
            style={{
              borderColor: 'var(--accent)',
              background: 'linear-gradient(90deg, var(--accent2) 0%, var(--bg2) 35%, var(--accent3) 100%)',
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className={`text-xl shrink-0 ${reducedMotion ? '' : 'shibuya-flash'}`} aria-hidden>
                📣
              </span>
              <div className="min-w-0">
                <p
                  className="text-[8px] md:text-[9px] font-black tracking-[0.15em] truncate"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}
                >
                  渋谷 INBOX 地獄 · SHIBUYA MAIL TOWER
                </p>
                <h1 className="text-sm md:text-base font-black truncate" style={{ fontFamily: 'var(--font-display)' }}>
                  あなたの受信箱
                </h1>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-xs md:btn-sm font-black uppercase border-2"
              style={{ borderColor: 'var(--text)', background: 'var(--accent)', color: 'var(--bg)' }}
              onClick={onSwitchPersona}
            >
              ESC
            </button>
          </header>

          <div className="flex flex-1 min-h-0 flex-col lg:flex-row overflow-hidden">
            <nav
              className="lg:w-[280px] shrink-0 max-h-[40vh] lg:max-h-none border-b lg:border-b-0 lg:border-r-2 overflow-y-auto"
              style={{ borderColor: 'var(--accent2)', background: 'color-mix(in srgb, var(--bg2) 92%, transparent)' }}
              aria-label="Messages"
            >
              <div className="sticky top-0 z-[1] px-2 py-1.5 text-[9px] font-black flex justify-between" style={{ background: 'var(--accent3)', color: 'var(--text)' }}>
                <span>MAIL一覧</span>
                <span style={{ color: 'var(--accent)' }}>{emails.filter(e => !e.read).length} NEW</span>
              </div>
              <ul className="p-1.5 space-y-1">
                {emails.map(e => {
                  const on = selectedEmail?.id === e.id
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        aria-current={on ? 'true' : undefined}
                        onClick={() => setSelectedEmail(e)}
                        className="w-full text-left p-2 rounded border-2 text-[11px] leading-tight transition-transform hover:scale-[1.02]"
                        style={{
                          borderColor: on ? 'var(--accent)' : 'var(--accent2)',
                          background: on ? 'color-mix(in srgb, var(--accent) 18%, var(--card))' : 'var(--card)',
                          fontFamily: 'var(--font-main)',
                        }}
                      >
                        <div className="flex gap-2">
                          <span className="text-lg shrink-0">{e.from.avatar}</span>
                          <div className="min-w-0">
                            <p className="font-black line-clamp-2">{e.subject}</p>
                            <p className="text-[9px] opacity-60 mt-0.5">{e.from.name}</p>
                          </div>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <main className="relative z-[2] flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-y-auto p-3 md:p-4">
              {selectedEmail ? (
                <article
                  className="flex shrink-0 flex-col overflow-hidden rounded-lg border-4 shadow-2xl"
                  style={{
                    borderColor: 'var(--accent)',
                    background: 'var(--card)',
                    boxShadow: '0 0 0 2px var(--accent2), 0 20px 40px rgba(0,0,0,0.45)',
                  }}
                >
                  <div className="px-3 py-2 flex flex-wrap gap-2 items-center border-b-2" style={{ borderColor: 'var(--accent2)', background: 'var(--accent3)' }}>
                    <span className="text-2xl">{selectedEmail.from.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base md:text-lg font-black leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                        {selectedEmail.subject}
                      </h2>
                      <p className="text-[10px] opacity-70">{selectedEmail.from.name}</p>
                    </div>
                    <span
                      className="text-[9px] font-black px-2 py-0.5 rounded animate-pulse"
                      style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                    >
                      注目!!
                    </span>
                  </div>
                  <div className="p-3 md:p-4 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedEmail.body}
                  </div>
                </article>
              ) : (
                <div className="flex min-h-[12rem] shrink-0 items-center justify-center text-center text-sm opacity-50 font-bold">
                  ▼ メッセージを選んでね
                </div>
              )}

              <div className="grid shrink-0 grid-cols-2 gap-1.5 text-[9px] sm:grid-cols-4">
                <div className="rounded border-2 p-2 font-black" style={{ borderColor: 'var(--accent2)' }}>
                  天気 {weather.icon} {weather.temp}°
                </div>
                {stocks.slice(0, 3).map(s => (
                  <div key={s.ticker} className="rounded border-2 p-2 font-mono font-bold" style={{ borderColor: 'var(--accent2)' }}>
                    {s.ticker} {s.changePct >= 0 ? '▲' : '▼'}
                    {Math.abs(s.changePct)}%
                  </div>
                ))}
              </div>
            </main>

            <div
              className="hidden lg:flex w-11 shrink-0 border-l-2 overflow-hidden"
              style={{ borderColor: 'var(--accent2)', background: 'var(--bg2)' }}
              aria-hidden
            >
              <div className="relative h-full min-h-[200px] w-full flex justify-center overflow-hidden">
                <div
                  className={reducedMotion ? 'flex flex-col py-4' : 'flex flex-col shibuya-marquee-up'}
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.25em',
                    color: 'var(--accent2)',
                  }}
                >
                  <span className="whitespace-nowrap py-2">{sideMarquee(3)}</span>
                  {!reducedMotion && <span className="whitespace-nowrap py-2">{sideMarquee(3)}</span>}
                </div>
              </div>
            </div>
          </div>

          <footer
            className="relative z-50 shrink-0 border-t-2 overflow-hidden py-1"
            style={{ borderColor: 'var(--accent)', background: 'var(--accent3)' }}
          >
            <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
              {reducedMotion ? (
                <p className="text-[10px] font-black text-center truncate px-2" style={{ color: 'var(--accent)' }}>
                  {news.map(n => n.title).join(' · ')}
                </p>
              ) : (
                <div className="flex shibuya-marquee-left whitespace-nowrap w-max">
                  <span className="pr-12 shrink-0 text-[10px] font-black inline-flex gap-8" style={{ color: 'var(--accent)' }}>
                    {[...news, ...news, ...news].map((n, i) => (
                      <span key={i}>{n.title}</span>
                    ))}
                  </span>
                  <span className="pr-12 shrink-0 text-[10px] font-black inline-flex gap-8" style={{ color: 'var(--accent)' }} aria-hidden>
                    {[...news, ...news, ...news].map((n, i) => (
                      <span key={`d-${i}`}>{n.title}</span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </footer>
        </div>
      </div>

      <div
        className="fixed inset-0 z-[35] pointer-events-none"
        aria-label="Decorative fake ad windows"
        role="region"
      >
        {popups.map(p => (
          <div
            key={p.id}
            className="pointer-events-auto absolute rounded-md border-[3px] shadow-[4px_4px_0_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
            style={{
              left: `${p.leftPct}%`,
              top: `${p.topPct}%`,
              width: p.width,
              maxWidth: 'min(92vw, 240px)',
              borderColor: `hsl(${p.hue} 95% 45%)`,
              background: `linear-gradient(180deg, hsl(${p.hue} 50% 22%) 0%, hsl(${(p.hue + 40) % 360} 45% 12%) 100%)`,
              boxShadow: `4px 4px 0 rgba(0,0,0,0.45), 0 0 20px hsl(${p.hue} 90% 40% / 0.35)`,
            }}
          >
            <div
              className="flex items-center justify-between gap-1 px-1.5 py-0.5 border-b-2 shrink-0"
              style={{
                borderColor: `hsl(${p.hue} 90% 50%)`,
                background: `hsl(${p.hue} 70% 35%)`,
              }}
            >
              <span
                className={`text-[9px] font-black tracking-wide truncate ${reducedMotion ? '' : 'shibuya-popup-blink'}`}
                style={{
                  color: '#fff',
                  '--shibuya-blink-dur': p.blinkDur,
                }}
              >
                {p.title}
              </span>
              <button
                type="button"
                className="btn btn-xs btn-square btn-ghost min-h-6 h-6 w-6 p-0 text-[11px] font-black text-white hover:bg-black/20"
                onClick={() => dismissPopup(p.id)}
                aria-label="Close ad"
              >
                ×
              </button>
            </div>
            <div
              className={`px-2 py-2 text-[10px] md:text-[11px] font-black leading-tight ${reducedMotion ? '' : 'shibuya-popup-blink'}`}
              style={{
                color: `hsl(${(p.hue + 55) % 360} 100% 92%)`,
                '--shibuya-blink-dur': p.blinkDur,
                animationDelay: reducedMotion ? undefined : `${(p.id % 5) * 0.08}s`,
              }}
            >
              {p.body}
              {!reducedMotion && (
                <span className="block mt-1.5 text-[8px] opacity-90 shibuya-popup-blink" style={{ '--shibuya-blink-dur': '0.38s', color: 'var(--accent)' }}>
                  今すぐタップ!! · TAP NOW
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
