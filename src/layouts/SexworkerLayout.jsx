import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function SexworkerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: 'linear-gradient(165deg, var(--bg2) 0%, var(--bg) 45%, #0a050c 100%)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}
    >
      <div className="velvet-shimmer pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 0%, var(--accent2), transparent 55%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row">
        <aside className="relative w-full border-b p-5 lg:w-72 lg:border-b-0 lg:border-r" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--card) 85%, transparent)' }}>
          <div className="relative mb-6 overflow-hidden rounded-box border p-4" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}>
            <div className="relative h-24">
              {[0, 1, 2, 3, 4].map(i => (
                <span
                  key={i}
                  className="champagne-bubble"
                  style={{ left: `${10 + i * 18}%`, bottom: 0, animationDelay: `${i * 0.4}s` }}
                  aria-hidden
                />
              ))}
            </div>
            <p className="text-center text-[10px] uppercase tracking-[0.35em]" style={{ color: 'var(--accent2)' }}>
              After-hours desk
            </p>
            <h1 className="mt-2 text-center text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              Velvet Ledger
            </h1>
            <p className="mt-2 text-center text-xs opacity-70">{emails.length} discreet threads · you look fabulous</p>
            <button type="button" onClick={onSwitchPersona} className="btn btn-ghost btn-sm mt-4 w-full border border-white/10 text-xs tracking-widest">
              Curtain call
            </button>
          </div>

          <p className="mb-2 text-[10px] uppercase tracking-widest opacity-50">Tonight&apos;s queue</p>
          <ul className="space-y-2 overflow-y-auto lg:max-h-[calc(100dvh-320px)]">
            {emails.map(e => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className="group w-full rounded-box border px-3 py-3 text-left transition-all hover:brightness-110"
                  style={{
                    borderColor: selectedEmail?.id === e.id ? 'var(--accent2)' : 'var(--border)',
                    background: selectedEmail?.id === e.id ? 'color-mix(in srgb, var(--accent3) 70%, transparent)' : 'var(--card)',
                    boxShadow: selectedEmail?.id === e.id ? '0 0 24px color-mix(in srgb, var(--accent2) 25%, transparent)' : undefined,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl transition-transform group-hover:scale-110">{e.from.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                        {e.subject}
                      </p>
                      <p className="text-[10px] opacity-50">{e.from.name}</p>
                    </div>
                    {!e.read && <span className="badge badge-sm border-0" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>new</span>}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="relative flex min-w-0 flex-1 flex-col">
          <div className="flex flex-1 flex-col p-5 md:p-10">
            {selectedEmail ? (
              <article
                className="relative mx-auto w-full max-w-2xl rounded-box border-2 p-8 shadow-2xl md:p-12"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent2) 55%, transparent)',
                  background: 'linear-gradient(160deg, var(--card) 0%, color-mix(in srgb, var(--bg2) 40%, var(--card)) 100%)',
                  boxShadow: '0 25px 60px -20px rgba(0,0,0,0.55)',
                }}
              >
                <div className="absolute -top-3 left-8 rounded-full border px-3 py-0.5 text-[10px] uppercase tracking-widest" style={{ borderColor: 'var(--accent)', background: 'var(--bg)' }}>
                  Reserved
                </div>
                <header className="mb-8 border-b pb-6" style={{ borderColor: 'var(--border)' }}>
                  <h2 className="text-2xl md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                    {selectedEmail.subject}
                  </h2>
                  <p className="mt-3 text-sm opacity-70">
                    From <span className="text-[var(--text)]">{selectedEmail.from.name}</span> · {selectedEmail.date}
                  </p>
                </header>
                <div className="whitespace-pre-wrap leading-[1.75] opacity-90">{selectedEmail.body}</div>
                <footer className="mt-10 flex flex-wrap gap-2 border-t pt-6 text-xs opacity-70" style={{ borderColor: 'var(--border)' }}>
                  <span className="rounded-full border px-3 py-1" style={{ borderColor: 'var(--accent2)' }}>
                    Tip jar: metaphorical
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1">No screenshots, darling</span>
                </footer>
              </article>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 opacity-45">
                <span className="text-6xl">🥂</span>
                <p className="text-center text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                  Choose a name from the velvet list
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 border-t p-4 text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
            <span className="badge badge-outline gap-1" style={{ borderColor: 'var(--accent2)' }}>
              {weather.icon} {weather.temp}°
            </span>
            {stocks.map(s => (
              <span key={s.ticker} className="badge badge-ghost">
                {s.ticker} {s.changePct}%
              </span>
            ))}
            <span className="line-clamp-2 flex-1 opacity-60">{news[0]?.title}</span>
          </div>
        </main>
      </div>
    </div>
  )
}
