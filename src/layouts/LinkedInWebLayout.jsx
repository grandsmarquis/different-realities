import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'

function NetworkMesh() {
  return (
    <svg className="li-web-mesh pointer-events-none absolute inset-0 h-full min-h-[480px] w-full text-[#0a66c2]" aria-hidden>
      <defs>
        <pattern id="li-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.2" fill="currentColor" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#li-dots)" className="li-web-dots-drift" />
      <g className="li-web-mesh-lines" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.2">
        <path d="M0,120 Q180,40 360,100 T720,80" />
        <path d="M-40,280 Q200,200 420,260 T900,220" />
        <path d="M80,0 Q140,200 100,400" />
        <path d="M90%,0 Q70%,180 85%,380" />
      </g>
    </svg>
  )
}

function FloatingHandshake({ className, delay }) {
  return (
    <span
      className={`li-web-handshake pointer-events-none absolute text-2xl opacity-25 ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      🤝
    </span>
  )
}

function LogoMark() {
  return (
    <div className="li-web-logo-pulse flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#0a66c2] text-lg font-bold text-white shadow-md" style={{ fontFamily: 'var(--font-display)' }}>
      in
    </div>
  )
}

export default function LinkedInWebLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [profileViews, setProfileViews] = useState(128)
  const [connectionStrength, setConnectionStrength] = useState(87)

  useEffect(() => {
    const id = setInterval(() => {
      setProfileViews(v => v + (Math.random() > 0.55 ? 1 : 0))
      setConnectionStrength(() => 72 + Math.floor(Math.random() * 22))
    }, 3200)
    return () => clearInterval(id)
  }, [])

  const ticker = useMemo(
    () =>
      [
        `${profileViews} people peeked at your headline today`,
        'Someone from “Stealth Startup” viewed your weather widget',
        'Premium suggestion: endorse yourself for “Checking Email”',
        'Your network is 3° from this news story',
        'Recruiter bot liked your commitment to hydration (humidity 62%)',
      ].join('     ·     '),
    [profileViews],
  )

  const unread = emails.filter(e => !e.read).length

  return (
    <div className="li-web-bg relative min-h-dvh overflow-x-hidden pb-16 text-[#191919]" style={{ fontFamily: 'var(--font-main)' }}>
      <NetworkMesh />
      <FloatingHandshake className="left-[8%] top-[24%] -rotate-12" delay={0} />
      <FloatingHandshake className="right-[12%] top-[32%] rotate-6" delay={1.2} />
      <FloatingHandshake className="left-[18%] bottom-[30%] rotate-3" delay={2.4} />

      <header className="relative z-20 border-b border-[#e0dfdc] bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-3 py-2.5 sm:gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <LogoMark />
            <div className="min-w-0">
              <h1 className="m-0 text-lg font-extrabold leading-tight tracking-tight text-[#191919] sm:text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                Linkd<span className="text-[#0a66c2]">Inn</span>
                <span className="ml-1 align-super text-[9px] font-semibold text-[#666]">parody</span>
              </h1>
              <p className="m-0 hidden text-xs text-[#666] sm:block">The whole web — now in professional mode.</p>
            </div>
          </div>

          <div className="order-last flex w-full min-w-[200px] flex-1 sm:order-none sm:w-auto">
            <label className="input input-sm input-bordered flex w-full items-center gap-2 rounded-full border-[#e0dfdc] bg-[#eef3f8] px-3 py-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0 opacity-50" aria-hidden>
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              <input type="search" className="grow bg-transparent text-sm outline-none" placeholder="Search jobs, guilt, old classmates…" readOnly aria-label="Decorative search (read-only)" />
            </label>
          </div>

          <nav className="flex shrink-0 items-center gap-1 sm:gap-2" aria-label="Parody navigation">
            {[
              { icon: '🏠', label: 'Home' },
              { icon: '👥', label: 'Network', dot: true },
              { icon: '💼', label: 'Jobs' },
              { icon: '💬', label: 'Messaging', dot: unread > 0 },
            ].map(item => (
              <button
                key={item.label}
                type="button"
                className="relative flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-[10px] font-semibold text-[#666] transition-colors hover:bg-[#f3f2ef] hover:text-[#0a66c2] sm:text-xs"
              >
                <span className="text-lg sm:text-xl">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
                {item.dot && <span className="li-web-notif-ping absolute right-1 top-0.5 h-2 w-2 rounded-full bg-[#0a66c2]" />}
              </button>
            ))}
            <button type="button" className="btn btn-primary btn-sm hidden font-bold sm:inline-flex" onClick={onSwitchPersona}>
              Log out & touch grass
            </button>
          </nav>
        </div>

        <div className="overflow-hidden border-t border-[#eef3f8] bg-[#eef3f8]/80 py-2">
          <div className="li-web-ticker-inner whitespace-nowrap text-xs font-semibold text-[#404040]">
            <span className="inline-block px-8">{ticker}</span>
            <span className="inline-block px-8" aria-hidden>
              {ticker}
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-4 px-3 py-5 lg:grid-cols-12">
        <aside className="space-y-3 lg:col-span-3">
          <div className="li-web-card-tilt card border border-[#e0dfdc] bg-white shadow-sm">
            <div className="card-body gap-3 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0a66c2] to-[#004182] text-2xl text-white shadow-md">
                  🧑‍💼
                </div>
                <div className="min-w-0">
                  <p className="m-0 text-sm font-bold leading-tight">You, Probably</p>
                  <p className="m-0 mt-0.5 text-xs text-[#666]">Chief Everything Officer @ Life</p>
                </div>
              </div>
              <div className="rounded-lg bg-[#f3f2ef] p-3">
                <p className="m-0 text-[10px] font-bold uppercase tracking-wider text-[#666]">Profile views</p>
                <p className="m-0 text-2xl font-extrabold tabular-nums text-[#0a66c2]" style={{ fontFamily: 'var(--font-display)' }}>
                  {profileViews}
                </p>
                <p className="m-0 text-[11px] text-[#666]">Discover who almost cared.</p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-dashed border-[#0a66c2]/30 bg-[#eef3f8] px-3 py-2">
                <span className="text-[10px] font-bold uppercase text-[#666]">Connection strength</span>
                <span className="text-sm font-extrabold text-[#0a66c2]">{connectionStrength}%</span>
              </div>
            </div>
          </div>

          <div className="li-web-weather-wiggle card border border-[#e0dfdc] bg-white shadow-sm">
            <div className="card-body gap-2 p-4">
              <p className="m-0 text-[10px] font-bold uppercase tracking-wider text-[#666]">Weather for networking</p>
              <div className="flex items-center gap-3">
                <span className="text-5xl drop-shadow-sm">{weather.icon}</span>
                <div>
                  <p className="m-0 text-3xl font-extrabold leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                    {weather.temp}°C
                  </p>
                  <p className="m-0 text-sm font-semibold">{weather.city}</p>
                  <p className="m-0 text-xs text-[#666]">
                    Feels {weather.feels_like}° — dress for accidental coffee with a VP.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#e0dfdc] bg-gradient-to-br from-white to-[#eef3f8] p-4 text-center shadow-sm">
            <p className="m-0 text-[10px] font-bold uppercase text-[#666]">Endorsement</p>
            <p className="m-0 mt-2 text-sm font-semibold text-[#191919]">“Outstanding ability to refresh the same four tabs.”</p>
            <p className="m-0 mt-1 text-xs text-[#666]">— The Algorithm, 2nd degree</p>
          </div>
        </aside>

        <main className="space-y-4 lg:col-span-6">
          <div className="li-web-composer card border border-[#e0dfdc] bg-white shadow-sm">
            <div className="card-body flex-row items-center gap-3 p-3 sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef3f8] text-lg">✨</div>
              <div className="min-w-0 flex-1 rounded-full border border-[#e0dfdc] bg-[#fafafa] px-4 py-2.5 text-left text-sm text-[#666]">
                Start a post about how busy you are…
              </div>
              <div className="hidden shrink-0 gap-1 sm:flex">
                <span className="rounded-lg bg-[#eef3f8] px-2 py-1 text-lg" title="Photo">
                  📷
                </span>
                <span className="rounded-lg bg-[#eef3f8] px-2 py-1 text-lg" title="Video">
                  🎬
                </span>
                <span className="rounded-lg bg-[#eef3f8] px-2 py-1 text-lg" title="Poll">
                  📊
                </span>
              </div>
            </div>
          </div>

          <section>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h2 className="m-0 text-sm font-bold text-[#191919]" style={{ fontFamily: 'var(--font-display)' }}>
                Messaging
              </h2>
              <span className="badge border-0 bg-[#0a66c2] font-bold text-white">{unread} “urgent”</span>
            </div>
            <ul className="space-y-2">
              {emails.map((e, i) => (
                <li key={e.id} className="li-web-feed-enter" style={{ animationDelay: `${i * 0.06}s` }}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0a66c2]/40 hover:shadow-md ${
                      e.read ? 'border-[#e0dfdc] bg-white' : 'border-[#0a66c2]/35 bg-[#f0f7ff] ring-1 ring-[#0a66c2]/15'
                    }`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef3f8] text-xl">{e.from.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <p className={`m-0 text-sm ${e.read ? 'text-[#404040]' : 'font-bold text-[#191919]'}`}>{e.subject}</p>
                      <p className="m-0 text-xs text-[#666]">
                        {e.from.name} · {e.date}
                      </p>
                      <p className="m-0 mt-1 line-clamp-2 text-xs text-[#666]">{e.preview}</p>
                    </div>
                    {!e.read && <span className="badge badge-sm shrink-0 border-0 bg-[#0a66c2] text-white">New</span>}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="m-0 mb-2 text-sm font-bold text-[#191919]" style={{ fontFamily: 'var(--font-display)' }}>
              Feed — trending in your echo chamber
            </h2>
            <ul className="space-y-3">
              {news.map((n, i) => (
                <li key={n.id} className="li-web-feed-enter" style={{ animationDelay: `${(i + emails.length) * 0.05}s` }}>
                  <article className="card border border-[#e0dfdc] bg-white shadow-sm">
                    <div className="card-body gap-2 p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{n.emoji}</span>
                        <div>
                          <p className="m-0 text-xs font-bold text-[#0a66c2]">{n.source}</p>
                          <p className="m-0 text-[10px] text-[#666]">{n.time} · {n.category}</p>
                        </div>
                      </div>
                      <p className="m-0 text-sm font-semibold leading-snug text-[#191919]">{n.title}</p>
                      <div className="flex flex-wrap gap-3 border-t border-[#f3f2ef] pt-2 text-xs font-semibold text-[#666]">
                        <span className="transition-colors hover:text-[#0a66c2]">👍 Like {12 + n.id * 7}</span>
                        <span className="transition-colors hover:text-[#0a66c2]">💬 Comment {n.id * 3}</span>
                        <span className="transition-colors hover:text-[#0a66c2]">🔁 Repost performatively</span>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <button type="button" className="btn btn-outline btn-primary btn-block border-[#0a66c2] font-bold sm:hidden" onClick={onSwitchPersona}>
            Log out & touch grass
          </button>
        </main>

        <aside className="space-y-3 lg:col-span-3">
          <div className="card border border-[#e0dfdc] bg-white shadow-sm">
            <div className="card-body gap-3 p-4">
              <p className="m-0 text-xs font-bold text-[#191919]" style={{ fontFamily: 'var(--font-display)' }}>
                LinkdInn News
              </p>
              <ul className="space-y-2">
                {news.slice(0, 4).map(n => (
                  <li key={`side-${n.id}`} className="flex gap-2 text-xs leading-snug text-[#404040]">
                    <span className="shrink-0 text-base">{n.emoji}</span>
                    <span>{n.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="li-web-market-glow card border border-[#e0dfdc] bg-white shadow-sm">
            <div className="card-body gap-3 p-4">
              <div className="flex items-center justify-between">
                <p className="m-0 text-xs font-bold text-[#191919]" style={{ fontFamily: 'var(--font-display)' }}>
                  Market snapshot
                </p>
                <span className="rounded bg-[#eef3f8] px-2 py-0.5 text-[10px] font-bold text-[#0a66c2]">PRO+</span>
              </div>
              <ul className="space-y-3">
                {stocks.map(s => (
                  <li key={s.ticker} className="flex items-center gap-2 border-b border-[#f3f2ef] pb-3 last:border-0 last:pb-0">
                    <div className="min-w-0 flex-1">
                      <p className="m-0 font-mono text-sm font-bold">{s.ticker}</p>
                      <p className={`m-0 text-xs font-semibold ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                        {s.changePct >= 0 ? '▲' : '▼'} {s.changePct > 0 ? '+' : ''}
                        {s.changePct}%
                      </p>
                    </div>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#0a66c2' : '#c03717'} className="opacity-90" />
                  </li>
                ))}
              </ul>
              <p className="m-0 text-[10px] leading-relaxed text-[#666]">Past performance does not guarantee you will stop checking this during meetings.</p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-dashed border-amber-400/60 bg-amber-50 p-4 text-center">
            <p className="m-0 text-[10px] font-bold uppercase tracking-wider text-amber-800">Promoted</p>
            <p className="m-0 mt-2 text-sm font-bold text-[#191919]">Learn Excel in your sleep</p>
            <p className="m-0 mt-1 text-xs text-[#666]">Sponsored by someone who endorsed you for “Microsoft Word”</p>
          </div>
        </aside>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            className="li-web-modal-spring relative max-h-[min(85vh,560px)] w-full max-w-lg overflow-y-auto rounded-xl border border-[#e0dfdc] bg-white shadow-2xl"
            onClick={ev => ev.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="li-web-mail-title"
          >
            <div className="absolute -right-2 -top-2 rotate-6 rounded-lg bg-[#0a66c2] px-2 py-1 text-[10px] font-bold uppercase text-white shadow-lg">
              InMail™ (jk)
            </div>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close"
              onClick={() => setSelectedEmail(null)}
            >
              ✕
            </button>
            <div className="p-6 pt-10">
              <h3 id="li-web-mail-title" className="m-0 pr-8 text-xl font-bold text-[#191919]" style={{ fontFamily: 'var(--font-display)' }}>
                {selectedEmail.subject}
              </h3>
              <p className="m-0 mt-1 text-sm text-[#666]">{selectedEmail.from.name}</p>
              <div className="mt-4 whitespace-pre-wrap border-t border-[#f3f2ef] pt-4 text-sm leading-relaxed text-[#404040]">{selectedEmail.body}</div>
              <div className="mt-6 flex flex-wrap gap-2">
                <button type="button" className="btn btn-primary btn-sm font-bold">
                  Reply with “Thanks for reaching out!”
                </button>
                <button type="button" className="btn btn-ghost btn-sm font-semibold" onClick={() => setSelectedEmail(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
