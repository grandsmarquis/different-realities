import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function Insomnia3amLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="insomnia-float-ui relative min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251,191,36,0.08) 0%, transparent 50%), linear-gradient(180deg, #0c1222 0%, #0a0f1a 50%, #060912 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 text-[18rem] opacity-[0.06] select-none" aria-hidden>
        🌙
      </div>
      <div className="insomnia-twinkle pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-5 backdrop-blur-md">
        <div>
          <p className="text-xs tracking-[0.4em] text-[var(--text2)]">local time feeling</p>
          <div className="flex items-baseline gap-3">
            <span className="text-[clamp(2rem,6vw,3.5rem)] font-semibold tabular-nums text-[var(--accent)]">3:07</span>
            <span className="text-sm text-[var(--text2)]">AM · why are you awake</span>
          </div>
        </div>
        <button type="button" className="btn btn-ghost btn-sm text-[var(--text2)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]" onClick={onSwitchPersona}>
          try sleep mode
        </button>
      </header>

      <div className="relative z-10 px-5 pb-16 pt-6">
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-[var(--text2)]">
          The blue-light filter is on. The brain is off. Scroll once. Scroll again. The inbox does not judge — it only accumulates.
        </p>

        <div className="grid gap-8 lg:grid-cols-12">
          <main className="lg:col-span-7 lg:col-start-2">
            <ul className="space-y-4">
              {emails.map((email, i) => (
                <li key={email.id} className="insomnia-row-drift" style={{ animationDelay: `${i * 0.15}s` }}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    className="w-full rounded-2xl border border-[var(--border)]/60 bg-[var(--card)]/40 px-5 py-4 text-left backdrop-blur-sm transition hover:border-[var(--accent)]/40 hover:bg-[var(--card)]/60"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl opacity-90">{email.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-[var(--text)]">{email.subject}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-[var(--text2)]">{email.preview}</p>
                      </div>
                      {!email.read && <span className="badge badge-warning badge-outline">unread</span>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </main>

          <aside className="lg:col-span-3 space-y-4 text-sm text-[var(--text2)]">
            <div className="rounded-2xl border border-[var(--border)]/50 bg-[var(--bg2)]/50 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wider text-[var(--accent)]">outside is tomorrow</p>
              <p className="mt-2 text-lg text-[var(--text)]">
                {weather.icon} {weather.temp}°C
              </p>
              <p>{weather.condition}</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)]/50 bg-[var(--bg2)]/40 p-4">
              <p className="text-xs text-[var(--text2)]">numbers scrolling on another screen</p>
              {stocks.map(s => (
                <p key={s.ticker} className="mt-2 font-mono text-xs text-[var(--text)]">
                  {s.ticker} {s.changePct >= 0 ? '+' : ''}
                  {s.changePct.toFixed(2)}%
                </p>
              ))}
            </div>
            <div className="rounded-2xl border border-[var(--border)]/40 p-3 text-xs leading-relaxed">
              {news[0]?.emoji} {news[0]?.title}
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/85 p-5" onClick={() => setSelectedEmail(null)}>
          <div
            className="insomnia-modal-glow max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[var(--accent)]/30 bg-[var(--card)]/95 p-6 text-[var(--text)] shadow-[0_0_60px_rgba(251,191,36,0.12)] backdrop-blur-md"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-xs text-[var(--text2)]">one more tab couldn’t hurt</p>
            <h2 className="mt-2 text-xl font-medium">{selectedEmail.subject}</h2>
            <p className="mt-1 text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]/90">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-outline btn-sm mt-6 border-[var(--border)] text-[var(--text2)]" onClick={() => setSelectedEmail(null)}>
              close… or don’t
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
