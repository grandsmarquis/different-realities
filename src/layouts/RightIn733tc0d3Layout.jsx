import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { leet733Str as L } from '../utils/leet733'

const difficulties = ['Easy', 'Medium', 'Hard']
const diffBadge = {
  Easy: 'badge-success',
  Medium: 'badge-warning',
  Hard: 'badge-error',
}

function difficultyForEmail(id) {
  return difficulties[(id - 1) % 3]
}

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

export default function RightIn733tc0d3Layout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [judge, setJudge] = useState('idle')

  useEffect(() => {
    if (!selectedEmail) {
      setJudge('idle')
      return
    }
    setJudge('running')
    const t = window.setTimeout(() => setJudge('accepted'), 720)
    return () => window.clearTimeout(t)
  }, [selectedEmail?.id])

  const fakeAccept = useMemo(
    () => (selectedEmail ? 42 + ((selectedEmail.id * 17) % 55) : 0),
    [selectedEmail?.id],
  )

  return (
    <div className="leet733-root relative isolate flex min-h-dvh flex-col overflow-hidden bg-[#0a0e14] pb-24 text-[#e8eaed]">
      {/* Background grid + floating braces */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(#ffa116 1px, transparent 1px),
            linear-gradient(90deg, #ffa116 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
        aria-hidden
      />
      <svg className="leet733-float-brace pointer-events-none absolute -right-8 top-24 h-48 w-48 text-[#ffa116]/20" viewBox="0 0 200 200" aria-hidden>
        <text x="10" y="120" className="fill-current font-mono text-[140px] font-bold leading-none">
          {'{'}
        </text>
      </svg>
      <svg className="leet733-float-brace-delay pointer-events-none absolute -left-4 bottom-32 h-40 w-40 text-[#3fb950]/15" viewBox="0 0 200 200" aria-hidden>
        <text x="40" y="130" className="fill-current font-mono text-[120px] font-bold leading-none">
          {'}'}
        </text>
      </svg>

      <header className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#30363d] bg-[#0d1117]/95 px-4 py-3 backdrop-blur-md">
        <div className="flex min-w-0 items-center gap-3">
          <div className="leet733-logo-pulse flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffa116] to-[#ff6b00] font-mono text-lg font-bold text-[#0a0e14] shadow-lg shadow-[#ffa116]/25">
            733
          </div>
          <div className="min-w-0">
            <h1 className="leet733-title-glint m-0 font-[family-name:var(--font-display)] text-lg font-extrabold tracking-tight text-[#f0f6fc] sm:text-xl">
              733<span className="text-[#ffa116]">tc0d3</span>
            </h1>
            <p className="m-0 truncate text-xs text-[#8b949e]">
              {L('You are right in the grind · daily challenge mode')}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="hidden items-center gap-1.5 rounded-lg border border-[#30363d] bg-[#161b22] px-3 py-1.5 sm:flex"
            title={L('Totally legit streak')}
          >
            <span className="leet733-streak text-lg" aria-hidden>
              🔥
            </span>
            <span className="font-mono text-sm font-semibold text-[#ffa116]">127</span>
            <span className="text-[10px] uppercase tracking-wider text-[#8b949e]">{L('streak')}</span>
          </div>
          <button type="button" className="btn btn-sm border-[#30363d] bg-[#21262d] text-[#e8eaed] hover:border-[#ffa116] hover:bg-[#30363d]" onClick={onSwitchPersona}>
            {L('Log out')}
          </button>
        </div>
      </header>

      <div className="relative z-10 grid min-h-0 flex-1 grid-cols-1 gap-3 p-3 lg:grid-cols-12 lg:gap-4 lg:p-4">
        {/* Problem list */}
        <aside className="leet733-panel flex max-h-[40vh] flex-col rounded-xl border border-[#30363d] bg-[#161b22]/90 shadow-xl backdrop-blur-sm lg:col-span-3 lg:max-h-none">
          <div className="flex items-center justify-between border-b border-[#30363d] px-3 py-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#8b949e]">
              {L('Problem set')}
            </span>
            <span className="badge badge-sm border-0 bg-[#ffa116]/20 text-[#ffa116]">{L('inbox')}</span>
          </div>
          <ul className="leet733-problem-scroll m-0 flex-1 list-none space-y-1 overflow-y-auto p-2">
            {emails.map(e => {
              const d = difficultyForEmail(e.id)
              const on = selectedEmail?.id === e.id
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`leet733-problem-row flex w-full flex-col gap-1 rounded-lg border px-2.5 py-2 text-left transition-all duration-200 ${
                      on
                        ? 'border-[#ffa116] bg-[#ffa116]/10 shadow-[0_0_20px_-8px_#ffa116]'
                        : 'border-transparent bg-[#0d1117]/80 hover:border-[#30363d] hover:bg-[#21262d]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`badge badge-xs ${diffBadge[d]} shrink-0 border-0 font-mono text-[10px]`}>
                        {L(d)}
                      </span>
                      {e.read ? (
                        <span className="leet733-check text-[#3fb950]" aria-label={L('Solved')}>
                          ✓
                        </span>
                      ) : (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#ffa116] leet733-new-dot" aria-hidden />
                      )}
                      <span className="min-w-0 flex-1 truncate font-mono text-[13px] text-[#e8eaed]">
                        {L(e.subject)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pl-1 text-[10px] text-[#8b949e]">
                      <span>{L(e.from.name)}</span>
                      <span className="font-mono">
                        {38 + (e.id * 7) % 60}% {L('acc.')}
                      </span>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* Main workspace */}
        <main className="leet733-panel flex min-h-[320px] flex-col overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117]/95 shadow-xl backdrop-blur-sm lg:col-span-6">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-3 py-2">
            <span className="font-mono text-xs text-[#8b949e]">{L('description')}</span>
            <span className="loading loading-dots loading-xs text-[#ffa116]" aria-hidden />
            {selectedEmail && (
              <span className={`badge badge-sm border-0 font-mono ${diffBadge[difficultyForEmail(selectedEmail.id)]}`}>
                {L(difficultyForEmail(selectedEmail.id))}
              </span>
            )}
            <div className="ml-auto flex items-center gap-2">
              {judge === 'running' && (
                <span className="leet733-judge-pulse font-mono text-[11px] text-[#58a6ff]">
                  {L('Running tests…')}
                </span>
              )}
              {judge === 'accepted' && selectedEmail && (
                <span className="leet733-accepted font-mono text-[11px] font-bold text-[#3fb950]">
                  {L('Accepted')}
                </span>
              )}
            </div>
          </div>

          {selectedEmail ? (
            <div className="leet733-editor flex min-h-0 flex-1 overflow-auto">
              <div className="sticky left-0 shrink-0 select-none border-r border-[#30363d] bg-[#0a0e14] px-2 py-4 text-right font-mono text-[12px] leading-6 text-[#484f58]">
                {selectedEmail.body.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="min-w-0 flex-1 p-4 font-mono text-[13px] leading-6">
                <p className="m-0 text-[#8b949e]">
                  <span className="text-[#ff7b72]">{L('@constraint')}</span> {L('from=')}
                  {'"'}
                  {L(selectedEmail.from.name)}
                  {'"'} {L('date=')}
                  {selectedEmail.date}
                </p>
                <h2 className="leet733-subject-reveal m-0 mt-3 text-base font-semibold text-[#79c0ff]">
                  {L(selectedEmail.subject)}
                </h2>
                <pre className="leet733-body-type m-0 mt-4 whitespace-pre-wrap font-mono text-[#e8eaed]">
                  {L(selectedEmail.body)}
                </pre>
                <div className="leet733-fake-code mt-6 rounded-lg border border-[#30363d] bg-[#161b22] p-3 text-[12px]">
                  <p className="m-0 text-[#8b949e]">{L('// Your solution (auto-generated fantasy)')}</p>
                  <p className="m-0 mt-2 text-[#ff7b72]">
                    {L('function')}{' '}
                    <span className="text-[#d2a8ff]">{L('solveInbox')}</span>
                    <span className="text-[#e8eaed]">() {'{'}</span>
                  </p>
                  <p className="m-0 pl-4 text-[#e8eaed]">
                    {L('return')}{' '}
                    <span className="text-[#a5d6ff]">{L('readEmail')}</span>(
                    <span className="text-[#a5d6ff]">{selectedEmail.id}</span>);{' '}
                    <span className="text-[#8b949e]">
                      {L(`// ${fakeAccept}% faster than 9×10³ peasants`)}
                    </span>
                  </p>
                  <p className="m-0 text-[#e8eaed]">{'}'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 font-mono text-sm text-[#8b949e]">
              {L('Pick a problem from the set →')}
            </div>
          )}
        </main>

        {/* Side dock: env, discuss, benchmarks */}
        <aside className="flex flex-col gap-3 lg:col-span-3">
          <div className="leet733-panel leet733-card-tilt rounded-xl border border-[#30363d] bg-[#161b22]/90 p-3 shadow-lg backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#58a6ff]">
                {L('Judge cluster')}
              </span>
              <span className="badge badge-xs border-0 bg-[#238636]/30 font-mono text-[#3fb950]">{L('online')}</span>
            </div>
            <div className="leet733-weather-bob flex items-center gap-3">
              <span className="text-4xl">{weather.icon}</span>
              <div>
                <p className="m-0 font-mono text-sm font-semibold text-[#f0f6fc]">
                  {L(`${weather.city}-${weather.country.slice(0, 2).toUpperCase()}-1`)}
                </p>
                <p className="m-0 text-xs text-[#8b949e]">
                  {L('ambient')} {weather.temp}°C · {L('fan')} {weather.wind} {L('rpm meme')}
                </p>
              </div>
            </div>
            <progress className="progress progress-warning mt-3 h-1.5 w-full" value={weather.humidity} max="100" />
            <p className="m-0 mt-1 text-[10px] text-[#8b949e]">
              {L('CPU humidity proxy:')} {weather.humidity}%
            </p>
          </div>

          <div className="leet733-panel max-h-48 overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22]/90 shadow-lg backdrop-blur-sm">
            <div className="border-b border-[#30363d] px-3 py-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#d2a8ff]">
                {L('Discuss')}
              </span>
            </div>
            <ul className="leet733-discuss-scroll m-0 max-h-36 list-none space-y-2 overflow-y-auto p-3">
              {news.slice(0, 6).map(n => (
                <li key={n.id} className="leet733-discuss-item border-l-2 border-[#ffa116]/60 pl-2 text-[12px] leading-snug">
                  <span className="text-[#8b949e]">@{L(n.source)}</span> · {n.emoji} {L(n.title)}
                </li>
              ))}
            </ul>
          </div>

          <div className="leet733-panel rounded-xl border border-[#30363d] bg-[#161b22]/90 p-3 shadow-lg backdrop-blur-sm">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#79c0ff]">
              {L('Benchmarks')}
            </span>
            <p className="m-0 mt-1 text-[10px] text-[#8b949e]">
              {L('Latency-shaped equity curves (trust)')}
            </p>
            <ul className="m-0 mt-3 list-none space-y-3 p-0">
              {stocks.map(s => (
                <li key={s.ticker} className="leet733-stock-row flex items-center justify-between gap-2 text-[12px]">
                  <span className="font-mono font-semibold text-[#ffa116]">{L(s.ticker)}</span>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#3fb950' : '#f85149'} />
                  <span className={`font-mono ${s.changePct >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                    {s.changePct > 0 ? '+' : ''}
                    {s.changePct}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Console strip */}
      <div className="leet733-console relative z-10 mx-3 mb-2 rounded-lg border border-[#30363d] bg-[#010409] px-3 py-2 font-mono text-[11px] text-[#8b949e] lg:mx-4">
        <span className="text-[#3fb950]">$</span> {L('./submit ego --optimize vibes')}
        <span className="leet733-cursor ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-[#ffa116]" aria-hidden />
      </div>
    </div>
  )
}
