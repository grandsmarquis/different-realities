import { useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function tagAsTool(tag) {
  return (
    {
      work: 'work_context',
      personal: 'human_vibes',
      finance: 'money_plugin',
      promo: 'suspicious_coupon',
      newsletter: 'long_context',
      social: 'social_graph',
      dev: 'code_smell',
      shopping: 'cart_entropy',
      travel: 'geo_fomo',
    }[tag] || 'misc_intent'
  )
}

function OrbMascot({ phase }) {
  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24" aria-hidden>
      <div
        className="absolute inset-0 rounded-full opacity-60 blur-xl"
        style={{
          background: 'conic-gradient(from 120deg, var(--mint), var(--violet), var(--pink), var(--mint))',
          animation: 'chatbot-orb-spin 8s linear infinite',
        }}
      />
      <div
        className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-2 border-white/20 shadow-lg sm:h-[5.25rem] sm:w-[5.25rem]"
        style={{
          background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 45%), linear-gradient(145deg, var(--violet) 0%, #4c1d95 50%, #0f172a 100%)',
          boxShadow: '0 0 40px var(--glow-violet), inset 0 0 20px rgba(95,255,216,0.15)',
          animation: 'chatbot-float 4s ease-in-out infinite',
        }}
      >
        <svg viewBox="0 0 80 80" className="h-14 w-14 sm:h-16 sm:w-16">
          <ellipse cx="32" cy="38" rx="9" ry="11" fill="var(--mint)" className="chatbot-blink" />
          <ellipse cx="48" cy="38" rx="9" ry="11" fill="var(--mint)" className="chatbot-blink" style={{ animationDelay: '0.12s' }} />
          <circle cx="30" cy="35" r="3" fill="white" opacity="0.9" />
          <circle cx="46" cy="35" r="3" fill="white" opacity="0.9" />
          <path d="M28 52 Q40 62 52 52" fill="none" stroke="var(--mint)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span
          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-base-300/90 text-[10px] font-bold text-warning"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {phase}
        </span>
      </div>
    </div>
  )
}

function NeuralBackdrop() {
  return (
    <svg className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.12]" aria-hidden>
      <defs>
        <linearGradient id="chatbot-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--mint)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--violet)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--pink)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[...Array(7)].map((_, i) => (
        <line
          key={i}
          x1={`${10 + i * 14}%`}
          y1="100%"
          x2={`${25 + i * 11}%`}
          y2="0%"
          stroke="url(#chatbot-line)"
          strokeWidth="1"
          strokeDasharray="6 10"
          strokeDashoffset="0"
          style={{
            animation: `chatbot-dash ${12 + i * 2}s linear infinite`,
            animationDelay: `${i * -1.2}s`,
          }}
        />
      ))}
    </svg>
  )
}

function TokenConfetti({ tick }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {[...Array(18)].map((_, i) => (
        <span
          key={i}
          className="absolute rounded-sm font-mono text-[9px] font-medium text-[var(--mint)]/40"
          style={{
            fontFamily: 'var(--font-mono)',
            left: `${(i * 37 + tick * 2) % 92}%`,
            bottom: '-4%',
            animation: `chatbot-rise ${8 + (i % 5)}s linear infinite`,
            animationDelay: `${i * 0.35}s`,
          }}
        >
          {['▁', '▂', '▃', '▄', '⟨', '⟩', '∇', 'λ'][i % 8]}
        </span>
      ))}
    </div>
  )
}

export default function AiChatbotLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [tick, setTick] = useState(0)
  const [streamKey, setStreamKey] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (selectedEmail) setStreamKey((k) => k + 1)
  }, [selectedEmail])

  const fakeTokens = useMemo(() => 1200 + (tick % 47) * 13, [tick])
  const phase = ['◐', '◓', '◑', '◒'][tick % 4]

  return (
    <div
      className="relative min-h-full overflow-x-hidden text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-display)',
        background:
          'radial-gradient(ellipse 100% 60% at 50% -10%, rgba(167, 139, 250, 0.18), transparent 55%), radial-gradient(ellipse 80% 50% at 100% 50%, rgba(251, 113, 133, 0.08), transparent), linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
      }}
    >
      <style>{`
        @keyframes chatbot-orb-spin { to { transform: rotate(360deg); } }
        @keyframes chatbot-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes chatbot-blink {
          0%, 40%, 46%, 100% { transform: scaleY(1); }
          43%, 45% { transform: scaleY(0.12); }
        }
        @keyframes chatbot-dash { to { stroke-dashoffset: -200; } }
        @keyframes chatbot-rise {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          8% { opacity: 0.5; }
          100% { transform: translateY(-110vh) rotate(180deg); opacity: 0; }
        }
        @keyframes chatbot-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes chatbot-stream {
          0% { opacity: 0; filter: blur(6px); transform: translateY(6px); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        @keyframes chatbot-pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(95, 255, 216, 0.25); }
          50% { box-shadow: 0 0 0 6px rgba(95, 255, 216, 0); }
        }
        .chatbot-blink { transform-origin: center; animation: chatbot-blink 5s ease-in-out infinite; }
        .chatbot-stream-body { animation: chatbot-stream 0.65s ease-out both; }
        .chatbot-card-hover:hover {
          animation: chatbot-pulse-border 1.5s ease-in-out infinite;
        }
      `}</style>

      <NeuralBackdrop />
      <TokenConfetti tick={tick} />

      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(105deg, transparent 40%, rgba(95,255,216,0.04) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: 'chatbot-shimmer 12s ease-in-out infinite',
        }}
      />

      <header className="relative z-10 border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4 px-4 py-4 sm:px-6">
          <OrbMascot phase={phase} />
          <div className="min-w-0 flex-1">
            <p className="mb-0.5 font-mono text-[10px] tracking-[0.2em] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
              CHAT_OS · helpful_mode.on · safety_clip ≈ 0.99
            </p>
            <h1 className="m-0 bg-gradient-to-r from-[var(--mint)] via-[var(--violet)] to-[var(--pink)] bg-clip-text text-xl font-extrabold tracking-tight text-transparent sm:text-2xl">
              Hello, I&apos;m definitely not reading your screen
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-[var(--text-dim)]">
              Your inbox is just a very long multi-turn conversation you forgot you started. Weather, news, and tickers arrive via pretend tool calls. Please be kind to the gradient.
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <div className="badge badge-outline border-[var(--violet)]/50 bg-base-300/40 font-mono text-[10px] text-[var(--mint)]" style={{ fontFamily: 'var(--font-mono)' }}>
                ~{fakeTokens} fake tokens
              </div>
              <div className="tooltip tooltip-bottom" data-tip="Statistically comforting">
                <span className="badge badge-success badge-sm gap-1 font-mono text-[10px]" style={{ fontFamily: 'var(--font-mono)' }}>
                  <span className="loading loading-ring loading-xs text-success-content" />
                  grounded*
                </span>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-sm border-[var(--pink)]/40 bg-gradient-to-r from-[var(--violet)]/20 to-[var(--pink)]/20 text-[var(--text)] hover:border-[var(--mint)]"
              onClick={onSwitchPersona}
            >
              Exit simulation (human)
            </button>
          </div>
        </div>

        <div className="border-t border-[var(--border)]/80 bg-base-300/20 py-2">
          <div className="chatbot-marquee flex w-max animate-[chatbot-marquee_28s_linear_infinite] font-mono text-[10px] tracking-widest text-[var(--amber)]/90" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="px-8">
              ● I can browse the web (narrator: it cannot) ● weather.getLocation() ● stonks.invoke_vibes() ● news.retrieve_hot_takes() ●
              remember: I&apos;m just statistics dressed as empathy ●
            </span>
            <span className="px-8" aria-hidden>
              ● I can browse the web (narrator: it cannot) ● weather.getLocation() ● stonks.invoke_vibes() ● news.retrieve_hot_takes() ●
              remember: I&apos;m just statistics dressed as empathy ●
            </span>
          </div>
        </div>
        <style>{`
          @keyframes chatbot-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </header>

      <div className="relative z-10 mx-auto grid max-w-[1600px] min-h-[calc(100dvh-11rem)] grid-cols-1 gap-0 lg:grid-cols-[minmax(0,300px)_1fr_minmax(0,300px)]">
        {/* Prompt history = inbox */}
        <aside className="border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md lg:border-b-0 lg:border-r">
          <div className="sticky top-0 flex items-center justify-between border-b border-[var(--border)] px-3 py-2.5">
            <span className="font-mono text-[10px] font-semibold tracking-widest text-[var(--violet)]" style={{ fontFamily: 'var(--font-mono)' }}>
              USER_PROMPTS (inbox)
            </span>
            <span className="badge badge-sm border-0 bg-[var(--mint)]/15 font-mono text-[var(--mint)]" style={{ fontFamily: 'var(--font-mono)' }}>
              {emails.length} threads
            </span>
          </div>
          <ul className="max-h-[42vh] overflow-y-auto lg:max-h-none lg:min-h-[52vh]">
            {emails.map((e, i) => {
              const active = selectedEmail?.id === e.id
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`chatbot-card-hover flex w-full flex-col gap-1.5 border-b border-[var(--border)] px-3 py-3 text-left transition-colors duration-200 hover:bg-[var(--surface-strong)] ${
                      active ? 'bg-gradient-to-r from-[var(--violet)]/15 to-transparent ring-1 ring-inset ring-[var(--mint)]/30' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none">{e.from.avatar}</span>
                      <span className="font-mono text-[9px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                        turn_{String(i + 1).padStart(2, '0')}
                      </span>
                      {!e.read && (
                        <span className="badge badge-xs border-0 bg-[var(--pink)]/25 font-mono text-[var(--pink)]" style={{ fontFamily: 'var(--font-mono)' }}>
                          unread
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--mint)]/80" style={{ fontFamily: 'var(--font-mono)' }}>
                      {tagAsTool(e.tag)}
                    </span>
                    <span className={`line-clamp-2 text-sm font-semibold leading-snug ${e.read ? 'text-[var(--text-dim)]' : 'text-[var(--text)]'}`}>{e.subject}</span>
                    <span className="truncate font-mono text-[10px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      @{e.from.name.replace(/\s+/g, '_').toLowerCase()}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* Assistant panel */}
        <main className="min-h-[46vh] border-b border-[var(--border)] p-4 sm:p-6 lg:border-b-0">
          {selectedEmail ? (
            <div key={streamKey} className="space-y-4">
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--violet)]/40 bg-base-300 text-lg">
                    {selectedEmail.from.avatar}
                  </div>
                </div>
                <div className="chat-header font-mono text-[10px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  user · {selectedEmail.date}
                </div>
                <div className="chat-bubble chat-bubble-primary max-w-[min(100%,42rem)] border-0 bg-gradient-to-br from-[var(--violet)]/90 to-[#4c1d95] text-primary-content shadow-lg shadow-[var(--glow-violet)]">
                  <p className="m-0 font-semibold">{selectedEmail.subject}</p>
                </div>
              </div>

              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--mint)]/50 bg-base-300 text-lg"
                    style={{ animation: 'chatbot-float 3s ease-in-out infinite' }}
                  >
                    ✨
                  </div>
                </div>
                <div className="chat-header pb-1 font-mono text-[10px] text-[var(--mint)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  assistant · {tagAsTool(selectedEmail.tag)} · streaming…
                </div>
                <div className="chat-bubble chat-bubble-secondary max-w-[min(100%,48rem)] border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--text)] backdrop-blur-sm">
                  <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-[var(--border)] pb-2">
                    <span className="font-mono text-[10px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {selectedEmail.from.name}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {selectedEmail.from.email}
                    </span>
                    <progress className="progress progress-success h-1.5 w-24" value={selectedEmail.read ? 100 : 72} max="100" />
                  </div>
                  <div className="chatbot-stream-body">
                    <pre className="m-0 whitespace-pre-wrap font-mono text-sm leading-relaxed text-[var(--text)]/95" style={{ fontFamily: 'var(--font-mono)' }}>
                      {selectedEmail.body}
                    </pre>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" className="btn btn-ghost btn-xs font-mono text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }} onClick={() => setSelectedEmail(null)}>
                      clear_context()
                    </button>
                    <button type="button" className="btn btn-xs border-0 bg-[var(--mint)]/20 font-mono text-[var(--mint)] hover:bg-[var(--mint)]/30" style={{ fontFamily: 'var(--font-mono)' }}>
                      regenerate (same vibes)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[340px] flex-col items-center justify-center gap-6 rounded-3xl border-2 border-dashed border-[var(--border)] bg-[var(--surface)]/50 p-8">
              <div className="relative">
                <span className="text-6xl" style={{ animation: 'chatbot-float 2.8s ease-in-out infinite' }}>
                  🧠
                </span>
                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--pink)]/20 text-lg">💭</span>
              </div>
              <div className="text-center">
                <p className="m-0 font-mono text-sm font-semibold tracking-widest text-[var(--violet)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  NO_ACTIVE_COMPLETION
                </p>
                <p className="mt-2 max-w-md text-sm text-[var(--text-dim)]">
                  Pick a &quot;prompt&quot; on the left. I&apos;ll hallucinate a thoughtful reply with 94% confidence and a cute loading animation.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-base-300/40 px-4 py-2">
                <span className="loading loading-dots loading-md text-[var(--mint)]" />
                <span className="font-mono text-[10px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  thinking (decorative)
                </span>
              </div>
            </div>
          )}
        </main>

        {/* Tool outputs */}
        <aside className="flex flex-col gap-4 border-t border-[var(--border)] bg-[var(--surface)]/60 p-4 backdrop-blur-md lg:border-t-0 lg:border-l">
          <section className="card border border-[var(--border)] bg-base-300/30 shadow-xl">
            <div className="card-body gap-3 p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="card-title m-0 text-sm font-bold text-[var(--mint)]">tool: weather</h3>
                <span className="badge badge-outline badge-sm border-[var(--mint)]/40 font-mono text-[9px] text-[var(--mint)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  JSON ✓
                </span>
              </div>
              <div className="mockup-code border border-[var(--border)] bg-[#0f0a18] text-[var(--text)]">
                <pre className="m-0 whitespace-pre-wrap p-3 font-mono text-[11px] leading-relaxed text-[var(--mint)]/90" style={{ fontFamily: 'var(--font-mono)' }}>
                  {`{\n  "city": "${weather.city}",\n  "temp_c": ${weather.temp},\n  "vibe": "${weather.condition}",\n  "humidity": ${weather.humidity},\n  "wind_kph": ${weather.wind}\n}`}
                </pre>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-base-200/50 p-3">
                <span className="text-4xl" style={{ animation: 'chatbot-float 3.5s ease-in-out infinite' }}>
                  {weather.icon}
                </span>
                <div>
                  <p className="m-0 text-2xl font-black tabular-nums">{weather.temp}°C</p>
                  <p className="m-0 font-mono text-[10px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                    outdoor_context_buffer
                  </p>
                </div>
              </div>
              <ul className="space-y-1.5 border-t border-[var(--border)] pt-2">
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

          <section className="card border border-[var(--border)] bg-base-300/30 shadow-xl">
            <div className="card-body gap-3 p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="card-title m-0 text-sm font-bold text-[var(--pink)]">tool: stonks</h3>
                <span className="badge badge-sm border-0 bg-[var(--pink)]/20 font-mono text-[9px] text-[var(--pink)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  not_financial_advice()
                </span>
              </div>
              <ul className="space-y-2">
                {stocks.map((s) => (
                  <li
                    key={s.ticker}
                    className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-base-200/40 px-2.5 py-2 transition-transform hover:scale-[1.02]"
                  >
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

          <section className="card border border-[var(--border)] bg-base-300/30 shadow-xl">
            <div className="card-body gap-3 p-4">
              <h3 className="card-title m-0 justify-start text-sm font-bold text-[var(--violet)]">RAG: news_chunks</h3>
              <p className="m-0 font-mono text-[9px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                top_k=5 · similarity=¯\_(ツ)_/¯
              </p>
              <ul className="space-y-3">
                {news.slice(0, 5).map((n) => (
                  <li key={n.id} className="group relative rounded-lg border-l-4 border-[var(--violet)] bg-base-200/30 pl-3 pr-2 py-2">
                    <span
                      className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.12), transparent)',
                        backgroundSize: '200% 100%',
                        animation: 'chatbot-shimmer 3s ease infinite',
                      }}
                    />
                    <p className="relative m-0 flex items-start gap-2 text-sm leading-snug">
                      <span className="shrink-0 text-base">{n.emoji}</span>
                      <span>{n.title}</span>
                    </p>
                    <p className="relative mt-1 font-mono text-[9px] text-[var(--text-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      source={n.source} · t={n.time}
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
