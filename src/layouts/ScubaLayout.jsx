import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function Bubbles() {
  const positions = [10, 25, 40, 55, 70, 85, 30, 60]
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
      {positions.map((left, i) => (
        <div
          key={i}
          className="scuba-bubble-particle"
          style={{ left: `${left}%`, bottom: '-20px', animationDelay: `${i * 0.6}s`, width: 6 + (i % 3) * 4, height: 6 + (i % 3) * 4 }}
        />
      ))}
    </div>
  )
}

export default function ScubaLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const unread = emails.filter(e => !e.read).length

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #023e8a 0%, var(--bg) 45%, #001219 100%)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <Bubbles />
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)',
      }} aria-hidden />

      <header className="relative z-10 border-b-4 px-4 py-5 flex flex-wrap items-center justify-between gap-3" style={{ borderColor: 'var(--accent2)', background: 'rgba(2,48,71,0.85)' }}>
        <div>
          <p className="text-xs font-bold tracking-widest opacity-80" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>DIVE SHACK · SURFACE INTERVAL</p>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Buoyancy Inbox
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right text-xs hidden sm:block">
            <div className="opacity-70">N₂ loading…</div>
            <div className="font-mono text-lg" style={{ color: 'var(--accent)' }}>{unread} deco stops</div>
          </div>
          <button type="button" onClick={onSwitchPersona} className="rounded-full px-5 py-2 text-sm font-bold uppercase border-2 transition hover:scale-105"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'transparent' }}>
            Ascend
          </button>
        </div>
      </header>

      <div className="relative z-10 flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <aside className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r overflow-y-auto max-h-[38vh] lg:max-h-none backdrop-blur-sm" style={{ borderColor: 'var(--border)', background: 'rgba(3,40,71,0.75)' }}>
          <div className="px-4 py-2 text-xs font-bold tracking-widest border-b" style={{ borderColor: 'var(--border)', color: 'var(--accent2)' }}>
            DIVE LOG — MESSAGES
          </div>
          {emails.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setSelectedEmail(e)}
              className="w-full text-left px-4 py-3 border-b flex gap-3 items-start transition-colors"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'rgba(0,180,216,0.2)' : 'transparent',
              }}
            >
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 text-sm font-bold" style={{ borderColor: 'var(--accent2)' }}>
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm truncate">{e.subject}</span>
                  {!e.read && <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ background: 'var(--accent)' }} />}
                </div>
                <div className="text-xs opacity-60 truncate">{e.from.name}</div>
              </div>
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10">
          {selectedEmail ? (
            <article className="max-w-2xl mx-auto rounded-3xl border-4 overflow-hidden" style={{ borderColor: 'var(--accent2)', background: 'rgba(2,48,71,0.9)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
              <div className="h-3 flex" style={{ background: 'linear-gradient(90deg, var(--accent2), var(--accent), var(--accent3))' }} />
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-4xl">{selectedEmail.from.avatar}</span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{selectedEmail.subject}</h2>
                    <p className="text-sm opacity-70">From the surface: {selectedEmail.from.name} · {selectedEmail.date}</p>
                  </div>
                </div>
                <div className="rounded-2xl p-6 text-sm leading-relaxed whitespace-pre-wrap border-2 border-dashed" style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)' }}>
                  {selectedEmail.body}
                </div>
                <p className="text-xs mt-6 opacity-50 text-center">Remember: off-gas slowly. Even with email.</p>
              </div>
            </article>
          ) : (
            <div className="h-full min-h-[280px] flex items-center justify-center opacity-40">
              <div className="text-center">
                <div className="text-8xl mb-2">🤿</div>
                <p className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Select a dive from the log</p>
              </div>
            </div>
          )}
        </main>

        <aside className="lg:w-52 shrink-0 border-t lg:border-t-0 lg:border-l p-4 space-y-3 text-xs backdrop-blur-sm relative z-10" style={{ borderColor: 'var(--border)', background: 'rgba(3,40,71,0.8)' }}>
          <div className="rounded-xl p-3 text-center border" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold mb-1 opacity-70" style={{ color: 'var(--accent)' }}>SURFACE CONDITIONS</p>
            <div className="text-3xl">{weather.icon}</div>
            <p>{weather.temp}° · {weather.condition}</p>
          </div>
          <div className="rounded-xl p-3 border font-mono" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold mb-2 opacity-70">DEPTH CHART (STONKS)</p>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-0.5">
                <span>{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? '#86efac' : '#fca5a5' }}>{s.changePct}%</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-3 border space-y-2" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold opacity-70">DIVE SITE NEWS</p>
            {news.slice(0, 3).map(n => (
              <p key={n.id} className="opacity-85 leading-snug">{n.title}</p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
