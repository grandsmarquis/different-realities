import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'

export default function InboxZeroFantasyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="zero-aurora relative min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 100% 80% at 50% -20%, rgba(192,38,211,0.25) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 100% 50%, rgba(232,121,249,0.12) 0%, transparent 45%), var(--bg)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="zero-confetti absolute text-lg opacity-70"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${-10 + (i % 5) * 8}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {['✨', '⭐', '💜', '🌟'][i % 4]}
          </span>
        ))}
      </div>

      <header className="relative z-10 px-4 py-8 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.5em] text-[var(--text2)]">Certified peaceful</p>
        <div className="zero-glow-ring mx-auto mt-4 inline-flex h-36 w-36 items-center justify-center rounded-full border-4 border-[var(--accent2)]/60 bg-white/80 shadow-[0_0_60px_rgba(192,38,211,0.25)]">
          <div className="text-center">
            <span className="block text-5xl font-bold tabular-nums text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
              0
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text2)]">unread*</span>
          </div>
        </div>
        <p className="mx-auto mt-3 max-w-sm text-xs text-[var(--text2)]">*Emotionally. The laws of physics still deliver email.</p>
        <p className="mt-2 text-sm italic text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
          Streak: 847 days (display bug)
        </p>
        <button type="button" className="btn btn-ghost btn-sm mt-4 text-[var(--text2)]" onClick={onSwitchPersona}>
          wake up
        </button>
      </header>

      <div className="relative z-10 mx-auto max-w-lg px-4 pb-20">
        <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text2)]">Manifestations (tap to collapse the fantasy)</h2>
        <ul className="space-y-3">
          {emails.map((email, i) => (
            <li key={email.id} className="zero-row-sparkle" style={{ animationDelay: `${i * 0.1}s` }}>
              <button
                type="button"
                onClick={() => setSelectedEmail(email)}
                className="group flex w-full items-center gap-3 rounded-2xl border border-[var(--border)] bg-white/90 px-4 py-3 text-left shadow-md backdrop-blur-sm transition hover:border-[var(--accent)]/40 hover:shadow-[0_8px_30px_rgba(192,38,211,0.12)]"
              >
                <span className="text-xl opacity-90 transition group-hover:scale-110">{email.from.avatar}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[var(--text)] line-through decoration-[var(--accent2)]/50 decoration-2">{email.subject}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-[var(--text2)]">Already handled (narratively)</p>
                </div>
                <span className="badge badge-secondary badge-sm shrink-0 border-0 bg-[var(--accent2)]/20 text-[var(--accent)]">cleared</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-violet-950/40 p-4 backdrop-blur-md" onClick={() => setSelectedEmail(null)}>
          <div
            className="zero-modal-rise max-h-[82vh] w-full max-w-lg overflow-y-auto rounded-3xl border-2 border-[var(--accent2)]/60 bg-white p-8 shadow-2xl"
            onClick={e => e.stopPropagation()}
            style={{ color: 'var(--text)' }}
          >
            <p className="text-xs uppercase tracking-widest text-[var(--accent)]">Plot twist: it’s real</p>
            <h2 className="mt-3 text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-2 text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-6 whitespace-pre-wrap rounded-2xl bg-[var(--bg2)]/50 p-5 text-sm leading-relaxed">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-primary btn-block mt-8 border-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-white" onClick={() => setSelectedEmail(null)}>
              return to blissful denial
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
