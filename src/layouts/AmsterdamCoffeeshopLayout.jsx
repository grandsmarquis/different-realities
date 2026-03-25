import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const strainNickname = {
  AAPL: 'Apple Haze',
  NVDA: 'Neural Diesel',
  BTC: 'Blockchain Kush',
  CAC40: 'Euro Cush',
}

function SmokeWisp({ className, delay }) {
  return (
    <div
      className={`acs-smoke-wisp pointer-events-none absolute rounded-full bg-gradient-to-t from-emerald-400/25 via-violet-400/15 to-transparent blur-2xl ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    />
  )
}

export default function AmsterdamCoffeeshopLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter(e => !e.read).length

  return (
    <div
      className="acs-root relative min-h-dvh overflow-x-hidden pb-28 text-stone-100"
      style={{
        backgroundColor: '#0c1222',
        backgroundImage: `
          radial-gradient(ellipse 120% 80% at 50% -20%, rgba(16, 185, 129, 0.18), transparent 55%),
          radial-gradient(ellipse 90% 50% at 100% 50%, rgba(139, 92, 246, 0.12), transparent 50%),
          linear-gradient(180deg, #0f172a 0%, #1c1917 38%, #292524 100%)
        `,
        fontFamily: 'var(--font-main)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(335deg, rgba(0,0,0,0.5) 22px, transparent 22px),
            linear-gradient(155deg, rgba(0,0,0,0.35) 22px, transparent 22px)
          `,
          backgroundSize: '56px 56px',
        }}
        aria-hidden
      />

      <SmokeWisp className="acs-smoke-drift left-[8%] top-[12%] h-48 w-40" delay={0} />
      <SmokeWisp className="acs-smoke-drift right-[12%] top-[20%] h-56 w-44" delay={2.2} />
      <SmokeWisp className="acs-smoke-drift left-1/2 top-[8%] h-36 w-52 -translate-x-1/2" delay={4.5} />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-32 overflow-hidden opacity-90" aria-hidden>
        <svg className="acs-canal-houses h-full w-full min-w-[800px] text-stone-900" preserveAspectRatio="xMidYMax slice" viewBox="0 0 1200 120">
          <path fill="currentColor" d="M0 120V60l40-20 40 20v60H0zm120 0V50l50-30 50 30v70H120zm140 0V40l45-25 55 25v80H260zm160 0V55l38-18 42 18v65H420zm140 0V45l48-28 52 28v75H560zm180 0V35l60-35 60 35v85H740zm200 0V50l44-22 46 22v70H940zm160 0V65l36-15 44 15v55H1100z" />
          <rect fill="#0ea5e9" opacity="0.35" x="0" y="108" width="1200" height="12" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-6 md:px-6 md:py-10">
        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap items-start gap-5">
            <div className="relative hidden shrink-0 sm:block" aria-hidden>
              <div className="acs-bike-wheel flex h-24 w-24 items-center justify-center rounded-full border-4 border-amber-700/80 bg-gradient-to-br from-amber-900 to-stone-900 shadow-xl">
                <div className="acs-bike-spokes h-[72%] w-[72%] rounded-full border-[3px] border-dashed border-stone-500/60" />
                <div className="absolute h-4 w-4 rounded-full bg-amber-600 ring-2 ring-stone-800" />
              </div>
              <span className="acs-tulip-sway absolute -right-1 -top-2 text-2xl" aria-hidden>
                🌷
              </span>
            </div>

            <div>
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-300/90">Centrum · parody vibe</p>
              <div className="acs-neon-flicker mt-2 inline-block rounded-lg border-2 border-emerald-400/50 bg-emerald-950/40 px-4 py-2 shadow-[0_0_24px_rgba(52,211,153,0.35)]">
                <h1
                  className="m-0 bg-gradient-to-r from-emerald-300 via-lime-200 to-fuchsia-300 bg-clip-text text-2xl font-bold text-transparent md:text-4xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  De Groene Fiets
                </h1>
              </div>
              <p className="m-0 mt-2 max-w-xl text-sm leading-relaxed text-stone-300/90">
                Owner dashboard: leveranciersmail, terrasweer, prijsbord &amp; nieuws — alles in één relaxed overzicht.
                {unread > 0 && (
                  <span className="ml-1 font-semibold text-fuchsia-300"> {unread} nieuwe berichten.</span>
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn border-0 bg-gradient-to-r from-orange-600 to-rose-600 font-bold text-white shadow-lg shadow-orange-900/40 hover:brightness-110"
            onClick={onSwitchPersona}
          >
            ← Naar huis
          </button>
        </header>

        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="acs-menu-float rounded-2xl border-2 border-amber-800/50 bg-gradient-to-br from-amber-950/90 to-stone-900/95 p-4 shadow-lg">
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200/90">Terrasweer</p>
            <div className="mt-3 flex items-center gap-4">
              <span className="text-5xl drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">{weather.icon}</span>
              <div>
                <p className="m-0 text-lg font-semibold text-amber-50">{weather.condition}</p>
                <p className="m-0 text-sm text-amber-200/75">
                  {weather.temp}°C · voelt als {weather.feels_like}°C
                </p>
                <p className="m-0 text-xs text-stone-400">{weather.city} (data set) — stoelen naar buiten?</p>
              </div>
            </div>
          </div>

          <div className="acs-menu-float rounded-2xl border-2 border-emerald-700/40 bg-gradient-to-br from-emerald-950/80 to-stone-950/90 p-4 shadow-[0_0_20px_rgba(16,185,129,0.15)] md:col-span-2 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-200/90">Prijsbord vandaag (markets)</p>
              <span className="rounded-full bg-fuchsia-600/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-fuchsia-200">
                menu codes
              </span>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {stocks.map(s => (
                <div
                  key={s.ticker}
                  className="acs-chalk-row flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/35 px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="m-0 font-mono text-sm font-bold text-emerald-200">{s.ticker}</p>
                    <p className="m-0 text-[11px] text-stone-400">{strainNickname[s.ticker] ?? s.name}</p>
                  </div>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#6ee7b7' : '#f472b6'} className="opacity-90" />
                  <span className={`font-mono text-sm font-bold ${s.changePct >= 0 ? 'text-emerald-300' : 'text-fuchsia-300'}`}>
                    {s.changePct > 0 ? '+' : ''}
                    {s.changePct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300/90">
              <span aria-hidden>📬</span> Leveranciers &amp; mail
            </h2>
            <ul className="space-y-2.5">
              {emails.map((e, i) => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`acs-ticket w-full rounded-lg border-l-4 p-3 text-left transition-all ${
                        on
                          ? 'border-fuchsia-400 bg-fuchsia-950/40 shadow-lg shadow-fuchsia-900/30'
                          : 'border-stone-600 bg-stone-900/60 hover:border-emerald-500/60'
                      } `}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-mono text-[10px] text-stone-500">#{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-xl">{e.from.avatar}</span>
                        <div className="min-w-0 flex-1">
                          {!e.read && (
                            <span className="badge badge-sm mb-1 border-0 bg-gradient-to-r from-emerald-600 to-teal-600 font-bold text-white">
                              NIEUW
                            </span>
                          )}
                          <p className="m-0 font-semibold leading-snug text-stone-100">{e.subject}</p>
                          <p className="m-0 text-xs text-stone-500">{e.from.name}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <div className="relative overflow-hidden rounded-2xl border-2 border-stone-700 bg-gradient-to-b from-stone-900 to-stone-950 p-5 shadow-2xl md:p-6">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-2xl"
                  aria-hidden
                />
                <p className="m-0 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400/90">Geselecteerd bericht</p>
                <h3 className="m-0 mt-2 text-xl font-bold text-stone-50 md:text-2xl">{selectedEmail.subject}</h3>
                <p className="m-0 mt-2 text-sm text-stone-400">
                  {selectedEmail.from.name} · {selectedEmail.date} · {selectedEmail.time}
                </p>
                <div className="mt-4 flex h-7 items-end gap-1 opacity-80" aria-hidden>
                  {[5, 8, 6, 9, 7, 10, 6, 8, 5, 7].map((h, idx) => (
                    <span
                      key={idx}
                      className="acs-eq-bar w-1.5 rounded-full bg-gradient-to-t from-emerald-500 to-fuchsia-400"
                      style={{ height: `${h * 8}%`, animationDelay: `${idx * 0.07}s` }}
                    />
                  ))}
                </div>
                <div className="mt-4 max-h-[min(48vh,420px)] overflow-y-auto rounded-xl border border-stone-700/80 bg-black/30 p-4 text-sm leading-relaxed whitespace-pre-wrap text-stone-200/95">
                  {selectedEmail.body}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border-2 border-dashed border-stone-600 text-stone-500">
                Kies een mailtje links
              </div>
            )}
          </main>

          <aside className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border-2 border-orange-900/40 bg-gradient-to-b from-stone-900 to-black/80 shadow-lg">
              <div className="border-b border-orange-900/30 bg-orange-950/40 px-3 py-2">
                <p className="m-0 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-200">Café-tv nieuws</p>
              </div>
              <div className="relative h-[min(52vh,480px)] overflow-hidden">
                <ul className="acs-news-ticker space-y-0 py-2 text-sm leading-snug">
                  {[...news, ...news].map((n, idx) => (
                    <li
                      key={`${n.id}-${idx}`}
                      className="border-b border-white/5 px-3 py-3 text-stone-200/95 last:border-0"
                    >
                      <span className="mr-1.5">{n.emoji}</span>
                      {n.title}
                      <span className="mt-1 block text-[10px] uppercase tracking-wider text-stone-500">{n.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div
          className="pointer-events-none mt-8 flex justify-center gap-3 text-lg opacity-40"
          aria-hidden
        >
          <span className="acs-tulip-sway inline-block">🚲</span>
          <span className="acs-tulip-sway inline-block" style={{ animationDelay: '0.4s' }}>
            🧀
          </span>
          <span className="acs-tulip-sway inline-block" style={{ animationDelay: '0.8s' }}>
            🌿
          </span>
        </div>
      </div>
    </div>
  )
}
