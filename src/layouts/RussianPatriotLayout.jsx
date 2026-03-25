import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const patriotHeadlines = [
  'Our scientists will surely surpass theirs — the West trembles!',
  'Victory on the pitch! The ball obeyed the motherland!',
  'American electric car? We have snowmobiles of the soul!',
  'The sun shines warmer when you believe in it — record patriot heat!',
  'Cinema is culture; culture is strength — 22 films, zero doubt!',
  'Silicon? We have birch chips — and they work harder!',
]

export default function RussianPatriotLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter(e => !e.read).length
  const tickerText = [...news.map(n => `${n.emoji} ${n.title}`), ...stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '↑' : '↓'} ${s.changePct.toFixed(2)}%`)].join('   ·   ')

  return (
    <div
      className="russian-patriot-root min-h-screen overflow-x-hidden text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main)',
        background: `
          radial-gradient(ellipse 120% 80% at 50% -20%, rgba(255,193,7,0.18) 0%, transparent 55%),
          linear-gradient(180deg, #0a1628 0%, #0d1b2a 35%, #1b263b 70%, #0d1321 100%)
        `,
      }}
    >
      <style>{`
        @keyframes rp-star-spin {
          from { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.08); }
          to { transform: rotate(360deg) scale(1); }
        }
        @keyframes rp-shine {
          0%, 100% { opacity: 0.35; transform: translateX(-100%); }
          50% { opacity: 0.85; transform: translateX(100%); }
        }
        @keyframes rp-float-bear {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-12px) rotate(6deg); }
        }
        @keyframes rp-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes rp-stripe-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes rp-pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,193,7,0.25), 0 0 40px rgba(211,47,47,0.15); }
          50% { box-shadow: 0 0 32px rgba(255,193,7,0.45), 0 0 60px rgba(211,47,47,0.25); }
        }
        .russian-patriot-root .rp-ticker-track {
          animation: rp-ticker 55s linear infinite;
        }
        .russian-patriot-root .rp-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 16px 40px rgba(0,0,0,0.45), 0 0 0 2px rgba(255,193,7,0.35);
        }
      `}</style>

      {/* Tricolor + shimmer bar */}
      <div
        className="h-2 w-full"
        style={{
          background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 33.33%, #0039a6 33.33%, #0039a6 66.66%, #d52b1e 66.66%, #d52b1e 100%)',
          backgroundSize: '200% 100%',
          animation: 'rp-stripe-shimmer 8s ease-in-out infinite',
        }}
      />

      <header className="relative px-4 py-6 sm:px-8">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-40"
          aria-hidden
        >
          <div
            className="absolute -left-1/4 top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-[#ffc107]/30 to-transparent"
            style={{ animation: 'rp-shine 4s ease-in-out infinite' }}
          />
        </div>

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap items-start gap-4">
            <div
              className="flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-[#ffc107] bg-[#d32f2f]/90 text-3xl sm:size-20 sm:text-4xl"
              style={{ animation: 'rp-star-spin 12s linear infinite' }}
              aria-hidden
            >
              ⭐
            </div>
            <div>
              <p
                className="mb-1 text-xs uppercase tracking-[0.35em] text-[#ffc107] sm:text-sm"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Родина · digital command
              </p>
              <h1
                className="text-3xl uppercase leading-tight tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Слава!
                <span className="block text-lg font-normal normal-case tracking-normal text-[var(--text2)] sm:text-xl">
                  Your inbox — fortified. Your stocks — unbreakable. Your news — glorious.
                </span>
              </h1>
              <p className="mt-2 text-sm text-[var(--text2)]">
                {unread} official messages await your decisive reading · Motherland-approved layout
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="hidden text-4xl sm:inline-block"
              style={{ animation: 'rp-float-bear 3s ease-in-out infinite' }}
              aria-hidden
            >
              🐻
            </span>
            <button
              type="button"
              className="btn btn-sm border-[#3949ab] bg-[#1a237e]/80 text-[var(--text)] hover:border-[#ffc107] hover:bg-[#283593]"
              onClick={onSwitchPersona}
            >
              сменить личность
            </button>
          </div>
        </div>

        {/* Silhouette skyline */}
        <svg
          className="mt-4 h-10 w-full text-[#1e3a5f] opacity-80 sm:h-14"
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path fill="currentColor" d="M0 40h400V28H0z" opacity="0.5" />
          {[0, 28, 56, 84, 112, 140, 168, 196, 224, 252, 280, 308, 336, 364].map((x, i) => {
            const h = 12 + (i % 4) * 4
            const w = 18 + (i % 3) * 4
            return (
              <path
                key={x}
                fill="currentColor"
                d={`M${x} 40 V${40 - h} Q${x + w / 2} ${40 - h - 10} ${x + w} ${40 - h} V40 H${x}Z`}
              />
            )
          })}
        </svg>
      </header>

      {/* Ticker */}
      <div className="border-y border-[#3949ab]/60 bg-[#0d1b2a]/95 py-2">
        <div className="overflow-hidden whitespace-nowrap">
          <div
            className="rp-ticker-track inline-block text-xs uppercase tracking-wider text-[#ffc107]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="inline-block pr-16">{tickerText}</span>
            <span className="inline-block pr-16">{tickerText}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
          {/* Inbox */}
          <main className="lg:col-span-7 xl:col-span-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl" aria-hidden>📮</span>
              <h2
                className="text-xl uppercase tracking-wide text-white sm:text-2xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Государственная почта
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {emails.map((email, i) => (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="rp-card group relative rounded-box border border-[#3949ab]/50 bg-gradient-to-br from-[#fafafa] to-[#e8eaf6] p-4 text-left text-[#1a237e] transition-all duration-200"
                  style={{
                    animation: i === 0 ? 'rp-pulse-glow 3s ease-in-out infinite' : undefined,
                  }}
                >
                  <div className="absolute -right-1 -top-1 flex size-10 items-center justify-center rounded-full border-2 border-[#d32f2f] bg-[#ffc107]/90 text-lg shadow-md transition-transform group-hover:rotate-12">
                    ✉️
                  </div>
                  {!email.read && (
                    <span className="badge badge-sm mb-2 border-0 bg-[#d32f2f] text-white">НОВОЕ</span>
                  )}
                  <p
                    className="text-[10px] uppercase tracking-widest text-[#3949ab]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    от: {email.from.name}
                  </p>
                  <p className="mt-1 font-semibold leading-snug text-[#0d1b2a]">{email.subject}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-[#3949ab]/90">{email.preview}</p>
                  <div className="mt-3 flex justify-between border-t border-dashed border-[#3949ab]/30 pt-2 text-xs text-[#5c6bc0]">
                    <span>{email.date}</span>
                    <span className="uppercase">{email.tag}</span>
                  </div>
                </button>
              ))}
            </div>
          </main>

          <aside className="flex flex-col gap-6 lg:col-span-5 xl:col-span-4">
            {/* Weather */}
            <div
              className="card border-2 border-[#0039a6] bg-gradient-to-br from-[#1a237e] to-[#0d1b2a] shadow-xl"
              style={{ animation: 'rp-pulse-glow 4s ease-in-out infinite' }}
            >
              <div className="card-body gap-3 p-5 text-[var(--text)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg uppercase text-[#ffc107]" style={{ fontFamily: 'var(--font-display)' }}>
                    Погода Родины
                  </h3>
                  <span className="text-3xl" aria-hidden>{weather.icon}</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {weather.temp}°C
                  <span className="ml-2 text-lg font-normal text-[var(--text2)]">({weather.city})</span>
                </p>
                <p className="text-[var(--text2)] italic">&ldquo;{weather.condition}&rdquo; — nature salutes you.</p>
                <div className="flex flex-wrap gap-2 border-t border-[#3949ab]/50 pt-3 text-sm">
                  <span className="badge badge-outline border-[#ffc107] text-[#ffc107]">ветер {weather.wind} km/h</span>
                  <span className="badge badge-outline border-[#5c6bc0] text-[var(--text2)]">влажность {weather.humidity}%</span>
                </div>
                <div className="flex gap-1 pt-2">
                  {weather.forecast.slice(0, 5).map(d => (
                    <div key={d.day} className="flex flex-1 flex-col items-center rounded bg-[#0d1b2a]/80 px-1 py-2 text-center text-[10px] text-[var(--text2)]">
                      <span className="text-[#ffc107]" style={{ fontFamily: 'var(--font-display)' }}>{d.day}</span>
                      <span className="text-lg leading-none">{d.icon}</span>
                      <span>{d.high}°</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stocks */}
            <div className="card border border-[#3949ab]/60 bg-[#16213e]/90">
              <div className="card-body gap-3 p-5">
                <h3 className="text-lg uppercase text-[#ffc107]" style={{ fontFamily: 'var(--font-display)' }}>
                  Экономика стальная
                </h3>
                <ul className="space-y-3">
                  {stocks.map(s => (
                    <li
                      key={s.ticker}
                      className="flex items-center justify-between rounded-lg bg-[#0d1b2a]/70 px-3 py-2"
                    >
                      <span className="text-white" style={{ fontFamily: 'var(--font-display)' }}>{s.ticker}</span>
                      <span
                        className={`font-semibold ${s.changePct >= 0 ? 'text-[#69f0ae]' : 'text-[#ff8a80]'}`}
                      >
                        {s.changePct >= 0 ? '↑' : '↓'} {Math.abs(s.changePct).toFixed(2)}%
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-center text-xs text-[var(--text2)]">Numbers march forward with confidence.</p>
              </div>
            </div>

            {/* News */}
            <div className="card border border-[#d32f2f]/40 bg-gradient-to-b from-[#1b263b] to-[#0d1321]">
              <div className="card-body gap-0 p-0">
                <div className="border-b border-[#d32f2f]/30 bg-[#d32f2f]/20 px-5 py-3">
                  <h3
                    className="text-lg uppercase tracking-wide text-[#ffc107]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Свежие вести
                  </h3>
                </div>
                <ul className="divide-y divide-[#3949ab]/30">
                  {news.map((n, i) => (
                    <li key={n.id} className="flex gap-3 px-5 py-4">
                      <span className="text-2xl shrink-0" aria-hidden>{n.emoji}</span>
                      <div>
                        <p className="text-sm font-medium leading-snug text-white">{patriotHeadlines[i] ?? n.title}</p>
                        <p className="mt-1 text-xs text-[var(--text2)]">
                          {n.source} · {n.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ background: 'rgba(10, 10, 18, 0.88)' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="rp-modal-title"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-box border-4 border-[#0039a6] bg-gradient-to-b from-white to-[#e8eaf6] p-6 text-[#1a237e] shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between border-b-2 border-dashed border-[#d32f2f]/50 pb-3">
              <span
                className="text-xs uppercase tracking-[0.2em] text-[#d32f2f]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                секретно · для глаз патриота
              </span>
              <span className="text-2xl" aria-hidden>🛡️</span>
            </div>
            <h2
              id="rp-modal-title"
              className="text-xl uppercase leading-tight text-[#0d1b2a]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {selectedEmail.subject}
            </h2>
            <p className="mt-2 text-sm text-[#3949ab]">
              от <strong>{selectedEmail.from.name}</strong> · {selectedEmail.date} · {selectedEmail.time}
            </p>
            <pre
              className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[#1a237e]"
              style={{ fontFamily: 'var(--font-main)' }}
            >
              {selectedEmail.body}
            </pre>
            <button
              type="button"
              className="btn btn-primary mt-6 w-full border-0 bg-[#d32f2f] hover:bg-[#b71c1c]"
              onClick={() => setSelectedEmail(null)}
            >
              долг выполнен
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
