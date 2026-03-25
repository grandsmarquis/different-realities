import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'

export default function WaitingRoomBoredomLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(139,115,85,0.06) 48px, rgba(139,115,85,0.06) 49px), linear-gradient(180deg, var(--bg) 0%, #ddd4c8 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="wr-ceiling-tiles pointer-events-none absolute inset-x-0 top-0 h-24 opacity-30" aria-hidden />

      <div className="relative z-10 border-b-2 border-dashed border-[var(--border)] bg-[var(--card)]/80 px-4 py-5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text2)]" style={{ fontFamily: 'var(--font-display)' }}>
              General wait · building C
            </p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="wr-ticket-flip text-4xl font-semibold tabular-nums text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                A247
              </span>
              <span className="text-sm text-[var(--text2)]">now serving</span>
            </div>
          </div>
          <div className="wr-clock-sway flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg)]/90 px-4 py-2">
            <span className="text-2xl" aria-hidden>
              🕐
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[var(--text2)]">room time</p>
              <p className="text-lg tabular-nums text-[var(--text)]">10:42</p>
            </div>
          </div>
          <button type="button" className="btn btn-outline btn-sm border-[var(--border)] text-[var(--text)]" onClick={onSwitchPersona}>
            leave waitlist
          </button>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 flex gap-4 overflow-x-auto pb-2">
          {['People', 'Golf', 'Coastal Living'].map((t, i) => (
            <div
              key={t}
              className="wr-mag-tilt shrink-0 w-28 rounded border border-[var(--border)] bg-[var(--card)] p-2 shadow-md"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <div className="aspect-[3/4] rounded-sm bg-gradient-to-br from-orange-200/80 to-amber-100/60" />
              <p className="mt-2 text-center text-[9px] font-medium uppercase tracking-wide text-[var(--text2)]">{t}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-2 text-center text-sm font-medium uppercase tracking-[0.25em] text-[var(--text2)]">Unread from the pile</h2>
        <p className="mx-auto mb-8 max-w-md text-center text-sm italic text-[var(--text2)]" style={{ fontFamily: 'var(--font-display)' }}>
          The Wi‑Fi password is on a laminated card. The password is wrong.
        </p>

        <ul className="space-y-4">
          {emails.map((email, i) => (
            <li key={email.id} className="wr-row-fade" style={{ animationDelay: `${i * 0.2}s` }}>
              <button
                type="button"
                onClick={() => setSelectedEmail(email)}
                className="w-full rounded-lg border-2 border-[var(--border)] bg-[var(--card)] px-4 py-4 text-left shadow-sm transition hover:border-[var(--accent2)]/50 hover:shadow-md"
              >
                <div className="flex gap-3">
                  <span className="text-2xl grayscale-[0.3]">{email.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[var(--text)]">{email.subject}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-[var(--text2)]">{email.preview}</p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center text-xs text-[var(--text2)]">Elevator music not included · cough courtesy: medium</p>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--text)]/20 p-4 backdrop-blur-[2px]" onClick={() => setSelectedEmail(null)}>
          <div
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg border-4 border-double border-[var(--accent)] bg-[var(--card)] p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
            style={{ fontFamily: 'var(--font-main)' }}
          >
            <p className="text-xs uppercase tracking-wider text-[var(--text2)]">while you wait</p>
            <h3 className="mt-2 text-xl font-semibold text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h3>
            <p className="mt-1 text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-neutral mt-6 w-full" onClick={() => setSelectedEmail(null)}>
              fold magazine closed
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
