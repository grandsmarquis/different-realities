import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 88
  const h = 26
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0">
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={pts} />
    </svg>
  )
}

const fileIcons = ['📧', '📬', '📎', '🐙', '🏦', '💼']

export default function DeveloperLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative flex min-h-dvh flex-col overflow-hidden pb-28"
      style={{
        background: '#1e1e1e',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      {/* Title bar */}
      <header className="dev-titlebar flex h-9 shrink-0 items-center justify-between border-b border-[#3c3c3c] bg-[#323233] px-3 text-xs text-[#cccccc]">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-medium text-[#9d9d9d]">inbox-workspace</span>
        </span>
        <button type="button" className="rounded px-2 py-0.5 hover:bg-white/10" onClick={onSwitchPersona}>
          Close workspace
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Activity bar */}
        <div className="dev-activity flex w-12 shrink-0 flex-col items-center gap-3 border-r border-[#3c3c3c] bg-[#333333] py-3 text-lg" aria-hidden>
          <span className="opacity-90">📁</span>
          <span className="opacity-50">🔍</span>
          <span className="opacity-50">🔗</span>
        </div>

        {/* File tree */}
        <aside className="hidden w-52 shrink-0 border-r border-[#3c3c3c] bg-[#252526] sm:block">
          <p className="border-b border-[#3c3c3c] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[#bbbbbb]">Explorer</p>
          <div className="p-2 text-[13px]">
            <p className="m-0 px-2 py-1 text-[#569cd6]">▼ inbox</p>
            <ul className="m-0 list-none p-0 pl-2">
              {emails.map((e, i) => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`dev-file-row flex w-full items-center gap-2 rounded px-2 py-1.5 text-left ${on ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'}`}
                    >
                      <span>{fileIcons[i % fileIcons.length]}</span>
                      <span className={`truncate ${e.read ? 'text-[#858585]' : 'text-[#cccccc]'}`}>
                        {e.subject.slice(0, 22)}
                        {e.subject.length > 22 ? '…' : ''}
                      </span>
                      {!e.read && <span className="dev-branch-pulse ml-auto h-2 w-2 rounded-full bg-[#f14c4c]" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        {/* Editor + panels */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-[#3c3c3c] bg-[#252526] px-2 py-2 sm:hidden">
            <label className="mb-1 block text-[10px] font-bold uppercase text-[#858585]" htmlFor="dev-email-select">
              Open file
            </label>
            <select
              id="dev-email-select"
              className="select select-bordered select-sm w-full max-w-full border-[#3c3c3c] bg-[#1e1e1e] font-mono text-[13px] text-[#cccccc]"
              value={selectedEmail?.id ?? emails[0]?.id ?? ''}
              onChange={e => {
                const id = Number(e.target.value)
                const em = emails.find(x => x.id === id)
                if (em) setSelectedEmail(em)
              }}
            >
              {emails.map(e => (
                <option key={e.id} value={e.id}>
                  {e.subject.slice(0, 48)}
                  {e.subject.length > 48 ? '…' : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="flex h-9 shrink-0 items-end border-b border-[#252526] bg-[#252526] px-1 text-[13px]">
            <span className="flex items-center gap-2 border border-b-0 border-[#3c3c3c] bg-[#1e1e1e] px-3 py-1.5 text-[#cccccc]">
              <span className="text-amber-400">TS</span>
              message.tsx
              <span className="opacity-50">×</span>
            </span>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-12">
            <main className="dev-editor-area relative min-h-[280px] overflow-auto bg-[#1e1e1e] lg:col-span-8">
              {selectedEmail ? (
                <div className="flex font-mono text-[13px] leading-6">
                  <div className="sticky left-0 shrink-0 select-none border-r border-[#3c3c3c] bg-[#1e1e1e] px-3 py-4 text-right text-[#858585]">
                    {selectedEmail.body.split('\n').map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <div className="min-w-0 flex-1 p-4 pr-6">
                    <p className="m-0 text-[#6a9955]">
                      {'// '}
                      {selectedEmail.from.name} · {selectedEmail.date}
                    </p>
                    <h2 className="m-0 mt-3 text-lg font-semibold text-[#4ec9b0]">{selectedEmail.subject}</h2>
                    <p className="m-0 mt-4 whitespace-pre-wrap text-[#d4d4d4]">{selectedEmail.body}</p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-[#858585]">Open a file from the tree</div>
              )}
            </main>

            <aside className="flex flex-col gap-2 border-t border-[#3c3c3c] bg-[#252526] p-3 lg:col-span-4 lg:border-l lg:border-t-0">
              <div className="rounded border border-[#3c3c3c] bg-[#1e1e1e] p-3">
                <p className="m-0 text-[10px] font-bold uppercase text-[#569cd6]">api · weather.json</p>
                <pre className="m-0 mt-2 font-mono text-[12px] text-[#ce9178]">
                  {`{\n  "ok": true,\n  "icon": "${weather.icon}",\n  "temp": ${weather.temp},\n  "city": "${weather.city}"\n}`}
                </pre>
              </div>
              <div className="rounded border border-[#3c3c3c] bg-[#1e1e1e] p-3">
                <p className="m-0 text-[10px] font-bold uppercase text-[#c586c0]">packages · quotes</p>
                <div className="mt-2 space-y-2">
                  {stocks.map(s => (
                    <div key={s.ticker} className="flex items-center justify-between gap-2 text-[12px]">
                      <span className="font-mono text-[#9cdcfe]">{s.ticker}</span>
                      <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ec9b0' : '#f48771'} />
                      <span className={s.changePct >= 0 ? 'text-[#4ec9b0]' : 'text-[#f48771]'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto rounded border border-[#3c3c3c] bg-[#1e1e1e] p-3">
                <p className="m-0 text-[10px] font-bold uppercase text-[#dcdcaa]">rss · feed.ts</p>
                <ul className="m-0 mt-2 list-none space-y-2 p-0 text-[12px] text-[#d4d4d4]">
                  {news.slice(0, 5).map(n => (
                    <li key={n.id} className="border-l-2 border-[#569cd6] pl-2">
                      {n.emoji} {n.title}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* Terminal */}
          <footer className="dev-terminal shrink-0 border-t border-[#3c3c3c] bg-[#1e1e1e] px-3 py-2 font-mono text-[12px] text-[#cccccc]">
            <p className="m-0 text-[#6a9955]">TERMINAL</p>
            <p className="m-0 mt-1">
              <span className="text-[#569cd6]">~/inbox</span> $ git log --oneline -3
            </p>
            <p className="m-0 text-[#d4d4d4]">a1b2c3d feat: mark as read (wip)</p>
            <p className="m-0 text-[#d4d4d4]">e4f5g6h fix: spam filter regex</p>
            <p className="m-0 text-[#d4d4d4]">h7i8j9k chore: inbox zero fantasy</p>
            <p className="m-0 mt-1">
              <span className="text-[#569cd6]">~/inbox</span> $ <span className="dev-cursor-blink">▋</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
