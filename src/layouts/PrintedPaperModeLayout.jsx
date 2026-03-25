import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'

export default function PrintedPaperModeLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="paper-sheet-root relative min-h-screen overflow-x-hidden py-8"
      style={{
        background: 'linear-gradient(180deg, #a8a29e 0%, #78716c 40%, #57534e 100%)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="paper-desk-shadow mx-auto max-w-2xl px-3 sm:px-6">
        <article
          className="paper-curl relative overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--card)] px-6 py-8 shadow-2xl sm:px-10 sm:py-10"
          style={{
            color: 'var(--text)',
            boxShadow: '8px 16px 40px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.4)',
          }}
        >
          <div className="paper-margin-holes pointer-events-none absolute left-3 top-0 bottom-0 w-4 sm:left-5" aria-hidden />
          <div className="paper-fiber-noise pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />

          <header className="relative border-b-2 border-[var(--text)]/80 pb-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text2)]">INBOX / PRINTOUT</p>
                <h1 className="mt-2 text-2xl font-bold tracking-tight">Daily digest (laser)</h1>
              </div>
              <button type="button" className="btn btn-outline btn-xs border-[var(--text)] text-[var(--text)]" onClick={onSwitchPersona}>
                recycle bin
              </button>
            </div>
            <p className="mt-3 text-sm text-[var(--text2)]">
              Page 1 of 1 · Low toner simulation enabled · Do not fold the important bits
            </p>
          </header>

          <div className="paper-toner-stripe relative mt-6 h-1 w-full rounded-full opacity-60" aria-hidden />

          <ul className="relative mt-8 space-y-6">
            {emails.map((email, i) => (
              <li key={email.id} className="paper-ink-settle" style={{ animationDelay: `${i * 0.15}s` }}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="w-full border-l-4 border-[var(--accent)] bg-transparent py-2 pl-4 text-left transition hover:bg-[var(--text)]/[0.03]"
                >
                  <p className="font-bold uppercase tracking-wide text-[var(--text)]">{email.subject}</p>
                  <p className="mt-1 text-sm text-[var(--text2)]">
                    FROM: {email.from.name} · {email.time}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">{email.preview}</p>
                </button>
              </li>
            ))}
          </ul>

          <footer className="relative mt-12 border-t border-dashed border-[var(--text2)]/50 pt-4 text-center text-xs text-[var(--text2)]">
            ——— end of feed ———
            <br />
            If misaligned, blame the tray guides.
          </footer>
        </article>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-800/60 p-4" onClick={() => setSelectedEmail(null)}>
          <div
            className="paper-modal-flip max-h-[82vh] w-full max-w-lg overflow-y-auto border-2 border-[var(--text)] bg-[var(--card)] p-8 shadow-2xl"
            onClick={e => e.stopPropagation()}
            style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}
          >
            <p className="text-xs uppercase tracking-widest text-[var(--text2)]">Attachment: thought</p>
            <h2 className="mt-3 text-xl font-bold">{selectedEmail.subject}</h2>
            <p className="mt-2 text-sm">{selectedEmail.from.name}</p>
            <pre className="mt-6 whitespace-pre-wrap border-l-4 border-[var(--accent)] pl-4 text-sm leading-relaxed">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-neutral mt-8 w-full" onClick={() => setSelectedEmail(null)}>
              file in tray
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
