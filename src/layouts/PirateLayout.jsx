import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const ShipWheel = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.25" />
    <circle cx="32" cy="32" r="28" strokeWidth="1.5" opacity="0.5" />
    {[0, 45, 90, 135].map((deg) => (
      <g key={deg} transform={`rotate(${deg} 32 32)`}>
        <line x1="32" y1="4" x2="32" y2="60" />
        <line x1="4" y1="32" x2="60" y2="32" />
      </g>
    ))}
    <circle cx="32" cy="32" r="4" fill="currentColor" />
  </svg>
)

const SkullAndCrossbones = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 48 48" fill="currentColor" aria-hidden>
    <ellipse cx="24" cy="22" rx="14" ry="16" opacity="0.9" />
    <circle cx="17" cy="20" r="3.5" fill="var(--bg)" />
    <circle cx="31" cy="20" r="3.5" fill="var(--bg)" />
    <path d="M18 28 Q24 32 30 28" fill="none" stroke="var(--bg)" strokeWidth="2" strokeLinecap="round" />
    <path d="M-2 38 L46 10 M46 38 L-2 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
  </svg>
)

const RopeDivider = () => (
  <div className="h-3 w-full overflow-hidden opacity-40" aria-hidden>
    <svg className="h-full w-[200%] text-[var(--border)]" preserveAspectRatio="none" viewBox="0 0 400 12">
      <path
        d="M0,6 Q25,0 50,6 T100,6 T150,6 T200,6 T250,6 T300,6 T350,6 T400,6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  </div>
)

const BottomWaves = () => (
  <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-0 h-24 overflow-hidden opacity-[0.35]" aria-hidden>
    <div
      className="pirate-wave-motion pirate-wave-strip absolute bottom-0 left-0 h-16 w-[200%]"
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)' }}
    />
    <svg className="absolute bottom-0 left-0 h-20 w-full text-[var(--accent2)]" viewBox="0 0 1200 80" preserveAspectRatio="none">
      <path
        fill="currentColor"
        opacity="0.25"
        d="M0,40 Q150,10 300,40 T600,40 T900,40 T1200,40 L1200,80 L0,80 Z"
      />
      <path
        fill="currentColor"
        opacity="0.15"
        d="M0,55 Q200,25 400,55 T800,55 T1200,55 L1200,80 L0,80 Z"
      />
    </svg>
  </div>
)

const tagLabel = (t) =>
  ({
    work: 'MERCHANT PARLEY',
    personal: 'BOTTLE POST',
    finance: 'DOUBLOON AFFAIRS',
    promo: 'BROADSIDE',
    newsletter: 'PORT RAG',
  }[t] || t.toUpperCase())

export default function PirateLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div
      className="relative z-[1] flex min-h-dvh flex-col overflow-hidden"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: `
          radial-gradient(ellipse 120% 80% at 50% -20%, rgba(135, 180, 220, 0.45) 0%, transparent 55%),
          linear-gradient(180deg, rgba(42, 74, 139, 0.2) 0%, transparent 38%, rgba(10, 35, 55, 0.35) 100%),
          var(--bg)
        `,
      }}
    >
      <div className="pirate-map-grid pointer-events-none fixed inset-0 z-0 opacity-60" aria-hidden />
      <BottomWaves />

      {/* Stern / captain's deck */}
      <header
        className="pirate-deck-sway relative z-10 border-b-4 shadow-lg"
        style={{
          borderColor: 'var(--accent)',
          background: `
            repeating-linear-gradient(
              92deg,
              rgba(0,0,0,0.06) 0px,
              rgba(0,0,0,0.06) 1px,
              transparent 1px,
              transparent 14px
            ),
            linear-gradient(180deg, #c9a060 0%, #a67c3d 48%, #8b6230 100%)
          `,
        }}
      >
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 md:block pirate-lantern-flicker opacity-30" style={{ color: 'var(--accent)' }}>
          <ShipWheel className="h-24 w-24" />
        </div>
        <div className="relative px-6 py-5 md:px-10">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <SkullAndCrossbones className="h-10 w-10 shrink-0 opacity-90" style={{ color: 'var(--accent)' }} />
            <div className="badge badge-sm border font-mono tracking-widest" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'rgba(0,0,0,0.12)' }}>
              NO QUARTER · INBOX
            </div>
          </div>
          <p className="mb-1 text-[10px] font-bold tracking-[0.35em] opacity-70" style={{ fontFamily: 'var(--font-display)' }}>
            CAPTAIN&apos;S LOG — LAT {weather.temp}° · WIND {weather.wind} KNOTS · {weather.condition.toUpperCase()}
          </p>
          <h1 className="text-2xl font-bold drop-shadow-sm sm:text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
            THE SALTY GULL — MESSAGE HOLD
          </h1>
          <p className="mt-2 max-w-xl text-sm italic opacity-80">
            &ldquo;Dead letters tell fine tales when ye crack the seal.&rdquo; — Ship&apos;s rule VII
          </p>
          <button
            type="button"
            onClick={onSwitchPersona}
            className="btn btn-ghost btn-sm mt-3 gap-2 border border-dashed normal-case"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            <span aria-hidden>⚓</span> Abandon ship (switch persona)
          </button>
        </div>
        <RopeDivider />
      </header>

      <div className="relative z-10 flex min-h-0 flex-1">
        {/* Scroll of dispatches — card-body is flex-auto in daisyUI; pin list to top with flex-none + flex-1 scroll */}
        <aside
          className="flex h-full min-h-0 w-72 shrink-0 flex-col border-r bg-[var(--card)]/95 backdrop-blur-sm"
          style={{ borderColor: 'var(--accent2)' }}
        >
          <div
            className="card card-bordered flex min-h-0 flex-1 flex-col rounded-none border-y-0 border-l-0"
            style={{ borderColor: 'var(--accent2)' }}
          >
            <div
              className="card-body shrink-0 gap-0 border-b p-3 py-2"
              style={{ borderColor: 'var(--border)', flex: '0 0 auto' }}
            >
              <h2 className="card-title text-xs tracking-widest opacity-70" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                📜 RUMORS &amp; BOTTLES
              </h2>
              <p className="text-[10px] italic opacity-50">{emails.length} missives — pick one afore the kraken wakes</p>
            </div>
            <ul
              className="menu menu-sm min-h-0 w-full flex-1 flex-col flex-nowrap overflow-y-auto rounded-none p-0"
              style={{ flex: '1 1 0%', minHeight: 0 }}
            >
            {emails.map((e, idx) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className="rounded-none border-b py-3 text-left font-normal"
                  style={{
                    borderColor: 'var(--border)',
                    background: selectedEmail?.id === e.id ? 'rgba(139,26,0,0.12)' : 'transparent',
                    borderLeftWidth: selectedEmail?.id === e.id ? '4px' : '0',
                    borderLeftColor: 'var(--accent)',
                    color: 'var(--text)',
                  }}
                >
                  <div className="flex w-full justify-between gap-2 opacity-50">
                    <span className="font-mono text-[10px]">№{String(idx + 1).padStart(3, '0')}</span>
                    <span className="text-[10px]">{e.date}</span>
                  </div>
                  <span className="badge badge-ghost badge-xs my-1 w-fit font-mono" style={{ color: 'var(--accent2)' }}>
                    {tagLabel(e.tag)}
                  </span>
                  <span className={`block font-bold ${e.read ? 'opacity-60' : ''}`} style={{ color: e.read ? 'var(--text2)' : 'var(--text)' }}>
                    {e.subject}
                  </span>
                  <span className="block truncate text-xs italic opacity-60">From {e.from.name}</span>
                </button>
              </li>
            ))}
            </ul>
          </div>
        </aside>

        {/* Main — opened letter */}
        <main className="relative min-h-0 flex-1 overflow-y-auto p-4 md:p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />
          {selectedEmail ? (
            <article className="relative mx-auto max-w-2xl">
              <div
                className="card border-[3px] shadow-2xl"
                style={{
                  borderColor: 'var(--accent)',
                  background: `
                    radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.35) 0%, transparent 50%),
                    radial-gradient(ellipse at 80% 90%, rgba(139,96,48,0.12) 0%, transparent 45%),
                    linear-gradient(165deg, #e8d4a8 0%, #d4b87a 40%, #c9a86a 100%)
                  `,
                  boxShadow: '8px 10px 0 rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
                }}
              >
                <div className="card-body relative pt-10">
                  <div
                    className="absolute -top-3 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 shadow-md"
                    style={{
                      borderColor: 'var(--accent)',
                      background: 'linear-gradient(145deg, #6b1010 0%, #8b1a00 50%, #4a0800 100%)',
                      boxShadow: 'inset 0 2px 4px rgba(255,200,100,0.25)',
                    }}
                    aria-hidden
                  >
                    <span className="text-xl drop-shadow-md">🕯️</span>
                  </div>
                  <div className="divider my-2 text-[10px] font-bold tracking-widest opacity-50" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                    {tagLabel(selectedEmail.tag)}
                  </div>
                  <h2 className="card-title text-xl sm:text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                    {selectedEmail.subject}
                  </h2>
                  <p className="text-sm italic opacity-70">
                    By order of {selectedEmail.from.name} · dated {selectedEmail.date}
                  </p>
                  <div
                    className="mt-4 border-l-4 pl-4 text-base leading-relaxed"
                    style={{ borderColor: 'var(--accent2)' }}
                  >
                    <p className="whitespace-pre-wrap font-serif italic">{selectedEmail.body}</p>
                  </div>
                  <p className="mt-6 text-right text-xs italic opacity-50">
                    — So witness the crew. Burn after readin&apos;, if ye dare. —
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(null)}
                    className="btn btn-ghost btn-xs mt-2 self-start normal-case italic"
                  >
                    ↩ Stow this scroll
                  </button>
                </div>
              </div>
            </article>
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center p-6">
              <div className="card card-bordered max-w-md border-dashed bg-[var(--card)]/40 text-center backdrop-blur-sm" style={{ borderColor: 'var(--border)' }}>
                <div className="card-body items-center">
                  <div className="relative mb-2 font-mono text-6xl opacity-40">🗺️</div>
                  <p className="font-bold tracking-wide" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                    X MARKS NO LETTER
                  </p>
                  <p className="text-sm italic opacity-70">
                    The map is bare till ye select a bottle from the list, ye landlubber.
                  </p>
                  <div className="mt-4 flex gap-1 text-2xl opacity-30" aria-hidden>
                    <span>☠</span>
                    <span>⚓</span>
                    <span>🦜</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Crow's nest */}
        <aside
          className="card card-bordered hidden w-64 shrink-0 overflow-y-auto rounded-none border-y-0 border-r-0 border-l-0 bg-[var(--card)]/95 backdrop-blur-sm lg:block"
          style={{ borderColor: 'var(--accent2)' }}
        >
          <div className="card-body gap-4 p-4">
            <section className="card card-bordered border-2 bg-base-100/30 shadow-sm" style={{ borderColor: 'var(--border)' }}>
              <div className="card-body gap-1 p-3">
                <h3 className="text-xs font-bold tracking-wider" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                  🪢 CROW&apos;S NEST — SKY
                </h3>
                <div className="text-center text-3xl">{weather.icon}</div>
                <p className="text-center text-sm font-bold">{weather.condition}</p>
                <p className="text-center text-xs opacity-70">
                  {weather.temp}° on the glass · {weather.wind} knots o&apos; wind
                </p>
              </div>
            </section>

            <section className="card card-bordered border-2 bg-base-100/30 shadow-sm" style={{ borderColor: 'var(--border)' }}>
              <div className="card-body gap-1 p-3">
                <h3 className="text-xs font-bold tracking-wider" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                  💰 PIECES O&apos; EIGHT (STOCKS)
                </h3>
                <ul className="text-xs">
                  {stocks.map((s) => (
                    <li key={s.ticker} className="flex justify-between border-b border-[var(--border)] py-1.5">
                      <span className="font-mono italic">{s.ticker}</span>
                      <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent)' }}>
                        {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="card card-bordered border-2 bg-base-100/30 shadow-sm" style={{ borderColor: 'var(--border)' }}>
              <div className="card-body gap-2 p-3">
                <h3 className="text-xs font-bold tracking-wider" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                  📰 WANTED &amp; WHISPERS
                </h3>
                {news.slice(0, 4).map((n) => (
                  <div key={n.id} className="border-b border-dotted border-[var(--border)] pb-2 text-xs last:border-0">
                    <p className="font-serif italic leading-snug opacity-90">{n.title}</p>
                    <p className="mt-0.5 text-[10px] opacity-50">— {n.source}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  )
}
