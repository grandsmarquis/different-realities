import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function ElonMuskLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const tickerText = [
    ...news.map(n => `${n.emoji} ${n.title}`),
    ...stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '↗' : '↘'} ${Math.abs(s.changePct)}%`),
    `${weather.city} ${weather.temp}°C ${weather.icon}`,
  ].join('     ·     ')

  return (
    <div
      className="elon-musk-root relative min-h-dvh overflow-x-hidden pb-36 text-sm"
      style={{
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
        background: '#050508',
      }}
    >
      <div className="elon-bg-stars pointer-events-none absolute inset-0" aria-hidden />
      <div className="elon-grid-scan pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
      <div className="elon-mars-glow pointer-events-none absolute -top-32 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-full blur-3xl" aria-hidden />

      <header className="relative z-10 border-b border-cyan-500/20 bg-black/50 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <div className="elon-rocket-wrap relative flex size-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-950/80 to-slate-950/90 shadow-[0_0_24px_rgba(34,211,238,0.25)]" aria-hidden>
              <svg className="elon-rocket-svg size-9 text-cyan-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 4L38 22H26L32 4Z" fill="currentColor" opacity="0.95" />
                <path d="M26 22H38L36 28H28L26 22Z" fill="currentColor" opacity="0.7" />
                <path d="M28 28L24 40L32 36L40 40L36 28H28Z" fill="currentColor" opacity="0.85" />
                <path className="elon-flame" d="M30 40L32 52L34 40" fill="#f97316" opacity="0.9" />
                <path d="M28 22L22 18L26 22M36 22L42 18L38 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-400/90">Multiplanetary_OS · v0.420.69</p>
              <h1 className="m-0 truncate text-2xl font-bold tracking-tight text-white md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                EVERYTHING_APP<span className="text-cyan-400">_BETA</span>
              </h1>
              <p className="m-0 mt-0.5 text-xs text-cyan-200/60">Hardcore inbox · Mars soon™ · probably fine</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="elon-weather-pill rounded-xl border border-orange-400/25 bg-orange-950/40 px-3 py-2 text-xs text-orange-100">
              <span className="font-bold uppercase tracking-wider text-orange-300">Launch window</span>
              <span className="mx-1.5 text-orange-400/50">|</span>
              <span className="text-lg" aria-hidden>{weather.icon}</span>
              <span className="ml-1 font-semibold">
                {weather.city} {weather.temp}°C
              </span>
              <span className="ml-2 hidden text-[10px] text-orange-200/70 sm:inline">humidity {weather.humidity}% · go fever: MAX</span>
            </div>
            <button
              type="button"
              className="btn btn-sm border-cyan-600/50 bg-cyan-950/60 text-cyan-100 hover:border-cyan-400 hover:bg-cyan-900/50"
              onClick={onSwitchPersona}
            >
              Abort to Earth
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-5 md:px-4">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <p className="m-0 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500/80">Meme coefficient · live</p>
          <span className="badge badge-outline border-cyan-500/40 bg-cyan-950/30 text-[10px] text-cyan-300">not financial advice from a rocket company</span>
        </div>
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stocks.map(s => (
            <div
              key={s.ticker}
              className={`elon-stock-card group relative overflow-hidden rounded-xl border px-3 py-3 ${
                s.changePct >= 0
                  ? 'border-cyan-500/35 bg-gradient-to-br from-cyan-950/50 to-slate-950/80'
                  : 'border-rose-500/35 bg-gradient-to-br from-rose-950/40 to-slate-950/80'
              }`}
            >
              <div className="absolute -right-4 -top-4 size-24 rounded-full bg-cyan-400/5 blur-2xl transition-opacity group-hover:opacity-100" aria-hidden />
              <div className="relative flex items-center justify-between gap-2">
                <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>{s.ticker}</span>
                <span className={s.changePct >= 0 ? 'font-mono text-cyan-300' : 'font-mono text-rose-300'}>
                  {s.changePct > 0 ? '+' : ''}
                  {s.changePct}%
                </span>
              </div>
              <div className="relative mt-2 flex justify-between gap-2">
                <p className="m-0 max-w-[55%] truncate text-[10px] uppercase text-base-content/45">{s.name}</p>
                <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#22d3ee' : '#fb7185'} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block size-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" aria-hidden />
              <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-cyan-500">Neural inbox · priority sort</p>
            </div>
            <div className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`elon-email-tile w-full rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
                      on
                        ? 'border-cyan-400/60 bg-cyan-950/50 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                        : 'border-white/10 bg-black/40 hover:border-cyan-500/30 hover:bg-cyan-950/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base">{e.from.avatar}</span>
                      {!e.read && (
                        <span className="badge badge-xs border-0 bg-cyan-500 text-black">NEW_SIGNAL</span>
                      )}
                    </div>
                    <p className={`m-0 mt-1 line-clamp-2 text-xs ${e.read ? 'text-base-content/55' : 'font-semibold text-white'}`}>{e.subject}</p>
                    <p className="m-0 text-[10px] text-cyan-600/80">{e.from.name}</p>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <article className="elon-email-panel rounded-xl border border-cyan-500/25 bg-black/55 p-5 backdrop-blur-sm">
                <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase">
                  <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-bold text-cyan-300">decoded_packet</span>
                  <span className="text-base-content/45">{selectedEmail.date}</span>
                  <span className="text-base-content/45">{selectedEmail.time}</span>
                </div>
                <h2 className="m-0 mt-3 text-lg font-bold text-white md:text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                  {selectedEmail.subject}
                </h2>
                <p className="m-0 mt-2 text-xs text-cyan-400/90">{selectedEmail.from.name}</p>
                <div className="mt-4 max-h-[min(52vh,480px)] overflow-y-auto border-l-2 border-cyan-500/40 pl-4 text-sm leading-relaxed text-base-content/90 whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>
              </article>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-cyan-500/20 text-cyan-700/60">
                Select a transmission
              </div>
            )}
          </main>

          <aside className="lg:col-span-3 space-y-4">
            <div className="rounded-xl border border-violet-500/25 bg-violet-950/20 p-4">
              <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-violet-300">Global sim feed</p>
              <ul className="mt-3 space-y-3 text-xs leading-snug">
                {news.map(n => (
                  <li key={n.id} className="border-l-2 border-violet-500/50 pl-2.5">
                    <span className="font-mono text-violet-400/90">{n.time}</span>
                    <span className="text-base-content/40"> · </span>
                    <span aria-hidden>{n.emoji}</span> {n.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="elon-mars-card rounded-xl border border-orange-500/20 bg-gradient-to-b from-orange-950/30 to-black/60 p-4">
              <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-orange-300">Mars prep (Earth stand-in)</p>
              <p className="m-0 mt-2 text-2xl font-bold text-white">
                {weather.temp}°C <span className="text-lg font-normal text-orange-200/80">feels {weather.feels_like}°C</span>
              </p>
              <p className="m-0 mt-1 text-xs text-orange-100/70">{weather.condition}</p>
              <ul className="mt-3 flex flex-wrap gap-2 p-0">
                {weather.forecast.slice(0, 4).map(f => (
                  <li key={f.day} className="list-none rounded-lg border border-orange-500/15 bg-black/30 px-2 py-1 text-center text-[10px] text-orange-100/90">
                    <span className="block text-base" aria-hidden>{f.icon}</span>
                    {f.day} {f.high}°
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <div className="elon-ticker-wrap fixed bottom-11 left-0 right-0 z-[90] overflow-hidden border-t border-white/10 bg-black py-2">
        <div className="elon-ticker-inner whitespace-nowrap text-xs font-semibold text-white/90">
          <span className="inline-block pr-20">{tickerText}</span>
          <span className="inline-block pr-20" aria-hidden>
            {tickerText}
          </span>
        </div>
      </div>
    </div>
  )
}
