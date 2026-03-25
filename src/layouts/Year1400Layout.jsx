import { useMemo } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function tagToMedieval(t) {
  const map = {
    work: 'Sealed mandate',
    personal: 'Kin epistle',
    finance: 'Counting-house',
    promo: 'Hawker’s bark',
    newsletter: 'Chapbook sheet',
    social: 'Tavern whisper',
    dev: 'Clockwright’s note',
    shopping: 'Merchant’s list',
    travel: 'Pilgrim’s word',
  }
  return map[t] ?? String(t).replace(/_/g, ' ')
}

function StainedArch({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 140" fill="none" aria-hidden>
      <path
        d="M10 130V70c0-33 22-60 50-60s50 27 50 60v60"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path d="M30 130V78c0-22 14-40 30-40s30 18 30 40v52" stroke="var(--accent)" strokeWidth="1.2" opacity="0.4" />
      <circle cx="60" cy="48" r="8" fill="var(--accent2)" opacity="0.35" />
      <path d="M44 96h32M52 110h16" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

function AstrolabeGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden>
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="50" cy="50" r="28" stroke="var(--accent)" strokeWidth="1" opacity="0.45" />
      <path d="M50 8v84M8 50h84" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      <path
        d="M50 50 L72 28"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        className="y1400-astro-hand"
      />
      <circle cx="50" cy="50" r="4" fill="var(--accent)" opacity="0.8" />
    </svg>
  )
}

function MarginDragon({ className }) {
  return (
    <svg className={className} viewBox="0 0 80 120" fill="none" aria-hidden>
      <path
        d="M12 100c8-20 4-44 20-58 6 8 18 10 28 4-4 12-2 28 8 38-14-4-28 0-40 10-6-8-12-6-16 6z"
        fill="var(--accent2)"
        opacity="0.25"
      />
      <path
        d="M20 88c10-24 8-50 28-66M32 40c6 4 14 4 22 0M48 52c4 8 12 12 20 10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <circle cx="38" cy="30" r="2.5" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

function CandleTower({ className }) {
  return (
    <div className={`relative flex flex-col items-center ${className ?? ''}`} aria-hidden>
      <div className="y1400-flame h-12 w-7 rounded-[50%_50%_40%_40%] bg-gradient-to-t from-amber-700 via-yellow-300 to-amber-100 shadow-[0_0_24px_rgba(251,191,36,0.55)]" />
      <div className="-mt-1 h-16 w-4 rounded-b-md bg-gradient-to-b from-amber-100 via-amber-800 to-stone-900 shadow-inner" />
      <div className="-mt-0.5 h-2 w-8 rounded-sm bg-stone-800" />
    </div>
  )
}

function HeraldicSpark({ series, up }) {
  const d = useMemo(() => {
    if (!series?.length) return ''
    const w = 100
    const h = 26
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
    <svg className="h-6 w-[5.5rem] shrink-0 overflow-visible" viewBox="0 0 100 26" aria-hidden>
      <path
        d={d}
        fill="none"
        stroke={up ? 'var(--accent3)' : 'var(--accent2)'}
        strokeWidth="2"
        strokeLinecap="round"
        className="y1400-spark-draw"
        pathLength="1"
      />
    </svg>
  )
}

const stockMyth = {
  AAPL: 'Guild of the Bitten Fruit',
  NVDA: 'Green Glass Forges',
  BTC: 'Philosopher’s Ledger-Stone',
  ETH: 'Ethereal Æther Guild',
  CAC40: 'Forty Banners of Paris',
}

export default function Year1400Layout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter(e => !e.read).length

  const ticker = useMemo(
    () =>
      stocks
        .map(s => {
          const arrow = s.changePct >= 0 ? '↑' : '↓'
          return `${s.ticker} ${s.currency}${s.price.toFixed(2)} ${arrow} ${Math.abs(s.changePct).toFixed(1)}%`
        })
        .join('   ·   '),
    [],
  )

  return (
    <div
      className="y1400-root relative min-h-screen overflow-x-hidden text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main)',
        background:
          'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(201,162,39,0.12), transparent 50%), linear-gradient(168deg, var(--bg2) 0%, var(--bg) 45%, #0f080c 100%)',
      }}
    >
      <style>{`
        @keyframes y1400-flame {
          0%, 100% { opacity: 1; filter: brightness(1); transform: scale(1, 1) translateY(0); }
          20% { opacity: 0.9; filter: brightness(1.15); transform: scale(1.05, 1.12) translateY(-1px); }
          45% { opacity: 0.95; filter: brightness(0.92); transform: scale(0.96, 0.94) translateY(1px); }
          70% { opacity: 0.88; filter: brightness(1.08); transform: scale(1.03, 1.06) translateY(-2px); }
        }
        @keyframes y1400-astro-hand {
          0%, 100% { transform: rotate(-18deg); transform-origin: 50px 50px; }
          50% { transform: rotate(8deg); transform-origin: 50px 50px; }
        }
        @keyframes y1400-banner {
          0%, 100% { transform: rotate(-3deg) skewX(-2deg); }
          50% { transform: rotate(3deg) skewX(2deg); }
        }
        @keyframes y1400-illum {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,162,39,0.15), inset 0 0 40px rgba(201,162,39,0.06); }
          50% { box-shadow: 0 0 28px 2px rgba(201,162,39,0.2), inset 0 0 50px rgba(201,162,39,0.1); }
        }
        @keyframes y1400-float-ink {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.35; }
          50% { transform: translateY(-18px) translateX(6px) scale(1.1); opacity: 0.55; }
        }
        @keyframes y1400-scroll-in {
          from { opacity: 0; transform: perspective(900px) rotateX(8deg) translateY(16px); }
          to { opacity: 1; transform: perspective(900px) rotateX(0) translateY(0); }
        }
        @keyframes y1400-spark {
          to { stroke-dashoffset: 0; }
        }
        @keyframes y1400-ribbon {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes y1400-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .y1400-root .y1400-flame { animation: y1400-flame 2.4s ease-in-out infinite; transform-origin: center bottom; }
        .y1400-root .y1400-astro-hand { animation: y1400-astro-hand 6s ease-in-out infinite; }
        .y1400-root .y1400-banner { animation: y1400-banner 4s ease-in-out infinite; transform-origin: top center; }
        .y1400-root .y1400-illum-pulse { animation: y1400-illum 5s ease-in-out infinite; }
        .y1400-root .y1400-ink { animation: y1400-float-ink 5.5s ease-in-out infinite; }
        .y1400-root .y1400-spark-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: y1400-spark 1.1s ease-out forwards;
        }
        .y1400-root .y1400-ticker {
          animation: y1400-ribbon 14s linear infinite;
          background: linear-gradient(90deg, var(--text2), var(--accent), var(--text2));
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .y1400-root .y1400-marquee-track {
          animation: y1400-marquee 36s linear infinite;
        }
      `}</style>

      {/* Parchment noise + rose window glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 15% 20%, rgba(139,41,66,0.18), transparent), radial-gradient(ellipse 50% 45% at 85% 30%, rgba(30,58,95,0.22), transparent)',
        }}
        aria-hidden
      />

      {/* Floating ink motes */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="y1400-ink absolute h-1 w-1 rounded-full bg-[var(--accent)]"
            style={{
              left: `${10 + (i * 9) % 80}%`,
              top: `${20 + (i * 13) % 60}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
        <header className="relative mb-12 text-center">
          <StainedArch className="pointer-events-none absolute -left-2 top-0 h-24 w-20 text-[var(--accent)] opacity-70 sm:left-4" />
          <StainedArch className="pointer-events-none absolute -right-2 top-0 h-24 w-20 scale-x-[-1] text-[var(--accent)] opacity-70 sm:right-4" />

          <div className="relative inline-block">
            <p
              className="y1400-banner mb-2 inline-block rounded border border-[var(--border)] bg-[var(--accent2)]/25 px-4 py-1 text-[0.65rem] uppercase tracking-[0.4em] text-[var(--accent)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Anno Domini MCCCC — Paris &amp; thereabouts
            </p>
            <h1
              className="y1400-ticker text-[clamp(2rem,6vw,3.25rem)] font-semibold leading-tight tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Thy Daily Briefing
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm italic leading-relaxed text-[var(--text2)]">
              The same letters, sky, gossip, and stranger’s monies as ever — only now they arrive on vellum of light, which is
              frankly unsettling but we roll with it.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CandleTower className="opacity-95" />
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="badge border-[var(--border)] bg-[var(--ink)]/80 px-3 text-[var(--accent)]">
                {unread} scroll{unread === 1 ? '' : 's'} lack thy wax-break
              </span>
              <button
                type="button"
                onClick={onSwitchPersona}
                className="btn btn-sm border-[var(--border)] bg-[var(--lapis)]/40 text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--accent2)]/30"
              >
                Flee the scriptorium
              </button>
            </div>
            <AstrolabeGlyph className="h-16 w-16 text-[var(--text2)] opacity-80" />
          </div>

          <div
            className="mx-auto mt-8 h-px max-w-md bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60"
            aria-hidden
          />
        </header>

        {/* Guild strip */}
        <div className="mb-10 overflow-hidden border-y border-[var(--border)]/80 bg-[var(--ink)]/50 py-2">
          <div className="whitespace-nowrap font-mono text-[0.68rem] tracking-wide text-[var(--text2)]">
            <div className="y1400-marquee-track inline-block">
              <span className="inline-block pr-16">
                <span className="text-[var(--accent)]">◆ Cryer’s tally of coin — </span>
                {ticker}
              </span>
              <span className="inline-block pr-16">
                <span className="text-[var(--accent)]">◆ Cryer’s tally of coin — </span>
                {ticker}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Missives */}
          <section className="relative lg:col-span-7">
            <MarginDragon className="pointer-events-none absolute -right-4 top-24 hidden opacity-60 lg:block" />
            <h2
              className="mb-5 flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.35em] text-[var(--accent)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--accent2)]/20 text-lg">
                ✉
              </span>
              Missives upon the glowing slate
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {emails.map((email, i) => (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="group relative w-full text-left"
                  style={{ animation: `y1400-scroll-in 0.6s ease-out ${i * 0.06}s both` }}
                >
                  <div
                    className="y1400-illum-pulse relative overflow-hidden rounded-sm border-2 border-[var(--border)] p-4 text-[var(--ink)] shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_rgba(201,162,39,0.15)]"
                    style={{
                      background:
                        'linear-gradient(145deg, #f0e4cc 0%, #dcc9a8 48%, #c4a574 100%), linear-gradient(90deg, rgba(201,162,39,0.15), transparent 40%)',
                    }}
                  >
                    <div
                      className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border border-[var(--accent)]/30"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.12]"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(80,40,20,0.08) 2px, rgba(80,40,20,0.08) 3px)',
                      }}
                      aria-hidden
                    />
                    {!email.read && (
                      <span className="badge badge-sm mb-2 border-0 bg-[var(--accent2)] text-[0.6rem] uppercase tracking-wider text-[var(--parchment)]">
                        Unread — break seal
                      </span>
                    )}
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-[#5c4030]" style={{ fontFamily: 'var(--font-display)' }}>
                      From {email.from.name}
                    </p>
                    <p className="mt-2 font-semibold leading-snug text-[#2a1810]" style={{ fontSize: '1.05rem' }}>
                      {email.subject}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#4a3528]">{email.preview}</p>
                    <div className="mt-3 flex justify-between border-t border-dashed border-[#8b6914]/50 pt-2 text-[0.65rem] text-[#5c4030]">
                      <span>{email.date}</span>
                      <span className="uppercase tracking-wider">{tagToMedieval(email.tag)}</span>
                    </div>
                    <span
                      className="absolute bottom-3 right-3 rotate-[-8deg] rounded border border-[var(--accent2)]/40 bg-[var(--accent2)]/15 px-2 py-0.5 text-[0.55rem] uppercase tracking-widest text-[var(--accent2)] opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Unfurl
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-8 lg:col-span-5">
            {/* Sky omens */}
            <div
              className="relative overflow-hidden rounded-lg border-2 border-[var(--lapis)] bg-gradient-to-b from-[var(--lapis)]/35 to-[var(--ink)] p-5 shadow-[inset_0_0_60px_rgba(0,0,0,0.35)]"
              style={{ animation: 'y1400-scroll-in 0.65s ease-out 0.1s both' }}
            >
              <div className="pointer-events-none absolute right-2 top-2 opacity-30" aria-hidden>
                <AstrolabeGlyph className="h-20 w-20 text-[var(--accent)]" />
              </div>
              <h3
                className="relative text-xs uppercase tracking-[0.4em] text-[var(--accent)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Omens of the open sky
              </h3>
              <p className="relative mt-3 text-4xl leading-none" aria-hidden>
                {weather.icon}
              </p>
              <p className="relative mt-2 text-xl text-[var(--text)]">
                <span className="text-[var(--parchment)]">{weather.condition}</span>
                <span className="text-base text-[var(--text2)]"> o’er {weather.city}</span>
              </p>
              <p className="relative mt-2 text-sm leading-relaxed text-[var(--text2)]">
                The air, by later reckonings, standeth at{' '}
                <strong className="text-[var(--accent)]">{weather.temp}°</strong> on the foreign centigrade rod. (We nod politely
                and pretend we understand.)
              </p>
              <p className="relative mt-1 text-xs text-[var(--text2)]/90">
                Humours of the air: {weather.humidity}% · Wind {weather.wind} leagues per hour (approx.)
              </p>
              <div className="relative mt-4 border-t border-[var(--border)]/50 pt-3">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--accent)]/90" style={{ fontFamily: 'var(--font-display)' }}>
                  Prophecy for five morrows
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {weather.forecast.map(d => (
                    <li
                      key={d.day}
                      className="flex items-center gap-1.5 rounded border border-[var(--border)]/60 bg-[var(--ink)]/60 px-2 py-1 text-xs"
                    >
                      <span aria-hidden>{d.icon}</span>
                      <span>{d.day}</span>
                      <span className="opacity-75">
                        {d.high}° / {d.low}°
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Town crier */}
            <div
              className="relative border-2 border-[var(--accent2)]/50 bg-[var(--bg2)]/80 p-5"
              style={{ animation: 'y1400-scroll-in 0.65s ease-out 0.18s both' }}
            >
              <div
                className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[var(--accent)] via-transparent to-[var(--accent2)] opacity-50"
                aria-hidden
              />
              <h3
                className="mb-4 text-center text-xs uppercase tracking-[0.45em] text-[var(--accent2)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                The crier’s sheet
              </h3>
              <ul className="space-y-4">
                {news.map((n, idx) => (
                  <li
                    key={n.id}
                    className="border-b border-[var(--border)]/40 pb-4 last:border-0 last:pb-0"
                    style={{ animation: `y1400-scroll-in 0.5s ease-out ${0.12 + idx * 0.06}s both` }}
                  >
                    <p className="text-base leading-snug">
                      <span className="mr-1" aria-hidden>
                        {n.emoji}
                      </span>
                      <span className="font-semibold text-[var(--parchment)]">{n.title}</span>
                    </p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-wider text-[var(--text2)]">
                      {n.source} · {n.category} · {n.time}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ledger */}
            <div
              className="border-2 border-[var(--border)] bg-gradient-to-b from-[#2a1a22] to-[var(--ink)] p-5"
              style={{ animation: 'y1400-scroll-in 0.65s ease-out 0.26s both' }}
            >
              <h3 className="mb-4 text-xs uppercase tracking-[0.35em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                Guild ledger &amp; curious stonks
              </h3>
              <div className="space-y-4">
                {stocks.map(s => (
                  <div
                    key={s.ticker}
                    className="flex items-center justify-between gap-3 border-b border-[var(--border)]/30 pb-3 last:border-0"
                  >
                    <div className="min-w-0">
                      <span className="font-mono text-lg text-[var(--parchment)]">{s.ticker}</span>
                      <p className="truncate text-[0.7rem] italic text-[var(--text2)]">{stockMyth[s.ticker] ?? s.name}</p>
                    </div>
                    <HeraldicSpark series={s.series} up={s.changePct >= 0} />
                    <div className="shrink-0 text-right">
                      <span className="font-mono text-[var(--parchment)]">
                        {s.currency}
                        {s.price.toFixed(2)}
                      </span>
                      <span
                        className={`ml-2 font-mono text-sm ${s.changePct >= 0 ? 'text-emerald-400/90' : 'text-rose-400/90'}`}
                      >
                        {s.changePct >= 0 ? '+' : ''}
                        {s.changePct.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="y1400-letter-title"
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto border-4 border-double border-[var(--accent)] bg-gradient-to-br from-[#f2e8d5] to-[#d4bc94] p-8 text-[var(--ink)] shadow-2xl"
            onClick={e => e.stopPropagation()}
            style={{
              boxShadow: '0 24px 80px rgba(0,0,0,0.6), inset 0 0 80px rgba(139,41,66,0.06)',
            }}
          >
            <StainedArch className="pointer-events-none absolute -right-4 top-4 h-20 w-16 text-[var(--accent2)] opacity-40" />
            <p
              className="text-center text-[0.65rem] uppercase tracking-[0.45em] text-[#6b4423]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Privy &amp; for thine eyes
            </p>
            <h2 id="y1400-letter-title" className="mt-4 pr-12 text-xl font-semibold leading-snug text-[#1a0f08]">
              {selectedEmail.subject}
            </h2>
            <p className="mt-2 text-sm text-[#4a3528]">
              {selectedEmail.from.name} · {selectedEmail.date} · {selectedEmail.time}
            </p>
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />
            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-[#2a1810]" style={{ fontFamily: 'var(--font-main)' }}>
              {selectedEmail.body}
            </pre>
            <p className="mt-8 text-center text-[0.65rem] uppercase tracking-[0.4em] text-[#8b6914]" style={{ fontFamily: 'var(--font-display)' }}>
              — Thus endeth the lesson —
            </p>
            <button
              type="button"
              onClick={() => setSelectedEmail(null)}
              className="btn mt-6 w-full border-[var(--border)] bg-[var(--accent2)] text-[var(--parchment)] hover:bg-[var(--accent2)]/90"
            >
              Roll up &amp; return
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
