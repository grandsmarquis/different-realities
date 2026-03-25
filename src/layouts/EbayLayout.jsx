import { useContext, useEffect, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function stars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n)
}

export default function EbayLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(84729)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined
    const t = setInterval(() => {
      setSecondsLeft(s => (s <= 1 ? 86400 : s - 1))
    }, 1000)
    return () => clearInterval(t)
  }, [reducedMotion])

  const fmt = s => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${h}h ${m}m ${sec}s`
  }

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <header
        className="shrink-0 border-b-4 px-3 py-2 md:px-4"
        style={{ borderColor: 'var(--accent2)', background: 'var(--accent)' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl font-black italic shrink-0" style={{ color: 'var(--bg)', fontFamily: 'var(--font-display)' }}>
              eMail
            </span>
            <span className="text-[10px] font-bold hidden sm:inline opacity-90" style={{ color: 'var(--bg)' }}>
              The world&apos;s online marketplace… for messages
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`text-[10px] md:text-xs font-black tabular-nums px-2 py-1 rounded border-2 ${reducedMotion ? '' : 'ebay-urgent'}`}
              style={{ borderColor: 'var(--bg)', color: 'var(--bg)', background: 'color-mix(in srgb, var(--accent2) 25%, transparent)' }}
            >
              ENDING: {fmt(secondsLeft)}
            </div>
            <button
              type="button"
              className="btn btn-xs md:btn-sm font-bold border-2"
              style={{ borderColor: 'var(--bg)', background: 'var(--bg)', color: 'var(--accent2)' }}
              onClick={onSwitchPersona}
            >
              Log off
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        <div className="lg:w-[58%] shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r-2 min-h-0 overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)' }}>
            Active listings ({emails.length}) — sort: Time: ending soonest
          </div>
          <div className="overflow-x-auto overflow-y-auto flex-1">
            <table className="table table-sm w-full text-left" style={{ fontSize: '11px' }}>
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <th className="w-10" />
                  <th>Item</th>
                  <th className="hidden sm:table-cell w-24">Seller</th>
                  <th className="w-20 text-right">Bids</th>
                  <th className="w-24 hidden md:table-cell">Ends</th>
                </tr>
              </thead>
              <tbody>
                {emails.map(e => {
                  const on = selectedEmail?.id === e.id
                  const bid = (e.id * 3) % 47
                  const rating = 3 + (e.id % 3)
                  return (
                    <tr
                      key={e.id}
                      className="border-b cursor-pointer hover:bg-base-200/50"
                      style={{
                        borderColor: 'var(--border)',
                        background: on ? 'color-mix(in srgb, var(--accent) 12%, var(--bg))' : undefined,
                      }}
                      onClick={() => setSelectedEmail(e)}
                    >
                      <td className="align-middle p-1">
                        <span className="text-xl block text-center">{e.from.avatar}</span>
                      </td>
                      <td className="align-middle p-1 max-w-[200px]">
                        <span className="font-bold text-[11px] md:text-xs line-clamp-2 text-info underline decoration-2">{e.subject}</span>
                        {!e.read && (
                          <span className="ml-1 text-[9px] font-black px-1 rounded" style={{ background: 'var(--accent2)', color: 'var(--bg)' }}>
                            NEW
                          </span>
                        )}
                        <div className="text-[9px] opacity-60 mt-0.5">{e.tag}</div>
                      </td>
                      <td className="hidden sm:table-cell align-middle p-1">
                        <div className="font-bold truncate max-w-[100px]">{e.from.name}</div>
                        <div className="text-[9px]" style={{ color: 'var(--accent2)' }}>
                          {stars(rating)}
                        </div>
                      </td>
                      <td className="align-middle p-1 text-right font-mono font-bold">{bid}</td>
                      <td className="hidden md:table-cell align-middle p-1 text-[10px] opacity-70">{e.date}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <main className="flex-1 flex flex-col min-w-0 min-h-0 p-3 md:p-4" style={{ background: 'var(--bg2)' }}>
          {selectedEmail ? (
            <div className="flex flex-col flex-1 min-h-0 max-w-xl mx-auto w-full">
              <div className="rounded border-2 p-3 md:p-4 flex flex-col flex-1 min-h-0 overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                <div className="flex gap-3 border-b pb-3 mb-3" style={{ borderColor: 'var(--border)' }}>
                  <div
                    className="size-20 md:size-24 shrink-0 rounded border-2 flex items-center justify-center text-4xl"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
                  >
                    {selectedEmail.from.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-base md:text-lg font-black leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedEmail.subject}
                    </h1>
                    <p className="text-[11px] mt-1">
                      Seller: <span className="font-bold text-info underline">{selectedEmail.from.name}</span> ({stars(4)})
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className={`btn btn-sm font-black uppercase ${reducedMotion ? '' : 'ebay-urgent'}`}
                        style={{ background: 'var(--accent2)', color: 'var(--bg)', border: 'none' }}
                      >
                        Buy it now
                      </button>
                      <button type="button" className="btn btn-sm btn-outline font-bold" style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}>
                        Place bid
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] uppercase font-bold mb-2 opacity-60">Item description</div>
                <div className="flex-1 overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap border rounded p-3" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                  {selectedEmail.body}
                </div>
                <p className="text-[9px] mt-2 opacity-50">Ships from: The cloud · Estimated delivery: whenever</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center text-center text-sm opacity-60 font-bold p-6">
              Click a listing on the left — don&apos;t let the timer gaslight you
            </div>
          )}

          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
            <div className="rounded border p-2" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <span className="font-bold block mb-1">Weather</span>
              {weather.icon} {weather.condition}
            </div>
            {stocks.slice(0, 3).map(s => (
              <div key={s.ticker} className="rounded border p-2 font-mono" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                <span className="font-bold">{s.ticker}</span> {s.changePct >= 0 ? '+' : ''}
                {s.changePct}%
              </div>
            ))}
          </div>
        </main>

        <aside className="lg:w-44 shrink-0 border-t lg:border-t-0 lg:border-l-2 p-2 overflow-y-auto text-[10px]" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <p className="font-black uppercase mb-2" style={{ color: 'var(--accent2)' }}>
            Related searches
          </p>
          <ul className="space-y-1">
            {news.slice(0, 8).map((n, i) => (
              <li key={i}>
                <button type="button" className="link link-hover text-left leading-snug">
                  {n.title.slice(0, 42)}
                  {n.title.length > 42 ? '…' : ''}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
