import { useContext, useEffect, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function BankRobberLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [tick, setTick] = useState(600)

  useEffect(() => {
    const id = setInterval(() => setTick(t => (t <= 0 ? 600 : t - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const mm = String(Math.floor(tick / 60)).padStart(2, '0')
  const ss = String(tick % 60).padStart(2, '0')

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ background: 'repeating-linear-gradient(0deg, var(--accent) 0 1px, transparent 1px 4px)' }} aria-hidden />

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b-2 px-4 py-4 md:px-8" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}>
        <div>
          <p className="text-[10px] tracking-[0.4em] opacity-60">VAULT TERMINAL</p>
          <h1 className="text-2xl uppercase md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
            Inside Job Inbox
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="cash-stack-bob rounded border-2 px-4 py-2 font-mono text-xl tabular-nums" style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}>
            {mm}:{ss}
          </div>
          <button type="button" onClick={onSwitchPersona} className="btn btn-outline btn-sm border-2 uppercase" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            Abort heist
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[1fr_300px] md:px-6">
        <main className="relative flex min-h-[min(70vh,560px)] items-center justify-center">
          <div className="bank-laser" aria-hidden />
          <div
            className="relative aspect-square w-full max-w-md rounded-full border-[12px] p-6 shadow-2xl md:border-[16px] md:p-10"
            style={{
              borderColor: '#334155',
              background: 'radial-gradient(circle at 35% 30%, #1a2e1a 0%, #0a0f0a 55%, #050805 100%)',
              boxShadow: 'inset 0 0 80px rgba(0,0,0,0.85), 0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent)',
            }}
          >
            <div className="vault-dial-teeth absolute inset-4 rounded-full border-4 border-dashed opacity-30" style={{ borderColor: 'var(--accent)' }} aria-hidden />
            <div className="relative z-[1] flex h-full flex-col justify-center overflow-hidden rounded-full bg-black/50 p-4 md:p-6">
              {selectedEmail ? (
                <>
                  <div className="mb-4 flex items-center justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--border)' }}>
                    <span className="badge badge-success badge-sm uppercase">Cracked</span>
                    <span className="font-mono text-[10px] opacity-50">{selectedEmail.date}</span>
                  </div>
                  <h2 className="text-lg font-bold uppercase leading-snug md:text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                    {selectedEmail.subject}
                  </h2>
                  <p className="mt-2 text-xs opacity-60">{selectedEmail.from.name}</p>
                  <div className="mt-4 max-h-[min(38vh,280px)] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed opacity-90">
                    {selectedEmail.body}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className="btn btn-xs btn-success uppercase">Bag it</span>
                    <span className="btn btn-xs btn-ghost uppercase">Burner</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 py-10 text-center opacity-50">
                  <span className="text-5xl">🔐</span>
                  <p className="font-mono text-sm uppercase">Spin the list — crack a message</p>
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="flex flex-col gap-4">
          <div className="rounded-box border-2 p-4 font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <p className="mb-2 text-[10px] uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Duffel manifest
            </p>
            <ul className="max-h-[min(50vh,420px)] space-y-2 overflow-y-auto">
              {emails.map(e => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className="flex w-full items-start gap-2 rounded border px-2 py-2 text-left transition-colors hover:bg-white/5"
                    style={{
                      borderColor: selectedEmail?.id === e.id ? 'var(--accent)' : 'var(--border)',
                      background: selectedEmail?.id === e.id ? 'color-mix(in srgb, var(--accent) 8%, transparent)' : undefined,
                    }}
                  >
                    <span>{e.from.avatar}</span>
                    <span className="min-w-0 flex-1 leading-snug">
                      <span className="block truncate uppercase">{e.subject}</span>
                      <span className="block truncate text-[10px] opacity-50">{e.from.name}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-box border p-3 text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
            <p className="text-[10px] uppercase opacity-50">Heat outside</p>
            <p className="text-lg">
              {weather.icon} {weather.condition}
            </p>
            <div className="mt-2 space-y-1 border-t pt-2" style={{ borderColor: 'var(--border)' }}>
              {stocks.map(s => (
                <div key={s.ticker} className="flex justify-between font-mono">
                  <span style={{ color: 'var(--accent)' }}>{s.ticker}</span>
                  <span>{s.changePct}%</span>
                </div>
              ))}
            </div>
            <p className="mt-2 line-clamp-3 text-[10px] opacity-60">{news[0]?.title}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
