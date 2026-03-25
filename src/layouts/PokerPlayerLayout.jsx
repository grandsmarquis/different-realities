import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const SUITS = ['♠', '♥', '♦', '♣']

function FloatingSuits() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {SUITS.map((s, i) => (
        <span
          key={s}
          className="poker-float-suit absolute text-4xl opacity-[0.07] sm:text-6xl"
          style={{
            left: `${12 + i * 22}%`,
            top: `${18 + (i % 3) * 24}%`,
            color: s === '♥' || s === '♦' ? 'var(--chip-red)' : 'var(--cream)',
            animationDelay: `${i * 0.9}s`,
          }}
        >
          {s}
        </span>
      ))}
    </div>
  )
}

function ChipStack({ color, count = 4 }) {
  return (
    <div className="relative h-8 w-10 shrink-0" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 h-3 w-9 -translate-x-1/2 rounded-full border-2 border-black/40 shadow-sm"
          style={{
            bottom: i * 5,
            background: `linear-gradient(180deg, ${color}ee 0%, ${color} 45%, ${color}aa 100%)`,
            zIndex: i,
          }}
        />
      ))}
    </div>
  )
}

function WeatherRail() {
  return (
    <div
      className="card card-bordered border-2 shadow-xl"
      style={{
        borderColor: 'var(--wood)',
        background: 'linear-gradient(180deg, #1a120c 0%, #0f0a08 100%)',
        boxShadow: 'inset 0 1px 0 rgba(232,197,71,0.15)',
      }}
    >
      <div className="card-body gap-3 p-4">
        <p
          className="m-0 text-[10px] tracking-[0.35em] opacity-80"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)' }}
        >
          OUTSIDE TELL
        </p>
        <div className="flex items-center gap-3">
          <span className="poker-weather-wiggle text-5xl drop-shadow-md">{weather.icon}</span>
          <div>
            <p className="m-0 text-3xl font-bold tabular-nums leading-none" style={{ color: 'var(--cream)' }}>
              {weather.temp}°
            </p>
            <p className="m-0 text-xs opacity-80" style={{ color: 'var(--text2)' }}>
              {weather.city} · {weather.condition}
            </p>
          </div>
        </div>
        <ul className="menu menu-xs rounded-box bg-base-100/5 p-0">
          {weather.forecast.slice(0, 4).map((d) => (
            <li key={d.day} className="disabled">
              <span className="flex w-full justify-between text-[11px]" style={{ color: 'var(--text2)' }}>
                <span>{d.day}</span>
                <span>
                  {d.icon} {d.high}°
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function EmailCard({ email, active, onClick, tilt }) {
  return (
    <button
      type="button"
      onClick={() => onClick(email)}
      className={`poker-email-card group relative w-full rounded-lg border-2 text-left transition-all duration-200 ${
        active ? 'z-10 scale-[1.02] shadow-lg' : 'hover:-translate-y-1 hover:shadow-md'
      }`}
      style={{
        borderColor: active ? 'var(--gold)' : 'rgba(232,197,71,0.35)',
        background: 'linear-gradient(145deg, #fffef8 0%, #f0ebe3 48%, #e8e2d8 100%)',
        transform: `rotate(${tilt}deg)`,
        boxShadow: active
          ? '0 12px 28px rgba(0,0,0,0.45), 0 0 0 2px rgba(232,197,71,0.4)'
          : '0 4px 14px rgba(0,0,0,0.35)',
        color: '#1a1510',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="absolute left-2 top-2 text-lg leading-none opacity-90" style={{ color: '#1a1510' }}>
        <span className="block text-[10px] font-bold">{String(email.id).padStart(2, '0')}</span>
        <span className="text-base">♠</span>
      </div>
      <div className="absolute bottom-2 right-2 text-lg leading-none opacity-90" style={{ color: '#c41e3a' }}>
        <span className="text-base">♥</span>
      </div>
      <div className="px-4 pb-4 pt-10">
        <div className="flex items-start justify-between gap-2">
          <span className="text-2xl">{email.from.avatar}</span>
          {!email.read && <span className="badge badge-error badge-sm font-bold">NEW</span>}
        </div>
        <p className="m-0 mt-2 line-clamp-2 text-sm font-semibold leading-snug">{email.subject}</p>
        <p className="m-0 mt-1 text-xs opacity-70">{email.from.name}</p>
        <p className="m-0 mt-2 text-[10px] uppercase tracking-wider opacity-55">
          {email.date} · {email.time}
        </p>
      </div>
    </button>
  )
}

function DealerTicker() {
  const line = news.map((n) => `${n.emoji} ${n.title}`).join('   ·   ')
  return (
    <div
      className="overflow-hidden border-t-2 py-2"
      style={{ borderColor: 'var(--wood)', background: 'rgba(0,0,0,0.45)' }}
    >
      <div className="poker-ticker-track flex w-max whitespace-nowrap text-xs font-semibold" style={{ color: 'var(--gold)' }}>
        <span className="pr-16" style={{ fontFamily: 'var(--font-main)' }}>
          FLOOR WHISPERS · {line}
        </span>
        <span className="pr-16" aria-hidden style={{ fontFamily: 'var(--font-main)' }}>
          FLOOR WHISPERS · {line}
        </span>
      </div>
    </div>
  )
}

export default function PokerPlayerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const tilts = [-2, 1, -1, 2, -1.5, 0.5]

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        background:
          'radial-gradient(ellipse 100% 80% at 50% 120%, #062018 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 50% -5%, rgba(17,107,74,0.25), transparent), var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <style>{`
        @keyframes pokerFloatSuit {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(6deg); }
        }
        .poker-float-suit {
          animation: pokerFloatSuit 8s ease-in-out infinite;
        }
        @keyframes pokerWeatherWiggle {
          0%, 100% { transform: rotate(-4deg) scale(1); }
          50% { transform: rotate(4deg) scale(1.06); }
        }
        .poker-weather-wiggle {
          animation: pokerWeatherWiggle 3.5s ease-in-out infinite;
        }
        @keyframes pokerTicker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .poker-ticker-track {
          animation: pokerTicker 38s linear infinite;
        }
        @keyframes pokerPotGlow {
          0%, 100% { box-shadow: inset 0 0 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(232,197,71,0.2); }
          50% { box-shadow: inset 0 0 80px rgba(17,107,74,0.15), 0 0 24px rgba(232,197,71,0.12); }
        }
        .poker-pot-panel {
          animation: pokerPotGlow 5s ease-in-out infinite;
        }
        @keyframes pokerDealIn {
          from { opacity: 0; transform: translateY(12px) rotateX(12deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0); }
        }
        .poker-deal-in {
          animation: pokerDealIn 0.45s ease-out both;
        }
        .poker-felt-oval {
          border-radius: 50%;
          background: radial-gradient(ellipse at center, var(--felt) 0%, var(--felt-edge) 72%, #040a08 100%);
          border: 10px solid var(--wood);
          box-shadow:
            inset 0 0 120px rgba(0,0,0,0.5),
            0 0 0 3px rgba(232,197,71,0.12),
            0 24px 48px rgba(0,0,0,0.55);
        }
      `}</style>

      <FloatingSuits />

      <div className="pointer-events-none absolute left-1/2 top-24 h-[min(70vh,520px)] w-[min(96vw,880px)] -translate-x-1/2 opacity-40 poker-felt-oval" aria-hidden />

      <header className="relative z-10 border-b-2 px-4 py-4" style={{ borderColor: 'var(--wood)', background: 'linear-gradient(180deg, rgba(74,48,32,0.5) 0%, transparent)' }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[10px] tracking-[0.4em]" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>
              NO LIMIT HOLD&apos;IN · INBOX
            </p>
            <h1 className="m-0 text-4xl tracking-wide md:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', letterSpacing: '0.06em' }}>
              THE FISH CAN READ
            </h1>
            <p className="m-0 mt-1 text-sm" style={{ color: 'var(--text2)' }}>
              {emails.filter((e) => !e.read).length} unread tells · keep your cards close
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex" aria-hidden>
              <ChipStack color="#c41e3a" />
              <ChipStack color="#1e5f8a" count={3} />
              <ChipStack color="#e8c547" count={5} />
            </div>
            <button type="button" className="btn btn-outline btn-sm border-warning text-warning hover:bg-warning hover:text-warning-content" onClick={onSwitchPersona}>
              Cash out
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-6 md:px-4">
        <div className="grid gap-5 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-3">
            <WeatherRail />
            <div>
              <p className="mb-2 text-[10px] tracking-[0.3em]" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>
                POCKET CARDS
              </p>
              <div className="space-y-3">
                {emails.map((e, i) => (
                  <EmailCard key={e.id} email={e} active={selectedEmail?.id === e.id} onClick={setSelectedEmail} tilt={tilts[i % tilts.length]} />
                ))}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <div
                key={selectedEmail.id}
                className="poker-pot-panel poker-deal-in rounded-2xl border-2 p-5 md:p-6"
                style={{
                  borderColor: 'rgba(232,197,71,0.35)',
                  background:
                    'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 6px), linear-gradient(165deg, var(--felt) 0%, var(--felt-edge) 100%)',
                }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge badge-warning badge-outline font-mono text-[10px]">THE RIVER</span>
                  <span className="text-xs opacity-70">{selectedEmail.date}</span>
                </div>
                <h2 className="m-0 mt-3 text-2xl font-bold md:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', letterSpacing: '0.04em' }}>
                  {selectedEmail.subject}
                </h2>
                <div className="mt-3 flex items-center gap-3 border-b border-white/10 pb-3">
                  <span className="text-4xl">{selectedEmail.from.avatar}</span>
                  <div>
                    <p className="m-0 font-semibold" style={{ color: 'var(--gold)' }}>
                      {selectedEmail.from.name}
                    </p>
                    <p className="m-0 text-xs opacity-70">{selectedEmail.from.email}</p>
                  </div>
                </div>
                <div className="mt-4 max-h-[min(50vh,420px)] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                  {selectedEmail.body}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border-2 border-dashed border-white/20 bg-base-100/5 text-center text-sm opacity-70">
                Peek at a pocket card to read the hand.
              </div>
            )}
          </main>

          <aside className="lg:col-span-4">
            <div
              className="rounded-2xl border-2 p-4 shadow-xl"
              style={{
                borderColor: 'var(--wood)',
                background: 'linear-gradient(180deg, #141c18 0%, #0a100e 100%)',
              }}
            >
              <p className="m-0 text-[10px] tracking-[0.35em]" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>
                DEALER BOARD
              </p>
              <ul className="mt-4 space-y-3">
                {news.map((n) => (
                  <li
                    key={n.id}
                    className="rounded-lg border-l-4 bg-base-100/5 py-2 pl-3 text-sm leading-snug"
                    style={{ borderColor: 'var(--gold)' }}
                  >
                    <span className="text-[10px] uppercase tracking-wider opacity-60">
                      {n.time} · {n.category}
                    </span>
                    <p className="m-0 mt-1">
                      <span className="mr-1">{n.emoji}</span>
                      {n.title}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-[10px] tracking-[0.3em]" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>
                CHIP STACKS · EQUITIES
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {stocks.map((s) => {
                  const up = s.changePct >= 0
                  const chip = up ? '#2d6a4f' : '#c41e3a'
                  return (
                    <div
                      key={s.ticker}
                      className="card card-compact border border-white/10 bg-base-100/10 shadow-md transition-transform hover:scale-[1.02]"
                    >
                      <div className="card-body gap-2 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <ChipStack color={chip} count={5} />
                            <span className="font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.25rem' }}>
                              {s.ticker}
                            </span>
                          </div>
                          <span className={up ? 'text-success' : 'text-error'}>
                            {up ? '+' : ''}
                            {s.changePct}%
                          </span>
                        </div>
                        <p className="m-0 text-[10px] opacity-60">{s.name}</p>
                        <p className="m-0 text-lg font-semibold tabular-nums">
                          {s.currency}
                          {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </p>
                        <div className="flex justify-end opacity-90">
                          <MiniSpark series={s.series} stroke={up ? '#4ade80' : '#f87171'} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <DealerTicker />
    </div>
  )
}
