import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const ukHeadlines = [
  'Brilliant. Brussels has opinions on robots. We shall nod politely and carry on.',
  'Football abroad. We shall discuss it over a pint with measured enthusiasm.',
  'Americans and their robot cars. We\'ll stick with the Tube for now, thanks.',
  'Southern Europe sunbathing again. Typical. Pass the brolly for Tuesday.',
  'Cannes does films. We do sarcasm and queueing. Everyone wins.',
  'Chips? Sorted. We\'ll have a semiconductor with our biscuits next.',
]

const rainDrops = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  delay: `${(i % 11) * 0.35}s`,
  dur: `${1.8 + (i % 5) * 0.22}s`,
  len: 12 + (i % 7) * 4,
}))

const bunting = [
  { rot: '-6deg', delay: '0s' },
  { rot: '4deg', delay: '0.08s' },
  { rot: '-3deg', delay: '0.16s' },
  { rot: '5deg', delay: '0.24s' },
  { rot: '-5deg', delay: '0.32s' },
  { rot: '3deg', delay: '0.4s' },
  { rot: '-4deg', delay: '0.48s' },
]

function TickerLine({ weather: w, changePct }) {
  const pct =
    changePct != null ? `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}` : '—'
  return (
    <>
      <span className="text-[#ffd700]">★ MIND THE GAP IN YOUR INBOX ★</span>
      <span className="text-slate-300">Queue position: remarkably British · Markets {pct}% (cheerio)</span>
      <span className="text-[#c8102e]">★ KEEP CALM AND REFRESH THE PAGE ★</span>
      <span className="text-slate-300">
        {w.city}: {w.temp}°C — that&apos;s weather, that is
      </span>
    </>
  )
}

export default function UkPatriotLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length
  const firstPct = stocks[0]?.changePct

  return (
    <div
      className="uk-patriot-root relative min-h-screen overflow-x-hidden"
      style={{
        background:
          'linear-gradient(165deg, #0a0f1a 0%, #121a2e 35%, #0d1628 70%, #070b12 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="uk-patriot-jack-strip h-2.5 w-full shrink-0 shadow-lg" aria-hidden />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="uk-patriot-shine absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        {rainDrops.map((r) => (
          <span
            key={r.id}
            className="uk-patriot-rain absolute top-0 w-px bg-gradient-to-b from-sky-200/0 via-sky-100/50 to-sky-200/0"
            style={{
              left: r.left,
              height: r.len,
              animationDelay: r.delay,
              animationDuration: r.dur,
            }}
          />
        ))}
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-center gap-1 sm:gap-2" aria-hidden>
          {bunting.map((b, i) => (
            <span key={i} className="inline-block" style={{ transform: `rotate(${b.rot})` }}>
              <span
                className="uk-patriot-bunting-flag inline-block h-6 w-7 rounded-sm shadow-md sm:h-8 sm:w-9"
                style={{
                  animationDelay: b.delay,
                  background:
                    i % 3 === 0
                      ? 'linear-gradient(180deg, #012169 0%, #012169 100%)'
                      : i % 3 === 1
                        ? 'linear-gradient(180deg, #ffffff 0%, #e8e8e8 100%)'
                        : 'linear-gradient(180deg, #c8102e 0%, #8b0018 100%)',
                }}
              />
            </span>
          ))}
        </div>

        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap items-start gap-4">
            <div className="relative">
              <span className="uk-patriot-tea text-5xl sm:text-6xl" aria-hidden>
                🫖
              </span>
              <span className="uk-patriot-crown absolute -right-1 -top-2 text-2xl sm:text-3xl" aria-hidden>
                👑
              </span>
            </div>
            <div>
              <p
                className="mb-1 text-[10px] font-semibold uppercase tracking-[0.4em] opacity-85 sm:text-xs"
                style={{ color: 'var(--accent3)', fontFamily: 'var(--font-display)' }}
              >
                Ministry of Quite Alright Correspondence
              </p>
              <h1
                className="leading-[0.98] text-[clamp(1.65rem,4.5vw,2.85rem)] tracking-wide"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text)',
                  textShadow: '0 2px 0 #012169, 0 6px 18px rgba(0,0,0,0.45)',
                }}
              >
                STIFF UPPER
                <span style={{ color: 'var(--accent)' }}> LIP </span>
                DESK
              </h1>
              <p className="mt-2 max-w-xl text-sm italic leading-relaxed text-slate-300">
                Same emails, forecast, headlines and tickers — presented with queue discipline, a dash of
                drizzle, and absolutely no fuss on the surface.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="badge border-2 border-[#c8102e] bg-[#c8102e]/15 font-sans text-xs uppercase text-[#fecaca]">
                  {unread} unread — sorted at your leisure
                </span>
                <span className="badge badge-outline border-slate-500 font-sans text-xs text-slate-200">
                  Kettle: metaphorically on
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <button
              type="button"
              className="btn btn-sm gap-2 border-2 border-amber-400/80 bg-amber-500/15 font-sans uppercase tracking-wider text-amber-100 hover:bg-amber-500/25"
              onClick={onSwitchPersona}
            >
              <span aria-hidden>🎡</span>
              Switch persona
            </button>
            <div
              className="uk-patriot-phone hidden rounded-lg border-4 border-[#c8102e] bg-[#0f172a] px-4 py-3 shadow-xl sm:block sm:max-w-[14rem]"
              style={{ boxShadow: '0 0 0 3px #111, 0 12px 28px rgba(0,0,0,0.5)' }}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-red-200/90">Telephone</p>
              <p className="mt-1 text-center text-3xl" aria-hidden>
                ☎️
              </p>
              <p className="mt-1 text-center text-[10px] leading-tight text-slate-400">
                Ring ring. It&apos;s your conscience. Answer later.
              </p>
            </div>
          </div>
        </header>

        <div
          className="mb-7 overflow-hidden rounded-lg border-2 border-slate-600/80 py-2 shadow-inner"
          style={{ background: 'rgba(15, 23, 42, 0.72)' }}
        >
          <div className="uk-patriot-ticker-track flex w-max gap-12 whitespace-nowrap px-4 text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
            <TickerLine weather={weather} changePct={firstPct} />
            <TickerLine weather={weather} changePct={firstPct} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <main className="lg:col-span-7 xl:col-span-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="uk-patriot-bulldog text-3xl" aria-hidden>
                🐕
              </span>
              <h2
                className="text-lg tracking-[0.18em] sm:text-xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)' }}
              >
                ROYAL MAIL (ISH)
              </h2>
              <span className="badge badge-ghost badge-sm font-sans text-[10px] uppercase text-slate-400">
                Second class wit, first class data
              </span>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {emails.map((email, i) => (
                <li key={email.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    className="uk-patriot-mail-card group relative w-full cursor-pointer text-left shadow-xl transition-transform duration-300 hover:z-10 hover:scale-[1.02] hover:shadow-2xl"
                    style={{
                      background:
                        'linear-gradient(135deg, #fffef9 0%, #f5f0e6 48%, #ebe4d8 100%)',
                      border: '3px solid',
                      borderColor: email.read ? '#94a3b8' : '#c8102e',
                      borderRadius: '2px 10px 10px 2px',
                      color: '#1a1520',
                    }}
                  >
                    <span
                      className="pointer-events-none absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-[#c8102e] via-[#8b0018] to-[#c8102e] opacity-90"
                      aria-hidden
                    />
                    <div className="card-body gap-2 p-4 pl-6 sm:p-5 sm:pl-7">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-2xl" aria-hidden>
                          {email.from.avatar}
                        </span>
                        {!email.read && (
                          <span className="badge badge-error badge-sm font-sans text-[10px] uppercase">
                            Unread — shocking
                          </span>
                        )}
                      </div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider opacity-65"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        From: {email.from.name}
                      </p>
                      <p className="text-base font-semibold leading-snug">{email.subject}</p>
                      <p className="text-xs leading-relaxed opacity-80">
                        {email.preview.slice(0, 92)}
                        {email.preview.length > 92 ? '…' : ''}
                      </p>
                      <div className="mt-1 flex flex-wrap justify-between gap-1 border-t border-dashed border-slate-400/60 pt-2 text-[10px] uppercase opacity-55">
                        <span>{email.date}</span>
                        <span className="font-mono">{email.tag}</span>
                      </div>
                      <span
                        className="pointer-events-none absolute -bottom-1 -right-1 text-5xl opacity-[0.07] transition-opacity group-hover:opacity-[0.14]"
                        aria-hidden
                      >
                        🇬🇧
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </main>

          <aside className="flex flex-col gap-6 lg:col-span-5 xl:col-span-4">
            <section
              className="card border-2 border-sky-700/60 shadow-lg backdrop-blur-sm"
              style={{
                background:
                  'linear-gradient(160deg, rgba(1,33,105,0.35) 0%, rgba(15,23,42,0.92) 100%)',
              }}
            >
              <div className="card-body gap-3 p-5">
                <h3
                  className="card-title text-base uppercase tracking-[0.2em]"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)' }}
                >
                  🌂 Garden-variety forecast
                </h3>
                <p className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  <span className="uk-patriot-weather-emoji inline-block">{weather.icon}</span>{' '}
                  {weather.temp}°C
                </p>
                <p className="text-sm text-slate-300">
                  Feels like {weather.feels_like}°C in {weather.city}, {weather.country}. We&apos;ll cope.
                </p>
                <p className="text-sm italic leading-relaxed text-slate-400">
                  &ldquo;{weather.condition}&rdquo; — could be worse. Could be sideways rain. (Check Thursday.)
                </p>
                <div className="divider my-0 before:bg-white/15 after:bg-white/15 text-[10px] uppercase text-slate-500">
                  Wind & small talk
                </div>
                <p className="text-xs text-slate-400">
                  Wind {weather.wind} km/h · Humidity {weather.humidity}% · Brolly advisory:{' '}
                  <span className="font-semibold text-amber-200/90">stiff upper lip level</span>
                </p>
              </div>
            </section>

            <section
              className="uk-patriot-ceefax card border-2 border-[#00ff41]/50 shadow-[0_0_24px_rgba(0,255,65,0.12)]"
              style={{ background: 'linear-gradient(180deg, #031a0a 0%, #020c06 100%)' }}
            >
              <div className="card-body gap-3 p-4 font-mono">
                <div className="flex items-center justify-between gap-2 border-b border-[#00ff41]/30 pb-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#00ff41]">
                    CEEFAX 888 — MARKETS
                  </h3>
                  <span className="uk-patriot-ceefax-blink text-[10px] text-[#00ff41]">LIVE</span>
                </div>
                <ul className="space-y-2 text-[13px]">
                  {stocks.map((s) => (
                    <li
                      key={s.ticker}
                      className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 border-b border-[#00ff41]/15 pb-2 last:border-0"
                    >
                      <span className="font-bold text-[#7dff9a]">{s.ticker}</span>
                      <span className={s.changePct >= 0 ? 'text-[#00ff41]' : 'text-[#ff6b6b]'}>
                        {s.changePct >= 0 ? '▲' : '▼'} {s.changePct >= 0 ? '+' : ''}
                        {s.changePct.toFixed(2)}%
                      </span>
                      <span className="w-full text-[11px] text-[#5ae86a]/90">
                        {s.currency}
                        {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })} —{' '}
                        {s.changePct >= 0 ? 'Rather spiffing.' : 'Bit of a kerfuffle.'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section
              className="card border-2 border-slate-600 shadow-lg"
              style={{
                background: 'linear-gradient(180deg, rgba(30,41,59,0.94) 0%, rgba(12,18,32,0.98) 100%)',
              }}
            >
              <div className="card-body gap-4 p-5">
                <h3
                  className="card-title text-base uppercase tracking-[0.2em]"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)' }}
                >
                  📰 News with a cuppa
                </h3>
                <ul className="space-y-4">
                  {news.map((n, i) => (
                    <li
                      key={n.id}
                      className="border-l-4 pl-3"
                      style={{
                        borderColor:
                          i % 3 === 0 ? '#c8102e' : i % 3 === 1 ? '#012169' : '#ffd700',
                      }}
                    >
                      <p className="text-lg leading-tight text-slate-100">
                        <span aria-hidden>{n.emoji} </span>
                        {n.title}
                      </p>
                      <p className="mt-1 text-xs italic text-slate-400">{ukHeadlines[i]}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                        {n.source} · {n.time}
                      </p>
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
          style={{ background: 'rgba(6, 10, 20, 0.92)' }}
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="uk-patriot-modal-title"
            className="uk-patriot-modal-rise card max-h-[85vh] w-full max-w-lg overflow-y-auto border-4 shadow-2xl"
            style={{
              borderColor: '#012169',
              background: 'linear-gradient(180deg, #fffef7 0%, #ffffff 55%)',
              color: '#1a1520',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body gap-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-4xl" aria-hidden>
                  {selectedEmail.from.avatar}
                </span>
                <button
                  type="button"
                  className="btn btn-circle btn-ghost btn-sm font-sans text-xl"
                  onClick={() => setSelectedEmail(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <p
                id="uk-patriot-modal-title"
                className="text-xs font-bold uppercase tracking-[0.28em] text-[#c8102e]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                ★ Official-ish scroll ★
              </p>
              <h2 className="text-xl font-bold leading-snug">{selectedEmail.subject}</h2>
              <p className="text-sm opacity-70">
                <strong>{selectedEmail.from.name}</strong> · {selectedEmail.date} · {selectedEmail.time}
              </p>
              <div className="divider my-0" />
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {selectedEmail.body}
              </pre>
              <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500">
                Pip pip. Message ends. Carry on.
              </p>
              <button
                type="button"
                className="btn btn-neutral btn-block uppercase tracking-wider"
                onClick={() => setSelectedEmail(null)}
              >
                Righto, close that
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
