import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagHue = {
  social: 280,
  work: 210,
  finance: 145,
  dev: 265,
  personal: 340,
  shopping: 35,
  travel: 195,
  newsletter: 25,
}

function seedScore(id) {
  return ((id * 4241) % 89) + 3
}

function fakeRep(id) {
  return ((id * 11003) % 4000) + 128
}

function bountyFor(ticker) {
  const n = ticker.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return ((n * 17) % 450) + 25
}

function MiniSpark({ series, positive }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 72
  const h = 22
  const p = 2
  const r = max - min || 1
  const stroke = positive ? '#2f9d4a' : '#c0392b'
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0 opacity-90">
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={pts} />
    </svg>
  )
}

export default function StackoverflowMailLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const active = selectedEmail ?? emails[0]
  const [voteDelta, setVoteDelta] = useState({})
  const [tab, setTab] = useState('newest')

  useEffect(() => {
    if (!selectedEmail && emails[0]) setSelectedEmail(emails[0])
  }, [selectedEmail, setSelectedEmail])

  const sortedEmails = useMemo(() => {
    const list = [...emails]
    if (tab === 'unread') return list.sort((a, b) => Number(a.read) - Number(b.read))
    if (tab === 'votes')
      return list.sort(
        (a, b) =>
          seedScore(b.id) + (voteDelta[b.id] ?? 0) - (seedScore(a.id) + (voteDelta[a.id] ?? 0)),
      )
    return list
  }, [tab, voteDelta])

  const score = (id) => seedScore(id) + (voteDelta[id] ?? 0)

  const bump = useCallback((id, dir) => {
    setVoteDelta((d) => ({ ...d, [id]: (d[id] ?? 0) + dir }))
  }, [])

  const hue = tagHue[active.tag] ?? 200

  return (
    <div
      className="relative min-h-full overflow-x-hidden pb-28 text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'linear-gradient(180deg, #e7ecf0 0%, #f4f6f8 28%, #eef1f4 100%)',
      }}
    >
      <style>{`
        @keyframes so-mail-stack-bob {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes so-mail-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes so-mail-wiggle {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes so-mail-float-dot {
          0%, 100% { opacity: 0.35; transform: translateY(0); }
          50% { opacity: 0.85; transform: translateY(-4px); }
        }
        .so-mail-stack {
          animation: so-mail-stack-bob 3.2s ease-in-out infinite;
        }
        .so-mail-unread-bar {
          background: linear-gradient(90deg, transparent, rgba(244,128,36,0.35), transparent);
          background-size: 200% 100%;
          animation: so-mail-shimmer 2.8s linear infinite;
        }
        .so-mail-beta {
          animation: so-mail-wiggle 2s ease-in-out infinite;
        }
        .so-mail-vote-hit:active {
          transform: scale(0.92);
        }
        .so-mail-bg-dots {
          background-image: radial-gradient(circle at 20% 30%, rgba(244,128,36,0.06) 0, transparent 45%),
            radial-gradient(circle at 80% 70%, rgba(59,130,246,0.07) 0, transparent 40%);
        }
      `}</style>

      <div className="so-mail-bg-dots pointer-events-none fixed inset-0 -z-10" aria-hidden />

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#f48024] shadow-md">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-3 py-2 sm:px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <button type="button" className="btn btn-ghost btn-square btn-sm text-white hover:bg-white/15" aria-label="Menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <div className="flex min-w-0 items-center gap-2">
              <div className="so-mail-stack hidden sm:block" aria-hidden>
                <svg width="36" height="36" viewBox="0 0 48 48" className="drop-shadow-sm">
                  <rect x="8" y="22" width="32" height="8" rx="2" fill="#fff" opacity="0.95" />
                  <rect x="10" y="14" width="28" height="8" rx="2" fill="#fff" opacity="0.85" />
                  <rect x="12" y="6" width="24" height="8" rx="2" fill="#fff" opacity="0.75" />
                  <circle cx="17" cy="10" r="2" fill="#f48024" />
                  <circle cx="24" cy="18" r="2" fill="#f48024" />
                  <circle cx="31" cy="26" r="2" fill="#f48024" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="m-0 truncate text-lg font-bold leading-tight text-white sm:text-xl">
                  Stacc Overflow
                  <span className="so-mail-beta ml-1.5 inline-block rounded bg-white/25 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    parody
                  </span>
                </p>
                <p className="m-0 hidden text-[11px] text-white/90 sm:block">Mail as Q&amp;A · same inbox, different runtime</p>
              </div>
            </div>
          </div>
          <label className="relative hidden min-w-[200px] max-w-md flex-1 md:block">
            <span className="sr-only">Search</span>
            <input
              type="search"
              readOnly
              placeholder="Search [your inbox]… (jk, it’s static data)"
              className="input input-sm h-9 w-full rounded border-0 bg-white/95 pr-10 text-sm text-[#3b4045] shadow-inner placeholder:text-[#9fa6ad]"
            />
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#9fa6ad]" aria-hidden>
              🔍
            </span>
          </label>
          <div className="flex shrink-0 items-center gap-2">
            <span className="badge badge-sm border-0 bg-white/20 font-mono text-[11px] text-white">
              rep <strong className="ml-0.5">{fakeRep(active.id)}</strong>
            </span>
            <button type="button" className="btn btn-sm border-0 bg-white/95 text-[#f48024] hover:bg-white" onClick={onSwitchPersona}>
              Leave site
            </button>
          </div>
        </div>
      </header>

      {/* Sub stats */}
      <div className="border-b border-[var(--border)] bg-[var(--bg2)]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 px-3 py-2 text-sm text-[var(--text2)] sm:px-4">
          <span>
            <strong className="text-[var(--text)]">{emails.filter((e) => !e.read).length}</strong> unread threads
          </span>
          <span>
            <strong className="text-[var(--text)]">{emails.length}</strong> total questions
          </span>
          <span className="flex items-center gap-1">
            <span
              className="inline-block size-2 rounded-full bg-[#2f9d4a]"
              style={{ animation: 'so-mail-float-dot 1.8s ease-in-out infinite' }}
              aria-hidden
            />
            community mood: <strong className="text-[var(--text)]">helpful</strong>
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-4 px-3 py-4 lg:grid-cols-[minmax(0,1fr)_320px] sm:px-4">
        <div className="flex min-w-0 flex-col gap-4 lg:flex-row">
          {/* Question list */}
          <aside className="card card-border w-full shrink-0 border-[var(--border)] bg-[var(--bg2)] shadow-sm lg:w-[300px]">
            <div className="card-body gap-3 p-3 sm:p-4">
              <div role="tablist" className="tabs tabs-boxed tabs-sm bg-base-200/80 p-1">
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 'newest'}
                  className={`tab ${tab === 'newest' ? 'tab-active' : ''}`}
                  onClick={() => setTab('newest')}
                >
                  Newest
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 'unread'}
                  className={`tab ${tab === 'unread' ? 'tab-active' : ''}`}
                  onClick={() => setTab('unread')}
                >
                  Unread
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 'votes'}
                  className={`tab ${tab === 'votes' ? 'tab-active' : ''}`}
                  onClick={() => setTab('votes')}
                >
                  Votes
                </button>
              </div>
              <ul className="m-0 max-h-[min(52vh,520px)] list-none space-y-1 overflow-y-auto p-0">
                {sortedEmails.map((e) => {
                  const on = active?.id === e.id
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedEmail(e)}
                        className={`flex w-full gap-2 rounded-lg border px-2 py-2 text-left transition-all ${
                          on
                            ? 'border-[#f48024] bg-orange-50 shadow-sm'
                            : 'border-transparent hover:border-[var(--border)] hover:bg-base-200/60'
                        }`}
                      >
                        <div className="flex w-10 shrink-0 flex-col items-center gap-0.5 text-[11px] text-[var(--text2)]">
                          <span className="font-mono font-bold text-[var(--text)]">{score(e.id)}</span>
                          <span className="leading-none opacity-70">votes</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`m-0 line-clamp-2 text-sm leading-snug ${e.read ? 'text-[var(--text2)]' : 'font-semibold text-[var(--text)]'}`}>
                            {e.subject}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-1">
                            <span
                              className="badge badge-xs border-0 font-normal text-white"
                              style={{ backgroundColor: `hsl(${tagHue[e.tag] ?? 200}, 55%, 42%)` }}
                            >
                              {e.tag}
                            </span>
                            {!e.read ? (
                              <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-base-300">
                                <span className="so-mail-unread-bar absolute inset-0" />
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>

          {/* Main “question” */}
          <main className="card card-border min-w-0 flex-1 border-[var(--border)] bg-[var(--bg2)] shadow-md">
            <div className="card-body gap-0 p-0 sm:flex-row">
              <div className="flex flex-row gap-3 border-b border-[var(--border)] p-4 sm:w-16 sm:flex-col sm:border-b-0 sm:border-r sm:p-3 sm:pt-6">
                <button
                  type="button"
                  className="so-mail-vote-hit btn btn-square btn-ghost btn-sm border border-[var(--border)] bg-base-100 text-[#2f9d4a]"
                  aria-label="Upvote"
                  onClick={() => bump(active.id, 1)}
                >
                  ▲
                </button>
                <span className="px-1 text-center font-mono text-lg font-bold leading-none text-[var(--text)] sm:py-1">
                  {score(active.id)}
                </span>
                <button
                  type="button"
                  className="so-mail-vote-hit btn btn-square btn-ghost btn-sm border border-[var(--border)] bg-base-100 text-[#c0392b]"
                  aria-label="Downvote"
                  onClick={() => bump(active.id, -1)}
                >
                  ▼
                </button>
                <div className="hidden text-center text-[10px] text-[var(--text2)] sm:block">
                  funny
                  <br />
                  helpful
                </div>
              </div>

              <div className="min-w-0 flex-1 p-4 sm:p-6">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <h1 className="m-0 text-xl font-normal leading-snug text-[#0c0d0e] sm:text-2xl">{active.subject}</h1>
                  <div className="flex flex-wrap gap-1">
                    <span className="badge badge-outline border-[#f48024] text-[#bc3d00]">inbox</span>
                    <span
                      className="badge border-0 text-white"
                      style={{ backgroundColor: `hsl(${hue}, 58%, 45%)` }}
                    >
                      {active.tag}
                    </span>
                    {active.starred ? (
                      <span className="badge badge-warning gap-1 border-0 text-[#3b2900]">
                        ⭐ favorite
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-3 text-sm text-[var(--text2)]">
                  <span>
                    Asked by <strong className="text-[var(--text)]">{active.from.name}</strong>
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span className="font-mono text-xs">{active.time}</span>
                  <span>·</span>
                  <span className="font-mono text-xs">{active.date}</span>
                </div>

                <div
                  className="rounded-lg border border-[var(--border)] bg-base-100 p-4 shadow-inner"
                  style={{
                    backgroundImage: `linear-gradient(135deg, hsla(${hue}, 70%, 97%, 0.9) 0%, #fff 40%)`,
                  }}
                >
                  <div className="mb-3 flex items-center gap-2 border-b border-dashed border-[var(--border)] pb-2">
                    <span className="badge badge-success badge-sm gap-1 border-0 text-success-content">✓ accepted</span>
                    <span className="text-xs text-[var(--text2)]">This message solved 1 human problem (probably).</span>
                  </div>
                  <div className="prose prose-sm max-w-none font-[var(--font-mono)] text-[var(--text)]">
                    <p className="m-0 whitespace-pre-wrap leading-relaxed">{active.body}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" className="btn btn-outline btn-sm border-[var(--border)]">
                    Mark duplicate (of sleep)
                  </button>
                  <button type="button" className="btn btn-primary btn-sm border-0 bg-[#f48024] text-white hover:bg-[#e06612]">
                    Answer with anxiety
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm text-[var(--text2)]">
                    Share link to procrastination
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-4">
          <div className="card card-border border-[var(--border)] bg-[var(--bg2)] shadow-sm">
            <div className="card-body gap-2 p-4">
              <h2 className="card-title m-0 text-base text-[#0c0d0e]">Runtime · weather</h2>
              <p className="m-0 text-xs text-[var(--text2)]">Environment variables for going outside</p>
              <div className="rounded-lg border border-[var(--border)] bg-base-100 p-3 font-mono text-sm">
                <p className="m-0 flex items-center gap-2 text-lg">
                  <span className="text-3xl leading-none">{weather.icon}</span>
                  <span>
                    <strong>{weather.temp}°C</strong>
                    <span className="text-[var(--text2)]"> feels {weather.feels_like}°</span>
                  </span>
                </p>
                <p className="m-0 mt-1 text-[var(--text2)]">
                  {weather.city}, {weather.country} · {weather.condition}
                </p>
                <p className="m-0 mt-2 text-xs text-[var(--text2)]">
                  wind {weather.wind} km/h · humidity {weather.humidity}%
                </p>
              </div>
              <ul className="m-0 mt-1 grid list-none grid-cols-5 gap-1 p-0 text-center text-[10px] text-[var(--text2)]">
                {weather.forecast.map((d) => (
                  <li key={d.day} className="rounded bg-base-200/80 py-1">
                    <div className="text-base leading-none">{d.icon}</div>
                    <div className="font-semibold text-[var(--text)]">{d.day}</div>
                    <div>
                      {d.high}° / {d.low}°
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card card-border border-[var(--border)] bg-[var(--bg2)] shadow-sm">
            <div className="card-body gap-2 p-4">
              <h2 className="card-title m-0 text-base text-[#0c0d0e]">Open bounties · stonks</h2>
              <p className="m-0 text-xs text-[var(--text2)]">Reward for whoever explains this chart</p>
              <ul className="m-0 list-none space-y-2 p-0">
                {stocks.map((s) => (
                  <li
                    key={s.ticker}
                    className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-base-100 px-2 py-2"
                  >
                    <MiniSpark series={s.series} positive={s.changePct >= 0} />
                    <div className="min-w-0 flex-1">
                      <p className="m-0 truncate font-mono text-sm font-bold text-[var(--text)]">{s.ticker}</p>
                      <p className="m-0 truncate text-xs text-[var(--text2)]">{s.name}</p>
                    </div>
                    <div className="text-right">
                      <p className={`m-0 font-mono text-sm font-semibold ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                        {s.currency}
                        {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </p>
                      <p className="m-0 text-[10px] text-[var(--text2)]">
                        bounty +{bountyFor(s.ticker)} rep
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card card-border border-[var(--border)] bg-[var(--bg2)] shadow-sm">
            <div className="card-body gap-2 p-4">
              <h2 className="card-title m-0 text-base text-[#0c0d0e]">Hot network · news</h2>
              <ul className="m-0 list-none space-y-2 p-0">
                {news.map((n) => (
                  <li key={n.id}>
                    <a
                      href="#"
                      className="group flex gap-2 rounded-md px-1 py-1 no-underline hover:bg-base-200/80"
                      onClick={(ev) => ev.preventDefault()}
                    >
                      <span className="text-lg leading-none">{n.emoji}</span>
                      <span className="min-w-0 text-sm leading-snug text-[#0074cc] group-hover:underline">
                        {n.title}
                      </span>
                    </a>
                    <p className="m-0 pl-8 text-[11px] text-[var(--text2)]">
                      {n.source} · {n.time}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
