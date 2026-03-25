import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const spinLines = [
  'The lobby insists this is “fine”.',
  'Treasury spreadsheet says breathe.',
  'Met Office sends thoughts. And icons.',
  'Whips recommend refreshing. Strongly.',
  'Markets do what markets do. You do you.',
  'Briefing: same facts, bigger font.',
]

function DoorHeader({ onSwitchPersona }) {
  return (
    <header className="uk-pm-door relative overflow-hidden border-b-4 border-[#c5a028]/90 shadow-2xl">
      <div
        className="uk-pm-door-glow absolute inset-0 opacity-90"
        style={{
          background:
            'linear-gradient(165deg, #0d0d0d 0%, #1a1510 40%, #0a0a0a 100%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.65'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="relative z-[1] mx-auto flex max-w-6xl flex-col gap-6 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-5">
          <div className="relative flex h-24 w-20 shrink-0 flex-col items-center justify-center rounded-sm border-2 border-[#3d3528] bg-gradient-to-b from-[#1c1914] to-[#0c0b09] shadow-inner sm:h-28 sm:w-24">
            <span
              className="font-display text-4xl font-bold tabular-nums text-[#d4af37] drop-shadow-[0_0_12px_rgba(212,175,55,0.35)] sm:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
              aria-hidden
            >
              10
            </span>
            <span className="mt-1 font-sans text-[9px] font-semibold uppercase tracking-[0.35em] text-[#8a8070]">
              SW1A
            </span>
            <div className="uk-pm-knocker absolute -bottom-3 flex flex-col items-center" aria-hidden>
              <div className="h-5 w-5 rounded-full border-2 border-[#b8962e] bg-gradient-to-br from-[#e8d48a] to-[#8a7020] shadow-md" />
              <div className="h-4 w-1 rounded-full bg-gradient-to-b from-[#c5a028] to-[#5c4a12]" />
            </div>
          </div>
          <div>
            <p className="mb-1 font-sans text-[10px] font-bold uppercase tracking-[0.5em] text-[#c5a028]/90">
              Prime Ministerial briefing terminal
            </p>
            <h1
              className="text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-[0.95] tracking-tight text-[#faf6ef]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The inbox is{' '}
              <span className="italic text-[#d4af37]">technically</span>
              <br className="hidden sm:block" /> under control
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#a8a29a]">
              Official-adjacent dashboard: correspondence, sky report, lobby wires, and gilt-adjacent numbers — presented
              with bells, red leather, and absolutely zero whips in your actual room.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:items-end">
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-lg border border-[#166534]/60 bg-[#14532d]/40 font-sans text-xs font-semibold uppercase tracking-wide text-[#86efac]">
              {emails.filter((e) => !e.read).length} awaiting your “decisive glance”
            </span>
            <span className="badge badge-lg badge-outline border-[#57534e] font-sans text-xs text-[#d6d3d1]">
              Kettle classified · OFF
            </span>
          </div>
          <button
            type="button"
            className="btn btn-sm gap-2 border-2 border-[#c5a028]/70 bg-[#c5a028]/10 font-sans font-semibold uppercase tracking-wider text-[#fde68a] hover:bg-[#c5a028]/20"
            onClick={onSwitchPersona}
          >
            <span aria-hidden>🎭</span>
            Resign from this skin
          </button>
        </div>
      </div>
    </header>
  )
}

function TickerChunk() {
  return (
    <>
      <span className="inline-flex shrink-0 items-center gap-10">
        <span>
          ★ Order ★ The honourable inbox must be read ★{' '}
          <span className="text-[#fbbf24]">{weather.city}</span> {weather.temp}°C — carry on ★
        </span>
        <span>
          ★ Treasury cosplay: numbers go up/down ★ Same emails as everyone else ★ Strong & stable refresh ★
        </span>
      </span>
    </>
  )
}

function DivisionStrip() {
  return (
    <div
      className="relative overflow-hidden border-y border-[#292524] py-2.5"
      style={{
        background: 'linear-gradient(90deg, #0f172a 0%, #1c1917 50%, #14532d 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 uk-pm-bg-motes opacity-40" aria-hidden />
      <div className="relative z-[1] mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#a8a29a]">
            Division
          </span>
          <div className="flex gap-2" aria-hidden>
            <span className="uk-pm-division-lamp h-4 w-4 rounded-full bg-[#22c55e] shadow-[0_0_14px_#22c55e]" title="Aye" />
            <span
              className="uk-pm-division-lamp uk-pm-division-lamp-delay h-4 w-4 rounded-full bg-[#ef4444] shadow-[0_0_14px_#ef4444]"
              title="No"
            />
          </div>
          <span className="hidden font-sans text-xs text-[#d6d3d1] sm:inline">
            (Decorative. Your Wi‑Fi bill is still yours.)
          </span>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden sm:max-w-[55%]">
          <div className="uk-pm-ticker flex w-max gap-10 whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#e7e5e4]">
            <TickerChunk />
            <TickerChunk />
          </div>
        </div>
      </div>
    </div>
  )
}

function CoatArmsBadge() {
  return (
    <svg
      className="uk-pm-mace h-14 w-14 shrink-0 text-[#d4af37] drop-shadow-lg sm:h-16 sm:w-16"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M32 4L38 14H26L32 4Z"
        fill="currentColor"
        fillOpacity="0.35"
      />
      <rect x="28" y="14" width="8" height="36" rx="1" fill="currentColor" fillOpacity="0.5" />
      <ellipse cx="32" cy="52" rx="14" ry="6" fill="currentColor" fillOpacity="0.25" />
      <circle cx="32" cy="12" r="3" fill="currentColor" />
      <path
        d="M8 48c8-6 16-6 24 0s16 6 24 0"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default function UkPrimeMinisterLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      className="uk-pm-root relative min-h-screen overflow-x-hidden"
      style={{
        background: 'radial-gradient(ellipse 120% 80% at 50% -20%, #1e293b 0%, transparent 50%), linear-gradient(180deg, #0c0e12 0%, #07080b 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <DoorHeader onSwitchPersona={onSwitchPersona} />
      <DivisionStrip />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <CoatArmsBadge />
            <div>
              <h2
                className="text-2xl font-semibold tracking-tight text-[#faf6ef] sm:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Dispatch boxes <span className="text-[#d4af37]">(digital)</span>
              </h2>
              <p className="mt-1 max-w-lg text-sm text-[#a8a29a]">
                Each message is a miniature constitutional crisis. Click to open the redacted truth (not actually
                redacted — we are not monsters).
              </p>
            </div>
          </div>
          <div className="rounded-box border border-dashed border-[#57534e] bg-base-200/30 px-4 py-3 font-sans text-xs text-[#d6d3d1]">
            <span className="uk-pm-brief-pulse inline-block font-bold uppercase tracking-widest text-[#f87171]">
              Confidential
            </span>
            <p className="mt-1 opacity-80">Spin: {spinLines[unread % spinLines.length]}</p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <main className="lg:col-span-7">
            <ul className="grid gap-6 sm:grid-cols-2">
              {emails.map((email) => (
                <li key={email.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    className="uk-pm-red-box group relative w-full cursor-pointer overflow-hidden rounded-lg text-left shadow-xl transition-transform duration-300 hover:z-[2] hover:scale-[1.02] hover:shadow-2xl"
                    style={{
                      background:
                        'linear-gradient(145deg, #5c1a1a 0%, #7f1d1d 35%, #450a0a 100%)',
                      border: '2px solid rgba(212,175,55,0.45)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 40px rgba(0,0,0,0.55)',
                    }}
                  >
                    <div
                      className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#fbbf24]/10 blur-2xl"
                      aria-hidden
                    />
                    <div className="card-body relative gap-3 p-5 text-[#fdf4f4]">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-3xl drop-shadow-md" aria-hidden>
                          {email.from.avatar}
                        </span>
                        <span className="uk-pm-stamp badge border-0 bg-[#1c1917]/80 font-sans text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
                          {!email.read ? 'Urgent-ish' : 'Filed'}
                        </span>
                      </div>
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#fca5a5]/90">
                        From · {email.from.name}
                      </p>
                      <p className="text-lg font-semibold leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                        {email.subject}
                      </p>
                      <p className="text-sm leading-relaxed text-[#fecaca]/85">
                        {email.preview.slice(0, 88)}
                        {email.preview.length > 88 ? '…' : ''}
                      </p>
                      <div className="divider my-0 before:bg-white/10 after:bg-white/10 text-[10px] text-[#fecaca]/50">
                        Routing
                      </div>
                      <div className="flex flex-wrap justify-between gap-1 font-mono text-[10px] uppercase text-[#fecaca]/60">
                        <span>{email.date}</span>
                        <span>{email.tag}</span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </main>

          <aside className="flex flex-col gap-6 lg:col-span-5">
            <section className="card border-2 border-[#334155] bg-gradient-to-br from-[#1e293b]/95 to-[#0f172a] shadow-xl">
              <div className="card-body gap-3">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className="card-title text-lg text-[#e2e8f0]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <span className="uk-pm-weather-cloud mr-2 inline-block text-2xl" aria-hidden>
                      {weather.icon}
                    </span>
                    JIC weather · {weather.city}
                  </h3>
                  <span className="badge badge-outline border-sky-400/50 font-sans text-[10px] uppercase text-sky-200">
                    Met-adjacent
                  </span>
                </div>
                <p className="font-display text-5xl font-bold text-[#f8fafc]">{weather.temp}°C</p>
                <p className="text-sm text-[#94a3b8]">
                  Feels {weather.feels_like}°C · {weather.country} · wind {weather.wind} km/h · humidity{' '}
                  {weather.humidity}%
                </p>
                <p className="rounded-md border border-sky-500/20 bg-sky-950/40 p-3 text-sm italic leading-relaxed text-sky-100/90">
                  “{weather.condition}” — suitable for a brisk walk to the microwave.
                </p>
              </div>
            </section>

            <section
              className="card border-2 border-[#d4af37]/40 shadow-lg"
              style={{
                background: 'linear-gradient(160deg, #292524 0%, #1c1917 100%)',
              }}
            >
              <div className="card-body gap-3">
                <div className="flex items-center gap-2">
                  <span className="uk-pm-news-gavel text-xl" aria-hidden>
                    🪵
                  </span>
                  <h3 className="card-title text-lg text-[#faf6ef]" style={{ fontFamily: 'var(--font-display)' }}>
                    Lobby cable
                  </h3>
                </div>
                <ul className="space-y-4">
                  {news.map((item, i) => (
                    <li
                      key={item.id}
                      className="border-l-4 border-[#d4af37] pl-3"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <p className="text-base font-medium leading-snug text-[#f5f5f4]">
                        <span aria-hidden>{item.emoji} </span>
                        {item.title}
                      </p>
                      <p className="mt-1 font-sans text-xs italic text-[#a8a29a]">
                        Spin doctor note: could go either way until tea.
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#78716c]">
                        {item.source} · {item.time}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="card border-2 border-[#166534]/50 bg-[#052e16]/90 shadow-[0_0_32px_rgba(34,197,94,0.08)]">
              <div className="card-body gap-3 font-mono">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold tracking-wide text-[#86efac]">
                    Gilt-coded terminal
                  </h3>
                  <span className="uk-pm-terminal-blink text-[10px] font-bold text-[#4ade80]">LIVE-ish</span>
                </div>
                <p className="text-[11px] uppercase tracking-widest text-[#6ee7b7]/70">
                  Not financial advice · obviously
                </p>
                <ul className="space-y-3 text-sm">
                  {stocks.map((s) => (
                    <li
                      key={s.ticker}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#14532d]/80 pb-2 last:border-0"
                    >
                      <span className="font-bold text-[#bbf7d0]">{s.ticker}</span>
                      <span className={s.changePct >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}>
                        {s.changePct >= 0 ? '▲' : '▼'} {s.changePct >= 0 ? '+' : ''}
                        {s.changePct.toFixed(2)}%
                      </span>
                      <span className="w-full text-[11px] text-[#6ee7b7]/85">
                        {s.currency}
                        {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })} —{' '}
                        {s.changePct >= 0 ? 'Rather satisfactory.' : 'Time for a stiff memo.'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(7, 9, 12, 0.92)' }}
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="uk-pm-modal-title"
            className="uk-pm-modal-rise card max-h-[88vh] w-full max-w-lg overflow-y-auto border-4 border-[#292524] shadow-2xl"
            style={{
              background: 'linear-gradient(180deg, #fffef8 0%, #f5f0e6 100%)',
              color: '#1c1917',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl" aria-hidden>
                    {selectedEmail.from.avatar}
                  </span>
                  <div>
                    <p
                      id="uk-pm-modal-title"
                      className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-[#7f1d1d]"
                    >
                      Prime Minister — eyes only (joking)
                    </p>
                    <h2 className="font-display text-xl font-bold leading-snug">{selectedEmail.subject}</h2>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-circle btn-ghost btn-sm text-xl"
                  onClick={() => setSelectedEmail(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <p className="text-sm opacity-75">
                <strong>{selectedEmail.from.name}</strong> · {selectedEmail.date} · {selectedEmail.time}
              </p>
              <div className="divider my-0" />
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{selectedEmail.body}</pre>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="badge badge-outline border-[#57534e] font-sans text-[10px] uppercase">
                  Seen at the despatch box
                </span>
                <span className="badge badge-secondary font-sans text-[10px] uppercase">No. 10 cat approved</span>
              </div>
              <button
                type="button"
                className="btn btn-neutral btn-block font-sans font-semibold uppercase tracking-wide"
                onClick={() => setSelectedEmail(null)}
              >
                Table this until “later”
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
