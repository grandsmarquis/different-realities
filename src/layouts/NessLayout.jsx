import { useContext, useMemo } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagPsi = t =>
  ({
    work: 'PK Brainstorm Ω',
    personal: 'PK Hug γ',
    finance: 'PK Budget β',
    promo: 'PK Flash α',
    newsletter: 'PK Paper π',
    social: 'PK Party σ',
    dev: 'PK Code λ',
    shopping: 'PK Shop δ',
    travel: 'PK Teleport Ω',
  }[t] || 'PK Mail ?')

export default function NessLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const unread = useMemo(() => emails.filter(e => !e.read).length, [])
  const hpPct = Math.min(100, Math.round((unread / Math.max(emails.length, 1)) * 100))

  return (
    <div
      className="ness-psych-bg relative min-h-screen overflow-x-hidden"
      style={{ color: 'var(--text)', fontFamily: 'var(--font-main)', fontSize: '1.15rem' }}
    >
      <div className="ness-scanlines pointer-events-none fixed inset-0 z-[5] opacity-[0.06]" aria-hidden />

      <header className="relative z-10 border-b-4 px-4 py-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] leading-tight opacity-80" style={{ fontFamily: 'var(--font-display)' }}>
              ONETT · MAIL
            </p>
            <h1 className="text-lg sm:text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', textShadow: '2px 2px 0 var(--bg)' }}>
              INBOX BATTLE
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="ness-hp-bar flex min-w-[140px] items-center gap-2 rounded border-2 px-2 py-1" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <span className="text-xs whitespace-nowrap" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                UNREAD
              </span>
              <div className="h-3 flex-1 overflow-hidden rounded-sm border" style={{ borderColor: 'var(--border)', background: '#0a120a' }}>
                <div className="ness-hp-fill h-full rounded-sm" style={{ width: `${hpPct}%`, background: 'linear-gradient(90deg, var(--accent2), var(--accent))' }} />
              </div>
            </div>
            <button type="button" className="btn btn-sm border-2 font-bold" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'transparent', fontFamily: 'var(--font-display)', fontSize: '8px' }} onClick={onSwitchPersona}>
              RUN AWAY
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 p-4 lg:flex-row" style={{ minHeight: 'calc(100dvh - 120px)' }}>
        <aside className="lg:w-80 shrink-0">
          <div className="mb-2 text-center text-xs tracking-widest opacity-70" style={{ fontFamily: 'var(--font-display)' }}>
            CHOOSE A FOE
          </div>
          <ul className="space-y-2">
            {emails.map(e => {
              const active = selectedEmail?.id === e.id
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`ness-menu-cursor w-full border-4 p-3 text-left transition-transform hover:scale-[1.02] active:scale-[0.98] ${active ? 'ness-menu-active' : ''}`}
                    style={{
                      borderColor: active ? 'var(--accent)' : 'var(--border)',
                      background: active ? 'var(--card)' : 'color-mix(in srgb, var(--card) 65%, transparent)',
                      boxShadow: active ? '4px 4px 0 var(--bg2)' : '2px 2px 0 var(--bg2)',
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-2xl leading-none">{e.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {!e.read && (
                            <span className="ness-smash-badge rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: 'var(--accent2)', color: '#1a0a12', fontFamily: 'var(--font-display)' }}>
                              SMAAAASH!!
                            </span>
                          )}
                          <span className="truncate font-bold" style={{ color: active ? 'var(--accent3)' : 'var(--text)' }}>
                            {e.subject}
                          </span>
                        </div>
                        <div className="mt-1 text-sm opacity-70">{e.from.name}</div>
                        <div className="text-xs opacity-50">{tagPsi(e.tag)}</div>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <main className="min-h-[320px] flex-1">
          {selectedEmail ? (
            <div className="ness-dialog-box relative border-4 p-6 shadow-[8px_8px_0_var(--bg2)]" style={{ borderColor: 'var(--text)', background: '#0c0c0c', color: '#f8ffe8' }}>
              <div className="ness-typewriter mb-4 border-b-2 pb-3" style={{ borderColor: 'var(--border)' }}>
                <p className="text-[10px] opacity-60" style={{ fontFamily: 'var(--font-display)' }}>
                  {selectedEmail.from.name} approaches!
                </p>
                <h2 className="mt-2 text-xl font-bold sm:text-2xl" style={{ color: 'var(--accent)' }}>
                  {selectedEmail.subject}
                </h2>
                <p className="mt-1 text-sm opacity-80">
                  {selectedEmail.date} · {tagPsi(selectedEmail.tag)}
                </p>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed">{selectedEmail.body}</div>
              <div className="mt-6 flex flex-wrap gap-2">
                <button type="button" className="btn btn-sm btn-ghost border" style={{ borderColor: 'var(--accent)' }} onClick={() => setSelectedEmail(null)}>
                  &lt; Back
                </button>
                <span className="flex items-center gap-1 text-sm opacity-60">
                  <span className="ness-blink-cursor">▾</span> Auto-fight… reading
                </span>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center border-4 border-dashed p-8" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--card) 40%, transparent)' }}>
              <p className="max-w-sm text-center text-lg opacity-60" style={{ fontFamily: 'var(--font-display)', fontSize: '11px', lineHeight: 1.8 }}>
                * ... * &nbsp;The mailbox feels quiet. Pick a message to begin the battle.
              </p>
            </div>
          )}
        </main>

        <aside className="lg:w-56 shrink-0 space-y-4">
          <div className="border-4 p-3" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <div className="mb-2 text-center text-[10px]" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
              ATMOSPHERE
            </div>
            <div className="text-center text-3xl">{weather.icon}</div>
            <p className="text-center text-sm font-bold">{weather.condition}</p>
            <p className="text-center text-xs opacity-60">
              {weather.temp}° · wind {weather.wind}kph
            </p>
          </div>
          <div className="border-4 p-3" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <div className="mb-2 text-center text-[10px]" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              STATS / MARKET
            </div>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between border-b border-dashed py-1 text-sm" style={{ borderColor: 'var(--border)' }}>
                <span>{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : 'var(--accent2)' }}>{s.changePct >= 0 ? '↑' : '↓'}{Math.abs(s.changePct)}%</span>
              </div>
            ))}
          </div>
          <div className="border-4 p-3 text-xs opacity-80" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
            <div className="mb-2 text-[10px]" style={{ fontFamily: 'var(--font-display)' }}>
              RUMORS
            </div>
            {news.slice(0, 3).map((n, i) => (
              <p key={i} className="mb-2 border-l-2 pl-2" style={{ borderColor: 'var(--accent3)' }}>
                {n.title}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
