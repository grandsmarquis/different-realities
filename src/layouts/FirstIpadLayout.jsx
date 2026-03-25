import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const APPS = [
  { id: 'mail', name: 'Mail', emoji: '✉️', tint: 'from-[#4a90d9] to-[#2d6cbd]' },
  { id: 'weather', name: 'Weather', emoji: '☀️', tint: 'from-[#5eb3ff] to-[#2b8cff]' },
  { id: 'stocks', name: 'Stocks', emoji: '📈', tint: 'from-[#8e8e93] to-[#636366]' },
  { id: 'news', name: 'Safari', emoji: '🧭', tint: 'from-[#34c759] to-[#248a3d]' },
]

function formatClock() {
  const d = new Date()
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true })
}

export default function FirstIpadLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [screen, setScreen] = useState('home')
  const [clock, setClock] = useState(formatClock)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setClock(formatClock()), 30_000)
    return () => clearInterval(t)
  }, [])

  const sparkles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: `${10 + ((i * 17) % 80)}%`,
        top: `${15 + ((i * 31) % 55)}%`,
        delay: `${i * 0.45}s`,
        dur: `${2.5 + (i % 3) * 0.4}s`,
      })),
    [],
  )

  function openApp(id) {
    setScreen(id)
  }

  function goHome() {
    setScreen('home')
  }

  return (
    <div
      className="ipad-page-bg min-h-screen overflow-x-hidden px-2 py-6 sm:px-4 sm:py-10"
      style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}
    >
      {!reducedMotion &&
        sparkles.map(s => (
          <span
            key={s.id}
            className="ipad-magic-spark pointer-events-none fixed z-0 text-lg opacity-0"
            style={{ left: s.left, top: s.top, animationDelay: s.delay, animationDuration: s.dur }}
            aria-hidden
          >
            ✦
          </span>
        ))}

      <div className="relative z-10 mx-auto w-full max-w-[900px]">
        {/* Device frame */}
        <div
          className={`ipad-device-frame rounded-[2.25rem] border border-white/25 p-3 shadow-2xl sm:p-4 ${reducedMotion ? '' : 'ipad-device-float'}`}
          style={{
            background: 'linear-gradient(145deg, #ececef 0%, #c4c4cc 38%, #dadade 62%, #b0b0b8 100%)',
            boxShadow:
              '0 2px 4px rgba(0,0,0,0.15), 0 24px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.85)',
          }}
        >
          <div className="rounded-[1.65rem] bg-[#0a0a0c] p-[10px] shadow-inner sm:p-[14px]">
            {/* Screen */}
            <div className="ipad-screen-glass relative overflow-hidden rounded-[1.25rem] bg-[#1a1a1e] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
              {!reducedMotion && <div className="ipad-glass-shine pointer-events-none absolute inset-0 z-[60]" aria-hidden />}

              {/* Status bar */}
              <div
                className="relative z-50 flex items-center justify-between gap-2 border-b border-black/10 px-4 py-2 text-xs font-semibold text-[#1c1c1e]"
                style={{
                  background: 'linear-gradient(180deg, #f7f7f8 0%, #e9e9eb 100%)',
                }}
              >
                <span className="tabular-nums tracking-tight">{clock}</span>
                <span className="flex items-center gap-1 opacity-90">
                  <span className="ipad-carrier-pulse text-[10px] font-bold tracking-wide">AT&T</span>
                  <span className="text-[10px]" aria-hidden>
                    ▂▃▅▇
                  </span>
                  <span className="rounded border border-[#1c1c1e]/40 px-1 py-0.5 text-[9px] leading-none tabular-nums">
                    100%
                  </span>
                </span>
              </div>

              {/* Content area */}
              <div
                className="relative z-10 min-h-[min(72vh,560px)] sm:min-h-[min(76vh,620px)]"
                style={{
                  background: screen === 'home' ? 'linear-gradient(165deg, #6b9fd4 0%, #4a7ec2 35%, #3d6aaa 70%, #2f5a96 100%)' : 'linear-gradient(180deg, #d1d5db 0%, #b8bcc4 100%)',
                }}
              >
                {screen === 'home' && (
                  <HomeScreen
                    reducedMotion={reducedMotion}
                    onOpen={openApp}
                    onSwitchPersona={onSwitchPersona}
                  />
                )}
                {screen === 'mail' && (
                  <MailScreen
                    reducedMotion={reducedMotion}
                    selectedEmail={selectedEmail}
                    setSelectedEmail={setSelectedEmail}
                    onBack={goHome}
                  />
                )}
                {screen === 'weather' && <WeatherScreen reducedMotion={reducedMotion} onBack={goHome} />}
                {screen === 'stocks' && <StocksScreen reducedMotion={reducedMotion} onBack={goHome} />}
                {screen === 'news' && <SafariNewsScreen reducedMotion={reducedMotion} onBack={goHome} />}
              </div>

              {/* Home indicator row */}
              <div
                className="relative z-50 flex justify-center border-t border-black/10 py-2"
                style={{ background: 'linear-gradient(180deg, #e9e9eb 0%, #dcdcdf 100%)' }}
              >
                <button
                  type="button"
                  onClick={goHome}
                  className={`btn btn-circle btn-sm border-2 border-[#b0b0b5] bg-gradient-to-b from-[#f5f5f7] to-[#d8d8dc] shadow-md hover:brightness-105 ${reducedMotion ? '' : 'ipad-home-pulse'}`}
                  aria-label="Home"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/50">
          iPad (1st generation) · iPhone OS aesthetic · pinch-to-zoom not included (sorry)
        </p>
      </div>
    </div>
  )
}

function HomeScreen({ reducedMotion, onOpen, onSwitchPersona }) {
  return (
    <div className="relative flex h-full min-h-[inherit] flex-col px-4 pb-4 pt-6">
      <div className="pointer-events-none absolute inset-0 opacity-30 ipad-wallpaper-glow" aria-hidden />
      <p className="relative text-center text-sm font-semibold text-white/95 drop-shadow-md">
        slide your finger… it&apos;s going to feel huge
      </p>

      <div className="relative mt-8 grid flex-1 grid-cols-4 place-content-center gap-6 sm:gap-10">
        {APPS.map((app, i) => (
          <button
            key={app.id}
            type="button"
            onClick={() => onOpen(app.id)}
            className={`group flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl ${reducedMotion ? '' : 'ipad-app-launch'}`}
            style={reducedMotion ? undefined : { animationDelay: `${i * 0.08}s` }}
          >
            <span
              className={`flex size-[72px] items-center justify-center rounded-[22px] bg-gradient-to-b ${app.tint} text-4xl shadow-[0_8px_0_rgba(0,0,0,0.2),0_12px_24px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.45)] transition-transform duration-200 group-active:scale-95 sm:size-[84px] sm:text-5xl ${reducedMotion ? '' : 'ipad-icon-wobble'}`}
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              {app.emoji}
            </span>
            <span className="max-w-[4.5rem] text-center text-[11px] font-semibold leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] sm:max-w-none sm:text-xs">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* Dock */}
      <div
        className="relative mt-auto rounded-[28px] border border-white/25 px-4 py-3 shadow-lg backdrop-blur-md sm:px-6"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 100%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5)',
        }}
      >
        <div className="flex items-center justify-center gap-5 sm:gap-8">
          {APPS.map(app => (
            <button
              key={`dock-${app.id}`}
              type="button"
              onClick={() => onOpen(app.id)}
              className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-b ${app.tint} text-3xl shadow-[0_4px_0_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.4)] transition active:scale-90 sm:size-16 sm:text-4xl ${reducedMotion ? '' : 'ipad-dock-bounce'}`}
              aria-label={`Open ${app.name}`}
            >
              {app.emoji}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-ghost btn-xs relative mx-auto mt-3 gap-1 border border-white/20 bg-white/10 text-white hover:bg-white/20"
        onClick={onSwitchPersona}
      >
        <span aria-hidden>⚙️</span> Other device
      </button>
    </div>
  )
}

function AppToolbar({ title, onBack, right }) {
  return (
    <div
      className="flex items-center gap-2 border-b border-black/15 px-2 py-2 sm:px-3"
      style={{
        background: 'linear-gradient(180deg, #b4bbc6 0%, #9aa3b0 48%, #8a939f 52%, #7a8492 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)',
      }}
    >
      <button
        type="button"
        className="btn btn-sm h-8 min-h-8 gap-0 rounded-lg border border-black/20 bg-gradient-to-b from-[#f9f9fb] to-[#d6d8de] px-3 text-xs font-bold text-[#1c1c1e] shadow-sm hover:brightness-105"
        onClick={onBack}
      >
        ◀ Home
      </button>
      <h2 className="min-w-0 flex-1 truncate text-center text-sm font-bold text-[#1c1c1e] drop-shadow-sm">{title}</h2>
      {right ?? <span className="w-[72px] shrink-0" />}
    </div>
  )
}

function MailScreen({ reducedMotion, selectedEmail, setSelectedEmail, onBack }) {
  return (
    <div className="flex h-full min-h-[inherit] flex-col">
      <AppToolbar title="Inbox" onBack={onBack} />
      <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
        <div
          className="max-h-[40vh] overflow-y-auto border-b border-black/10 sm:max-h-none sm:w-[min(42%,280px)] sm:border-b-0 sm:border-r"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px), linear-gradient(180deg, #d8dce3 0%, #c8ccd4 100%)',
          }}
        >
          <ul className="divide-y divide-black/10">
            {emails.map((e, i) => {
              const active = selectedEmail?.id === e.id
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`flex w-full gap-2 px-3 py-2.5 text-left transition ${active ? 'bg-[#a8c4e8]/90' : 'bg-white/70 hover:bg-white/90'} ${reducedMotion ? '' : 'ipad-mail-row'}`}
                    style={reducedMotion ? undefined : { animationDelay: `${i * 0.04}s` }}
                  >
                    <span className="text-2xl">{e.from.avatar}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className={`truncate text-sm ${e.read ? 'font-medium text-[#636366]' : 'font-bold text-[#1c1c1e]'}`}>{e.from.name}</span>
                        <span className="shrink-0 text-[10px] text-[#8e8e93]">{e.time}</span>
                      </span>
                      <span className={`line-clamp-1 text-xs ${e.read ? 'text-[#8e8e93]' : 'font-semibold text-[#1c1c1e]'}`}>{e.subject}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div
          className="min-h-0 flex-1 overflow-y-auto p-4"
          style={{
            background: 'linear-gradient(180deg, #f2f2f7 0%, #e5e5ea 100%)',
          }}
        >
          {selectedEmail ? (
            <article
              className={`rounded-xl border border-white/80 bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.12)] ${reducedMotion ? '' : 'ipad-paper-in'}`}
            >
              <header className="border-b border-[#c6c6c8] pb-3">
                <h3 className="text-lg font-bold leading-snug text-[#1c1c1e]">{selectedEmail.subject}</h3>
                <p className="mt-1 text-sm text-[#636366]">
                  From <span className="font-semibold text-[#007aff]">{selectedEmail.from.name}</span> · {selectedEmail.date}
                </p>
              </header>
              <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-[#3a3a3c]">{selectedEmail.body}</pre>
            </article>
          ) : (
            <p className="p-6 text-center text-sm text-[#8e8e93]">Select a message</p>
          )}
        </div>
      </div>
    </div>
  )
}

function WeatherScreen({ reducedMotion, onBack }) {
  return (
    <div className="flex h-full min-h-[inherit] flex-col">
      <AppToolbar title="Weather" onBack={onBack} />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
        <div
          className={`relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/40 p-6 text-white shadow-xl ${reducedMotion ? '' : 'ipad-weather-card'}`}
          style={{
            background: 'linear-gradient(165deg, #5ac8fa 0%, #007aff 45%, #5856d6 100%)',
            boxShadow: '0 20px 40px rgba(0,122,255,0.35), inset 0 1px 0 rgba(255,255,255,0.35)',
          }}
        >
          {!reducedMotion && (
            <span className="ipad-sun-rays pointer-events-none absolute -right-4 -top-4 text-8xl opacity-90" aria-hidden>
              ☀️
            </span>
          )}
          <p className="text-sm font-medium opacity-90">{weather.city}</p>
          <p className="mt-1 text-7xl font-extralight tabular-nums tracking-tight sm:text-8xl">
            {weather.temp}°
          </p>
          <p className="mt-2 flex items-center gap-2 text-lg font-semibold">
            <span className="text-3xl">{weather.icon}</span> {weather.condition}
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-white/15 px-3 py-2 backdrop-blur-sm">
              <dt className="opacity-75">Feels like</dt>
              <dd className="text-lg font-bold">{weather.feels_like}°</dd>
            </div>
            <div className="rounded-xl bg-white/15 px-3 py-2 backdrop-blur-sm">
              <dt className="opacity-75">Wind</dt>
              <dd className="text-lg font-bold">{weather.wind} km/h</dd>
            </div>
          </dl>
        </div>
        <div className="flex w-full max-w-sm gap-2 overflow-x-auto pb-1">
          {weather.forecast.map((d, i) => (
            <div
              key={d.day}
              className={`min-w-[4.5rem] flex-1 rounded-2xl border border-black/10 bg-white/90 p-2 text-center shadow ${reducedMotion ? '' : 'ipad-forecast-pop'}`}
              style={reducedMotion ? undefined : { animationDelay: `${i * 0.07}s` }}
            >
              <p className="text-[10px] font-bold text-[#8e8e93]">{d.day}</p>
              <p className="text-2xl">{d.icon}</p>
              <p className="text-xs font-semibold">
                {d.high}° / {d.low}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StocksScreen({ reducedMotion, onBack }) {
  return (
    <div className="flex h-full min-h-[inherit] flex-col">
      <AppToolbar title="Stocks" onBack={onBack} />
      <div className="flex-1 overflow-y-auto p-3">
        <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-xl bg-[#1c1c1e] text-left text-sm text-white shadow-inner">
          <thead>
            <tr className="border-b border-white/10 bg-black/30 text-[11px] uppercase tracking-wide text-[#8e8e93]">
              <th className="px-3 py-2 font-semibold">Symbol</th>
              <th className="px-3 py-2 font-semibold">Price</th>
              <th className="px-3 py-2 text-right font-semibold">Change</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((s, i) => {
              const up = s.changePct >= 0
              return (
                <tr
                  key={s.ticker}
                  className={`border-t border-white/5 ${reducedMotion ? '' : 'ipad-stock-row'}`}
                  style={reducedMotion ? undefined : { animationDelay: `${i * 0.06}s` }}
                >
                  <td className="px-3 py-3 font-bold">{s.ticker}</td>
                  <td className="px-3 py-3 tabular-nums">
                    {s.currency}
                    {s.price.toFixed(2)}
                  </td>
                  <td className={`px-3 py-3 text-right font-semibold tabular-nums ${up ? 'text-[#34c759]' : 'text-[#ff3b30]'}`}>
                    {up ? '▲' : '▼'} {Math.abs(s.changePct).toFixed(2)}%
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="mt-3 text-center text-[10px] text-[#636366]">Delayed · for demo purposes only · not investment advice</p>
      </div>
    </div>
  )
}

function SafariNewsScreen({ reducedMotion, onBack }) {
  return (
    <div className="flex h-full min-h-[inherit] flex-col">
      <div
        className="flex items-end gap-2 border-b border-black/15 px-2 pb-2 pt-1"
        style={{
          background: 'linear-gradient(180deg, #b4bbc6 0%, #9aa3b0 48%, #8a939f 52%, #7a8492 100%)',
        }}
      >
        <button
          type="button"
          className="btn btn-sm h-8 min-h-8 rounded-lg border border-black/20 bg-gradient-to-b from-[#f9f9fb] to-[#d6d8de] px-2 text-xs font-bold shadow-sm"
          onClick={onBack}
        >
          ◀
        </button>
        <div
          className="mb-0.5 flex min-h-8 flex-1 items-center gap-2 rounded-lg border border-black/25 bg-white px-3 py-1 text-xs shadow-inner"
          style={{ fontFamily: 'var(--font-main)' }}
        >
          <span className="text-[#8e8e93]" aria-hidden>
            🔒
          </span>
          <span className="truncate text-[#3a3a3c]">www.apple.com/…/hot-news</span>
          <span className="ml-auto shrink-0 text-[#007aff]" aria-hidden>
            ⟳
          </span>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto p-4"
        style={{
          background: 'linear-gradient(180deg, #e8e8ed 0%, #d4d4da 100%)',
        }}
      >
        <div className="mx-auto max-w-lg">
          <h2 className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#8e8e93]">Reading List</h2>
          <ul className="space-y-3">
            {news.map((n, i) => (
              <li
                key={n.id}
                className={`rounded-xl border border-white/90 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${reducedMotion ? '' : 'ipad-news-curl'}`}
                style={reducedMotion ? undefined : { animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex gap-3">
                  <span className="text-3xl">{n.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#007aff]">{n.source}</p>
                    <p className="mt-1 font-semibold leading-snug text-[#1c1c1e]">{n.title}</p>
                    <p className="mt-2 text-[11px] text-[#8e8e93]">
                      {n.category} · {n.time}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
