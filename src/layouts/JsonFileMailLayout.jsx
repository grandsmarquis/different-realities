import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const FILES = [
  { id: 'inbox', name: 'inbox.json', emoji: '📬', accent: '#ff79c6' },
  { id: 'weather', name: 'weather.json', emoji: '🌤️', accent: '#8be9fd' },
  { id: 'news', name: 'headlines.json', emoji: '📰', accent: '#f1fa8c' },
  { id: 'stocks', name: 'stonks.json', emoji: '📈', accent: '#50fa7b' },
]

const COL = {
  str: '#f1fa8c',
  num: '#bd93f9',
  kw: '#ff79c6',
  punc: '#6272a4',
  keyHint: '#8be9fd',
}

function tokenizeJsonLine(line) {
  const tokens = []
  let i = 0
  const n = line.length
  while (i < n) {
    const c = line[i]
    if (c === ' ' || c === '\t') {
      let j = i
      while (j < n && (line[j] === ' ' || line[j] === '\t')) j++
      tokens.push({ type: 'ws', text: line.slice(i, j) })
      i = j
      continue
    }
    if (c === '"') {
      let j = i + 1
      while (j < n) {
        if (line[j] === '\\') {
          j += 2
          continue
        }
        if (line[j] === '"') {
          j++
          break
        }
        j++
      }
      const raw = line.slice(i, j)
      let k = j
      while (k < n && (line[k] === ' ' || line[k] === '\t')) k++
      const isKey = line[k] === ':'
      tokens.push({ type: isKey ? 'key' : 'str', text: raw })
      i = j
      continue
    }
    if (c === '-' || (c >= '0' && c <= '9')) {
      let j = i
      while (j < n && /[\d.eE+-]/.test(line[j])) j++
      tokens.push({ type: 'num', text: line.slice(i, j) })
      i = j
      continue
    }
    if (line.slice(i, i + 4) === 'true') {
      tokens.push({ type: 'kw', text: 'true' })
      i += 4
      continue
    }
    if (line.slice(i, i + 5) === 'false') {
      tokens.push({ type: 'kw', text: 'false' })
      i += 5
      continue
    }
    if (line.slice(i, i + 4) === 'null') {
      tokens.push({ type: 'kw', text: 'null' })
      i += 4
      continue
    }
    tokens.push({ type: 'punc', text: c })
    i++
  }
  return tokens
}

function JsonLine({ lineNo, text }) {
  const tokens = tokenizeJsonLine(text)
  return (
    <div className="json-mail-row flex min-h-[1.35em] font-mono text-[12px] leading-relaxed sm:text-[13px]">
      <span className="json-mail-gutter w-9 shrink-0 select-none text-right text-[#6272a4]/80 sm:w-11" tabIndex={-1}>
        {lineNo}
      </span>
      <span className="json-mail-code flex-1 whitespace-pre-wrap break-all pl-3">
        {tokens.map((t, idx) => {
          let color = COL.punc
          if (t.type === 'str') color = COL.str
          if (t.type === 'key') color = COL.keyHint
          if (t.type === 'num') color = COL.num
          if (t.type === 'kw') color = COL.kw
          if (t.type === 'ws')
            return (
              <span key={idx} className="text-[#6272a4]/35">
                {t.text}
              </span>
            )
          return (
            <span key={idx} style={{ color }}>
              {t.text}
            </span>
          )
        })}
      </span>
    </div>
  )
}

function JsonBlock({ text }) {
  const lines = text.split('\n')
  return (
    <div className="relative">
      {lines.map((ln, i) => (
        <JsonLine key={i} lineNo={i + 1} text={ln} />
      ))}
      <span
        className="json-mail-caret pointer-events-none absolute bottom-1 right-2 inline-block h-4 w-2 bg-[#50fa7b] sm:right-4"
        aria-hidden
      />
    </div>
  )
}

function FloatingBracket({ ch, className, animClass, style }) {
  return (
    <span
      className={`pointer-events-none absolute font-mono font-bold text-[#ff79c6]/25 ${animClass ?? ''} ${className ?? ''}`}
      style={style}
      aria-hidden
    >
      {ch}
    </span>
  )
}

export default function JsonFileMailLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [fileId, setFileId] = useState('inbox')
  const [tick, setTick] = useState(0)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 3800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (tick === 0) return
    setToast('change detected · hot reload ✓')
    const u = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(u)
  }, [tick])

  const inboxData = useMemo(() => {
    const unread = emails.filter((e) => !e.read).length
    return {
      $schema: 'https://reality.infiniwa/mail/vibes.json',
      watched: true,
      encoding: 'UTF-8',
      unread_count: unread,
      messages: emails.map((e) => ({
        id: e.id,
        from: e.from,
        subject: e.subject,
        preview: e.preview,
        body: e.body,
        time: e.time,
        date: e.date,
        read: e.read,
        starred: e.starred,
        tag: e.tag,
        _cursor_here: selectedEmail?.id === e.id,
      })),
    }
  }, [selectedEmail?.id])

  const jsonText = useMemo(() => {
    if (fileId === 'inbox') return JSON.stringify(inboxData, null, 2)
    if (fileId === 'weather') return JSON.stringify(weather, null, 2)
    if (fileId === 'news') return JSON.stringify(news, null, 2)
    return JSON.stringify(stocks, null, 2)
  }, [fileId, inboxData])

  const activeFile = FILES.find((f) => f.id === fileId) ?? FILES[0]

  const onPickEmail = useCallback(
    (id) => {
      const em = emails.find((e) => e.id === id)
      if (em) {
        setSelectedEmail(em)
        setFileId('inbox')
      }
    },
    [setSelectedEmail],
  )

  return (
    <>
      <style>
        {`
          @keyframes json-mail-float-a {
            0%, 100% { transform: translate(0, 0) rotate(-8deg) scale(1); opacity: 0.2; }
            50% { transform: translate(18px, -24px) rotate(6deg) scale(1.15); opacity: 0.45; }
          }
          @keyframes json-mail-float-b {
            0%, 100% { transform: translate(0, 0) rotate(12deg); opacity: 0.15; }
            50% { transform: translate(-22px, 16px) rotate(-10deg); opacity: 0.4; }
          }
          @keyframes json-mail-float-c {
            0%, 100% { transform: translate(0, 0) scale(1); }
            40% { transform: translate(10px, 12px) scale(1.08); }
            70% { transform: translate(-6px, -8px) scale(0.95); }
          }
          @keyframes json-mail-caret-blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          @keyframes json-mail-scan {
            0% { transform: translateY(-100%); opacity: 0; }
            8% { opacity: 0.12; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          @keyframes json-mail-toast {
            from { transform: translateX(120%); opacity: 0; }
            12% { transform: translateX(0); opacity: 1; }
            88% { transform: translateX(0); opacity: 1; }
            to { transform: translateX(120%); opacity: 0; }
          }
          @keyframes json-mail-pulse-dot {
            0%, 100% { box-shadow: 0 0 0 0 rgba(80, 250, 123, 0.5); transform: scale(1); }
            50% { box-shadow: 0 0 0 10px rgba(80, 250, 123, 0); transform: scale(1.08); }
          }
          @keyframes json-mail-icon-bob {
            0%, 100% { transform: translateY(0) rotate(-3deg); }
            50% { transform: translateY(-6px) rotate(3deg); }
          }
          .json-mail-bracket-a { animation: json-mail-float-a 7s ease-in-out infinite; }
          .json-mail-bracket-b { animation: json-mail-float-b 9s ease-in-out infinite; animation-delay: -2s; }
          .json-mail-bracket-c { animation: json-mail-float-c 5.5s ease-in-out infinite; animation-delay: -1s; }
          .json-mail-bracket-d { animation: json-mail-float-a 8s ease-in-out infinite; animation-delay: -4s; }
          .json-mail-caret { animation: json-mail-caret-blink 1.05s step-end infinite; }
          .json-mail-scanline::after {
            content: '';
            position: absolute;
            left: 0; right: 0; top: 0;
            height: 28%;
            background: linear-gradient(180deg, transparent, rgba(139, 233, 253, 0.04), transparent);
            animation: json-mail-scan 6.5s linear infinite;
            pointer-events: none;
          }
        `}
      </style>
      <div
        className="json-mail-scanline relative flex min-h-dvh flex-col overflow-hidden pb-28 text-[#f8f8f2]"
        style={{
          background: 'linear-gradient(165deg, #0d0d14 0%, #1a1028 42%, #0f1620 100%)',
          fontFamily: 'var(--font-main)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <FloatingBracket ch="{" animClass="json-mail-bracket-a" className="left-[4%] top-[12%] text-6xl sm:text-8xl" />
          <FloatingBracket
            ch="}"
            animClass="json-mail-bracket-b"
            className="right-[8%] top-[22%] text-5xl sm:text-7xl"
            style={{ color: '#8be9fd33' }}
          />
          <FloatingBracket
            ch="["
            animClass="json-mail-bracket-c"
            className="bottom-[30%] left-[12%] text-4xl sm:text-6xl"
            style={{ color: '#50fa7b33' }}
          />
          <FloatingBracket ch="]" animClass="json-mail-bracket-d" className="right-[14%] bottom-[18%] text-6xl sm:text-8xl" />
        </div>

        <header className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#44475a]/60 bg-[#282a36]/90 px-3 py-2.5 backdrop-blur-md sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="hidden text-3xl sm:block"
              style={{ animation: 'json-mail-icon-bob 2.8s ease-in-out infinite' }}
              aria-hidden
            >
              📄
            </span>
            <div className="min-w-0">
              <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#6272a4]">json-watcher</p>
              <h1 className="m-0 truncate text-base font-bold tracking-tight text-[#f8f8f2] sm:text-lg">
                ~/reality/dump/<span style={{ color: activeFile.accent }}>{activeFile.name}</span>
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-sm gap-1.5 border-0 bg-[#21222c] font-mono text-[10px] text-[#50fa7b]">
              <span
                className="inline-block size-2 rounded-full bg-[#50fa7b]"
                style={{ animation: 'json-mail-pulse-dot 2s ease-out infinite' }}
              />
              watching
            </span>
            <button type="button" className="btn btn-ghost btn-sm text-[#bd93f9]" onClick={onSwitchPersona}>
              eject
            </button>
          </div>
        </header>

        {toast ? (
          <div
            className="pointer-events-none fixed right-3 top-20 z-[80] max-w-[min(90vw,280px)] rounded-lg border border-[#50fa7b]/40 bg-[#1e1f29]/95 px-3 py-2 font-mono text-xs text-[#50fa7b] shadow-lg backdrop-blur-sm"
            style={{ animation: 'json-mail-toast 2.2s ease-in-out forwards' }}
            role="status"
          >
            {toast}
          </div>
        ) : null}

        <div className="relative z-10 flex min-h-0 flex-1 flex-col lg:flex-row">
          <aside className="flex shrink-0 flex-col gap-1 border-[#44475a]/50 p-2 sm:p-3 lg:w-56 lg:border-r">
            <p className="m-0 px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#6272a4]">files</p>
            {FILES.map((f) => {
              const on = f.id === fileId
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFileId(f.id)}
                  className={`btn btn-sm h-auto min-h-10 w-full justify-start gap-2 rounded-lg border font-mono normal-case ${
                    on
                      ? 'border-[#bd93f9]/50 bg-[#44475a]/40 text-[#f8f8f2]'
                      : 'border-transparent bg-transparent text-[#6272a4] hover:border-[#6272a4]/30 hover:bg-[#282a36]/80 hover:text-[#f8f8f2]'
                  }`}
                >
                  <span>{f.emoji}</span>
                  <span className="truncate">{f.name}</span>
                </button>
              )
            })}
            {fileId === 'inbox' ? (
              <div className="mt-3 rounded-lg border border-dashed border-[#ff79c6]/35 bg-[#282a36]/50 p-2">
                <p className="m-0 mb-1.5 text-[10px] uppercase tracking-wider text-[#ff79c6]">jump to id</p>
                <div className="flex flex-wrap gap-1">
                  {emails.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => onPickEmail(e.id)}
                      className={`btn btn-xs h-7 min-h-7 rounded border-0 px-2 font-mono ${
                        selectedEmail?.id === e.id ? 'bg-[#ff79c6] text-[#1e1f29]' : 'bg-[#21222c] text-[#8be9fd]'
                      }`}
                    >
                      {e.id}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          <main className="relative min-h-[50vh] min-w-0 flex-1 overflow-auto p-2 sm:p-4">
            <div className="relative rounded-xl border border-[#44475a]/80 bg-[#1e1f29]/95 shadow-[0_0_40px_rgba(189,147,249,0.08)]">
              <div className="flex items-center gap-2 border-b border-[#44475a]/60 px-3 py-2 sm:px-4">
                <span className="text-lg" aria-hidden>
                  {activeFile.emoji}
                </span>
                <span className="font-mono text-sm" style={{ color: activeFile.accent }}>
                  {activeFile.name}
                </span>
                <span className="ml-auto hidden font-mono text-[10px] text-[#6272a4] sm:inline">
                  {jsonText.length.toLocaleString()} chars · valid JSON ✓
                </span>
              </div>
              <div className="max-h-[min(70vh,720px)] overflow-auto p-2 sm:p-4">
                <JsonBlock text={jsonText} />
              </div>
            </div>
            <p className="mt-3 text-center font-mono text-[10px] text-[#6272a4]">
              tip: your life is just nested objects with feelings ·{' '}
              <kbd className="rounded bg-[#282a36] px-1.5 py-0.5 text-[#bd93f9]">⌘</kbd> nothing happens
            </p>
          </main>
        </div>
      </div>
    </>
  )
}
