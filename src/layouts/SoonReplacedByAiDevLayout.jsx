import { useMemo } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const TICKET_LABELS = ['P0-human', 'copilot-triage', 'legacy-owner', 'needs-human', 'before-automation', 'keyboard-bound']

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 72
  const h = 22
  const p = 2
  const r = max - min || 1
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

function RobotPeek({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="88" rx="40" ry="8" fill="currentColor" opacity="0.15" />
      <rect x="28" y="22" width="64" height="56" rx="12" stroke="currentColor" strokeWidth="2.5" fill="var(--ai-robot-fill, #1e293b)" />
      <circle cx="48" cy="48" r="8" fill="#22d3ee" className="soon-ai-blink" />
      <circle cx="72" cy="48" r="8" fill="#22d3ee" className="soon-ai-blink-delay" />
      <path d="M44 64 Q60 72 76 64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="52" y="12" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="2" fill="var(--ai-robot-antenna, #334155)" />
      <circle cx="60" cy="10" r="4" fill="#fbbf24" className="soon-ai-pulse-dot" />
    </svg>
  )
}

function fakeAiSummary(email) {
  if (!email) return 'awaiting_ticket_context…'
  const one = email.preview.slice(0, 90)
  return `TL;DR: ${one}${email.preview.length > 90 ? '…' : ''}\n\n• intent: async human follow-up\n• risk: context window nostalgia\n• action: delegate_to_self_doubt()`
}

export default function SoonReplacedByAiDevLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  const unread = emails.filter(e => !e.read).length
  const standupPct = useMemo(
    () => Math.min(97, 34 + unread * 9 + (emails.length % 11)),
    [unread, emails.length],
  )

  return (
    <div
      className="soon-ai-dev-root relative min-h-dvh overflow-x-hidden pb-28 text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main)',
        background: `
          radial-gradient(ellipse 80% 50% at 100% -10%, rgba(251, 191, 36, 0.12), transparent),
          radial-gradient(ellipse 60% 40% at 0% 100%, rgba(34, 211, 238, 0.08), transparent),
          linear-gradient(165deg, #0f1419 0%, #151c24 45%, #0c1014 100%)
        `,
        '--ai-robot-fill': '#1e293b',
        '--ai-robot-antenna': '#334155',
      }}
    >
      <style>{`
        .soon-ai-dev-root { --soon-ai-amber: #fbbf24; --soon-ai-cyan: #22d3ee; }
        @keyframes soonAiMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes soonAiShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes soonAiGlitch {
          0%, 90%, 100% { transform: translate(0); filter: none; }
          91% { transform: translate(-2px, 1px); filter: hue-rotate(20deg); }
          93% { transform: translate(2px, -1px); }
        }
        @keyframes soonAiBlink {
          0%, 45%, 55%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes soonAiPulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        .soon-ai-marquee-wrap { overflow: hidden; mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); }
        .soon-ai-marquee { display: inline-block; white-space: nowrap; animation: soonAiMarquee 28s linear infinite; }
        .soon-ai-shimmer {
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.12), transparent);
          background-size: 200% 100%;
          animation: soonAiShimmer 2.2s ease-in-out infinite;
        }
        .soon-ai-badge-glitch { animation: soonAiGlitch 4s ease-in-out infinite; }
        .soon-ai-blink { animation: soonAiBlink 3.2s ease-in-out infinite; }
        .soon-ai-blink-delay { animation: soonAiBlink 3.2s ease-in-out infinite 0.4s; }
        .soon-ai-pulse-dot { animation: soonAiPulseDot 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .soon-ai-marquee { animation: none; }
          .soon-ai-shimmer { animation: none; }
          .soon-ai-badge-glitch { animation: none; }
          .soon-ai-blink, .soon-ai-blink-delay, .soon-ai-pulse-dot { animation: none; }
        }
      `}</style>

      {/* Grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <header className="relative z-10 border-b border-amber-500/20 bg-base-300/40 px-3 py-3 backdrop-blur-sm sm:px-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <RobotPeek className="h-16 w-20 shrink-0 text-amber-400" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-warning badge-sm soon-ai-badge-glitch font-mono uppercase">deprecated</span>
                <span className="font-mono text-xs text-[var(--text2)]">human-engineer@v1.human-beta</span>
                <span className="badge badge-outline border-cyan-400/50 text-cyan-300 badge-sm font-mono">EOL soon™</span>
              </div>
              <h1 className="mt-1 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-amber-100 sm:text-xl">
                Soon-to-be-replaced-by-AI workspace
              </h1>
              <p className="mt-0.5 text-xs text-[var(--text2)]">
                Your keyboard: legacy input device. Same inbox, weather, news &amp; stonks — now with existential sprint goals.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1 rounded-lg border border-amber-500/25 bg-base-200/60 px-3 py-2">
              <div className="flex items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-wider text-[var(--text2)]">
                <span>Standup explainability index</span>
                <span className="text-amber-300">{standupPct}%</span>
              </div>
              <progress className="progress progress-warning h-2 w-full max-w-[220px]" value={standupPct} max={100} />
              <p className="m-0 text-[10px] text-[var(--text2)] opacity-80">Decorative metric. HR still loves you (probably).</p>
            </div>
            <button type="button" className="btn btn-outline btn-sm border-amber-500/40 text-amber-200 hover:bg-amber-500/10" onClick={onSwitchPersona}>
              Escape to safety
            </button>
          </div>
        </div>

        <div role="status" className="soon-ai-marquee-wrap relative mt-3 text-[11px] font-mono text-amber-200/70">
          <span className="soon-ai-marquee">
            npm WARN deprecated human-orchestrator — please migrate to autonomous-agents@latest · your standup could have been a webhook ·
            copilot is typing in another tab · remember to hydrate · same data, different denial ·
            npm WARN deprecated human-orchestrator — please migrate to autonomous-agents@latest ·
          </span>
        </div>

        <div className="alert alert-warning mt-3 border-amber-500/40 bg-amber-500/10 py-2 text-sm text-amber-100">
          <span className="font-mono text-lg" aria-hidden>
            ⚠
          </span>
          <div>
            <p className="m-0 font-semibold">Replacement ETA: next planning cycle (vibes-based)</p>
            <p className="m-0 mt-0.5 text-xs opacity-90">
              Pulsing indicator is decorative. You retain full access to unread guilt.
            </p>
          </div>
          <span className="ml-auto flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-40" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400" />
            </span>
          </span>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-4 p-3 sm:p-4 lg:grid-cols-12">
        {/* Inbox tickets */}
        <section className="flex flex-col rounded-xl border border-base-content/10 bg-base-200/40 backdrop-blur-sm lg:col-span-4">
          <div className="border-b border-base-content/10 px-3 py-2">
            <h2 className="m-0 font-[family-name:var(--font-display)] text-sm font-bold text-cyan-300">human_review_queue</h2>
            <p className="m-0 mt-0.5 font-mono text-[10px] text-[var(--text2)]">{unread} unread · {emails.length} tickets in legacy brain</p>
          </div>
          <ul className="m-0 max-h-[min(42vh,420px)] list-none space-y-2 overflow-y-auto p-2 lg:max-h-[calc(100dvh-22rem)]">
            {emails.map((e, i) => {
              const on = selectedEmail?.id === e.id
              const label = TICKET_LABELS[i % TICKET_LABELS.length]
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`flex w-full flex-col gap-1 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                      on
                        ? 'border-cyan-500/50 bg-cyan-950/40 ring-1 ring-cyan-500/30'
                        : 'border-base-content/10 bg-base-300/30 hover:border-amber-500/30 hover:bg-base-300/50'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="badge badge-sm badge-ghost font-mono text-[10px] text-amber-300">#{e.id}</span>
                      <span className="badge badge-sm border-amber-500/30 bg-amber-500/10 font-mono text-[10px] text-amber-200">{label}</span>
                      {!e.read && <span className="badge badge-error badge-xs font-mono">OPEN</span>}
                    </div>
                    <span className={`font-mono text-[13px] leading-snug ${e.read ? 'text-[var(--text2)]' : 'text-[var(--text)]'}`}>
                      {e.subject}
                    </span>
                    <span className="line-clamp-2 font-mono text-[11px] text-[var(--text2)] opacity-90">{e.preview}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Email detail + AI panel */}
        <section className="flex min-h-[280px] flex-col rounded-xl border border-base-content/10 bg-base-200/40 backdrop-blur-sm lg:col-span-5">
          <div className="border-b border-base-content/10 px-3 py-2">
            <h2 className="m-0 font-[family-name:var(--font-display)] text-sm font-bold text-amber-200">ticket_diff_view</h2>
            <p className="m-0 font-mono text-[10px] text-[var(--text2)]">left: ground truth · right: model hallucination (jk it&apos;s a template)</p>
          </div>
          {selectedEmail ? (
            <div className="grid min-h-0 flex-1 grid-cols-1 divide-y divide-base-content/10 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="min-h-0 overflow-y-auto p-3">
                <p className="m-0 font-mono text-[10px] text-cyan-400">
                  // {selectedEmail.from.name} · {selectedEmail.date} {selectedEmail.time}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--text)]">{selectedEmail.subject}</h3>
                <p className="mt-3 whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[var(--text)]">{selectedEmail.body}</p>
              </div>
              <div className="soon-ai-shimmer relative min-h-0 overflow-y-auto bg-base-300/20 p-3">
                <p className="m-0 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  <span className="loading loading-dots loading-xs text-cyan-400" aria-hidden />
                  streaming_summary.ts
                </p>
                <pre className="mt-3 whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-[var(--text2)]">
                  {fakeAiSummary(selectedEmail)}
                </pre>
                <p className="mt-4 font-mono text-[10px] text-[var(--text2)] opacity-70">
                  confidence: {Math.min(99, 60 + (selectedEmail.id * 7) % 35)}% · tokens: vibes · model: definitely-not-your-manager
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 font-mono text-sm text-[var(--text2)]">
              select_ticket_from_queue — human judgment required (for now)
            </div>
          )}
        </section>

        {/* Weather + news + stocks */}
        <aside className="flex flex-col gap-3 lg:col-span-3">
          <div className="rounded-xl border border-cyan-500/20 bg-base-200/50 p-3 backdrop-blur-sm">
            <h3 className="m-0 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">WEATHER.runtime</h3>
            <p className="mt-1 font-mono text-xs text-[var(--text2)]">cloud coverage: literal · deployment climate: {weather.condition}</p>
            <pre className="soon-ai-shimmer mt-2 overflow-x-auto rounded-lg border border-base-content/10 bg-base-300/40 p-2 font-mono text-[11px] leading-relaxed text-amber-100/90">
              {JSON.stringify(
                {
                  region: weather.city,
                  temp_c: weather.temp,
                  feels_like_c: weather.feels_like,
                  icon: weather.icon,
                  humidity_pct: weather.humidity,
                  wind_kmh: weather.wind,
                  dad_joke: 'partly cloudy with a chance of standup',
                },
                null,
                2,
              )}
            </pre>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-base-200/50 p-3 backdrop-blur-sm">
            <h3 className="m-0 font-mono text-[10px] font-bold uppercase tracking-widest text-amber-300">CHANGELOG.md — disruption_feed</h3>
            <ul className="m-0 mt-2 max-h-48 list-none space-y-2 overflow-y-auto p-0">
              {news.map(n => (
                <li key={n.id} className="border-l-2 border-cyan-500/50 pl-2 font-mono text-[11px] leading-snug text-[var(--text)]">
                  <span className="text-[var(--text2)]">## {n.time}</span> {n.emoji} {n.title}
                  <span className="block text-[10px] text-[var(--text2)]">— {n.source} · {n.category}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-base-content/10 bg-base-200/50 p-3 backdrop-blur-sm">
            <h3 className="m-0 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text)]">
              positions_you_still_grok.json
            </h3>
            <p className="mt-0.5 font-mono text-[10px] text-[var(--text2)]">automation-index tickers (your neurons still parse these)</p>
            <ul className="m-0 mt-2 list-none space-y-2 p-0">
              {stocks.map(s => (
                <li
                  key={s.ticker}
                  className="flex items-center justify-between gap-2 rounded-lg border border-base-content/5 bg-base-300/30 px-2 py-1.5 font-mono text-[11px]"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-cyan-300">{s.ticker}</span>
                    <span className="block truncate text-[10px] text-[var(--text2)]">{s.name}</span>
                  </div>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#f87171'} />
                  <div className="shrink-0 text-right">
                    <span className="text-[var(--text)]">
                      {s.currency}
                      {s.price}
                    </span>
                    <span className={`block text-[10px] ${s.changePct >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {s.changePct > 0 ? '+' : ''}
                      {s.changePct}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
