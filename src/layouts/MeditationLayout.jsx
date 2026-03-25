import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function MeditationLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(110,231,183,0.12) 0%, transparent 55%), var(--bg)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, var(--accent) 1px, transparent 0)',
        backgroundSize: '28px 28px',
      }}
        aria-hidden
      />

      <div className="sticky top-0 z-20 flex flex-col items-center border-b border-[var(--border)]/40 bg-[var(--bg)]/85 py-8 backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.5em] text-[var(--text2)]">breathe</p>
        <div className="meditation-breath-orb mt-4 flex h-36 w-36 items-center justify-center rounded-full border-2 border-[var(--accent)]/50 bg-[var(--accent)]/10 text-sm text-[var(--text2)]">
          <span style={{ fontFamily: 'var(--font-display)' }} className="text-center text-base italic text-[var(--text)]">
            in · out
          </span>
        </div>
        <p className="mt-3 max-w-xs text-center text-sm text-[var(--text2)]">Let the circle grow for four counts, then release for four.</p>
        <button type="button" className="btn btn-ghost btn-sm mt-4 text-[var(--text2)]" onClick={onSwitchPersona}>
          step off the cushion
        </button>
      </div>

      <div className="relative z-10 mx-auto max-w-xl px-5 py-12">
        <h1 className="text-center font-serif text-3xl text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
          Quiet correspondence
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-[var(--text2)]">
          Nothing urgent in the sound of this list — only words arriving like leaves.
        </p>

        <ul className="mt-12 space-y-6">
          {emails.map((email, i) => (
            <li key={email.id} className="meditation-fade-stagger text-center" style={{ animationDelay: `${0.15 * i}s` }}>
              <button
                type="button"
                onClick={() => setSelectedEmail(email)}
                className="w-full rounded-3xl border border-[var(--border)]/50 bg-[var(--card)]/60 px-6 py-5 text-center backdrop-blur-sm transition hover:border-[var(--accent)]/40 hover:bg-[var(--card)]/80"
              >
                <p className="font-serif text-lg text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
                  {email.subject}
                </p>
                <p className="mt-2 text-sm text-[var(--text2)]">{email.from.name}</p>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-16 space-y-4 text-center text-sm text-[var(--text2)]">
          <p>
            {weather.icon} {weather.temp}°C — {weather.condition}
          </p>
          <p className="mx-auto max-w-md leading-relaxed">
            {news[0]?.emoji} {news[0]?.title}
          </p>
          <p className="font-mono text-xs opacity-80">
            {stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '+' : ''}${s.changePct.toFixed(1)}%`).join(' · ')}
          </p>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg)]/90 p-6 backdrop-blur-sm" onClick={() => setSelectedEmail(null)}>
          <div
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[var(--accent)]/30 bg-[var(--card)]/90 p-8 text-[var(--text)] shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-center text-xs uppercase tracking-[0.4em] text-[var(--text2)]">pause</p>
            <h2 className="mt-4 text-center font-serif text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-2 text-center text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-8 whitespace-pre-wrap font-sans text-sm leading-[1.9] text-[var(--text)]/90">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-outline btn-sm mt-8 w-full border-[var(--border)]" onClick={() => setSelectedEmail(null)}>
              exhale · close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
