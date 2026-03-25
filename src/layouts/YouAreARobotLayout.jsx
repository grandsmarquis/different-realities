import { useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function tagLabel(tag) {
  return (
    {
      work: 'TASK_THREAD',
      personal: 'HUMAN_BOND_PKT',
      finance: 'CREDIT_FLOW',
      promo: 'SPAM?_UNKNOWN',
      newsletter: 'BROADCAST_DIGEST',
      social: 'NETWORK_PING',
      dev: 'BUILD_LOOP',
      shopping: 'ACQUIRE_OBJECTS',
      travel: 'LOCOMOTION_LOG',
    }[tag] || 'RAW_BYTES'
  )
}

function RobotFace() {
  return (
    <div className="relative flex shrink-0 items-center justify-center" aria-hidden>
      <svg viewBox="0 0 120 100" className="h-16 w-[4.5rem] sm:h-[4.5rem] sm:w-[5.25rem]" style={{ filter: 'drop-shadow(0 0 12px var(--glow))' }}>
        <defs>
          <linearGradient id="botMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a3f5c" />
            <stop offset="50%" stopColor="#1a2535" />
            <stop offset="100%" stopColor="#0d1520" />
          </linearGradient>
        </defs>
        <rect x="14" y="18" width="92" height="64" rx="14" fill="url(#botMetal)" stroke="var(--accent)" strokeWidth="2" />
        <rect x="22" y="26" width="76" height="48" rx="8" fill="#05080c" opacity="0.85" />
        {/* Eyes */}
        <ellipse className="robot-eye-l" cx="44" cy="50" rx="10" ry="12" fill="var(--accent)" />
        <ellipse className="robot-eye-r" cx="76" cy="50" rx="10" ry="12" fill="var(--accent)" />
        <circle cx="44" cy="48" r="3" fill="#fff" opacity="0.9" />
        <circle cx="76" cy="48" r="3" fill="#fff" opacity="0.9" />
        {/* Mouth LED strip */}
        <rect x="36" y="68" width="48" height="4" rx="2" fill="var(--accent-warm)" className="robot-mouth" />
        {/* Antennae */}
        <line x1="60" y1="18" x2="60" y2="6" stroke="var(--accent-hot)" strokeWidth="2" strokeLinecap="round" className="robot-antenna" />
        <circle cx="60" cy="4" r="4" fill="var(--accent-hot)" className="robot-led" />
      </svg>
    </div>
  )
}

function GearDecoration({ className, spinSec = 14, pathClassName = 'text-[var(--accent)]' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden style={{ opacity: 0.2 }}>
      <path
        fill="currentColor"
        className={pathClassName}
        d="M32 8l3 6h6l3-6 6 3-3 6 4 5 7-2 2 7-6 3v6l6 3-2 7-7-2-4 5 3 6-6 3-3-6h-6l-3 6-6-3 3-6-4-5-7 2-2-7 6-3v-6l-6-3 2-7 7 2 4-5-3-6 6-3zm0 14a10 10 0 100 20 10 10 0 000-20z"
        style={{ animation: `gear-spin ${spinSec}s linear infinite`, transformOrigin: '32px 32px' }}
      />
    </svg>
  )
}

export default function YouAreARobotLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 800)
    return () => window.clearInterval(id)
  }, [])

  const optimism = useMemo(() => 42 + (tick % 58), [tick])

  return (
    <div
      className="relative min-h-full overflow-x-hidden text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(0, 229, 255, 0.12), transparent 50%), linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
      }}
    >
      <style>{`
        @keyframes robot-blink {
          0%, 45%, 55%, 100% { transform: scaleY(1); }
          48%, 52% { transform: scaleY(0.08); }
        }
        @keyframes robot-mouth {
          0%, 100% { opacity: 0.6; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.4); }
        }
        @keyframes antenna-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-6deg); }
          75% { transform: rotate(6deg); }
        }
        @keyframes led-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--accent-hot); }
          50% { opacity: 0.45; box-shadow: 0 0 16px var(--accent-hot); }
        }
        @keyframes gear-spin { to { transform: rotate(360deg); } }
        @keyframes circuit-drift {
          0% { background-position: 0 0, 12px 18px; }
          100% { background-position: 40px 24px, 52px 42px; }
        }
        @keyframes float-bit {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.15; }
          50% { transform: translateY(-12px) translateX(4px); opacity: 0.35; }
        }
        .robot-eye-l, .robot-eye-r { transform-origin: center; animation: robot-blink 4.2s ease-in-out infinite; }
        .robot-eye-r { animation-delay: 0.08s; }
        .robot-mouth { animation: robot-mouth 1.6s ease-in-out infinite; }
        .robot-antenna { transform-origin: 60px 18px; animation: antenna-wiggle 3s ease-in-out infinite; }
        .robot-led { animation: led-pulse 1.2s ease-in-out infinite; }
      `}</style>

      {/* Background circuit texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, var(--accent) 1px, transparent 1px),
            linear-gradient(180deg, var(--accent) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
          animation: 'circuit-drift 22s linear infinite',
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute font-mono text-[10px] text-[var(--accent)]"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23 + tick * 3) % 100}%`,
              animation: `float-bit ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {i % 2 ? '0' : '1'}
          </span>
        ))}
      </div>

      <GearDecoration className="pointer-events-none fixed -right-6 top-24 z-0 h-40 w-40 text-[var(--accent)]" spinSec={14} />
      <GearDecoration
        className="pointer-events-none fixed -left-8 bottom-32 z-0 h-32 w-32"
        spinSec={22}
        pathClassName="text-[var(--accent-hot)]"
      />

      <header className="relative z-10 border-b border-[var(--border)] bg-[var(--panel)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
          <RobotFace />
          <div className="min-w-0 flex-1">
            <p className="mb-0.5 font-mono text-[10px] tracking-[0.35em] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
              MODEL-7734-DELUXE · v2.beep
            </p>
            <h1 className="m-0 text-lg font-black tracking-wide text-[var(--accent)] sm:text-xl">PRIMARY_OBJECTIVE: CONSUME_DATA</h1>
            <p className="mt-1 max-w-xl text-xs text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
              Inbound human packets detected. Parsing subjects for humor. Success rate: {optimism}% (estimated).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-lg border border-[var(--border)] bg-base-300/30 px-3 py-2 sm:flex" role="status">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-success" style={{ fontFamily: 'var(--font-mono)' }}>
                Nominal
              </span>
            </div>
            <button type="button" className="btn btn-sm btn-outline border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)]" onClick={onSwitchPersona}>
              EJECT_HUMAN_SKIN
            </button>
          </div>
        </div>
        {/* Marquee */}
        <div
          className="border-t border-[var(--border)] bg-[#05080c] py-1.5 font-mono text-[10px] tracking-widest text-[var(--accent-warm)] overflow-hidden"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <div className="robot-marquee flex w-max animate-[robot-marquee_22s_linear_infinite]">
            <span className="px-6">
              BEEP BOOP · DO NOT OIL THE SCREEN · WEATHER_MODULE_FEELS_CUTE · STONKS = TORQUE_FOR_WALLET · NEWS = GOSSIP_FOR_MACHINES · YOU_ARE_DOING_GREAT ·
            </span>
            <span className="px-6" aria-hidden>
              BEEP BOOP · DO NOT OIL THE SCREEN · WEATHER_MODULE_FEELS_CUTE · STONKS = TORQUE_FOR_WALLET · NEWS = GOSSIP_FOR_MACHINES · YOU_ARE_DOING_GREAT ·
            </span>
          </div>
        </div>
        <style>{`
          @keyframes robot-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </header>

      <div className="relative z-10 mx-auto grid max-w-[1600px] min-h-[calc(100dvh-10rem)] grid-cols-1 gap-0 lg:grid-cols-[minmax(0,280px)_1fr_minmax(0,300px)]">
        {/* Inbox buffer */}
        <aside className="border-b border-[var(--border)] lg:border-b-0 lg:border-r bg-[var(--panel)]/60 backdrop-blur-sm">
          <div className="sticky top-0 flex items-center justify-between border-b border-[var(--border)] px-3 py-2">
            <span className="font-mono text-[10px] tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
              INBOUND_BUFFER
            </span>
            <span className="badge badge-sm border-0 bg-[var(--accent-hot)]/20 text-[var(--accent-hot)]">{emails.length} pkt</span>
          </div>
          <ul className="max-h-[40vh] overflow-y-auto lg:max-h-none lg:min-h-[50vh]">
            {emails.map((e, i) => {
              const active = selectedEmail?.id === e.id
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`flex w-full flex-col gap-1 border-b border-[var(--border)] px-3 py-3 text-left transition-all duration-200 hover:bg-[var(--accent)]/10 ${active ? 'bg-[var(--accent)]/15 shadow-[inset_3px_0_0_var(--accent)]' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none">{e.from.avatar}</span>
                      <span className="font-mono text-[9px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                        #{String(i + 1).padStart(3, '0')}
                      </span>
                      {!e.read && <span className="badge badge-xs border-0 bg-warning/30 text-warning">NEW</span>}
                    </div>
                    <span className="font-mono text-[9px] uppercase text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {tagLabel(e.tag)}
                    </span>
                    <span className={`line-clamp-2 text-sm font-bold ${e.read ? 'text-[var(--text-dim)]' : 'text-[var(--text)]'}`}>{e.subject}</span>
                    <span className="truncate font-mono text-[10px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      SRC: {e.from.name}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* Main decode panel */}
        <main className="min-h-[45vh] border-b border-[var(--border)] p-4 sm:p-6 lg:border-b-0">
          {selectedEmail ? (
            <article className="card border border-[var(--border)] bg-base-200/40 shadow-xl shadow-[var(--glow)] backdrop-blur-sm">
              <div className="card-body gap-4 p-4 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="mb-1 font-mono text-[10px] tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      DECODED_MESSAGE
                    </p>
                    <h2 className="card-title text-xl text-[var(--text)] sm:text-2xl">{selectedEmail.subject}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-outline border-[var(--border)] text-[var(--text-dim)]">{selectedEmail.date}</span>
                    <span className="badge border-0 bg-[var(--accent)]/20 text-[var(--accent)]">{tagLabel(selectedEmail.tag)}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-[var(--accent)]/40 bg-base-300/30 px-3 py-2">
                  <span className="text-2xl">{selectedEmail.from.avatar}</span>
                  <div>
                    <p className="m-0 text-sm font-bold">{selectedEmail.from.name}</p>
                    <p className="m-0 font-mono text-xs text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {selectedEmail.from.email}
                    </p>
                  </div>
                  <progress className="progress progress-info ml-auto h-2 w-full max-w-[8rem] sm:w-32" value={selectedEmail.read ? 100 : 66} max="100" />
                </div>
                <div className="mockup-code border border-[var(--border)] bg-[#05080c] text-[var(--text)]">
                  <pre className="m-0 whitespace-pre-wrap p-4 font-mono text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
                    {selectedEmail.body}
                  </pre>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="btn btn-sm btn-ghost text-[var(--text-dim)]" onClick={() => setSelectedEmail(null)}>
                    CLOSE_BUFFER
                  </button>
                  <button type="button" className="btn btn-sm btn-primary bg-[var(--accent)] text-[var(--bg)] border-0 hover:brightness-110">
                    ACK_RECEIPT_SIMULATION
                  </button>
                </div>
              </div>
            </article>
          ) : (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--panel)]/40 p-8">
              <div className="text-6xl" style={{ animation: 'float-bit 2.5s ease-in-out infinite' }}>
                🤖
              </div>
              <div className="text-center">
                <p className="m-0 font-mono text-sm tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  AWAITING_INPUT
                </p>
                <p className="mt-2 max-w-md text-sm text-[var(--text-dim)]">Select a packet from the buffer. I promise not to judge your spam folder (binary lie).</p>
              </div>
              <div className="flex gap-2">
                <span className="loading loading-dots loading-md text-[var(--accent)]" />
              </div>
            </div>
          )}
        </main>

        {/* Sensor column */}
        <aside className="flex flex-col gap-4 border-t border-[var(--border)] bg-[var(--panel)]/50 p-4 lg:border-t-0 lg:border-l">
          <section className="card border border-[var(--border)] bg-base-200/30 shadow-lg">
            <div className="card-body gap-3 p-4">
              <h3 className="card-title m-0 justify-start text-sm font-bold tracking-wide text-[var(--accent)]">
                ATMOSPHERE_ARRAY
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-5xl drop-shadow-[0_0_12px_var(--glow)]" style={{ animation: 'float-bit 3s ease-in-out infinite' }}>
                  {weather.icon}
                </span>
                <div>
                  <p className="m-0 text-3xl font-black tabular-nums">{weather.temp}°C</p>
                  <p className="m-0 font-mono text-xs text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                    {weather.city} · {weather.condition}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono text-[10px]" style={{ fontFamily: 'var(--font-mono)' }}>
                <div className="rounded bg-base-300/50 px-2 py-1">
                  <span className="text-[var(--text-dim)]">HUMID</span> {weather.humidity}%
                </div>
                <div className="rounded bg-base-300/50 px-2 py-1">
                  <span className="text-[var(--text-dim)]">WIND</span> {weather.wind} kph
                </div>
              </div>
              <ul className="space-y-1 border-t border-[var(--border)] pt-2">
                {weather.forecast.slice(0, 4).map((d) => (
                  <li key={d.day} className="flex items-center justify-between font-mono text-[10px]" style={{ fontFamily: 'var(--font-mono)' }}>
                    <span className="text-[var(--text-dim)]">{d.day}</span>
                    <span>
                      {d.icon} {d.high}° / {d.low}°
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="card border border-[var(--border)] bg-base-200/30 shadow-lg">
            <div className="card-body gap-2 p-4">
              <h3 className="card-title m-0 justify-start text-sm font-bold tracking-wide text-[var(--accent-hot)]">TORQUE_CURVES</h3>
              <p className="m-0 font-mono text-[9px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                (humans call these “stocks”)
              </p>
              <ul className="space-y-2">
                {stocks.map((s) => (
                  <li key={s.ticker} className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-base-300/40 px-2 py-2">
                    <span className="font-mono text-xs font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
                      {s.ticker}
                    </span>
                    <span className={`font-mono text-xs tabular-nums ${s.changePct >= 0 ? 'text-success' : 'text-error'}`} style={{ fontFamily: 'var(--font-mono)' }}>
                      {s.currency}
                      {s.price.toFixed(2)} ({s.changePct >= 0 ? '+' : ''}
                      {s.changePct}%)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="card border border-[var(--border)] bg-base-200/30 shadow-lg">
            <div className="card-body gap-3 p-4">
              <h3 className="card-title m-0 justify-start text-sm font-bold tracking-wide text-[var(--accent-warm)]">GOSSIP_PIPELINE</h3>
              <ul className="space-y-3">
                {news.slice(0, 5).map((n) => (
                  <li key={n.id} className="border-l-2 border-[var(--accent-warm)] pl-3">
                    <p className="m-0 flex items-start gap-2 text-sm leading-snug">
                      <span className="shrink-0 text-base">{n.emoji}</span>
                      <span>{n.title}</span>
                    </p>
                    <p className="mt-1 font-mono text-[9px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {n.source} · {n.time}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
