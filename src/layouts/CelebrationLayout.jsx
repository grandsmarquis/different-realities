import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function ConfettiLayer() {
  const pieces = useMemo(() => {
    const colors = ['#f472b6', '#38bdf8', '#facc15', '#a78bfa', '#4ade80', '#fb7185', '#f97316']
    return Array.from({ length: 48 }, (_, i) => ({
      id: i,
      left: `${(i * 17) % 100}%`,
      delay: `${(i * 0.08) % 2.5}s`,
      dur: `${2.8 + (i % 5) * 0.35}s`,
      color: colors[i % colors.length],
      rot: `${(i * 47) % 360}deg`,
    }))
  }, [])

  return (
    <div className="celebration-confetti pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {pieces.map(p => (
        <span
          key={p.id}
          className="celebration-confetti-piece absolute top-[-12%] block h-3 w-2 rounded-sm opacity-90"
          style={{
            left: p.left,
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.dur,
            transform: `rotate(${p.rot})`,
          }}
        />
      ))}
    </div>
  )
}

export default function CelebrationLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [burst, setBurst] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setBurst(b => b + 1), 4200)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: 'linear-gradient(160deg, #4c1d95 0%, #6d28d9 40%, #5b21b6 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <ConfettiLayer key={burst} />

      <div className="celebration-bounce-banner relative z-10 border-b-4 border-[var(--accent2)] bg-[var(--card)] py-3 text-center text-lg font-bold text-[#4c1d95] shadow-lg">
        🎊 IT&apos;S JUST EMAIL BUT LOUD 🎊
      </div>

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 py-6">
        <h1 className="text-3xl font-bold drop-shadow-md sm:text-4xl">Party inbox!!!</h1>
        <button type="button" className="btn btn-lg bg-[var(--accent)] border-0 text-[#4c1d95] hover:brightness-110" onClick={onSwitchPersona}>
          Another vibe
        </button>
      </header>

      <div className="relative z-10 px-5 pb-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <main className="lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {emails.map((email, i) => (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="celebration-card-pop card border-0 bg-[var(--card)] shadow-xl transition hover:rotate-1"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="card-body p-5 text-[#1e1b4b]">
                    <div className="flex items-center gap-2">
                      <span className="text-4xl celebration-wiggle">{email.from.avatar}</span>
                      <span className="badge badge-secondary">yay</span>
                    </div>
                    <h2 className="card-title mt-2 text-lg leading-snug">{email.subject}</h2>
                    <p className="text-sm opacity-80">{email.preview.slice(0, 96)}…</p>
                    <p className="mt-3 text-xs font-bold text-secondary">{email.date}</p>
                  </div>
                </button>
              ))}
            </div>
          </main>

          <aside className="space-y-4 lg:col-span-4">
            <div className="card rotate-2 border-0 bg-[var(--accent2)] text-[#0f172a] shadow-lg">
              <div className="card-body">
                <p className="text-sm font-bold">Sky mood</p>
                <p className="text-3xl font-black">
                  {weather.icon} {weather.temp}°C
                </p>
              </div>
            </div>
            <div className="card -rotate-1 border-0 bg-[var(--card)] text-[#312e81] shadow-lg">
              <div className="card-body text-sm">
                <p className="font-bold text-secondary">Ticker parade</p>
                {stocks.map(s => (
                  <p key={s.ticker} className="mt-1 font-semibold">
                    {s.ticker} {s.changePct >= 0 ? '🎈' : '📉'} {s.changePct.toFixed(1)}%
                  </p>
                ))}
              </div>
            </div>
            <div className="card border-0 bg-[#faf5ff]/95 text-[#4c1d95] shadow-lg">
              <div className="card-body text-sm">
                {news.slice(0, 3).map(n => (
                  <p key={n.id} className="mb-2 font-medium">
                    {n.emoji} {n.title}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-purple-950/80 p-4 backdrop-blur-sm" onClick={() => setSelectedEmail(null)}>
          <div
            className="celebration-modal-pop max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-3xl border-4 border-[var(--accent)] bg-[var(--card)] p-8 text-[#312e81] shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-center text-4xl">🥳</p>
            <h2 className="mt-4 text-center text-2xl font-bold">{selectedEmail.subject}</h2>
            <p className="mt-2 text-center font-semibold">{selectedEmail.from.name}</p>
            <pre className="mt-6 whitespace-pre-wrap text-base leading-relaxed">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-primary btn-lg mt-8 w-full text-lg" onClick={() => setSelectedEmail(null)}>
              Keep celebrating (close)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
