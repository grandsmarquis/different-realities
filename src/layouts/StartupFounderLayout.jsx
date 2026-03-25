import { useMemo } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'

const tagVibe = {
  work: { label: '🔥 Ship lane', badge: 'badge-primary' },
  finance: { label: '💸 Runway math', badge: 'badge-secondary' },
  travel: { label: '✈️ Offsite', badge: 'badge-accent' },
  dev: { label: '⚡ Build', badge: 'badge-info' },
  personal: { label: '🫶 Life ops', badge: 'badge-ghost' },
  shopping: { label: '🛒 Provisions', badge: 'badge-warning' },
  social: { label: '📣 Signal boost', badge: 'badge-success' },
  newsletter: { label: '📬 Long read', badge: 'badge-neutral' },
}

function FloatingOrb({ className, delay }) {
  return (
    <div
      className={`sf-orb pointer-events-none absolute z-0 rounded-full blur-3xl opacity-35 ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    />
  )
}

export default function StartupFounderLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length

  const runwayPct = useMemo(() => {
    const base = 72 + (emails.length % 7) * 2.1
    return Math.min(94, Math.round(base * 10) / 10)
  }, [])

  const chartData = useMemo(
    () => stocks[0]?.series.map((v, i) => ({ i, v })) ?? [],
    [],
  )

  return (
    <div
      className="startup-founder-root relative min-h-full overflow-hidden text-base-content"
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <style>{`
        @keyframes sf-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes sf-float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes sf-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(12px, -8px) scale(1.05); }
          66% { transform: translate(-10px, 6px) scale(0.98); }
        }
        @keyframes sf-pulse-bar {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.92; filter: brightness(1.15); }
        }
        @keyframes sf-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes sf-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .startup-founder-root .sf-hero-mesh {
          background: linear-gradient(125deg, #1e1b4b 0%, #312e81 25%, #4c1d95 50%, #831843 75%, #0f172a 100%);
          background-size: 240% 240%;
          animation: sf-gradient 14s ease infinite;
        }
        .startup-founder-root .sf-hero-mesh::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(2, 6, 23, 0.72) 0%, rgba(15, 23, 42, 0.45) 42%, rgba(15, 23, 42, 0.25) 100%);
          pointer-events: none;
        }
        .startup-founder-root .sf-hero-text {
          color: #f8fafc;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.55), 0 2px 24px rgba(0, 0, 0, 0.35);
        }
        .startup-founder-root .sf-hero-title-gradient {
          background-image: linear-gradient(90deg, #a5f3fc, #e879f9, #fde68a);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 20px rgba(0, 0, 0, 0.4));
        }
        .startup-founder-root .sf-orb {
          animation: sf-drift 18s ease-in-out infinite;
        }
        .startup-founder-root .sf-rocket {
          animation: sf-float 3.2s ease-in-out infinite;
        }
        .startup-founder-root .sf-runway-fill {
          animation: sf-pulse-bar 2.4s ease-in-out infinite;
        }
        .startup-founder-root .sf-dial {
          animation: sf-spin-slow 28s linear infinite;
        }
        .startup-founder-root .sf-marquee-track {
          animation: sf-marquee 32s linear infinite;
        }
        .startup-founder-root .sf-stagger > * {
          animation: fadeIn 0.55s ease backwards;
        }
        .startup-founder-root .sf-stagger > *:nth-child(1) { animation-delay: 0.05s; }
        .startup-founder-root .sf-stagger > *:nth-child(2) { animation-delay: 0.1s; }
        .startup-founder-root .sf-stagger > *:nth-child(3) { animation-delay: 0.15s; }
        .startup-founder-root .sf-stagger > *:nth-child(4) { animation-delay: 0.2s; }
        .startup-founder-root .sf-stagger > *:nth-child(5) { animation-delay: 0.25s; }
        .startup-founder-root .sf-stagger > *:nth-child(6) { animation-delay: 0.3s; }
        .startup-founder-root .sf-stagger > *:nth-child(7) { animation-delay: 0.35s; }
        .startup-founder-root .sf-stagger > *:nth-child(8) { animation-delay: 0.4s; }
        .startup-founder-root .sf-stagger > *:nth-child(9) { animation-delay: 0.45s; }
        .startup-founder-root .sf-stagger > *:nth-child(10) { animation-delay: 0.5s; }
      `}</style>

      <div className="sf-hero-mesh relative isolate border-b border-base-content/10 px-4 py-8 sm:px-8">
        <FloatingOrb className="sf-orb -left-20 top-10 h-56 w-56 bg-secondary" delay={0} />
        <FloatingOrb className="sf-orb right-0 top-24 h-72 w-72 bg-primary" delay={2} />
        <FloatingOrb className="sf-orb bottom-0 left-1/3 h-48 w-48 bg-accent" delay={4} />

        <svg
          className="pointer-events-none absolute right-[8%] top-6 z-0 h-32 w-48 opacity-[0.14] sm:h-40 sm:w-56"
          viewBox="0 0 200 120"
          fill="none"
          aria-hidden
        >
          <path
            d="M8 100 Q 40 95 55 88 T 90 70 T 120 45 T 155 25 L 192 8"
            stroke="#f8fafc"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="192" cy="8" r="5" fill="#f472b6" />
        </svg>

        <div className="sf-hero-text relative z-[1] mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl rounded-3xl bg-slate-950/55 px-5 py-5 ring-1 ring-white/15 backdrop-blur-md sm:px-6 sm:py-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="badge border-white/35 bg-slate-950/50 text-sm font-medium text-white">Pre-revenue* (*in our hearts)</span>
              <span className="badge badge-accent badge-sm gap-1 border-0 font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Live deck
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
              Founder
              <span className="sf-hero-title-gradient"> Command </span>
              Center
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
              Same inbox, weather, headlines & tickers — reframed as runway, offsite radar, market signal, and cap-table pulse.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            <div className="sf-rocket flex items-center gap-3 rounded-2xl border border-white/20 bg-slate-950/50 px-4 py-3 shadow-lg ring-1 ring-white/10 backdrop-blur-md">
              <span className="text-4xl" aria-hidden>
                🚀
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/75">Launch vibe</p>
                <p className="text-lg font-bold text-white">Hypergrowth (narrative)</p>
              </div>
            </div>
            <button
              type="button"
              className="btn border-white/50 bg-slate-950/40 text-white hover:border-white hover:bg-white/15"
              onClick={onSwitchPersona}
            >
              Switch persona
            </button>
          </div>
        </div>

        <div className="relative z-[1] mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card border border-white/15 bg-slate-950/60 text-white shadow-xl backdrop-blur-md">
            <div className="card-body gap-3 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/65">Runway ( vibes )</p>
              <progress className="sf-runway-fill progress progress-secondary h-3 w-full" value={runwayPct} max="100" />
              <p className="text-2xl font-black tabular-nums text-white" style={{ fontFamily: 'var(--font-display)' }}>
                {runwayPct}%
                <span className="ml-2 text-sm font-semibold text-white/70">optimism meter</span>
              </p>
            </div>
          </div>
          <div className="card border border-white/15 bg-slate-950/60 text-white shadow-xl backdrop-blur-md">
            <div className="card-body gap-1 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/65">Deal flow</p>
              <p className="text-3xl font-black tabular-nums text-white" style={{ fontFamily: 'var(--font-display)' }}>
                {unread}
              </p>
              <p className="text-sm text-white/80">unread “opportunities” in the pipeline</p>
            </div>
          </div>
          <div className="card border border-white/15 bg-slate-950/60 text-white shadow-xl backdrop-blur-md">
            <div className="card-body gap-2 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/65">Offsite conditions</p>
              <p className="text-3xl" aria-hidden>
                {weather.icon}
              </p>
              <p className="text-lg font-bold text-white">
                {weather.temp}°C · {weather.city}
              </p>
              <p className="text-sm text-white/80">{weather.condition}</p>
            </div>
          </div>
          <div className="card relative overflow-hidden border border-white/15 bg-slate-950/60 text-white shadow-xl backdrop-blur-md">
            <div className="sf-dial pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border-2 border-dashed border-white/20" aria-hidden />
            <div className="card-body gap-1 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/65">Team morale</p>
              <p className="text-3xl font-black text-cyan-300" style={{ fontFamily: 'var(--font-display)' }}>
                Delusional
              </p>
              <p className="text-sm text-white/80">in a good way · pizza Friday pending</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-base-200/80 px-4 py-8 sm:px-8">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} aria-hidden />

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-base-content/10 bg-base-300/50 py-2">
          <div className="sf-marquee-track flex w-max gap-12 whitespace-nowrap text-sm font-medium text-base-content/80">
            {[...news, ...news].map((n, i) => (
              <span key={`${n.id}-${i}`} className="inline-flex items-center gap-2">
                <span>{n.emoji}</span>
                <span>{n.title}</span>
                <span className="opacity-50">· {n.source}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <div className="mb-4 flex items-end justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  Inbox · deal flow
                </h2>
                <p className="text-sm text-base-content/60">Click a thread — every email is a “strategic initiative” now.</p>
              </div>
              <span className="badge badge-lg badge-outline">{emails.length} threads</span>
            </div>
            <ul className="sf-stagger flex flex-col gap-3">
              {emails.map((email) => {
                const vibe = tagVibe[email.tag] ?? { label: '📎 Misc', badge: 'badge-ghost' }
                const active = selectedEmail?.id === email.id
                return (
                  <li key={email.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(email)}
                      className={`card card-border w-full text-left transition-all duration-200 hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] ${
                        active ? 'border-primary bg-primary/10 ring-2 ring-primary/30' : 'border-base-content/10 bg-base-100'
                      }`}
                    >
                      <div className="card-body flex-row items-start gap-4 p-4">
                        <span className="text-3xl drop-shadow-sm" aria-hidden>
                          {email.from.avatar}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`badge badge-sm ${vibe.badge}`}>{vibe.label}</span>
                            {!email.read && <span className="badge badge-error badge-sm">Unblocked?</span>}
                            {email.starred && <span className="badge badge-warning badge-sm">Warm intro</span>}
                          </div>
                          <p className={`mt-2 line-clamp-2 font-semibold ${email.read ? 'text-base-content/80' : 'text-base-content'}`}>{email.subject}</p>
                          <p className="mt-1 truncate text-sm text-base-content/50">
                            {email.from.name} · {email.time}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          <aside className="flex flex-col gap-6 lg:col-span-5">
            <div className="card border border-base-content/10 bg-base-100 shadow-md">
              <div className="card-body gap-4 p-5">
                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  Thread deep-dive
                </h3>
                {selectedEmail ? (
                  <>
                    <div className="flex items-start gap-3">
                      <span className="text-4xl">{selectedEmail.from.avatar}</span>
                      <div>
                        <p className="font-bold">{selectedEmail.subject}</p>
                        <p className="text-sm text-base-content/60">From {selectedEmail.from.name}</p>
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto rounded-xl bg-base-200/80 p-4 text-sm leading-relaxed whitespace-pre-line">{selectedEmail.body}</div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className="btn btn-primary btn-sm">
                        Reply “looping in”
                      </button>
                      <button type="button" className="btn btn-ghost btn-sm">
                        Schedule “quick sync”
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-base-content/50">
                    <span className="text-4xl">🧭</span>
                    <p className="font-medium">Pick an email to align stakeholders</p>
                  </div>
                )}
              </div>
            </div>

            <div className="card border border-base-content/10 bg-gradient-to-br from-base-100 to-secondary/5 shadow-md">
              <div className="card-body gap-3 p-5">
                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  5-day offsite forecast
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {weather.forecast.map((d) => (
                    <div key={d.day} className="rounded-xl bg-base-200/80 px-2 py-3 text-center text-xs">
                      <p className="font-bold text-base-content/70">{d.day}</p>
                      <p className="my-1 text-lg">{d.icon}</p>
                      <p className="tabular-nums text-base-content/60">
                        {d.high}° / {d.low}°
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card border border-base-content/10 bg-base-100 shadow-md">
              <div className="card-body gap-4 p-5">
                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  Cap table pulse
                </h3>
                {stocks.map((s) => (
                  <div key={s.ticker} className="rounded-xl border border-base-content/5 bg-base-200/40 p-3">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-bold">{s.ticker}</span>
                      <span className={s.changePct >= 0 ? 'font-semibold text-success' : 'font-semibold text-error'}>
                        {s.changePct >= 0 ? '+' : ''}
                        {s.changePct.toFixed(2)}%
                      </span>
                    </div>
                    <div className="h-14 w-full">
                      <ResponsiveContainer width="100%" height="100%" debounce={50}>
                        <AreaChart data={s.series.map((v, i) => ({ v, i }))} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id={`sf-${s.ticker}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent2)'} stopOpacity={0.35} />
                              <stop offset="100%" stopColor={s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent2)'} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <YAxis hide domain={['dataMin', 'dataMax']} />
                          <Tooltip
                            contentStyle={{ borderRadius: 8, fontSize: 12 }}
                            formatter={(v) => [`${s.currency}${Number(v).toFixed(2)}`, s.ticker]}
                          />
                          <Area type="monotone" dataKey="v" stroke={s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent2)'} fill={`url(#sf-${s.ticker})`} strokeWidth={1.5} isAnimationActive />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card border border-base-content/10 bg-base-100 shadow-md">
              <div className="card-body gap-3 p-5">
                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  Market signal (news)
                </h3>
                <ul className="flex flex-col gap-3">
                  {news.slice(0, 5).map((n) => (
                    <li key={n.id} className="flex gap-3 rounded-xl bg-base-200/50 p-3 transition-colors hover:bg-base-200">
                      <span className="text-2xl shrink-0">{n.emoji}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-snug">{n.title}</p>
                        <p className="mt-1 text-xs text-base-content/50">
                          {n.source} · {n.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card border border-dashed border-primary/30 bg-primary/5">
              <div className="card-body items-center p-5 text-center">
                <p className="text-sm font-semibold text-base-content/70">Hockey stick preview (because investors ask)</p>
                <div className="mt-3 h-28 w-full max-w-xs">
                  <ResponsiveContainer width="100%" height="100%" debounce={50}>
                    <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="sf-hockey" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <YAxis hide domain={['dataMin', 'dataMax']} />
                      <Area type="monotone" dataKey="v" stroke="var(--accent)" fill="url(#sf-hockey)" strokeWidth={2} isAnimationActive />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-2 text-xs italic text-base-content/50">Not financial advice · definitely slide advice</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
