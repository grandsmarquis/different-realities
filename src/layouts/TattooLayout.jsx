import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

function sparkColor(pct) {
  return pct >= 0 ? 'var(--accent2)' : 'var(--accent3)'
}

function NeedleBadge() {
  return (
    <svg className="tt-needle-draw h-8 w-24 text-[var(--accent2)]" viewBox="0 0 96 32" fill="none" aria-hidden>
      <path
        d="M4 16h72M76 16l12-6v12l-12-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FlashCard({ email, onOpen }) {
  const tilt = ((email.id % 5) - 2) * 1.2
  const unread = !email.read
  return (
    <button
      type="button"
      onClick={() => onOpen(email)}
      className="group relative w-full overflow-hidden border-2 p-4 text-left transition-transform duration-200 hover:z-10 hover:scale-[1.03]"
      style={{
        transform: `rotate(${tilt}deg)`,
        borderColor: unread ? 'var(--accent3)' : 'var(--border)',
        background: 'linear-gradient(165deg, rgba(168,85,247,0.08) 0%, var(--card) 45%, #080a10 100%)',
        boxShadow: unread
          ? '0 0 28px rgba(244,114,182,0.2), inset 0 1px 0 rgba(255,255,255,0.06)'
          : 'inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-50"
        style={{ background: 'var(--accent)' }}
        aria-hidden
      />
      <div className="relative z-[1] flex items-start justify-between gap-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--accent2)]">Flash #{String(email.id).padStart(2, '0')}</span>
        {unread && (
          <span className="rounded-sm bg-[var(--accent3)]/25 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-[var(--accent3)]">
            wet ink
          </span>
        )}
      </div>
      <p className="relative z-[1] mt-3 line-clamp-3 text-base leading-snug text-slate-100" style={{ fontFamily: 'var(--font-display)' }}>
        {email.subject}
      </p>
      <p className="relative z-[1] mt-2 text-xs text-[var(--text2)]">@{email.from.name}</p>
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px opacity-60"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
        }}
        aria-hidden
      />
    </button>
  )
}

function StencilModal({ email, onClose }) {
  if (!email) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(3, 3, 8, 0.92)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="tt-stencil relative max-h-[88vh] w-full max-w-lg overflow-y-auto border-2 border-cyan-500/40 bg-[#e8eef8] p-6 text-slate-900 shadow-[0_0_60px_rgba(34,211,238,0.15)]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tt-stencil-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-slate-400 text-slate-700"
          aria-label="Close"
        >
          ✕
        </button>
        <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.35em] text-slate-500">Transfer sheet · approved stencil</p>
        <h2 id="tt-stencil-title" className="mt-2 text-center text-2xl leading-tight text-slate-900 md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
          {email.subject}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Client · {email.from.name} · {email.date} {email.time}
        </p>
        <div className="my-5 border-t-2 border-dashed border-slate-400" />
        <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-800">{email.body}</div>
        <p className="mt-6 text-center font-mono text-xs uppercase tracking-widest text-slate-500">single use · do not iron</p>
      </div>
    </div>
  )
}

function WeatherNeon() {
  return (
    <div
      className="tt-neon-frame relative overflow-hidden rounded-lg border-2 p-4"
      style={{
        borderColor: 'var(--accent2)',
        background: 'linear-gradient(180deg, #0f172a 0%, var(--card) 100%)',
        boxShadow: '0 0 24px rgba(34, 211, 238, 0.12), inset 0 0 40px rgba(168, 85, 247, 0.05)',
      }}
    >
      <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[var(--accent2)]">Front window</p>
      <div className="mt-3 flex items-center gap-4">
        <span className="tt-weather-pulse text-5xl">{weather.icon}</span>
        <div>
          <p className="text-3xl font-bold text-white">{weather.temp}°</p>
          <p className="text-sm text-slate-400">{weather.condition}</p>
          <p className="mt-1 text-xs text-slate-500">
            {weather.city} · wind {weather.wind} · {weather.humidity}% RH
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {weather.forecast.map((d) => (
          <div key={d.day} className="flex min-w-[2.75rem] flex-col items-center rounded border border-slate-700 bg-slate-950/60 py-1">
            <span className="text-[0.55rem] text-slate-500">{d.day}</span>
            <span className="text-base">{d.icon}</span>
            <span className="text-[0.6rem] text-cyan-200/80">{d.high}°</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StockInk({ s }) {
  const data = s.series.map((v, i) => ({ v, i }))
  const up = s.changePct >= 0
  return (
    <div
      className="rounded border border-slate-800 bg-slate-950/80 p-2"
      style={{ boxShadow: up ? 'inset 0 -2px 0 rgba(34,211,238,0.35)' : 'inset 0 -2px 0 rgba(244,114,182,0.35)' }}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="font-mono text-xs font-bold text-slate-200">{s.ticker}</span>
        <span className={`text-xs font-mono ${up ? 'text-cyan-400' : 'text-pink-400'}`}>
          {up ? '+' : ''}
          {s.changePct.toFixed(2)}%
        </span>
      </div>
      <p className="line-clamp-1 text-[0.6rem] text-slate-500">{s.name}</p>
      <p className="font-mono text-sm text-white">
        {s.currency}
        {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </p>
      <div className="mt-1 h-9 w-full">
        <ResponsiveContainer width="100%" height={36} debounce={50}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="v" stroke={sparkColor(s.changePct)} strokeWidth={1.5} dot={false} isAnimationActive={false} />
            <Tooltip
              formatter={(v) => [`${s.currency}${Number(v).toFixed(2)}`, '']}
              contentStyle={{
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: 6,
                fontSize: 11,
                color: '#f1f5f9',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default function TattooLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const fresh = emails.filter((e) => !e.read).length

  return (
    <div
      className="relative min-h-screen overflow-x-hidden pb-12"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: 'radial-gradient(ellipse 100% 80% at 50% -30%, rgba(168,85,247,0.22) 0%, var(--bg) 50%, #010105 100%)',
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="tt-ink-pulse pointer-events-none fixed -left-32 bottom-0 h-[50vh] w-[50vh] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'var(--accent)' }}
        aria-hidden
      />
      <div
        className="tt-ink-pulse-delay pointer-events-none fixed -right-20 top-1/3 h-[40vh] w-[40vh] rounded-full opacity-15 blur-[100px]"
        style={{ background: 'var(--accent2)' }}
        aria-hidden
      />

      <header className="relative z-10 border-b border-slate-800/80 px-4 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap items-end gap-6">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.45em] text-[var(--accent)]">Needle &amp; Noir</p>
              <h1 className="mt-1 text-4xl text-white sm:text-6xl" style={{ fontFamily: 'var(--font-display)' }}>
                Flash mail
              </h1>
              <p className="mt-2 max-w-md text-sm text-[var(--text2)]">
                Pick a sheet off the wall — {fresh} piece{fresh !== 1 ? 's' : ''} still wet. Same inbox, different skin.
              </p>
            </div>
            <NeedleBadge />
          </div>
          <button
            type="button"
            onClick={onSwitchPersona}
            className="tt-exit-btn btn border-2 border-[var(--accent2)] bg-transparent font-bold uppercase tracking-widest text-[var(--accent2)] hover:bg-[var(--accent2)]/10"
          >
            Close shop
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <section className="lg:col-span-8">
            <div className="mb-4 flex items-end justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">Flash wall</h2>
                <p className="text-xs text-slate-500">Tap a card to peel the stencil</p>
              </div>
              <span className="text-2xl opacity-80" aria-hidden>
                🖋️
              </span>
            </div>
            <div className="columns-1 gap-4 sm:columns-2">
              {emails.map((email) => (
                <div key={email.id} className="mb-4 break-inside-avoid">
                  <FlashCard email={email} onOpen={setSelectedEmail} />
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-5 lg:col-span-4">
            <WeatherNeon />
            <div>
              <p className="mb-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--accent)]">Aftercare fund</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
                {stocks.map((s) => (
                  <StockInk key={s.ticker} s={s} />
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
              <p className="mb-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--accent3)]">Shop stereo · headlines</p>
              <ul className="space-y-3">
                {news.map((n) => (
                  <li key={n.id} className="flex gap-2 text-sm leading-snug text-slate-300">
                    <span className="shrink-0 text-base">{n.emoji}</span>
                    <span>
                      <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-[var(--accent2)]">
                        {n.category}
                      </span>
                      <span className="mt-1 block text-slate-400">{n.title}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <StencilModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
