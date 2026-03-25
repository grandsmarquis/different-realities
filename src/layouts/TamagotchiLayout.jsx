import { useCallback, useEffect, useMemo, useState } from 'react'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const V = {
  BOOT: 'boot',
  HOME: 'home',
  MAIL: 'mail',
  MSG: 'msg',
  SKY: 'sky',
  NEWS: 'news',
  ART: 'art',
  COINS: 'coins',
  SNACK: 'snack',
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

export default function TamagotchiLayout({ onSwitchPersona }) {
  const [view, setView] = useState(V.BOOT)
  const [bootPhase, setBootPhase] = useState(0)
  const [loading, setLoading] = useState(false)
  const [emailIx, setEmailIx] = useState(0)
  const [newsIx, setNewsIx] = useState(0)
  const [now, setNow] = useState(() => new Date())
  const [petMood, setPetMood] = useState('idle')

  const unread = emails.filter((e) => !e.read).length

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (view !== V.BOOT) return
    const id = setInterval(() => {
      setBootPhase((p) => {
        if (p >= 5) {
          clearInterval(id)
          setView(V.HOME)
          return p
        }
        return p + 1
      })
    }, 380)
    return () => clearInterval(id)
  }, [view])

  const openApp = useCallback((next) => {
    setPetMood('excited')
    setLoading(true)
    window.setTimeout(() => {
      setView(next)
      setLoading(false)
      window.setTimeout(() => setPetMood('idle'), 600)
    }, 520)
  }, [])

  const goBack = useCallback(() => {
    if (view === V.HOME || view === V.BOOT) return
    if (view === V.MSG) {
      setView(V.MAIL)
      return
    }
    if (view === V.ART) {
      setView(V.NEWS)
      return
    }
    setView(V.HOME)
  }, [view])

  const timeStr = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`

  const apps = useMemo(
    () => [
      { key: 'mail', label: 'MAIL', emoji: '📬', hint: `${unread} new`, onSelect: () => openApp(V.MAIL) },
      { key: 'sky', label: 'SKY', emoji: weather.icon, hint: `${weather.temp}°`, onSelect: () => openApp(V.SKY) },
      { key: 'news', label: 'NEWS', emoji: '📰', hint: `${news.length}`, onSelect: () => openApp(V.NEWS) },
      { key: 'coins', label: '$$$', emoji: '📈', hint: 'mkt', onSelect: () => openApp(V.COINS) },
    ],
    [openApp, unread]
  )

  const lcd = (
    <div
      className="tam-lcd relative flex min-h-[220px] flex-col overflow-hidden rounded-md border-4 border-[#1a3028] bg-[#0d1810] shadow-[inset_0_0_24px_rgba(0,40,20,0.85)]"
      style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}
    >
      <div className="tam-lcd-glow pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="tam-scanlines pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay" aria-hidden />

      <div className="relative z-[1] flex items-center justify-between border-b border-[#1f4a38] px-2 py-1 text-[13px] leading-none text-[#9fdfb0]">
        <span className="flex items-center gap-1 tabular-nums tracking-tight">
          <span className="tam-heart text-[10px]" aria-hidden>
            ♥
          </span>
          {timeStr}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-[#5a9a78]">www</span>
        <span className="flex items-center gap-0.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="tam-dot block h-1.5 w-1.5 rounded-full bg-[#7ddf9a]"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      </div>

      <div className="relative z-[1] min-h-0 flex-1 overflow-y-auto px-2 py-2 text-[15px] leading-snug">
        {loading && (
          <div className="flex min-h-[160px] flex-col items-center justify-center gap-2 py-4">
            <p className="animate-pulse text-center text-[12px] text-[#6ab88a]">tam@web connecting…</p>
            <div className="tam-loader flex gap-1" aria-hidden>
              {['▖', '▘', '▝', '▗'].map((c, i) => (
                <span key={i} className="text-[#b8ffc8]" style={{ animationDelay: `${i * 0.12}s` }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {!loading && view === V.BOOT && (
          <div className="flex min-h-[180px] flex-col items-center justify-center gap-2 py-2">
            <div className="tam-boot-pet text-4xl" aria-hidden>
              🐣
            </div>
            {bootPhase >= 1 && <p className="text-center text-[11px] text-[#7cb89a]">TAM@NET OS</p>}
            {bootPhase >= 2 && <p className="text-center text-[13px] text-[#c8ffd8]">v.1997β</p>}
            {bootPhase >= 3 && (
              <div className="mt-2 h-2 w-[85%] overflow-hidden rounded-sm border border-[#2a6048] bg-[#061208]">
                <div className="tam-boot-bar h-full bg-gradient-to-r from-[#5eead4] to-[#86efac]" />
              </div>
            )}
            {bootPhase >= 4 && <p className="mt-2 text-[10px] text-[#5a9070]">feed me… data…</p>}
          </div>
        )}

        {!loading && view === V.HOME && (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#5a9070]">pet status</p>
                <div className="flex gap-2">
                  <div className="tam-stat flex flex-1 flex-col gap-0.5">
                    <span className="text-[9px] text-[#6ab88a]">MAIL</span>
                    <div className="h-2 overflow-hidden rounded-full border border-[#2a5040] bg-[#06120c]">
                      <div
                        className="tam-stat-fill h-full rounded-full bg-[#f472b6]"
                        style={{ width: `${Math.min(100, 20 + unread * 18)}%` }}
                      />
                    </div>
                  </div>
                  <div className="tam-stat flex flex-1 flex-col gap-0.5">
                    <span className="text-[9px] text-[#6ab88a]">HAPPY</span>
                    <div className="h-2 overflow-hidden rounded-full border border-[#2a5040] bg-[#06120c]">
                      <div className="tam-stat-fill tam-stat-happy h-full w-[78%] rounded-full bg-[#5eead4]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`tam-pixel-pet shrink-0 ${petMood === 'excited' ? 'tam-pet-pop' : 'tam-pet-idle'}`} aria-hidden>
                <div className="tam-pet-face">
                  <span className="tam-pet-eye tam-pet-eye-l" />
                  <span className="tam-pet-eye tam-pet-eye-r" />
                  <span className="tam-pet-mouth" />
                </div>
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#5a9070]">apps</p>
            <ul className="grid grid-cols-2 gap-1.5">
              {apps.map((a) => (
                <li key={a.key}>
                  <button
                    type="button"
                    onClick={a.onSelect}
                    className="btn btn-ghost h-auto min-h-0 w-full flex-col gap-0.5 rounded-lg border border-[#2a6048] bg-[#0a1810] px-2 py-2 text-left font-normal normal-case text-[#c8f5d8] hover:border-[#5eead4] hover:bg-[#122818]"
                  >
                    <span className="text-lg leading-none">{a.emoji}</span>
                    <span className="w-full truncate text-[11px] font-bold tracking-wide">{a.label}</span>
                    <span className="w-full truncate text-[10px] opacity-70">{a.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setPetMood('excited')
                setView(V.SNACK)
                window.setTimeout(() => setPetMood('idle'), 500)
              }}
              className="btn btn-outline btn-xs w-full border-[#3d8060] text-[#8fdfb0] hover:bg-[#1a3028] hover:text-[#c8ffd8]"
            >
              🍙 feed pixel (cosmetic)
            </button>
          </div>
        )}

        {!loading && view === V.MAIL && (
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-widest text-[#5a9070]">inbox.exe</p>
            <ul className="space-y-1">
              {emails.map((e, i) => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailIx(i)
                      setPetMood('excited')
                      setView(V.MSG)
                      window.setTimeout(() => setPetMood('idle'), 500)
                    }}
                    className="btn btn-ghost h-auto min-h-0 w-full flex-col items-start rounded-md border-0 border-b border-[#1f4030] px-1 py-2 text-left font-normal normal-case hover:bg-[#142818]"
                  >
                    <span className="flex w-full items-center gap-1">
                      <span>{e.from.avatar}</span>
                      {!e.read && (
                        <span className="badge badge-xs border-0 bg-[#f472b6] text-[#1a0a14]">NEW</span>
                      )}
                      <span className="min-w-0 flex-1 truncate text-[13px]">{e.from.name}</span>
                    </span>
                    <span className="line-clamp-2 text-[12px] opacity-90">{e.subject}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!loading && view === V.MSG && emails[emailIx] && (
          <div className="pb-2">
            <p className="mb-1 text-[10px] text-[#5a9070]">letter ♥</p>
            <p className="border-b border-[#2a5040] pb-1 text-[12px] font-bold text-[#86efac]">{emails[emailIx].subject}</p>
            <p className="mt-1 text-[11px] text-[#6ab88a]">
              {emails[emailIx].from.name} · {emails[emailIx].time}
            </p>
            <pre className="mt-2 max-h-[140px] overflow-y-auto whitespace-pre-wrap font-[family-name:var(--font-main)] text-[13px] leading-relaxed text-[#c8f0d8]">
              {emails[emailIx].body}
            </pre>
          </div>
        )}

        {!loading && view === V.SKY && (
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-widest text-[#5a9070]">sky channel</p>
            <p className="text-[26px] leading-none">
              {weather.icon} {weather.temp}°C
            </p>
            <p className="mt-1 text-[#5eead4]">{weather.condition}</p>
            <p className="mt-2 text-[12px] text-[#6ab88a]">
              {weather.city} · feels {weather.feels_like}° · wind {weather.wind}
            </p>
            <ul className="mt-3 space-y-1">
              {weather.forecast.slice(0, 4).map((d) => (
                <li key={d.day} className="flex justify-between border-b border-dotted border-[#1f4030] py-0.5 text-[12px]">
                  <span>
                    {d.day} {d.icon}
                  </span>
                  <span className="tabular-nums">
                    {d.high}°/{d.low}°
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!loading && view === V.NEWS && (
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-widest text-[#5a9070]">headline scroll</p>
            <ul className="space-y-1">
              {news.map((n, i) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setNewsIx(i)
                      setPetMood('excited')
                      setView(V.ART)
                      window.setTimeout(() => setPetMood('idle'), 500)
                    }}
                    className="btn btn-ghost h-auto min-h-0 w-full flex-col items-start rounded-md border-0 border-b border-[#1f4030] px-1 py-2 text-left font-normal normal-case hover:bg-[#142818]"
                  >
                    <span className="text-[12px] text-[#d8ffe8]">
                      {n.emoji} {n.title.length > 56 ? `${n.title.slice(0, 54)}…` : n.title}
                    </span>
                    <span className="text-[10px] text-[#5a9070]">
                      {n.source} · {n.time}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!loading && view === V.ART && news[newsIx] && (
          <div>
            <p className="mb-1 text-[10px] text-[#5a9070]">story blob</p>
            <p className="text-[12px] leading-snug text-[#86efac]">
              {news[newsIx].emoji} {news[newsIx].title}
            </p>
            <p className="mt-2 text-[10px] text-[#6ab88a]">
              {news[newsIx].source} · {news[newsIx].category}
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-[#b8e8c8]">
              (screen too smol — your pet ate the rest of the article. oops.)
            </p>
          </div>
        )}

        {!loading && view === V.COINS && (
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-widest text-[#5a9070]">stonk seeds</p>
            <ul className="space-y-2">
              {stocks.map((s) => (
                <li
                  key={s.ticker}
                  className="flex items-center justify-between gap-1 border-b border-[#1f4030] py-1 text-[13px]"
                >
                  <span className="font-bold text-[#f9a8d4]">{s.ticker}</span>
                  <span className="tabular-nums text-[#c8f5d8]">
                    {s.currency}
                    {s.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className={s.changePct >= 0 ? 'text-[#86efac]' : 'text-[#f87171]'}>
                    {s.changePct >= 0 ? '▲' : '▼'}
                    {Math.abs(s.changePct).toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[9px] text-[#4a8060]">not financial advice from a plastic egg</p>
          </div>
        )}

        {!loading && view === V.SNACK && (
          <div className="flex min-h-[160px] flex-col items-center justify-center gap-3 text-center">
            <p className="tam-snack-emoji text-3xl" aria-hidden>
              🍙
            </p>
            <p className="text-[13px] text-[#c8ffd8]">yum! bytes restored</p>
            <p className="text-[11px] text-[#6ab88a]">your pet is now 3% more loyal to capitalism</p>
            <button type="button" className="btn btn-primary btn-xs" onClick={() => setView(V.HOME)}>
              ok ♥
            </button>
          </div>
        )}
      </div>

      {!loading && view !== V.BOOT && (
        <div className="relative z-[1] flex border-t border-[#1f4a38] text-[9px] text-[#6ab88a]">
          <button
            type="button"
            className="btn btn-ghost flex-1 rounded-none border-0 py-2 font-normal normal-case hover:bg-[#142818] hover:text-[#a8ffd0]"
            onClick={() => (view === V.HOME ? onSwitchPersona?.() : goBack())}
          >
            {view === V.HOME ? 'door' : 'back'}
          </button>
          <button
            type="button"
            className="btn btn-ghost flex-1 rounded-none border-0 py-2 font-normal normal-case text-[#5eead4] hover:bg-[#142818]"
            onClick={() => view === V.HOME && openApp(V.MAIL)}
          >
            pick
          </button>
          <button
            type="button"
            className="btn btn-ghost flex-1 rounded-none border-0 py-2 font-normal normal-case hover:bg-[#142818] hover:text-[#a8ffd0]"
            onClick={() => onSwitchPersona?.()}
          >
            home
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div
      className="tam-root min-h-screen overflow-x-hidden px-3 py-6 sm:py-10"
      style={{
        fontFamily: 'var(--font-main)',
        background:
          'radial-gradient(ellipse 100% 80% at 50% -20%, rgba(255,110,180,0.25), transparent), radial-gradient(ellipse 80% 60% at 100% 50%, rgba(94,234,212,0.12), transparent), linear-gradient(165deg, #2a1f3d 0%, #1a1528 45%, #0f0a18 100%)',
      }}
    >
      <style>{`
        @keyframes tam-heart-beat {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .tam-heart { animation: tam-heart-beat 1.2s ease-in-out infinite; display: inline-block; }
        @keyframes tam-dot-pulse {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1); }
        }
        .tam-dot { animation: tam-dot-pulse 1s ease-in-out infinite; }
        @keyframes tam-boot-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        .tam-boot-bar { animation: tam-boot-fill 0.9s ease-out forwards; }
        @keyframes tam-boot-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .tam-boot-pet { animation: tam-boot-bounce 0.8s ease-in-out infinite; }
        @keyframes tam-scan {
          from { background-position: 0 0; }
          to { background-position: 0 3px; }
        }
        .tam-scanlines {
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,30,20,0.4) 2px, rgba(0,30,20,0.4) 3px);
          animation: tam-scan 5s linear infinite;
        }
        .tam-lcd-glow {
          background: radial-gradient(ellipse 90% 70% at 50% 35%, rgba(120,255,180,0.12), transparent 60%);
        }
        @keyframes tam-stat-shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.88; }
        }
        .tam-stat-fill { animation: tam-stat-shimmer 2.5s ease-in-out infinite; }
        @keyframes tam-happy-wave {
          0%, 100% { width: 78%; }
          50% { width: 88%; }
        }
        .tam-stat-happy { animation: tam-happy-wave 3s ease-in-out infinite; }
        @keyframes tam-pet-bob {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-4px) rotate(2deg); }
        }
        @keyframes tam-pet-pop-key {
          0% { transform: scale(1); }
          40% { transform: scale(1.15) rotate(-4deg); }
          100% { transform: scale(1) rotate(0); }
        }
        .tam-pet-idle { animation: tam-pet-bob 2.2s ease-in-out infinite; }
        .tam-pet-pop { animation: tam-pet-pop-key 0.55s ease-out; }
        .tam-pixel-pet {
          width: 52px; height: 52px; border-radius: 50%;
          background: radial-gradient(circle at 30% 28%, #ffe0f0, #f472b6 45%, #db2777 100%);
          box-shadow: inset 0 -4px 0 rgba(0,0,0,0.2), 0 4px 0 #9d174d;
          position: relative;
        }
        .tam-pet-face {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
        }
        .tam-pet-eye {
          position: absolute; top: 38%; width: 8px; height: 10px; background: #0f172a; border-radius: 2px;
          animation: tam-blink 4s steps(1) infinite;
        }
        .tam-pet-eye-l { left: 28%; }
        .tam-pet-eye-r { right: 28%; }
        @keyframes tam-blink {
          0%, 96%, 100% { transform: scaleY(1); }
          98% { transform: scaleY(0.1); }
        }
        .tam-pet-mouth {
          position: absolute; bottom: 28%; width: 14px; height: 7px;
          border: 2px solid #0f172a; border-top: 0; border-radius: 0 0 12px 12px; background: transparent;
        }
        @keyframes tam-loader-spin {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
        .tam-loader span { display: inline-block; animation: tam-loader-spin 0.6s ease-in-out infinite; }
        @keyframes tam-snack-spin {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1.08); }
        }
        .tam-snack-emoji { animation: tam-snack-spin 2s linear infinite; display: inline-block; }
        @keyframes tam-float-bit {
          0%, 100% { transform: translate(0,0) rotate(0deg); opacity: 0.4; }
          50% { transform: translate(8px,-12px) rotate(15deg); opacity: 0.9; }
        }
        .tam-bit { animation: tam-float-bit 7s ease-in-out infinite; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        {['✦', '·', '✧', '·', '✦'].map((c, i) => (
          <span
            key={i}
            className="tam-bit absolute text-[#f472b6]/30"
            style={{
              left: `${12 + i * 18}%`,
              top: `${8 + (i % 3) * 22}%`,
              animationDelay: `${i * 0.7}s`,
              fontSize: `${10 + (i % 3) * 4}px`,
            }}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="relative z-[1] mx-auto max-w-[380px]">
        <header className="mb-4 flex items-start justify-between gap-3 px-1">
          <div>
            <h1
              className="m-0 text-sm leading-tight tracking-wide text-[#f9a8d4] sm:text-base"
              style={{ fontFamily: 'var(--font-display)', textShadow: '0 0 12px rgba(244,114,182,0.35)' }}
            >
              TAM@WEB
            </h1>
            <p className="mt-1 text-[12px] leading-snug text-[#a5b4fc]/90">
              Full inbox. Tiny screen. Big dreams.
            </p>
          </div>
          <button type="button" className="btn btn-secondary btn-xs shrink-0 border-[#4c4068] bg-[#2d2640] text-[#e9d5ff]" onClick={() => onSwitchPersona?.()}>
            eject
          </button>
        </header>

        <div className="relative mx-auto w-full max-w-[320px]">
          <div
            className="tam-chain pointer-events-none absolute -top-5 left-1/2 z-20 h-8 w-4 -translate-x-1/2 rounded-full border-2 border-[#6b5a8a] bg-gradient-to-b from-[#8b7aad] to-[#4a3d62] shadow-md"
            aria-hidden
          />
          <div
            className="tam-shell relative rounded-[50%] border-4 border-[#ff8dc8] p-4 shadow-[0_28px_60px_rgba(0,0,0,0.55),inset_0_4px_16px_rgba(255,255,255,0.35),inset_0_-8px_20px_rgba(219,39,119,0.15)]"
            style={{
              background:
                'radial-gradient(ellipse 120% 100% at 50% 20%, #fff5fb 0%, #ffb8e0 28%, #ff6eb4 55%, #db2777 88%, #9d174d 100%)',
              borderRadius: '50% / 48%',
            }}
          >
            <div
              className="pointer-events-none absolute inset-[10%] rounded-[45%] border border-white/25 shadow-[inset_0_0_30px_rgba(255,255,255,0.2)]"
              aria-hidden
            />
            {lcd}
            <div className="mt-5 flex items-end justify-center gap-6 px-2 pb-1">
              <button
                type="button"
                className="btn btn-circle btn-sm border-0 bg-gradient-to-b from-[#5eead4] to-[#14b8a6] text-[#042f2e] shadow-lg hover:brightness-110"
                aria-label="A button"
                onClick={() => {
                  if (view === V.HOME) openApp(V.MAIL)
                  else goBack()
                }}
              >
                A
              </button>
              <button
                type="button"
                className="btn btn-circle btn-md z-10 -mt-2 border-0 bg-gradient-to-b from-[#f472b6] to-[#db2777] text-white shadow-xl hover:brightness-110"
                aria-label="B button"
                onClick={() => view === V.HOME && openApp(V.SKY)}
              >
                B
              </button>
              <button
                type="button"
                className="btn btn-circle btn-sm border-0 bg-gradient-to-b from-[#c4b5fd] to-[#7c3aed] text-[#1e1b4b] shadow-lg hover:brightness-110"
                aria-label="C button"
                onClick={() => view === V.HOME && openApp(V.NEWS)}
              >
                C
              </button>
            </div>
            <p className="mt-2 text-center text-[9px] font-bold tracking-[0.35em] text-[#9d174d]/80">TAMAGOTCHI</p>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-[300px] text-center text-[11px] leading-relaxed text-[#a78bfa]/80">
          Tip: tap the shell apps or mash <kbd className="rounded bg-[#2d2640] px-1 text-[#5eead4]">A</kbd> like it&apos;s 1997.
        </p>
      </div>
    </div>
  )
}
