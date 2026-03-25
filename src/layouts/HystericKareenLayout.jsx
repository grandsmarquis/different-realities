import { useContext, useMemo } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function HystericKareenLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const unread = useMemo(() => emails.filter(e => !e.read).length, [])

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          background: `repeating-linear-gradient(-12deg, var(--accent) 0, var(--accent) 2px, transparent 2px, transparent 14px),
            repeating-linear-gradient(12deg, var(--accent2) 0, var(--accent2) 2px, transparent 2px, transparent 14px)`,
        }}
        aria-hidden
      />

      <div className="karen-siren-ring relative z-10 overflow-x-hidden border-b-4 px-3 py-2" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}>
        <div className="karen-marquee flex w-max whitespace-nowrap text-xs font-bold tracking-widest" style={{ color: 'var(--accent)' }}>
          <span className="pr-16">
            UNACCEPTABLE · I KNOW THE OWNER · THIS IS ILLEGAL · I WANT COMPENSATION · MANAGER NOW ·
          </span>
          <span>
            UNACCEPTABLE · I KNOW THE OWNER · THIS IS ILLEGAL · I WANT COMPENSATION · MANAGER NOW ·
          </span>
        </div>
      </div>

      <header className="relative z-10 px-4 py-6 md:px-8">
        <div className="mx-auto flex max-w-5xl -rotate-1 flex-col gap-4 border-4 p-5 shadow-xl md:flex-row md:items-center md:justify-between" style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}>
          <div className="karen-shake-soft">
            <p className="text-xs tracking-[0.2em]" style={{ color: 'var(--accent2)' }}>
              PRIORITY: APOCALYPTIC
            </p>
            <h1 className="text-4xl uppercase md:text-6xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              WHERE IS MY INBOX
            </h1>
            <p className="mt-2 text-sm opacity-80">
              {unread} UNREAD = {unread} PERSONAL SLIGHTS · {emails.length} TOTAL COMPLAINTS QUEUED
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <button type="button" className="btn btn-error btn-lg uppercase tracking-widest shadow-lg">
              Summon manager
            </button>
            <button type="button" onClick={onSwitchPersona} className="btn btn-ghost btn-sm uppercase">
              Wrong store (exit)
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-5xl gap-4 px-4 pb-12 md:grid-cols-2 md:gap-6 md:px-6">
        <section className="rotate-1 space-y-2">
          <h2 className="px-2 text-sm uppercase tracking-[0.3em] opacity-60">Evidence wall</h2>
          {emails.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setSelectedEmail(e)}
              className="flex w-full -skew-x-1 transform gap-3 border-l-8 p-4 text-left shadow-md transition hover:brightness-110"
              style={{
                borderColor: selectedEmail?.id === e.id ? 'var(--accent2)' : 'var(--border)',
                background: selectedEmail?.id === e.id ? 'var(--accent3)' : 'var(--card)',
                marginLeft: i % 2 === 0 ? 0 : '12px',
              }}
            >
              <span className="text-3xl">{e.from.avatar}</span>
              <div className="min-w-0 flex-1 skew-x-1">
                <p className="line-clamp-2 text-sm font-bold uppercase leading-tight">{e.subject}</p>
                <p className="mt-1 text-xs opacity-60">{e.from.name}</p>
                {!e.read && (
                  <span className="badge badge-error badge-sm mt-2 uppercase">Unopened scandal</span>
                )}
              </div>
            </button>
          ))}
        </section>

        <section className="-rotate-1">
          <div className="sticky top-4 border-4 p-4 shadow-2xl" style={{ borderColor: 'var(--accent2)', background: 'var(--bg2)' }}>
            <div className="mb-3 flex items-center justify-between border-b-2 pb-2" style={{ borderColor: 'var(--accent)' }}>
              <span className="text-xs font-bold uppercase tracking-widest">Incident report</span>
              <span className="text-2xl" aria-hidden>
                📋
              </span>
            </div>
            {selectedEmail ? (
              <div className="max-h-[min(70vh,620px)] overflow-y-auto">
                <h3 className="text-xl font-bold uppercase leading-snug" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                  {selectedEmail.subject}
                </h3>
                <p className="mt-2 text-xs uppercase opacity-50">
                  Witness: {selectedEmail.from.name} · {selectedEmail.date}
                </p>
                <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed opacity-90">{selectedEmail.body}</div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="btn btn-xs btn-warning uppercase">Escalate</span>
                  <span className="btn btn-xs btn-outline uppercase">Lawyer cc</span>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 p-6 text-center opacity-50">
                <p className="text-4xl">❗</p>
                <p className="font-bold uppercase">Select a violation</p>
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-2 border-t-2 pt-4 text-[10px] uppercase" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="opacity-50">Outside temp</p>
                <p className="text-lg">
                  {weather.icon} {weather.temp}°
                </p>
              </div>
              <div>
                <p className="opacity-50">Market (also wrong)</p>
                {stocks.slice(0, 2).map(s => (
                  <p key={s.ticker}>
                    {s.ticker} {s.changePct}%
                  </p>
                ))}
              </div>
            </div>
            <p className="mt-2 line-clamp-3 text-[10px] opacity-60">{news[0]?.title}</p>
          </div>
        </section>
      </div>
    </div>
  )
}
