import { useEffect, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'

export default function SixtySecondChallengeLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [secondsLeft, setSecondsLeft] = useState(60)

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft(s => (s <= 1 ? 60 : s - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const pct = (secondsLeft / 60) * 100

  return (
    <div
      className="challenge-pulse-bg relative min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(239,68,68,0.2) 0%, transparent 50%), linear-gradient(180deg, #0c0a09 0%, #1c1410 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(251,191,36,0.5) 50%)',
        backgroundSize: '4px 100%',
      }}
        aria-hidden
      />

      <header className="relative z-10 sticky top-0 border-b border-[var(--accent)]/40 bg-[var(--bg)]/95 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">Speedrun</p>
            <h1 className="text-xl font-bold text-[var(--text)]">Inbox gauntlet</h1>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`challenge-digit-shake tabular-nums text-4xl font-bold ${secondsLeft <= 10 ? 'text-[var(--accent)]' : 'text-[var(--text2)]'}`}
            >
              {secondsLeft}
              <span className="text-lg font-medium text-[var(--text2)]">s</span>
            </div>
            <button type="button" className="btn btn-outline btn-sm border-[var(--accent)] text-[var(--accent)]" onClick={onSwitchPersona}>
              forfeit run
            </button>
          </div>
        </div>
        <div className="mx-auto mt-3 h-2 max-w-2xl overflow-hidden rounded-full bg-[var(--card)]">
          <div
            className="challenge-bar-drain h-full rounded-full bg-gradient-to-r from-[var(--accent2)] to-[var(--accent)] transition-[width] duration-1000 linear"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-[var(--text2)]">
          Timer loops forever. Your cortisol doesn’t know that.
        </p>
      </header>

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-6">
        <ul className="space-y-2">
          {emails.map((email, i) => (
            <li key={email.id} className="challenge-row-pop" style={{ animationDelay: `${i * 0.06}s` }}>
              <button
                type="button"
                onClick={() => setSelectedEmail(email)}
                className="flex w-full items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)]/90 px-3 py-3 text-left transition hover:border-[var(--accent)]/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
              >
                <span className="text-xl">{email.from.avatar}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold uppercase tracking-wide text-[var(--text)]">{email.subject}</p>
                  <p className="truncate text-xs text-[var(--text2)]">{email.preview}</p>
                </div>
                <span className="badge badge-error badge-outline badge-sm shrink-0">GO</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedEmail(null)}>
          <div
            className="challenge-modal-shake max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl border-2 border-[var(--accent)] bg-[var(--card)] p-6"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-xs font-bold text-[var(--accent)]">READ UNDER PRESSURE</p>
            <h2 className="mt-2 text-lg font-bold text-[var(--text)]">{selectedEmail.subject}</h2>
            <p className="text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-4 max-h-[45vh] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-error btn-block mt-6" onClick={() => setSelectedEmail(null)}>
              close & keep running
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
