import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function ShyIntrovertLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="shy-vignette relative min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 85% 75%, rgba(196,181,253,0.12) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 10% 20%, rgba(167,139,250,0.08) 0%, transparent 45%), var(--bg)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="shy-drift pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute left-[8%] top-[18%] h-32 w-32 rounded-full bg-[var(--accent)]/10 blur-3xl" />
        <div className="absolute right-[12%] top-[40%] h-48 w-48 rounded-full bg-[var(--accent2)]/10 blur-3xl shy-float-slow" />
      </div>

      <button
        type="button"
        className="btn btn-ghost btn-xs absolute left-4 top-4 z-20 border border-[var(--border)]/40 text-[var(--text2)] opacity-70 hover:opacity-100"
        onClick={onSwitchPersona}
      >
        …leave
      </button>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col justify-end px-5 pb-16 pt-20 sm:ml-auto sm:mr-6 sm:max-w-md">
        <p className="shy-fade-in mb-2 text-xs tracking-[0.35em] text-[var(--text2)]">hi. um.</p>
        <h1 className="shy-fade-in shy-fade-in-delay-1 mb-1 text-2xl font-medium text-[var(--text)]">your inbox is here</h1>
        <p className="shy-fade-in shy-fade-in-delay-2 mb-8 text-sm text-[var(--text2)]">only if you want to look. no pressure.</p>

        <ul className="shy-fade-in shy-fade-in-delay-3 space-y-3">
          {emails.map(email => (
            <li key={email.id}>
              <button
                type="button"
                onClick={() => setSelectedEmail(email)}
                className="shy-card group w-full rounded-2xl border border-[var(--border)]/50 bg-[var(--card)]/80 px-4 py-3 text-left shadow-sm backdrop-blur-md transition duration-500 hover:border-[var(--accent)]/40 hover:bg-[var(--card)] hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl opacity-80 transition group-hover:scale-110">{email.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--text)]">{email.subject}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-[var(--text2)]">{email.preview}</p>
                  </div>
                  {!email.read && <span className="badge badge-sm border-0 bg-[var(--accent)]/30 text-[var(--accent)]">new</span>}
                </div>
              </button>
            </li>
          ))}
        </ul>

        <div className="shy-fade-in shy-fade-in-delay-4 mt-10 grid grid-cols-2 gap-3 text-xs text-[var(--text2)]">
          <div className="rounded-xl border border-[var(--border)]/30 bg-[var(--bg2)]/50 p-3 backdrop-blur-sm">
            <p className="mb-1 text-[10px] uppercase tracking-wider opacity-70">outside</p>
            <p>
              {weather.icon} {weather.temp}°C
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)]/30 bg-[var(--bg2)]/50 p-3 backdrop-blur-sm">
            <p className="mb-1 text-[10px] uppercase tracking-wider opacity-70">numbers</p>
            <p>{stocks[0]?.ticker} {stocks[0]?.changePct >= 0 ? '+' : ''}{stocks[0]?.changePct?.toFixed(1)}%</p>
          </div>
        </div>
        <p className="shy-fade-in shy-fade-in-delay-4 mt-4 line-clamp-2 text-[11px] leading-relaxed text-[var(--text2)]/80">
          {news[0]?.emoji} {news[0]?.title}
        </p>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={() => setSelectedEmail(null)}>
          <div
            className="shy-modal-rise w-full max-w-md rounded-t-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-[var(--text)] shadow-2xl sm:rounded-3xl"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-xs text-[var(--text2)]">sorry to pop up…</p>
            <h2 className="mt-2 text-lg font-medium">{selectedEmail.subject}</h2>
            <p className="mt-1 text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-4 max-h-[50vh] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]/90">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-outline btn-sm mt-6 w-full border-[var(--border)]" onClick={() => setSelectedEmail(null)}>
              okay. thanks.
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
