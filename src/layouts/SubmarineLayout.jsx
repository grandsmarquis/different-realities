import { useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const BASE_DEPTH = 420

function DepthNeedle({ depth }) {
  const base = BASE_DEPTH + emails.length
  const delta = depth - base
  const angle = Math.max(-58, Math.min(58, delta * 4))
  return (
    <div className="relative w-11 h-6 shrink-0" aria-hidden>
      <svg viewBox="0 0 44 28" className="w-full h-full overflow-visible">
        <path
          d="M6 24 A16 16 0 0 1 38 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-35"
          style={{ color: 'var(--accent)' }}
        />
        <line
          x1="22"
          y1="24"
          x2="22"
          y2="9"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transformOrigin: '22px 24px', transform: `rotate(${angle}deg)` }}
        />
        <circle cx="22" cy="24" r="2.5" fill="var(--accent)" />
      </svg>
    </div>
  )
}

export default function SubmarineLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [depth, setDepth] = useState(() => BASE_DEPTH + emails.length)
  const [biolum, setBiolum] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const bubbles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${4 + ((i * 17) % 86)}%`,
        w: 5 + (i % 6) * 3,
        delay: `${(i * 0.85).toFixed(2)}s`,
        dur: `${13 + (i % 9)}s`,
        drift: `${(i % 2 === 0 ? 1 : -1) * (8 + (i % 5) * 6)}px`,
      })),
    [],
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const base = BASE_DEPTH + emails.length
    if (reducedMotion) {
      setDepth(base)
      return undefined
    }
    const tick = () => {
      const t = Date.now() / 1000
      const oscillate = Math.sin(t / 4.2) * 2.8 + Math.sin(t / 1.9) * 0.9
      setDepth(base + oscillate)
    }
    tick()
    const id = window.setInterval(tick, 180)
    return () => window.clearInterval(id)
  }, [emails.length, reducedMotion])

  const sceneStyle = biolum
    ? {
        '--accent': '#c4b5fd',
        '--accent2': '#5b21b6',
        '--text': '#e9d5ff',
      }
    : undefined

  return (
    <div
      className="submarine-scene-hue min-h-screen relative overflow-hidden"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
        ...sceneStyle,
      }}
    >
      <div className="pointer-events-none fixed inset-0 opacity-[0.05] z-0" aria-hidden
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, var(--accent) 3px, var(--accent) 4px)',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 115%, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 48%)',
        }}
        aria-hidden
      />
      <div className="submarine-sonar-sweep" aria-hidden />
      <div className="submarine-megafauna" aria-hidden />
      <span className="submarine-fish" style={{ top: '26%', '--fish-dur': '36s', '--fish-delay': '-4s' }} aria-hidden>
        🐟
      </span>
      <span className="submarine-fish submarine-fish-rev" style={{ top: '58%', '--fish-dur': '52s', '--fish-delay': '-18s' }} aria-hidden>
        🦑
      </span>
      <span className="submarine-fish" style={{ top: '72%', '--fish-dur': '64s', '--fish-delay': '-30s', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }} aria-hidden>
        🪼
      </span>
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="submarine-bubble"
          style={{
            left: b.left,
            width: b.w,
            height: b.w,
            '--bubble-delay': b.delay,
            '--bubble-dur': b.dur,
            '--bubble-drift': b.drift,
          }}
          aria-hidden
        />
      ))}

      <header
        className="relative z-10 border-b-2 px-4 py-3 flex flex-wrap items-center justify-between gap-3 backdrop-blur-[2px]"
        style={{ borderColor: 'var(--accent)', background: 'color-mix(in srgb, var(--bg2) 92%, transparent)' }}
      >
        <div className="flex items-center gap-4">
          <div className="relative submarine-sonar w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: 'var(--accent)' }}>
            <span className="text-lg relative z-10">◎</span>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.4em] opacity-70" style={{ fontFamily: 'var(--font-display)' }}>
              SSN-INBOX · CLASSIFIED
            </p>
            <h1 className="text-xl md:text-2xl tracking-widest" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              SONAR_MESSAGE_LOG
            </h1>
            <p className="text-[9px] font-mono opacity-45 mt-0.5 tracking-wider hidden sm:block">
              ANOMALY_TRACK · {biolum ? 'VIOLET_SHIFT' : 'STANDARD'} · KRAKEN_PROB &lt; 0.02
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 border px-2 py-1 rounded-md" style={{ borderColor: 'var(--border)' }}>
            <DepthNeedle depth={depth} />
            <span>
              DEPTH:{' '}
              <span className="tabular-nums submarine-depth-readout" style={{ color: 'var(--accent)' }}>
                —{depth.toFixed(1)}m
              </span>
            </span>
          </div>
          <span className="hidden md:inline">
            HULL: <span style={{ color: 'var(--accent)' }}>NOMINAL</span>
          </span>
          <button
            type="button"
            onClick={() => setBiolum((v) => !v)}
            className={`btn btn-xs font-mono uppercase tracking-wider border ${biolum ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            {biolum ? 'Bio off' : 'Bio lum'}
          </button>
          <button
            type="button"
            onClick={onSwitchPersona}
            className="btn btn-xs btn-outline font-mono uppercase tracking-wider"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            Abort
          </button>
        </div>
      </header>

      <div className="relative z-10 flex" style={{ height: 'calc(100vh - 56px)' }}>
        <aside className="w-64 lg:w-72 shrink-0 border-r overflow-y-auto font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="px-3 py-2 border-b tracking-widest flex justify-between items-center gap-2" style={{ borderColor: 'var(--border)', color: 'var(--accent2)' }}>
            <span>:: CONTACTS_DETECTED</span>
            <span className="badge badge-xs badge-outline font-mono opacity-80" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              {emails.filter((e) => !e.read).length} ping
            </span>
          </div>
          {emails.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setSelectedEmail(e)}
              className="w-full text-left px-3 py-2.5 border-b transition-colors hover:bg-white/5"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
                color: selectedEmail?.id === e.id ? 'var(--accent)' : 'var(--text)',
              }}
            >
              <div className="flex justify-between mb-1 opacity-60">
                <span>BLIP_{String(i + 1).padStart(2, '0')}</span>
                {!e.read && <span className="badge badge-xs animate-pulse font-mono" style={{ background: 'var(--accent)', color: 'var(--bg)', border: 'none' }}>PING</span>}
              </div>
              <div className="font-bold truncate">{e.subject}</div>
              <div className="opacity-50 truncate">{e.from.name}</div>
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="absolute inset-6 md:inset-10 rounded-[50%] border border-dashed opacity-[0.08] pointer-events-none" style={{ borderColor: 'var(--accent)' }} aria-hidden />
          {selectedEmail ? (
            <div
              className="submarine-porthole max-w-2xl mx-auto border-[3px] p-6 md:p-8 relative"
              style={{
                borderColor: 'var(--accent)',
                background: 'linear-gradient(165deg, color-mix(in srgb, var(--bg2) 95%, var(--accent)) 0%, var(--bg2) 45%, var(--card) 100%)',
              }}
            >
              <div className="absolute -top-1 left-8 right-8 h-2 flex justify-between pointer-events-none opacity-50" aria-hidden>
                {[0, 1, 2, 3, 4].map((n) => (
                  <span key={n} className="w-2 h-2 rounded-full border" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }} />
                ))}
              </div>
              <div className="flex items-center gap-2 mb-4 text-[10px] tracking-widest opacity-60">
                <span className="inline-block w-2 h-2 rounded-full animate-ping" style={{ background: 'var(--accent)' }} />
                DECODED_TRANSMISSION
              </div>
              <h2 className="text-2xl md:text-3xl mb-4 font-bold tracking-wide" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                {selectedEmail.subject}
              </h2>
              <pre className="text-xs opacity-50 mb-4 whitespace-pre-wrap font-mono">{`SOURCE: ${selectedEmail.from.name}\nTIMESTAMP: ${selectedEmail.date}\nSIG: ${(selectedEmail.tag || 'mail').toUpperCase()}`}</pre>
              <div className="border-l-2 pl-4 text-sm leading-relaxed whitespace-pre-wrap font-mono" style={{ borderColor: 'var(--accent2)' }}>
                {selectedEmail.body}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center font-mono max-w-md submarine-porthole border-2 px-8 py-10" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}>
                <p className="text-5xl md:text-6xl mb-2 animate-bounce motion-reduce:animate-none" style={{ animationDuration: '2.8s' }}>
                  🔭
                </p>
                <p className="tracking-[0.35em] text-sm opacity-90 mb-2">VIEWPORT_CLEAR</p>
                <p className="text-[10px] opacity-45 leading-relaxed">
                  Train the glass on a contact blip. Something huge just brushed the outer hull—probably nothing.
                </p>
              </div>
            </div>
          )}
        </main>

        <aside className="hidden xl:block w-52 shrink-0 border-l overflow-y-auto p-3 font-mono text-[10px] space-y-3" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="border p-2 rounded-lg" style={{ borderColor: 'var(--border)' }}>
            <p className="opacity-50 mb-1">EXT_SENSOR</p>
            <div className="text-2xl text-center">{weather.icon}</div>
            <p className="text-center" style={{ color: 'var(--accent)' }}>{weather.temp}°C</p>
            <p className="opacity-60 text-center">{weather.condition}</p>
          </div>
          <div className="border p-2 rounded-lg" style={{ borderColor: 'var(--border)' }}>
            <p className="opacity-50 mb-1">SURFACE_MARKETS</p>
            {stocks.map((s) => (
              <div key={s.ticker} className="flex justify-between py-0.5">
                <span>{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : '#ff6688' }}>{s.changePct}%</span>
              </div>
            ))}
          </div>
          <div className="border p-2 rounded-lg max-h-48 overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
            <p className="opacity-50 mb-1">RADIO_SNIFF</p>
            {news.slice(0, 5).map((n) => (
              <p key={n.id} className="mb-2 opacity-80 leading-tight">{n.title}</p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
