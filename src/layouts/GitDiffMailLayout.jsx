import { useMemo } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function slugPath(email) {
  const safe = email.subject
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 42) || 'message'
  return `inbox/${String(email.id).padStart(2, '0')}-${safe}.eml`
}

/** Humorous “parent revision” lines (shown as deletions) — varies per message id */
function fantasyDeletionsFor(email) {
  const pool = [
    '- (void) unreadCount = 0;',
    '- assert(calendar.isEmpty());',
    '- TODO: reply to nobody',
    '- return InnerPeace.OK;',
    '- spam.filter(e => false); // disabled',
    '- energy.level = MAX;',
    '- meetings.length === 0',
    '- anxiety: undefined,',
  ]
  const n = 2 + (email.id % 2)
  const start = email.id % (pool.length - n + 1 || 1)
  return pool.slice(start, start + n)
}

function MiniSpark({ series, up }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 72
  const h = 22
  const p = 2
  const r = max - min || 1
  const stroke = up ? '#3fb950' : '#f85149'
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0 opacity-90">
      <polyline fill="none" stroke={stroke} strokeWidth="1.25" points={pts} />
    </svg>
  )
}

function CommitGraph() {
  return (
    <svg className="gdm-graph h-full w-8 shrink-0 text-[#484f58]" viewBox="0 0 32 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <path
        className="gdm-graph-path"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M16 8 C16 28, 8 38, 8 52 C8 66, 24 72, 24 88 C24 104, 10 112, 10 128 C10 148, 22 156, 22 176"
      />
      <circle className="gdm-graph-dot gdm-dot-a" cx="16" cy="8" r="4" fill="#a371f7" />
      <circle className="gdm-graph-dot gdm-dot-b" cx="8" cy="52" r="4" fill="#79c0ff" />
      <circle className="gdm-graph-dot gdm-dot-c" cx="24" cy="88" r="4" fill="#3fb950" />
      <circle className="gdm-graph-dot gdm-dot-d" cx="10" cy="128" r="4" fill="#d29922" />
      <circle className="gdm-graph-dot gdm-dot-e" cx="22" cy="176" r="4" fill="#f85149" />
    </svg>
  )
}

export default function GitDiffMailLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  const branchName = useMemo(() => {
    const unread = emails.filter(e => !e.read).length
    return unread > 0 ? `feature/unread-${unread}-and-coping` : 'main/inbox-zero-lies'
  }, [])

  const current = selectedEmail ?? emails[0]
  const path = current ? slugPath(current) : 'inbox/…'
  const dels = current ? fantasyDeletionsFor(current) : []
  const bodyLines = current ? current.body.split('\n') : []

  return (
    <div
      className="gdm-root relative flex min-h-dvh flex-col overflow-hidden pb-28 font-mono text-[13px] leading-snug text-[#c9d1d9]"
      style={{
        background: 'linear-gradient(165deg, #010409 0%, #0d1117 38%, #0a1628 100%)',
        fontFamily: 'var(--font-main), ui-monospace, monospace',
      }}
    >
      <style>{`
        @keyframes gdm-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes gdm-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.35; }
          50% { transform: translate(6px, -10px) rotate(12deg); opacity: 0.7; }
        }
        @keyframes gdm-line-in {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes gdm-pulse-dot {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.35); }
        }
        @keyframes gdm-graph-dash {
          to { stroke-dashoffset: 0; }
        }
        .gdm-root {
          --gdm-add-bg: rgba(46, 160, 67, 0.15);
          --gdm-add-fg: #3fb950;
          --gdm-del-bg: rgba(248, 81, 73, 0.12);
          --gdm-del-fg: #f85149;
          --gdm-meta: #8b949e;
        }
        .gdm-scanline::after {
          content: '';
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent 50%, rgba(88, 166, 255, 0.03) 50%);
          background-size: 100% 4px;
          animation: gdm-scan 7s linear infinite;
          opacity: 0.5;
        }
        .gdm-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(48px);
          animation: gdm-float 8s ease-in-out infinite;
          pointer-events: none;
        }
        .gdm-line-stagger > * {
          animation: gdm-line-in 0.35s ease-out both;
        }
        .gdm-line-stagger > *:nth-child(1) { animation-delay: 0.02s; }
        .gdm-line-stagger > *:nth-child(2) { animation-delay: 0.05s; }
        .gdm-line-stagger > *:nth-child(3) { animation-delay: 0.08s; }
        .gdm-line-stagger > *:nth-child(4) { animation-delay: 0.11s; }
        .gdm-line-stagger > *:nth-child(5) { animation-delay: 0.14s; }
        .gdm-line-stagger > *:nth-child(6) { animation-delay: 0.17s; }
        .gdm-line-stagger > *:nth-child(7) { animation-delay: 0.2s; }
        .gdm-line-stagger > *:nth-child(8) { animation-delay: 0.23s; }
        .gdm-line-stagger > *:nth-child(9) { animation-delay: 0.26s; }
        .gdm-line-stagger > *:nth-child(10) { animation-delay: 0.29s; }
        .gdm-line-stagger > *:nth-child(n+11) { animation-delay: 0.32s; }
        .gdm-graph-path {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: gdm-graph-dash 2.2s ease-out forwards;
        }
        .gdm-graph-dot { animation: gdm-pulse-dot 2.4s ease-in-out infinite; }
        .gdm-dot-b { animation-delay: 0.3s; }
        .gdm-dot-c { animation-delay: 0.6s; }
        .gdm-dot-d { animation-delay: 0.9s; }
        .gdm-dot-e { animation-delay: 1.2s; }
        .gdm-cursor-blink { animation: gdm-pulse-dot 1s step-end infinite; }
      `}</style>

      <div className="gdm-blob -left-20 -top-20 h-56 w-56 bg-[#388bfd]/25" />
      <div className="gdm-blob bottom-1/4 right-0 h-48 w-48 bg-[#a371f7]/20" style={{ animationDelay: '-3s' }} />

      <header className="relative z-10 flex shrink-0 flex-wrap items-center gap-2 border-b border-[#30363d] bg-[#161b22]/95 px-3 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] text-[#8b949e]">git-inbox — Terminal</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="badge badge-sm border-0 bg-[#238636]/30 font-mono text-[10px] font-normal text-[#3fb950]">FETCH_HEAD</span>
          <button type="button" className="btn btn-ghost btn-xs font-mono text-[#58a6ff]" onClick={onSwitchPersona}>
            git checkout home
          </button>
        </span>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Index + graph */}
        <aside className="flex max-h-[40vh] shrink-0 border-b border-[#30363d] bg-[#0d1117] lg:max-h-none lg:w-[min(100%,280px)] lg:flex-col lg:border-b-0 lg:border-r">
          <div className="flex min-h-0 flex-1">
            <div className="hidden py-3 pl-1 sm:block">
              <CommitGraph />
            </div>
            <div className="gdm-scanline relative min-w-0 flex-1 overflow-y-auto py-2 pr-2 pl-1">
              <p className="m-0 px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#8b949e]">Changes to be committed</p>
              <p className="m-0 px-2 pb-1 font-mono text-[11px] text-[#58a6ff]">
                On branch <span className="text-[#79c0ff]">{branchName}</span>
              </p>
              <p className="m-0 px-2 pb-2 text-[10px] text-[#6e7681]">Your branch is ahead of &apos;origin/calm&apos; by {emails.length} commits.</p>
              <ul className="m-0 list-none p-0">
                {emails.map(e => {
                  const on = (selectedEmail ?? emails[0])?.id === e.id
                  const p = slugPath(e)
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedEmail(e)}
                        className={`flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${
                          on ? 'bg-[#21262d] ring-1 ring-[#388bfd]/40' : 'hover:bg-[#161b22]'
                        }`}
                      >
                        <span className="shrink-0 text-[#d29922]">{e.read ? 'M' : 'A'}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12px] text-[#c9d1d9]">{p}</span>
                          <span className="mt-0.5 block truncate text-[10px] text-[#8b949e]">
                            {e.from.avatar} {e.from.name} · {e.time}
                          </span>
                        </span>
                        {!e.read && (
                          <span className="badge badge-xs shrink-0 border-0 bg-[#f85149]/25 font-mono text-[9px] text-[#ff7b72]">NEW</span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </aside>

        <div className="gdm-scanline relative flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="border-b border-[#30363d] bg-[#161b22] px-3 py-2 lg:hidden">
            <label className="mb-1 block text-[10px] font-bold uppercase text-[#8b949e]" htmlFor="gdm-email-select">
              git add -p
            </label>
            <select
              id="gdm-email-select"
              className="select select-bordered select-sm w-full border-[#30363d] bg-[#0d1117] font-mono text-[12px] text-[#c9d1d9]"
              value={current?.id ?? ''}
              onChange={ev => {
                const id = Number(ev.target.value)
                const em = emails.find(x => x.id === id)
                if (em) setSelectedEmail(em)
              }}
            >
              {emails.map(e => (
                <option key={e.id} value={e.id}>
                  {slugPath(e)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
            <main className="gdm-line-stagger min-h-[240px] flex-1 overflow-auto border-[#30363d] bg-[#0d1117] p-3 lg:border-r">
              {current && (
                <>
                  <p className="m-0 text-[#8b949e]">diff --git a/dev/null b/{path}</p>
                  <p className="m-0 text-[#8b949e]">new file mode 100644</p>
                  <p className="m-0 text-[#8b949e]">index 0000000..{String(current.id).padStart(7, '0')}</p>
                  <p className="m-0 text-[#8b949e]">--- /dev/null</p>
                  <p className="m-0 mb-2 text-[#8b949e]">+++ b/{path}</p>
                  <p className="m-0 bg-[#388bfd]/15 px-2 py-0.5 text-[11px] text-[#58a6ff]">
                    @@ -0,0 +1,{bodyLines.length + 5} @@ blame: {current.from.email} ({current.time})
                  </p>
                  {dels.map((line, i) => (
                    <p
                      key={`del-${i}`}
                      className="m-0 whitespace-pre-wrap border-l-2 border-[#f85149] bg-[var(--gdm-del-bg)] pl-2 font-mono text-[var(--gdm-del-fg)]"
                    >
                      {line}
                    </p>
                  ))}
                  <p className="m-0 whitespace-pre-wrap border-l-2 border-[#3fb950] bg-[var(--gdm-add-bg)] pl-2 text-[var(--gdm-add-fg)]">
                    +From: {current.from.name} &lt;{current.from.email}&gt;
                  </p>
                  <p className="m-0 whitespace-pre-wrap border-l-2 border-[#3fb950] bg-[var(--gdm-add-bg)] pl-2 text-[var(--gdm-add-fg)]">
                    +Date: {current.date} {current.time}
                  </p>
                  <p className="m-0 whitespace-pre-wrap border-l-2 border-[#3fb950] bg-[var(--gdm-add-bg)] pl-2 text-[var(--gdm-add-fg)]">
                    +Subject: {current.subject}
                  </p>
                  <p className="m-0 whitespace-pre-wrap border-l-2 border-[#3fb950] bg-[var(--gdm-add-bg)] pl-2 text-[var(--gdm-add-fg)]">
                    +Tags: #{current.tag} {current.starred ? '+starred' : ''}
                  </p>
                  <p className="m-0 whitespace-pre-wrap border-l-2 border-[#6e7681] bg-[#21262d]/50 pl-2 text-[#8b949e]">
                    {' '}
                    … preview: {current.preview}
                  </p>
                  {bodyLines.map((line, i) => (
                    <p
                      key={i}
                      className="m-0 whitespace-pre-wrap border-l-2 border-[#3fb950] bg-[var(--gdm-add-bg)] pl-2 text-[var(--gdm-add-fg)]"
                    >
                      +{line || '+'}
                    </p>
                  ))}
                </>
              )}
            </main>

            <aside className="flex w-full shrink-0 flex-col gap-2 overflow-y-auto border-t border-[#30363d] bg-[#161b22] p-3 lg:w-[min(100%,320px)] lg:border-t-0">
              <section className="rounded border border-[#30363d] bg-[#0d1117] p-2">
                <p className="m-0 text-[10px] font-bold uppercase text-[#d29922]">patch · weather.diff</p>
                <div className="gdm-line-stagger mt-2 space-y-0 text-[11px]">
                  <p className="m-0 text-[#8b949e]">--- a/sky.yml</p>
                  <p className="m-0 text-[#8b949e]">+++ b/sky.yml</p>
                  <p className="m-0 text-[#58a6ff]">@@ -1,4 +1,6 @@</p>
                  <p className="m-0 bg-[var(--gdm-del-bg)] pl-1 text-[var(--gdm-del-fg)]">- city: ???</p>
                  <p className="m-0 bg-[var(--gdm-del-bg)] pl-1 text-[var(--gdm-del-fg)]">- temp: NaN</p>
                  <p className="m-0 bg-[var(--gdm-add-bg)] pl-1 text-[var(--gdm-add-fg)]">+ city: {weather.city}</p>
                  <p className="m-0 bg-[var(--gdm-add-bg)] pl-1 text-[var(--gdm-add-fg)]">+ temp_c: {weather.temp}</p>
                  <p className="m-0 bg-[var(--gdm-add-bg)] pl-1 text-[var(--gdm-add-fg)]">+ feels_like: {weather.feels_like}</p>
                  <p className="m-0 bg-[var(--gdm-add-bg)] pl-1 text-[var(--gdm-add-fg)]">+ condition: {weather.icon} {weather.condition}</p>
                  <p className="m-0 bg-[var(--gdm-add-bg)] pl-1 text-[var(--gdm-add-fg)]">+ wind_kmh: {weather.wind}</p>
                </div>
              </section>

              <section className="rounded border border-[#30363d] bg-[#0d1117] p-2">
                <p className="m-0 text-[10px] font-bold uppercase text-[#a371f7]">git log --oneline --graph news</p>
                <ul className="gdm-line-stagger m-0 mt-2 list-none space-y-1.5 p-0 text-[11px]">
                  {news.map((n, i) => (
                    <li key={n.id} className="flex gap-2 border-l-2 border-[#484f58] pl-2">
                      <span className="shrink-0 font-mono text-[#6e7681]">*{String(i + 1).padStart(2, '0')}</span>
                      <span>
                        <span className="text-[#58a6ff]">{n.emoji}</span> {n.title}
                        <span className="block text-[10px] text-[#8b949e]">
                          {n.source} · {n.time}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded border border-[#30363d] bg-[#0d1117] p-2">
                <p className="m-0 text-[10px] font-bold uppercase text-[#3fb950]">diff --stocks</p>
                <div className="mt-2 space-y-2">
                  {stocks.map(s => (
                    <div key={s.ticker} className="flex items-center gap-2 border-l-2 border-[#30363d] pl-2 text-[11px]">
                      <span className="font-semibold text-[#79c0ff]">{s.ticker}</span>
                      <MiniSpark series={s.series} up={s.changePct >= 0} />
                      <span className={s.changePct >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}>
                        {s.currency}
                        {s.price.toFixed(2)} ({s.changePct > 0 ? '+' : ''}
                        {s.changePct}%)
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="rounded border border-dashed border-[#484f58] bg-[#0d1117]/80 px-2 py-2 text-[10px] text-[#8b949e]">
                <p className="m-0">
                  <span className="text-[#3fb950]">$</span> git commit -m &quot;WIP: emotional damage&quot; --no-verify
                </p>
                <p className="m-0 mt-1">
                  <span className="gdm-cursor-blink text-[#58a6ff]">▋</span>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
