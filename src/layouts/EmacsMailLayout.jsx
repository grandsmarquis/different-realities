import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'

const MINIBUFFER_LINES = [
  'M-x butterfly RET',
  'Mark set',
  'Wrote ~/Mail/inbox (UTF-8)',
  'M-x doctor RET',
  'Quit',
  'M-x tetris RET',
  'Auto-saving…done',
  'The Church of Emacs welcomes you',
  'C-g C-g',
  'M-x gnus-other-frame RET',
]

const PARENS = ['()', '(())', '((()))', '[]', 'λ', '∅', 'π']

function GnuMascot({ className = '' }) {
  return (
    <svg
      className={`emacs-mail-gnu-bob ${className}`}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="38" cy="48" rx="22" ry="16" fill="#5c4a7a" opacity="0.9" />
      <ellipse cx="36" cy="32" rx="18" ry="20" fill="#7c5cff" opacity="0.95" />
      <ellipse cx="28" cy="28" rx="5" ry="10" fill="#1c1b22" transform="rotate(-18 28 28)" />
      <ellipse cx="44" cy="28" rx="5" ry="10" fill="#1c1b22" transform="rotate(18 44 28)" />
      <path
        d="M18 22 Q10 8 22 4 Q26 2 30 8"
        stroke="#ffb86b"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M54 22 Q62 8 50 4 Q46 2 42 8"
        stroke="#ffb86b"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="36" cy="38" rx="6" ry="4" fill="#1c1b22" opacity="0.35" />
      <circle cx="32" cy="30" r="2.5" fill="#e8e6f0" />
      <circle cx="40" cy="30" r="2.5" fill="#e8e6f0" />
    </svg>
  )
}

export default function EmacsMailLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [miniIdx, setMiniIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setMiniIdx(i => (i + 1) % MINIBUFFER_LINES.length)
    }, 3200)
    return () => clearInterval(t)
  }, [])

  const lineCount = useMemo(() => {
    if (!selectedEmail?.body) return 0
    return selectedEmail.body.split('\n').length
  }, [selectedEmail])

  const parenDecor = useMemo(
    () =>
      PARENS.map((p, i) => ({
        p,
        left: `${8 + (i * 11) % 84}%`,
        top: `${12 + (i * 17) % 70}%`,
        delay: `${i * 0.7}s`,
        dur: `${14 + i * 2}s`,
      })),
    []
  )

  return (
    <div
      className="relative flex min-h-dvh flex-col overflow-hidden font-mono text-[13px] leading-snug"
      style={{
        background: 'linear-gradient(165deg, #14131a 0%, #1c1b22 40%, #1a1628 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]" aria-hidden>
        {parenDecor.map((d, i) => (
          <span
            key={i}
            className="emacs-mail-paren-drift absolute text-2xl font-bold text-[var(--accent2)]"
            style={{ left: d.left, top: d.top, animationDuration: d.dur, animationDelay: d.delay }}
          >
            {d.p}
          </span>
        ))}
      </div>

      <div
        className="relative z-[1] flex h-8 shrink-0 items-center gap-1 border-b px-2 text-[11px]"
        style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}
      >
        {['File', 'Edit', 'Options', 'Buffers', 'Tools', 'Help'].map(m => (
          <button
            key={m}
            type="button"
            className="btn btn-ghost btn-xs h-6 min-h-0 rounded px-2 py-0 font-normal normal-case text-[var(--text2)] hover:bg-base-content/10 hover:text-[var(--text)]"
          >
            {m}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-2 text-[var(--text2)]">
          <GnuMascot className="h-7 w-7 opacity-90" />
          <span className="hidden font-[family-name:var(--font-display)] text-xs sm:inline">GNU Emacs 30.0.50</span>
        </span>
      </div>

      <div
        className="relative z-[1] flex h-9 shrink-0 items-center gap-2 border-b px-2 text-base"
        style={{ borderColor: 'var(--border)', background: '#2a2838' }}
        aria-hidden
      >
        {['📂', '🔍', '✉️', '📎', '⚙️', '🦬'].map((icon, i) => (
          <span
            key={i}
            className="flex h-7 w-7 cursor-default items-center justify-center rounded hover:bg-white/10"
          >
            {icon}
          </span>
        ))}
        <button
          type="button"
          className="btn btn-ghost btn-xs ml-auto h-7 min-h-0 gap-1 rounded border border-[var(--border)] px-2 text-[var(--accent2)]"
          onClick={onSwitchPersona}
        >
          <span className="opacity-70">M-x</span> leave-emacs RET
        </button>
      </div>

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col gap-0 lg:flex-row">
        <aside
          className="flex max-h-[40vh] min-h-[200px] flex-col border-b lg:max-h-none lg:w-[min(100%,280px)] lg:shrink-0 lg:border-b-0 lg:border-r"
          style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
        >
          <div
            className="flex shrink-0 items-center justify-between border-b px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ borderColor: 'var(--border)', color: 'var(--accent2)' }}
          >
            <span>*Group*</span>
            <span className="badge badge-ghost badge-xs border-0 bg-[var(--accent)]/20 text-[var(--text)]">Gnus</span>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <ul className="m-0 list-none p-0">
              {emails.map(e => {
                const active = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`flex w-full flex-col gap-0.5 border-b px-2 py-2 text-left transition-colors ${
                        active ? 'bg-[var(--accent)]/25' : 'hover:bg-white/5'
                      }`}
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <span className="flex items-center gap-1.5 text-[11px] text-[var(--text2)]">
                        <span>{e.from.avatar}</span>
                        <span className="truncate">{e.from.name}</span>
                        {!e.read && (
                          <span className="emacs-mail-unread-dot ml-auto h-2 w-2 shrink-0 rounded-full bg-[var(--accent3)]" />
                        )}
                      </span>
                      <span className={`truncate ${e.read ? 'text-[var(--text2)]' : 'font-semibold text-[var(--text)]'}`}>
                        {e.subject}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div
            className="flex shrink-0 items-center gap-2 border-b px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ borderColor: 'var(--border)', background: 'var(--bg2)', color: 'var(--accent3)' }}
          >
            <span>*Article*</span>
            <span className="truncate font-normal normal-case text-[var(--text2)]">
              {selectedEmail?.subject ?? '—'}
            </span>
          </div>
          <div className="emacs-mail-fringe flex min-h-[200px] min-w-0 flex-1 overflow-auto" style={{ background: '#1e1d26' }}>
            <div
              className="sticky left-0 z-[1] w-9 shrink-0 select-none border-r py-3 text-right text-[11px] text-[var(--text2)]/60"
              style={{ borderColor: 'var(--border)', background: '#1a1922' }}
            >
              {(selectedEmail?.body ? selectedEmail.body.split('\n') : ['']).map((_, i) => (
                <div key={i} className="pr-2 leading-6">
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="min-w-0 flex-1 p-3 pr-4 sm:p-4">
              {selectedEmail ? (
                <>
                  <p className="m-0 text-[var(--accent2)]">
                    From: {selectedEmail.from.name} &lt;{selectedEmail.from.email}&gt;
                  </p>
                  <p className="m-0 mt-1 text-[var(--text2)]">
                    Date: {selectedEmail.date} {selectedEmail.time}
                  </p>
                  <p className="m-0 mt-1 text-[var(--accent)]">Subject: {selectedEmail.subject}</p>
                  <hr className="my-3 border-[var(--border)]" />
                  <pre className="m-0 whitespace-pre-wrap font-[family-name:var(--font-main)] text-[13px] text-[var(--text)]">
                    {selectedEmail.body}
                  </pre>
                </>
              ) : (
                <p className="m-0 text-[var(--text2)]">No message — pick one from *Group*</p>
              )}
            </div>
          </div>

          <div className="grid shrink-0 grid-cols-1 gap-px border-t md:grid-cols-3" style={{ borderColor: 'var(--border)', background: 'var(--border)' }}>
            <section className="min-h-[140px] bg-[#1a1922] p-2 md:min-h-[120px]">
              <p className="m-0 text-[10px] font-bold uppercase text-[var(--accent2)]">*scratch*</p>
              <pre className="emacs-mail-eval-pulse m-0 mt-1 overflow-x-auto text-[11px] text-[var(--text2)]">
                <span className="text-[#6a9955]">;; weather.el — not evaluated (yet)</span>
                {'\n'}
                <span className="text-[#c586c0]">(</span>
                <span className="text-[#dcdcaa]">setq</span> weather-data
                <span className="text-[#c586c0]">\n  '</span>
                <span className="text-[#ce9178]">
                  (:city &quot;{weather.city}&quot; :temp {weather.temp} :icon &quot;{weather.icon}&quot; :vibe &quot;
                  {weather.condition}&quot;)
                </span>
                <span className="text-[#c586c0]">)</span>
                {'\n'}
                <span className="text-[#569cd6]">(</span>
                <span className="text-[#dcdcaa]">message</span>
                <span className="text-[#ce9178]"> &quot;feels_like=%d°C&quot;</span> {weather.feels_like}
                <span className="text-[#569cd6]">)</span>
              </pre>
            </section>
            <section className="min-h-[140px] bg-[#1a1922] p-2 md:min-h-[120px]">
              <p className="m-0 text-[10px] font-bold uppercase text-[#f48771]">*compilation*</p>
              <p className="m-0 mt-1 text-[11px] text-[var(--text2)]">gcc -Wall stocks.c -o stonks</p>
              <ul className="m-0 mt-2 list-none space-y-1.5 p-0">
                {stocks.map(s => (
                  <li key={s.ticker} className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="text-[var(--accent2)]">{s.ticker}</span>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#5ce0c8' : '#f48771'} className="scale-75 origin-left" />
                    <span className={s.changePct >= 0 ? 'text-[#5ce0c8]' : 'text-[#f48771]'}>
                      {s.currency}
                      {s.price.toFixed(2)} ({s.changePct > 0 ? '+' : ''}
                      {s.changePct}%)
                    </span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="min-h-[140px] bg-[#1a1922] p-2 md:min-h-[120px]">
              <p className="m-0 text-[10px] font-bold uppercase text-[var(--accent)]">*rss*</p>
              <ol className="m-0 mt-2 list-decimal space-y-1.5 pl-4 text-[11px] text-[var(--text)]">
                {news.slice(0, 5).map(n => (
                  <li key={n.id} className="pl-1 marker:text-[var(--text2)]">
                    <span className="mr-1">{n.emoji}</span>
                    {n.title}
                    <span className="text-[var(--text2)]"> — {n.source}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </main>
      </div>

      <div
        className="relative z-[1] flex h-8 shrink-0 items-center border-t px-2 text-[12px]"
        style={{
          borderColor: '#0a3d5c',
          background: 'linear-gradient(180deg, #0d4a6e 0%, #0a3550 100%)',
          color: '#c8f0ff',
        }}
      >
        <span className="emacs-mail-miniblink truncate">
          <span className="opacity-80">M-x </span>
          {MINIBUFFER_LINES[miniIdx]}
        </span>
        <span className="emacs-mail-caret ml-0.5 inline-block h-4 w-0.5 bg-[#c8f0ff]" />
      </div>

      <div
        className="emacs-mail-modeline relative z-[1] flex h-7 shrink-0 items-center justify-between border-t px-2 text-[11px]"
        style={{
          borderColor: 'var(--border)',
          background: 'linear-gradient(180deg, #3d3a52 0%, #2e2c3d 100%)',
          color: '#dcd8f0',
        }}
      >
        <span>
          -UUU:↵---F1 <strong className="font-semibold text-[var(--accent2)]">*Article*</strong> All (1,0) (message-mode)
        </span>
        <span className="hidden gap-3 sm:flex">
          <span>
            L{lineCount > 0 ? `1–${lineCount}` : '0'}
          </span>
          <span className="text-[var(--accent3)]">Mail</span>
        </span>
      </div>
    </div>
  )
}
