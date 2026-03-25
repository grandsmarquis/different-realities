import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'

const stackDates = ['tomorrow', 'tomorrow again', 'tomorrow³', 'Q2 tomorrow', 'eternal Tuesday']

export default function RemindTomorrowMonthsLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="snooze-parallax-root relative min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, #fef9c3 0%, #fde68a 35%, #fcd34d 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="pointer-events-none absolute -right-20 top-20 text-[14rem] opacity-[0.07] select-none" aria-hidden>
        📌
      </div>

      <header className="relative z-10 border-b-4 border-dotted border-[var(--accent)]/40 bg-[var(--card)]/90 px-4 py-5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-xl flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[var(--text2)]">Snooze debt</p>
            <h1 className="mt-1 text-2xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Remind me tomorrow…
            </h1>
            <p className="mt-1 text-xs text-[var(--accent2)]">Day 94 of honest intentions</p>
          </div>
          <button type="button" className="btn btn-warning btn-sm text-[var(--text)]" onClick={onSwitchPersona}>
            actually do it
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-xl px-4 py-8">
        <ul className="space-y-10">
          {emails.map((email, i) => (
            <li key={email.id} className="relative snooze-card-bob" style={{ animationDelay: `${i * 0.45}s` }}>
              <div className="snooze-sticker-stack pointer-events-none absolute -left-1 top-2 z-0 w-[calc(100%-8px)]">
                {[0, 1, 2, 3].map(layer => (
                  <div
                    key={layer}
                    className="absolute left-0 right-0 rounded-lg border-2 border-[var(--accent)]/50 bg-[#fff7ed]/90 shadow-md"
                    style={{
                      top: `${layer * 10}px`,
                      transform: `rotate(${layer * 0.8 - 1.2}deg)`,
                      zIndex: -layer,
                    }}
                  >
                    <p className="px-3 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-[var(--accent2)]" style={{ fontFamily: 'var(--font-display)' }}>
                      {stackDates[layer % stackDates.length]}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedEmail(email)}
                className="relative z-10 mt-14 w-full rounded-2xl border-2 border-[var(--text)]/20 bg-[var(--card)] px-4 py-4 text-left shadow-xl transition hover:rotate-0"
                style={{
                  transform: `rotate(${((i % 3) - 1) * 0.6}deg)`,
                }}
              >
                <div className="flex gap-3">
                  <span className="text-2xl">{email.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[var(--text)]">{email.subject}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-[var(--text2)]">{email.preview}</p>
                    <p className="mt-2 text-xs italic text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                      Snoozed since… who’s counting
                    </p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-amber-900/30 p-4 backdrop-blur-[2px]" onClick={() => setSelectedEmail(null)}>
          <div
            className="snooze-modal-wiggle max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border-4 border-[var(--accent)] bg-[var(--card)] p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">You promised future-you</p>
            <h2 className="mt-3 text-xl font-bold text-[var(--text)]">{selectedEmail.subject}</h2>
            <p className="mt-1 text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-5 whitespace-pre-wrap rounded-xl bg-amber-50/80 p-4 text-sm leading-relaxed text-[var(--text)]">{selectedEmail.body}</pre>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button type="button" className="btn btn-warning flex-1" onClick={() => setSelectedEmail(null)}>
                remind me tomorrow
              </button>
              <button type="button" className="btn btn-ghost flex-1 text-[var(--text2)]" onClick={() => setSelectedEmail(null)}>
                fine, read it now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
