import { useContext, useMemo } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function tagLabel(t) {
  const map = {
    work: 'Royal dispatch',
    personal: 'Private missive',
    finance: 'Treasury scroll',
    promo: 'Herald’s proclamation',
    newsletter: 'Chronicle',
    social: 'Parish gossip',
    dev: 'Artificer’s notes',
    shopping: 'Merchant’s catalogue',
    travel: 'Wayfarer’s tidings',
  }
  return map[t] ?? String(t).replace(/_/g, ' ')
}

function DropCap({ char }) {
  if (!char) return null
  return (
    <span
      className="medieval-dropcap float-left mr-3 mt-1 select-none text-5xl font-bold leading-[0.85]"
      style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}
      aria-hidden
    >
      {char}
    </span>
  )
}

function IlluminatedCorner({ className = '' }) {
  return (
    <svg className={`pointer-events-none text-[var(--accent)] opacity-80 ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path
        d="M4 4h20v6H10v14H4V4zm36 0h20v20h-6V10H40V4zM4 40h6v14h14v6H4V40zm50 0v20H40v-6h14V40h6z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M8 8l6 6M8 14l6-6M50 8l6 6M50 14l6-6M8 50l6-6M8 44l6 6M50 50l6-6M50 44l6 6"
        stroke="var(--accent2)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="5" stroke="currentColor" strokeWidth="1.5" fill="var(--card)" />
    </svg>
  )
}

function CastleSilhouette({ className = '' }) {
  return (
    <svg className={`pointer-events-none text-[var(--text)] ${className}`} viewBox="0 0 400 120" fill="currentColor" aria-hidden>
      <path
        opacity="0.12"
        d="M0 120V85l18-8v-12l14-6 12 8 12-8 14 6v12l18 8v35H0zm52 0V72l10-5v-8l8-4 6 4v8l10 5v48H52zm48 0V95l12-6V68l10-5 8 5v21l12 6v25h-42zm56 0V78l16-8V52l12-6 10 6v18l16 8v42h-54zm62 0V88l14-7V58l12-5 10 5v23l14 7v32h-50zm58 0V70l20-10V40l14-7 12 7v20l20 10v50h-66z"
      />
    </svg>
  )
}

function CandleFlame({ className = '' }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`} aria-hidden>
      <div className="medieval-flame h-10 w-6 rounded-[50%_50%_40%_40%] bg-gradient-to-t from-amber-600 via-yellow-300 to-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.7)]" />
      <div className="-mt-1 h-14 w-3 rounded-b-sm bg-gradient-to-b from-amber-200 to-amber-900/90 shadow-inner" />
    </div>
  )
}

function QuillPen({ className = '' }) {
  return (
    <svg className={`medieval-quill text-[var(--text2)] ${className}`} viewBox="0 0 48 120" fill="none" aria-hidden>
      <path d="M24 4c-4 8-8 28-6 44l4 52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 100l-8 16 10-6 10 6-8-16" fill="var(--accent2)" stroke="currentColor" strokeWidth="1" />
      <path d="M18 48c6-4 12-4 18 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

function HeraldicSparkline({ series, positive }) {
  const d = useMemo(() => {
    if (!series?.length) return ''
    const w = 100
    const h = 28
    const min = Math.min(...series)
    const max = Math.max(...series)
    const span = max - min || 1
    return series
      .map((v, i) => {
        const x = (i / (series.length - 1 || 1)) * w
        const y = h - ((v - min) / span) * (h - 4) - 2
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(' ')
  }, [series])

  return (
    <svg className="h-7 w-[6.25rem] shrink-0 overflow-visible" viewBox="0 0 100 28" aria-hidden>
      <path
        d={d}
        fill="none"
        stroke={positive ? 'var(--accent3)' : 'var(--accent)'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="medieval-spark-dash"
        pathLength="1"
      />
    </svg>
  )
}

function WaxSeal({ unread }) {
  if (!unread) return null
  return (
    <span
      className="medieval-seal badge badge-sm shrink-0 border-0 font-serif italic shadow-md"
      style={{ background: 'var(--accent)', color: '#f4e4b0' }}
    >
      unread by decree
    </span>
  )
}

export default function MedievalLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const unread = emails.filter(e => !e.read).length
  const bodyForCap = selectedEmail ? (selectedEmail.body.replace(/^\s+/, '') || selectedEmail.body) : ''
  const capChar = bodyForCap[0] ?? '¶'

  return (
    <div
      className="medieval-scrip relative min-h-full overflow-x-hidden px-3 py-6 sm:px-5 md:py-10"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background:
          'linear-gradient(165deg, #c9a22722 0%, transparent 40%), radial-gradient(ellipse 120% 80% at 50% -20%, #8b1a1a18, transparent), var(--bg)',
      }}
    >
      <style>{`
        @keyframes medievalFlicker {
          0%, 100% { opacity: 1; filter: brightness(1); transform: scaleY(1); }
          25% { opacity: 0.92; filter: brightness(1.08); transform: scaleY(1.03); }
          50% { opacity: 0.98; filter: brightness(0.95); transform: scaleY(0.97); }
          75% { opacity: 0.9; filter: brightness(1.12); transform: scaleY(1.02); }
        }
        @keyframes medievalMote {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: 0.45; }
          100% { transform: translateY(-100vh) translateX(24px); opacity: 0; }
        }
        @keyframes medievalPennant {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes medievalUnfurl {
          from { opacity: 0; transform: perspective(800px) rotateX(6deg) translateY(12px); }
          to { opacity: 1; transform: perspective(800px) rotateX(0) translateY(0); }
        }
        @keyframes medievalShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes medievalQuill {
          0%, 100% { transform: rotate(-4deg) translateY(0); }
          50% { transform: rotate(4deg) translateY(-4px); }
        }
        @keyframes medievalSpark {
          to { stroke-dashoffset: 0; }
        }
        .medieval-flame { animation: medievalFlicker 2.8s ease-in-out infinite; transform-origin: center bottom; }
        .medieval-mote { animation: medievalMote linear infinite; border-radius: 9999px; background: rgba(212, 175, 55, 0.35); }
        .medieval-pennant { animation: medievalPennant 3.5s ease-in-out infinite; transform-origin: top center; }
        .medieval-scroll-open { animation: medievalUnfurl 0.55s ease-out both; }
        .medieval-title-glow {
          background: linear-gradient(90deg, transparent, rgba(200, 121, 65, 0.25), transparent);
          background-size: 200% 100%;
          animation: medievalShimmer 8s linear infinite;
        }
        .medieval-quill { animation: medievalQuill 3s ease-in-out infinite; transform-origin: 24px 100px; }
        .medieval-spark-dash {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: medievalSpark 1.2s ease-out forwards;
        }
        .medieval-seal { animation: medievalPennant 4s ease-in-out infinite; }
        .medieval-dropcap {
          text-shadow: 2px 2px 0 rgba(139, 26, 26, 0.15);
        }
      `}</style>

      {/* Parchment grain + tapestry */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(44,16,8,0.04) 2px, rgba(44,16,8,0.04) 3px)`,
        }}
        aria-hidden
      />

      {/* Floating motes (candle dust) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="medieval-mote absolute"
            style={{
              left: `${6 + (i * 7) % 88}%`,
              bottom: '-4%',
              width: 2 + (i % 4),
              height: 2 + (i % 4),
              animationDuration: `${14 + (i % 5) * 3}s`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      <CastleSilhouette className="fixed bottom-0 left-1/2 w-[min(1200px,200%)] -translate-x-1/2" />

      <div className="relative z-[1] mx-auto max-w-6xl">
        {/* Top bar: candle + pennants + title */}
        <header className="relative mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <CandleFlame className="hidden shrink-0 sm:flex" />
            <div className="text-center sm:text-left">
              <p className="mb-1 font-serif text-[10px] uppercase tracking-[0.35em] opacity-60">Anno Domini · the digital age</p>
              <div className="medieval-title-glow relative rounded-lg px-2 py-1">
                <h1
                  className="medieval-pennant text-3xl leading-tight sm:text-4xl md:text-5xl"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
                >
                  Ye Royal Scriptorium
                </h1>
              </div>
              <p className="mt-2 max-w-md text-sm italic opacity-75">
                Missives, omens, market whispers &amp; tidings — illuminated for thy pleasure, good liege.
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <WaxSeal unread={unread > 0} />
                <button type="button" className="btn btn-ghost btn-xs gap-1 font-serif normal-case opacity-70 hover:opacity-100" onClick={onSwitchPersona}>
                  <span aria-hidden>⚜</span> Flee to another realm
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-end gap-2 sm:flex-col sm:items-end">
            <QuillPen className="h-24 w-8 opacity-40" />
            <div className="medieval-pennant flex gap-1 text-lg opacity-80" aria-hidden>
              <span>🏴</span>
              <span>🎪</span>
              <span>🏰</span>
            </div>
          </div>
        </header>

        <div className="relative">
          <IlluminatedCorner className="absolute -left-2 -top-2 z-10 size-14 sm:size-16" />
          <IlluminatedCorner className="absolute -right-2 -top-2 z-10 size-14 scale-x-[-1] sm:size-16" />
          <IlluminatedCorner className="absolute -bottom-2 -left-2 z-10 size-14 scale-y-[-1] sm:size-16" />
          <IlluminatedCorner className="absolute -bottom-2 -right-2 z-10 size-14 scale-[-1] sm:size-16" />

          <div
            className="card relative border-2 shadow-2xl"
            style={{
              borderColor: 'var(--accent)',
              background: 'linear-gradient(180deg, var(--card) 0%, var(--bg2) 100%)',
              boxShadow: '0 12px 40px rgba(44, 16, 8, 0.12), inset 0 1px 0 rgba(255,255,255,0.35)',
            }}
          >
            <div className="card-body gap-8 p-4 sm:p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
                {/* Manuscript column */}
                <section aria-label="Inbox scrolls">
                  {selectedEmail ? (
                    <article
                      className="medieval-scroll-open card card-border border-2 shadow-md"
                      style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}
                    >
                      <div className="card-body p-4 sm:p-6">
                        <div className="mb-4 border-b-2 pb-4 text-center" style={{ borderColor: 'var(--border)' }}>
                          <span className="badge badge-outline badge-sm mb-2 font-serif normal-case" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                            {tagLabel(selectedEmail.tag)}
                          </span>
                          <h2 className="text-xl font-bold sm:text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                            {selectedEmail.subject}
                          </h2>
                          <p className="mt-2 text-sm italic opacity-70">
                            From {selectedEmail.from.name} · {selectedEmail.date}
                          </p>
                        </div>
                        <div className="prose prose-sm max-w-none leading-relaxed">
                          <p className="text-sm sm:text-base">
                            <DropCap char={capChar} />
                            {bodyForCap.slice(1)}
                          </p>
                        </div>
                        <div className="card-actions mt-6 justify-end">
                          <button
                            type="button"
                            className="btn btn-outline btn-sm font-serif normal-case"
                            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                            onClick={() => setSelectedEmail(null)}
                          >
                            Roll up scroll
                          </button>
                        </div>
                      </div>
                    </article>
                  ) : (
                    <ul className="space-y-3" role="list">
                      {emails.map(e => (
                        <li key={e.id}>
                          <button
                            type="button"
                            onClick={() => setSelectedEmail(e)}
                            className="card card-border group w-full cursor-pointer border-2 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                            style={{
                              borderColor: 'var(--border)',
                              borderLeftWidth: '6px',
                              borderLeftColor: e.read ? 'var(--border)' : 'var(--accent)',
                              background: 'var(--card)',
                            }}
                          >
                            <div className="card-body gap-1 p-4">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="badge badge-ghost badge-sm font-serif normal-case opacity-80">{tagLabel(e.tag)}</span>
                                <time className="text-xs opacity-50">{e.date}</time>
                              </div>
                              <h3
                                className={`card-title text-base ${e.read ? 'opacity-70' : ''}`}
                                style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
                              >
                                {!e.read && <span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-[var(--accent)] align-middle" aria-hidden />}
                                {e.subject}
                              </h3>
                              <p className="text-sm italic opacity-60">
                                {e.from.name} writ: {e.preview.slice(0, 96)}
                                {e.preview.length > 96 ? '…' : ''}
                              </p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                {/* Marginalia sidebar */}
                <aside className="flex flex-col gap-4" aria-label="Weather, market, and tidings">
                  {/* Weather */}
                  <div
                    className="card card-border border-2 shadow-md"
                    style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
                  >
                    <div className="card-body gap-3 p-4">
                      <h3 className="text-center font-serif text-xs uppercase tracking-widest opacity-60">Celestial omens</h3>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-5xl transition-transform duration-500 hover:scale-110" role="img" aria-label={weather.condition}>
                          {weather.icon}
                        </span>
                        <div>
                          <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                            {weather.condition}
                          </p>
                          <p className="text-sm opacity-70">
                            {weather.temp}° — feeleth like {weather.feels_like}°
                          </p>
                          <p className="text-xs italic opacity-55">
                            {weather.city}: humidity {weather.humidity}% · winds {weather.wind} knots
                          </p>
                        </div>
                      </div>
                      <p className="border-t pt-2 text-center text-xs italic opacity-60" style={{ borderColor: 'var(--border)' }}>
                        “The firmament doth {weather.condition.toLowerCase()}; carry thy cloak, lest thee catch the ague.”
                      </p>
                    </div>
                  </div>

                  {/* Stocks */}
                  <div
                    className="card card-border border-2 shadow-md"
                    style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
                  >
                    <div className="card-body gap-2 p-4">
                      <h3 className="text-center font-serif text-xs uppercase tracking-widest opacity-60">Guild price rolls</h3>
                      <ul className="space-y-2" role="list">
                        {stocks.map(s => {
                          const up = s.changePct >= 0
                          return (
                            <li
                              key={s.ticker}
                              className="flex items-center justify-between gap-2 border-b pb-2 last:border-0"
                              style={{ borderColor: 'var(--border)' }}
                            >
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                                  {s.name.split(' ')[0]} guild
                                </p>
                                <p className="text-xs opacity-50">
                                  {s.currency}
                                  {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </p>
                              </div>
                              <HeraldicSparkline series={s.series} positive={up} />
                              <span className="shrink-0 text-sm font-bold tabular-nums" style={{ color: up ? 'var(--accent3)' : 'var(--accent)' }}>
                                {up ? '↑' : '↓'} {Math.abs(s.changePct)}%
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* News */}
                  <div
                    className="card card-border border-2 shadow-md"
                    style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
                  >
                    <div className="card-body gap-3 p-4">
                      <h3 className="text-center font-serif text-xs uppercase tracking-widest opacity-60">Town crier</h3>
                      <ul className="space-y-3" role="list">
                        {news.slice(0, 5).map((n, i) => (
                          <li
                            key={i}
                            className="border-l-4 pl-3 text-sm"
                            style={{ borderColor: 'var(--accent2)' }}
                          >
                            <p className="leading-snug opacity-90">{n.title}</p>
                            <p className="mt-1 text-xs italic opacity-50">— {n.source}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center font-serif text-xs italic opacity-45">Finis coronat opus · scroll responsibly</p>
      </div>
    </div>
  )
}
