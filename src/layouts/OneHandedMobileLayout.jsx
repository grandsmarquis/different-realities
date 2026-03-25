import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'

export default function OneHandedMobileLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="oh-reach-root relative min-h-screen overflow-hidden pb-32"
      style={{
        background: 'linear-gradient(165deg, #0f1419 0%, #151c28 45%, #0c1018 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="oh-thumb-glow pointer-events-none absolute bottom-0 right-0 h-[55vh] w-[85vw] max-w-md rounded-tl-[100%] opacity-40" aria-hidden />

      <header className="relative z-10 flex items-start justify-between gap-3 px-4 pt-4">
        <div className="min-w-0 pl-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--text2)]">reachable zone</p>
          <h1 className="mt-1 text-lg font-bold leading-tight text-[var(--text)]">Inbox · one hand</h1>
        </div>
        <button type="button" className="btn btn-ghost btn-sm shrink-0 text-[var(--text2)]" onClick={onSwitchPersona}>
          both hands
        </button>
      </header>

      <p className="relative z-10 mx-auto mt-3 max-w-[min(100%,18rem)] px-4 text-right text-xs leading-relaxed text-[var(--text2)]">
        Content hugs the corner your thumb can actually reach. Big targets. No top-left guilt.
      </p>

      <div className="relative z-10 mx-auto mt-6 max-w-[min(100%,20rem)] pl-6 pr-3">
        <ul className="space-y-3">
          {emails.map((email, i) => (
            <li key={email.id} className="oh-card-nudge" style={{ animationDelay: `${i * 0.12}s` }}>
              <button
                type="button"
                onClick={() => setSelectedEmail(email)}
                className="btn btn-block h-auto min-h-16 justify-start rounded-2xl border-0 bg-[var(--card)]/90 px-4 py-3 text-left shadow-lg shadow-black/20 transition hover:bg-[var(--card)]"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.35)' }}
              >
                <span className="flex w-full items-center gap-3">
                  <span className="text-2xl">{email.from.avatar}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-[var(--text)]">{email.subject}</span>
                    <span className="mt-0.5 block line-clamp-2 text-xs text-[var(--text2)]">{email.preview}</span>
                  </span>
                  {!email.read && <span className="badge badge-info badge-sm shrink-0">new</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="oh-fab-ring pointer-events-none fixed bottom-20 right-4 flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-[var(--accent)]/35" aria-hidden>
        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--accent)]/80">thumb arc</span>
      </div>

      <div className="fixed bottom-24 right-3 z-20 flex flex-col gap-2">
        <button type="button" className="btn btn-circle btn-lg border-0 bg-[var(--accent)] text-[var(--bg)] shadow-lg shadow-sky-500/30" aria-label="Compose (demo)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </button>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-5" onClick={() => setSelectedEmail(null)}>
          <div
            className="oh-modal-slide max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-[var(--text)] sm:rounded-3xl"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-xs text-[var(--text2)]">swipe down-ish (tap outside)</p>
            <h2 className="mt-2 text-xl font-bold">{selectedEmail.subject}</h2>
            <p className="mt-1 text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-primary btn-block mt-6" onClick={() => setSelectedEmail(null)}>
              done — thumb friendly
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
