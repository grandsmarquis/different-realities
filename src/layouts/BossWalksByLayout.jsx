import { useEffect, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'

function FakeSpreadsheet() {
  const cells = Array.from({ length: 48 }, (_, i) => {
    const row = Math.floor(i / 8)
    const col = i % 8
    const val = ((row * 13 + col * 7) % 99) + 1000
    return { id: i, val }
  })
  return (
    <div className="boss-sheet-grid grid grid-cols-8 gap-px bg-[#1e293b] p-2 font-mono text-[9px] text-emerald-200/90">
      {cells.map(c => (
        <div key={c.id} className="bg-[#0f172a] px-1 py-0.5 tabular-nums">
          {c.val.toLocaleString()}
        </div>
      ))}
    </div>
  )
}

export default function BossWalksByLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [bossNear, setBossNear] = useState(false)

  useEffect(() => {
    const tick = () => setBossNear(Math.random() > 0.5)
    const id = setInterval(tick, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${bossNear ? 'opacity-100' : 'opacity-25'}`}>
        <div className="absolute inset-4 rounded border border-[var(--accent)]/20 bg-[#020617]/90 p-2">
          <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2 text-[10px] text-[var(--text2)]">
            <span className="text-[var(--accent)]">●</span> Q3_forecast_FINAL_v7.xlsx — Saved
          </div>
          <FakeSpreadsheet />
        </div>
      </div>

      <div
        className={`relative z-10 mx-auto max-w-lg px-3 transition-all duration-500 ${bossNear ? 'translate-y-[120%] scale-90 opacity-0 sm:translate-y-24' : 'translate-y-0 opacity-100'}`}
      >
        <header className="flex items-center justify-between gap-2 border-b border-[var(--border)] py-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--text2)]">stealth client</p>
            <h1 className="text-lg font-semibold text-[var(--text)]">Mail (looks important)</h1>
          </div>
          <button type="button" className="btn btn-ghost btn-xs text-[var(--text2)]" onClick={onSwitchPersona}>
            clock out
          </button>
        </header>

        <div className="boss-radar mt-4 rounded-xl border border-[var(--border)] bg-[var(--card)]/95 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--text2)]">Hall proximity</span>
            <span className={bossNear ? 'font-bold text-[var(--accent)]' : 'text-[var(--text2)]'}>{bossNear ? 'FOOTSTEPS' : 'clear'}</span>
          </div>
          <div className="boss-radar-sweep relative mt-3 h-24 overflow-hidden rounded-full border-2 border-[var(--accent)]/40 bg-[#020617]">
            <div className="absolute inset-0 flex items-center justify-center text-2xl">{bossNear ? '🚶' : '☕'}</div>
          </div>
          <p className="mt-2 text-center text-[10px] text-[var(--text2)]">
            {bossNear ? 'Pivot to spreadsheet. Nod thoughtfully.' : 'You may risk reading words.'}
          </p>
        </div>

        <ul className="mt-6 space-y-2 pb-20">
          {emails.map(email => (
            <li key={email.id}>
              <button
                type="button"
                onClick={() => setSelectedEmail(email)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)]/90 px-3 py-3 text-left shadow-lg transition hover:border-[var(--accent2)]/50"
              >
                <div className="flex items-center gap-2">
                  <span>{email.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--text)]">{email.subject}</p>
                    <p className="truncate text-xs text-[var(--text2)]">{email.preview}</p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {bossNear && (
        <div className="boss-excel-front fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#020617]/96 p-6 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-lg border-2 border-[var(--accent)] bg-[#0f172a] p-4 shadow-2xl">
            <p className="text-center text-xs uppercase tracking-widest text-[var(--accent)]">deep work mode (performative)</p>
            <div className="mt-3 max-h-[min(40vh,320px)] overflow-auto">
              <FakeSpreadsheet />
              <FakeSpreadsheet />
            </div>
            <p className="mt-3 text-center text-[10px] text-[var(--text2)]">=SUM(IF(BOSS,&quot;busy&quot;,TRUE))</p>
          </div>
        </div>
      )}

      {selectedEmail && !bossNear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4" onClick={() => setSelectedEmail(null)}>
          <div
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold">{selectedEmail.subject}</h2>
            <p className="text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-primary btn-block mt-6" onClick={() => setSelectedEmail(null)}>
              minimize before they turn
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
