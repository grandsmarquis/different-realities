import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 96
  const h = 28
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0">
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={pts} />
    </svg>
  )
}

export default function EarlyFacebookLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [pokeMsg, setPokeMsg] = useState(null)

  return (
    <div className="min-h-dvh bg-[#e9eaed] pb-10" style={{ fontFamily: 'var(--font-main)', color: '#1c1e21' }}>
      <header className="sticky top-0 z-20 border-b border-[#29487d] bg-[#3b5998] text-white shadow-sm">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-3 py-2">
          <span className="text-xl font-black tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            faceboo<span className="text-[#8b9dc3]">k</span>
          </span>
          <div className="hidden min-w-[200px] flex-1 sm:block">
            <input
              readOnly
              className="input input-sm w-full max-w-xs rounded border-0 bg-[#29487d] text-sm text-white placeholder:text-[#8b9dc3]"
              placeholder="Search…"
              aria-label="Search placeholder"
            />
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-xs">
            <span className="opacity-90">Home</span>
            <span className="opacity-90">Profile</span>
            <button
              type="button"
              className="earlyfb-poke-pulse rounded bg-[#5b7bb4] px-2 py-0.5 font-semibold hover:bg-[#6d8ec4]"
              onClick={() => {
                setPokeMsg('You poked the algorithm. It poked back.')
                setTimeout(() => setPokeMsg(null), 2200)
              }}
            >
              Poke
            </button>
            <button type="button" className="rounded bg-[#29487d] px-2 py-0.5 hover:bg-[#365899]" onClick={onSwitchPersona}>
              Log out
            </button>
          </nav>
        </div>
        {pokeMsg && <p className="mx-auto max-w-5xl px-3 pb-1 text-center text-[11px] text-[#d8dfea]">{pokeMsg}</p>}
      </header>

      <div className="mx-auto grid max-w-5xl gap-4 px-3 py-4 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="rounded border border-[#d3d6db] bg-white p-3 shadow-sm">
            <p className="m-0 text-xs font-bold text-[#576b95]">Friends online</p>
            <p className="m-0 mt-2 text-sm">You and {emails.length} messages</p>
          </div>
        </aside>

        <main className="lg:col-span-6">
          <div className="mb-3 rounded border border-[#d3d6db] bg-white p-3 shadow-sm">
            <p className="m-0 text-sm font-semibold text-[#4b4f56]">What&apos;s on your mind?</p>
            <div className="mt-2 h-14 rounded border border-dashed border-[#ccd0d5] bg-[#f6f7f9] text-xs leading-[3.5rem] text-center text-[#90949c]">
              Write something… (just kidding, it&apos;s {new Date().getFullYear()})
            </div>
          </div>

          <div className="rounded border border-[#d3d6db] bg-white shadow-sm">
            <div className="border-b border-[#e9ebee] px-3 py-2 text-xs font-bold uppercase tracking-wide text-[#4b4f56]">Wall · Inbox</div>
            <div className="divide-y divide-[#e9ebee]">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full p-4 text-left transition-colors hover:bg-[#f6f7f9] ${on ? 'bg-[#edf2fa]' : ''}`}
                  >
                    <div className="flex gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded bg-[#d8dfea] text-xl">{e.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <p className="m-0 text-sm">
                          <span className="font-semibold text-[#365899]">{e.from.name}</span>
                          <span className="text-[#90949c]"> · {e.date}</span>
                        </p>
                        <p className={`m-0 mt-1 text-[15px] leading-snug ${e.read ? 'text-[#1c1e21]' : 'font-semibold text-[#1c1e21]'}`}>{e.subject}</p>
                        <p className="m-0 mt-1 line-clamp-2 text-xs text-[#606770]">{e.preview}</p>
                        <p className="m-0 mt-2 text-xs text-[#365899]">Like · Comment · See message</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {selectedEmail && (
            <div className="mt-4 rounded border border-[#d3d6db] bg-white p-4 shadow-sm">
              <p className="m-0 text-xs text-[#90949c]">{selectedEmail.date}</p>
              <h2 className="m-0 mt-1 text-lg font-semibold text-[#1c1e21]">{selectedEmail.subject}</h2>
              <p className="m-0 text-sm text-[#365899]">{selectedEmail.from.name}</p>
              <div className="mt-3 whitespace-pre-wrap border-t border-[#e9ebee] pt-3 text-sm leading-relaxed">{selectedEmail.body}</div>
            </div>
          )}
        </main>

        <aside className="space-y-3 lg:col-span-3">
          <div className="rounded border border-[#d3d6db] bg-white p-3 shadow-sm">
            <p className="m-0 text-xs font-bold text-[#4b4f56]">{weather.city}</p>
            <p className="m-0 mt-1 text-2xl">
              {weather.icon} {weather.temp}°C
            </p>
            <p className="m-0 text-xs text-[#606770]">{weather.condition}</p>
          </div>

          <div className="rounded border border-[#d3d6db] bg-white p-3 shadow-sm">
            <p className="m-0 text-xs font-bold text-[#4b4f56]">Market</p>
            {stocks.map(s => (
              <div key={s.ticker} className="mt-2 flex items-center justify-between gap-2 text-sm first:mt-0">
                <span className="font-semibold text-[#365899]">{s.ticker}</span>
                <span className={s.changePct >= 0 ? 'text-green-700' : 'text-red-600'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#15803d' : '#dc2626'} />
              </div>
            ))}
          </div>

          <div className="rounded border border-[#d3d6db] bg-white p-3 shadow-sm">
            <p className="m-0 text-xs font-bold text-[#4b4f56]">News feed</p>
            <ul className="m-0 mt-2 list-none space-y-2 p-0 text-xs">
              {news.map(n => (
                <li key={n.id} className="border-b border-[#e9ebee] pb-2 last:border-0">
                  {n.emoji} {n.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
