import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const rating = t =>
  ({
    work: 'HUGE RATING · 10/10',
    personal: 'VERY PERSONAL',
    finance: 'BIG MONEY ENERGY',
    promo: 'SPONSORED (THE BEST)',
    newsletter: 'FAKE NEWS (JK)',
    social: 'TREMENDOUS REACH',
    dev: 'CODERS LOVE IT',
    shopping: 'PRIME DELIVERY CLASS',
    travel: 'FIRST CLASS, BELIEVE ME',
  }[t] || 'UNKNOWN (STILL GOOD)')

export default function ExecutiveInboxLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="exec-marble relative min-h-screen overflow-x-hidden" style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="exec-shine pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="exec-flag-stripe pointer-events-none absolute left-0 top-0 z-0 h-full w-2 sm:w-3" aria-hidden />

      <header className="relative z-10 border-b-2 px-4 py-6" style={{ borderColor: 'var(--accent)', background: 'linear-gradient(180deg, var(--card) 0%, var(--bg) 100%)' }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              TRUMP · PERSONAL INBOX (PARODY)
            </p>
            <h1 className="mt-1 text-3xl uppercase sm:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', letterSpacing: '0.02em' }}>
              Donald <span style={{ color: 'var(--accent)' }}>Trump</span> Mail
            </h1>
            <p className="mt-1 text-sm opacity-70">The best emails. Everybody agrees. Nobody has emails like these.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="exec-stamp-rotate rounded border-2 border-dashed px-3 py-1 text-xs font-black uppercase" style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}>
              Classified-ish
            </span>
            <button type="button" className="btn btn-sm font-bold uppercase" style={{ background: 'var(--accent2)', color: 'var(--text)', border: 'none' }} onClick={onSwitchPersona}>
              You&apos;re fired (go home)
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 p-4 lg:flex-row" style={{ minHeight: 'calc(100dvh - 140px)' }}>
        <aside className="lg:w-80 shrink-0">
          <div className="mb-3 flex items-center gap-2 border-l-4 pl-3 font-black uppercase" style={{ borderColor: 'var(--accent2)', fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
            Inbox (Yuge)
          </div>
          <ul className="space-y-2">
            {emails.map(e => {
              const active = selectedEmail?.id === e.id
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`exec-gold-frame w-full rounded border-2 p-3 text-left transition-all hover:brightness-110 ${active ? 'exec-gold-glow' : ''}`}
                    style={{
                      borderColor: 'var(--accent)',
                      background: active ? 'color-mix(in srgb, var(--accent) 18%, var(--card))' : 'var(--card)',
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">{e.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {!e.read && (
                            <span className="rounded px-1.5 py-0.5 text-[10px] font-black uppercase" style={{ background: 'var(--accent2)', color: 'var(--text)' }}>
                              Breaking
                            </span>
                          )}
                          <span className="truncate font-bold uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem' }}>
                            {e.subject}
                          </span>
                        </div>
                        <p className="mt-1 text-xs opacity-70">{e.from.name}</p>
                        <p className="mt-0.5 text-[10px] font-bold uppercase" style={{ color: 'var(--accent)' }}>
                          {rating(e.tag)}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <main className="min-h-[300px] flex-1">
          {selectedEmail ? (
            <div className="exec-gold-frame exec-gold-glow relative overflow-hidden rounded-lg border-2 p-6 lg:p-8" style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}>
              <div className="exec-corner-triangles pointer-events-none absolute inset-2 opacity-30" aria-hidden />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[var(--accent3)] px-2 py-0.5 text-[10px] font-black uppercase text-white">Trump summary</span>
                  <span className="exec-blink-tie text-[10px] font-bold uppercase" style={{ color: 'var(--accent2)' }}>
                    Tie: red · mood: winning
                  </span>
                </div>
                <h2 className="mt-4 text-2xl uppercase leading-tight sm:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                  {selectedEmail.subject}
                </h2>
                <p className="mt-2 text-sm opacity-70">
                  From: <strong>{selectedEmail.from.name}</strong> · {selectedEmail.date}
                </p>
                <div className="mt-6 border-l-4 pl-4 leading-relaxed whitespace-pre-wrap" style={{ borderColor: 'var(--accent2)' }}>
                  {selectedEmail.body}
                </div>
                <button type="button" className="btn btn-ghost btn-sm mt-6 uppercase" style={{ color: 'var(--accent)' }} onClick={() => setSelectedEmail(null)}>
                  ← Back to the pile
                </button>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center opacity-80" style={{ borderColor: 'var(--border)' }}>
              <p className="text-6xl exec-wobble">🦅</p>
              <p className="mt-4 max-w-md font-bold uppercase" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                Pick an email. It&apos;ll be fantastic.
              </p>
            </div>
          )}
        </main>

        <aside className="lg:w-52 shrink-0 space-y-3">
          <div className="exec-gold-frame rounded-lg border-2 p-4 text-center" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}>
            <p className="text-[10px] font-black uppercase" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              Weather (ratings)
            </p>
            <p className="text-4xl">{weather.icon}</p>
            <p className="font-bold">{weather.condition}</p>
            <p className="text-xs opacity-60">{weather.temp}° · Wind {weather.wind}</p>
          </div>
          <div className="exec-gold-frame rounded-lg border-2 p-3" style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}>
            <p className="mb-2 text-center text-[10px] font-black uppercase" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
              Stock TV ratings
            </p>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between border-b border-white/5 py-1 text-sm">
                <span className="font-bold">{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : 'var(--accent2)' }}>
                  {s.changePct >= 0 ? '↑' : '↓'} {Math.abs(s.changePct)}%
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-lg border p-2 text-xs opacity-80" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
            {news.slice(0, 3).map((n, i) => (
              <p key={i} className="mb-2 border-l-2 pl-2 font-semibold uppercase" style={{ borderColor: 'var(--accent3)' }}>
                {n.title}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
