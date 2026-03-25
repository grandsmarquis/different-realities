import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const TAG_FLAVOR = {
  work: { label: 'Guild writ', seal: '⚒️' },
  personal: { label: 'Kin & hearth', seal: '💌' },
  finance: { label: 'Coffer news', seal: '💰' },
  promo: { label: "Hawker's cry", seal: '📣' },
  newsletter: { label: 'Broadsheet', seal: '📜' },
  social: { label: 'Fellowship', seal: '🍻' },
  dev: { label: "Scribe's tally", seal: '🖋️' },
  shopping: { label: 'Caravan goods', seal: '📦' },
  travel: { label: 'Road word', seal: '🐎' },
}

function tagFor(email) {
  return TAG_FLAVOR[email.tag] ?? { label: "Stranger's note", seal: '📌' }
}

function BardMarquee() {
  const line = news.map((n) => `${n.emoji} ${n.title}`).join('   ·   ')
  return (
    <div className="tavern-bard-track leading-5">
      <span className="pr-16 text-amber-200/90">{line}</span>
      <span className="pr-16 text-amber-200/90" aria-hidden>
        {line}
      </span>
    </div>
  )
}

function rotationFor(id) {
  const seeds = [-2.2, 1.4, -0.8, 2.1, -1.6, 0.9, -2.5, 1.1]
  return seeds[(id - 1) % seeds.length]
}

function MissiveModal({ email, onClose }) {
  if (!email) return null
  const t = tagFor(email)
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(12, 6, 4, 0.92)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="tavern-scroll relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-lg border-4 border-amber-900/80 p-6 shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, #f4e8c8 0%, #e8d4a8 55%, #dcc898 100%)',
          boxShadow: '0 0 0 2px #2a1810, 0 24px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.35)',
          color: '#2a1810',
          fontFamily: 'var(--font-main)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tavern-missive-title"
      >
        <div
          className="pointer-events-none absolute inset-x-4 top-3 h-6 opacity-30"
          style={{
            background: 'repeating-linear-gradient(90deg, transparent, transparent 3px, #8b6914 3px, #8b6914 4px)',
          }}
          aria-hidden
        />
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-amber-900/40 text-amber-950"
          aria-label="Roll up missive"
        >
          ✕
        </button>
        <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.45em] text-amber-900/70">
          {t.seal} {t.label}
        </p>
        <h2
          id="tavern-missive-title"
          className="mt-2 text-center text-2xl leading-tight text-amber-950 sm:text-3xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {email.subject}
        </h2>
        <p className="mt-2 text-center text-sm text-amber-900/80">
          From {email.from.name} · {email.date} · {email.time}
        </p>
        <div className="my-4 border-t-2 border-dashed border-amber-900/35" />
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-amber-950/95">{email.body}</div>
        <div className="mt-6 flex justify-center gap-1 text-2xl opacity-60" aria-hidden>
          🪶 🍺 🪶
        </div>
      </div>
    </div>
  )
}

function HearthWeather() {
  return (
    <div className="card border-2 border-amber-900/50 bg-gradient-to-b from-slate-900/90 to-slate-950 shadow-xl">
      <div className="card-body gap-3 p-4">
        <p
          className="text-center text-[0.6rem] font-bold uppercase tracking-[0.4em] text-amber-500/90"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          The hole in the wall
        </p>
        <p className="text-center text-xs text-amber-200/60">What travelers swear the sky is doing o&apos;er {weather.city}</p>
        <div className="relative overflow-hidden rounded-lg border-2 border-slate-700 bg-gradient-to-b from-sky-900/40 to-slate-900 px-3 py-4">
          <div className="tavern-cloud pointer-events-none absolute -left-8 top-2 text-4xl opacity-40" aria-hidden>
            ☁️
          </div>
          <div className="tavern-cloud-delay pointer-events-none absolute -right-6 top-6 text-3xl opacity-35" aria-hidden>
            ☁️
          </div>
          <div className="relative flex items-center gap-4">
            <span className="tavern-weather-bob text-5xl drop-shadow-lg">{weather.icon}</span>
            <div>
              <p className="text-3xl font-bold text-amber-50">{weather.temp}°</p>
              <p className="text-sm text-sky-200/90">{weather.condition}</p>
              <p className="mt-1 text-xs text-slate-400">
                Wind {weather.wind} — Humidity {weather.humidity}%
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {weather.forecast.map((d) => (
              <div
                key={d.day}
                className="flex min-w-[2.75rem] flex-1 flex-col items-center rounded border border-slate-600/80 bg-black/30 py-1"
              >
                <span className="text-[0.55rem] text-slate-500">{d.day}</span>
                <span className="text-lg leading-none">{d.icon}</span>
                <span className="text-[0.6rem] text-amber-200">{d.high}°</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BarrelTicker({ s }) {
  const up = s.changePct >= 0
  return (
    <div
      className={`rounded-lg border-2 px-3 py-2 ${up ? 'border-emerald-800/50 bg-emerald-950/20' : 'border-red-900/50 bg-red-950/15'}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-bold uppercase tracking-wider text-amber-200/95">{s.ticker}</p>
          <p className="truncate text-[0.65rem] text-amber-100/50">{s.name}</p>
        </div>
        <span className="shrink-0 text-lg">{up ? '🪙' : '⚓'}</span>
      </div>
      <p className={`mt-1 font-mono text-sm font-bold ${up ? 'text-emerald-400' : 'text-red-400'}`}>
        {s.currency}
        {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        <span className="ml-1 text-xs">
          {up ? '↑' : '↓'}
          {Math.abs(s.changePct).toFixed(2)}%
        </span>
      </p>
    </div>
  )
}

export default function MedievalTavernLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      className="relative min-h-screen overflow-x-hidden pb-8"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: `
          radial-gradient(ellipse 100% 60% at 50% -10%, rgba(212, 81, 49, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 80% 50% at 80% 100%, rgba(201, 162, 39, 0.08) 0%, transparent 45%),
          linear-gradient(180deg, #120a06 0%, var(--bg) 35%, #0a0604 100%)
        `,
      }}
    >
      <style>{`
        @keyframes tavernCandle {
          0%, 100% { opacity: 1; filter: brightness(1); transform: translateX(0) scaleY(1); }
          25% { opacity: 0.92; filter: brightness(1.08); transform: translateX(1px) scaleY(1.03); }
          50% { opacity: 0.88; filter: brightness(0.95); transform: translateX(-1px) scaleY(0.97); }
          75% { opacity: 0.95; filter: brightness(1.05); transform: translateX(0.5px) scaleY(1.02); }
        }
        @keyframes tavernSign {
          0%, 100% { transform: rotate(-2.5deg); }
          50% { transform: rotate(2.5deg); }
        }
        @keyframes tavernSteam {
          0% { opacity: 0.5; transform: translateY(0) scaleX(1); }
          100% { opacity: 0; transform: translateY(-28px) scaleX(1.4); }
        }
        @keyframes tavernEmber {
          0% { opacity: 0; transform: translateY(0) translateX(0) scale(0.6); }
          15% { opacity: 0.9; }
          100% { opacity: 0; transform: translateY(-120px) translateX(20px) scale(0.2); }
        }
        @keyframes tavernFoam {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes tavernCloud {
          0% { transform: translateX(0); }
          100% { transform: translateX(12px); }
        }
        @keyframes tavernWeatherBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes tavernMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tavern-candle { animation: tavernCandle 2.2s ease-in-out infinite; }
        .tavern-sign { animation: tavernSign 4s ease-in-out infinite; transform-origin: top center; }
        .tavern-steam::before, .tavern-steam::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 100%;
          width: 8px;
          height: 24px;
          margin-left: -4px;
          background: radial-gradient(ellipse, rgba(255,255,255,0.35) 0%, transparent 70%);
          animation: tavernSteam 2.5s ease-out infinite;
        }
        .tavern-steam::after { margin-left: 6px; animation-delay: 0.8s; width: 6px; }
        .tavern-ember {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ff8c42;
          box-shadow: 0 0 6px #ff6b1a;
          animation: tavernEmber 4s linear infinite;
        }
        .tavern-mug-foam { animation: tavernFoam 1.8s ease-in-out infinite; }
        .tavern-cloud { animation: tavernCloud 8s ease-in-out infinite alternate; }
        .tavern-cloud-delay { animation: tavernCloud 11s ease-in-out infinite alternate-reverse; }
        .tavern-weather-bob { animation: tavernWeatherBob 3s ease-in-out infinite; }
        .tavern-bard-track { display: flex; width: max-content; animation: tavernMarquee 36s linear infinite; }
      `}</style>

      {/* Wood grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.14]"
        aria-hidden
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,90,43,0.15) 2px, rgba(139,90,43,0.15) 3px),
            repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(0,0,0,0.08) 80px, rgba(0,0,0,0.08) 81px)`,
        }}
      />

      {/* Floating embers */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-48 overflow-hidden" aria-hidden>
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="tavern-ember"
            style={{
              left: `${8 + i * 7.5}%`,
              bottom: '8%',
              animationDelay: `${i * 0.35}s`,
              animationDuration: `${3.2 + (i % 4) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <header className="relative z-10 px-4 pb-4 pt-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          {/* Hanging sign */}
          <div className="relative mb-2 flex justify-center">
            <div className="h-8 w-px bg-amber-800/80" aria-hidden />
            <div
              className="tavern-sign absolute top-8 flex w-[min(92vw,28rem)] flex-col items-center rounded border-4 border-amber-900 bg-gradient-to-b from-amber-900 via-amber-950 to-stone-950 px-6 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
              style={{ boxShadow: 'inset 0 2px 0 rgba(255,200,120,0.12), 0 8px 0 #1a0f08' }}
            >
              <p className="text-[0.55rem] uppercase tracking-[0.55em] text-amber-500/80">Est. MMXXVI · No rats (today)</p>
              <h1
                className="mt-1 text-center text-3xl text-amber-100 sm:text-4xl"
                style={{ fontFamily: 'var(--font-display)', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
              >
                The Drunken Scroll
              </h1>
              <p className="mt-1 text-center text-sm text-amber-200/70">Innkeeper&apos;s board — same pigeon-post, different gravy</p>
            </div>
          </div>

          <div className="mt-36 flex w-full max-w-6xl flex-wrap items-end justify-between gap-4 sm:mt-40">
            <div className="flex items-end gap-4">
              <div className="relative">
                <span className="tavern-candle text-4xl" aria-hidden>
                  🕯️
                </span>
              </div>
              <div>
                <p className="text-xs text-amber-200/55">
                  {unread} sealed missives await thy eye — {emails.length} notes on the nail
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="tavern-steam relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-800/50 bg-amber-950/40 text-3xl">
                <span className="tavern-mug-foam">🍺</span>
              </div>
              <button
                type="button"
                onClick={onSwitchPersona}
                className="btn btn-warning btn-sm border-amber-700 bg-amber-700 text-amber-950 hover:bg-amber-600"
              >
                Flee the inn
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Bard ticker */}
      <div className="relative z-10 border-y border-amber-900/40 bg-black/40 py-2">
        <div className="mx-auto max-w-6xl overflow-hidden px-2">
          <div className="flex items-center gap-2 text-xs text-amber-200/90 sm:text-sm">
            <span className="shrink-0 text-lg" aria-hidden>
              🎻
            </span>
            <span className="shrink-0 font-bold uppercase tracking-widest text-amber-500/90">Bard&apos;s cry —</span>
            <div className="relative min-h-5 min-w-0 flex-1 overflow-hidden">
              <BardMarquee />
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <div
              className="rounded-xl border-4 border-amber-950/80 p-4 shadow-2xl sm:p-6"
              style={{
                background: `
                  linear-gradient(180deg, rgba(45,30,18,0.95) 0%, rgba(26,18,10,0.98) 100%),
                  url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20h40M20 0v40' stroke='%233d2817' stroke-width='0.5' opacity='0.4'/%3E%3C/svg%3E")
                `,
                boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,162,39,0.15)',
              }}
            >
              <div className="mb-4 flex items-center gap-2 border-b border-amber-900/50 pb-3">
                <span className="text-2xl" aria-hidden>
                  📌
                </span>
                <div>
                  <h2 className="text-lg text-amber-100" style={{ fontFamily: 'var(--font-display)' }}>
                    Nails & parchments
                  </h2>
                  <p className="text-xs text-amber-200/50">Tap a scrap — the full letter appears like witchcraft</p>
                </div>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {emails.map((email) => {
                  const t = tagFor(email)
                  const rot = rotationFor(email.id)
                  return (
                    <li key={email.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedEmail(email)}
                        className="group relative w-full rounded border-2 border-amber-900/60 bg-gradient-to-br from-amber-100/95 to-amber-200/80 p-3 text-left shadow-md transition-all duration-200 hover:z-10 hover:scale-[1.02] hover:border-amber-600 hover:shadow-xl active:scale-[0.99]"
                        style={{
                          transform: `rotate(${rot}deg)`,
                          color: '#2a1810',
                          boxShadow: '3px 4px 0 rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)',
                        }}
                      >
                        {!email.read && (
                          <span className="badge badge-error badge-sm absolute -right-1 -top-1 border-0 bg-red-700 text-[0.6rem] text-white">
                            New
                          </span>
                        )}
                        <div className="flex items-start gap-2">
                          <span className="text-2xl drop-shadow-sm">{email.from.avatar}</span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[0.6rem] font-bold uppercase tracking-wider text-amber-900/60">
                              {t.seal} {t.label}
                            </p>
                            <p
                              className={`mt-0.5 line-clamp-2 text-sm leading-snug ${email.read ? 'font-normal opacity-80' : 'font-bold'}`}
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {email.subject}
                            </p>
                            <p className="mt-1 line-clamp-2 text-xs text-amber-950/65">{email.preview}</p>
                            <p className="mt-2 text-[0.65rem] text-amber-900/45">{email.from.name} · {email.date}</p>
                          </div>
                        </div>
                        <div
                          className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 rounded-full bg-amber-800/30 opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden
                          style={{ boxShadow: '2px 2px 0 #5c3d1a' }}
                        />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          <aside className="space-y-4 lg:col-span-5">
            <HearthWeather />

            <div className="card border-2 border-amber-900/50 bg-gradient-to-b from-amber-950/40 to-stone-950 shadow-lg">
              <div className="card-body gap-3 p-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl" aria-hidden>
                    🛢️
                  </span>
                  <h3 className="text-center text-sm font-bold uppercase tracking-[0.25em] text-amber-400/95" style={{ fontFamily: 'var(--font-display)' }}>
                    Merchant’s barrel
                  </h3>
                </div>
                <p className="text-center text-xs text-amber-200/45">Guild scrip & foreign coin — scribbled this morn</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {stocks.map((s) => (
                    <BarrelTicker key={s.ticker} s={s} />
                  ))}
                </div>
              </div>
            </div>

            <div className="card border-2 border-amber-900/50 bg-stone-950/80 shadow-lg">
              <div className="card-body gap-3 p-4">
                <h3 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-amber-500/90" style={{ fontFamily: 'var(--font-display)' }}>
                  Tales worth a tankard
                </h3>
                <ul className="space-y-3">
                  {news.map((n) => (
                    <li
                      key={n.id}
                      className="flex gap-3 border-l-2 border-amber-700/40 pl-3 text-sm leading-snug text-amber-100/85"
                    >
                      <span className="shrink-0 text-lg">{n.emoji}</span>
                      <span>
                        <span className="text-[0.65rem] uppercase tracking-wider text-amber-500/70">{n.source}</span>
                        <br />
                        {n.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <MissiveModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
