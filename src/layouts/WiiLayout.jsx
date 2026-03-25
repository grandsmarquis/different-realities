import { useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const channelSubtitle = t =>
  ({ work: 'Office Channel', personal: 'Mii Mail', finance: 'Wii Shop… almost', promo: 'Today’s Pick', newsletter: 'News Channel', social: 'Everybody Votes… vibes' }[t] || 'Other')

export default function WiiLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 19) % 78)}%`,
        top: `${6 + ((i * 23) % 40)}%`,
        delay: `${(i * 0.41).toFixed(2)}s`,
        scale: 0.6 + (i % 4) * 0.15,
      })),
    [],
  )

  return (
    <div
      className="min-h-screen relative overflow-hidden wii-sky"
      style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}
    >
      <div className="wii-clouds pointer-events-none fixed inset-0 z-0" aria-hidden />
      {!reducedMotion &&
        sparkles.map(s => (
          <span
            key={s.id}
            className="wii-sparkle pointer-events-none fixed z-0 text-lg"
            style={{ left: s.left, top: s.top, animationDelay: s.delay, transform: `scale(${s.scale})` }}
            aria-hidden
          >
            ✦
          </span>
        ))}

      <div className="relative z-10">
        <header className="wii-header-bar border-b border-sky-300/40 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`text-4xl select-none ${reducedMotion ? '' : 'wii-waggle'}`} aria-hidden>
                📧
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-wide" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                  Wii Menu
                </h1>
                <p className="text-sm opacity-70">Message Board · {emails.length} channels</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary btn-sm rounded-full px-6 shadow-md border-0" style={{ background: 'var(--accent)', color: '#fff' }} onClick={onSwitchPersona}>
              Wii Options
            </button>
          </div>
        </header>

        <div className="flex flex-col xl:flex-row" style={{ minHeight: 'calc(100vh - 100px)' }}>
          <aside className="xl:w-[340px] shrink-0 p-4 overflow-y-auto">
            <p className="text-center text-xs font-bold tracking-widest mb-4 opacity-60" style={{ color: 'var(--accent2)' }}>
              SELECT A CHANNEL
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-4">
              {emails.map((e, i) => {
                const active = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`wii-channel-tile relative flex flex-col items-center justify-center aspect-square rounded-2xl border-4 p-2 text-center shadow-lg transition-transform duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/60 ${
                      active ? 'ring-4 ring-sky-400 scale-[1.02] z-10' : 'hover:scale-[1.03]'
                    } ${reducedMotion ? '' : 'wii-channel-float'}`}
                    style={{
                      borderColor: active ? 'var(--accent)' : 'rgba(255,255,255,0.85)',
                      background: active ? 'linear-gradient(165deg, #fff 0%, #e0f4ff 100%)' : 'linear-gradient(165deg, #ffffff 0%, #f0f9ff 100%)',
                      boxShadow: active ? '0 12px 28px rgba(14, 116, 184, 0.35)' : '0 8px 20px rgba(14, 116, 184, 0.18)',
                      animationDelay: reducedMotion ? undefined : `${(i % 6) * 0.35}s`,
                    }}
                  >
                    {!e.read && !reducedMotion && (
                      <span className="absolute top-1 right-1 size-3 rounded-full animate-ping bg-sky-500 opacity-75" aria-hidden />
                    )}
                    <span className="text-4xl mb-1 drop-shadow-sm">{e.from.avatar}</span>
                    <span className="text-[10px] font-bold leading-tight line-clamp-3 px-0.5" style={{ color: 'var(--accent2)' }}>
                      {e.subject}
                    </span>
                    <span className="text-[9px] opacity-50 mt-1 line-clamp-1 w-full">{channelSubtitle(e.tag)}</span>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {selectedEmail ? (
              <div className="max-w-2xl mx-auto">
                <div className={`wii-letter-sheet rounded-3xl border-4 p-6 md:p-10 shadow-xl ${reducedMotion ? '' : 'wii-letter-wobble'}`} style={{ borderColor: '#fff', background: 'linear-gradient(180deg, #ffffff 0%, #f8fcff 100%)', boxShadow: '0 20px 50px rgba(0, 100, 180, 0.15), inset 0 1px 0 rgba(255,255,255,0.9)' }}>
                  <div className="flex flex-wrap gap-4 items-start justify-between mb-6 pb-4 border-b border-sky-200/80">
                    <div className="flex items-center gap-3">
                      <span className={`text-5xl ${reducedMotion ? '' : 'wii-waggle'}`}>{selectedEmail.from.avatar}</span>
                      <div>
                        <h2 className="text-xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                          {selectedEmail.subject}
                        </h2>
                        <p className="text-sm opacity-60">
                          {selectedEmail.from.name} · {selectedEmail.date}
                        </p>
                      </div>
                    </div>
                    <span className="badge border-2 border-sky-300 bg-sky-100 text-sky-800 whitespace-normal text-left max-w-[10rem] h-auto min-h-8 py-1">{channelSubtitle(selectedEmail.tag)}</span>
                  </div>
                  <div className="leading-relaxed whitespace-pre-wrap text-base opacity-90" style={{ color: '#1e3a5f' }}>
                    {selectedEmail.body}
                  </div>
                  <div className="mt-8 flex justify-center gap-2 text-2xl opacity-40 select-none" aria-hidden>
                    <span className="wii-star-spin">⭐</span>
                    <span className="wii-star-spin" style={{ animationDelay: '0.2s' }}>
                      ⭐
                    </span>
                    <span className="wii-star-spin" style={{ animationDelay: '0.4s' }}>
                      ⭐
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[45vh] text-center">
                <p className={`text-6xl mb-4 ${reducedMotion ? '' : 'wii-pointer-bob'}`} aria-hidden>
                  👆
                </p>
                <p className="text-lg font-bold opacity-60" style={{ fontFamily: 'var(--font-display)' }}>
                  Point at a channel to read your mail!
                </p>
              </div>
            )}
          </main>

          <aside className="xl:w-56 shrink-0 p-4 space-y-3 overflow-y-auto">
            <div className="wii-glossy-card rounded-2xl p-4 text-center">
              <div className="text-[10px] font-bold tracking-widest opacity-50 mb-1">FORECAST</div>
              <div className="text-4xl mb-1">{weather.icon}</div>
              <div className="font-bold">{weather.condition}</div>
              <div className="text-xs opacity-60 mt-1">
                {weather.temp}° · wind {weather.wind}
              </div>
            </div>
            <div className="wii-glossy-card rounded-2xl p-3">
              <div className="text-[10px] font-bold tracking-widest opacity-50 mb-2 text-center">STOCKS</div>
              {stocks.map(s => (
                <div key={s.ticker} className="flex justify-between text-xs py-1.5 border-b border-sky-200/50 last:border-0">
                  <span>{s.ticker}</span>
                  <span className="font-bold" style={{ color: s.changePct >= 0 ? '#0d9488' : '#e11d48' }}>
                    {s.changePct >= 0 ? '↑' : '↓'}
                    {Math.abs(s.changePct)}%
                  </span>
                </div>
              ))}
            </div>
            <div className="wii-glossy-card rounded-2xl p-3">
              <div className="text-[10px] font-bold tracking-widest opacity-50 mb-2 text-center">NEWS</div>
              {news.slice(0, 3).map((n, i) => (
                <p key={i} className="text-[11px] leading-snug py-2 border-b border-sky-200/40 last:border-0 opacity-85">
                  {n.title}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
