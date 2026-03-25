import { useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'
import { isVowelChar, vowelizeText } from '../utils/vowelize'

const GLYPH_CHARS = ['▢', '●', '▲', '◆', '■', '▮', '▯', '✦', '◍', '⬣', '▦', '▤']
const DIGIT_DOTS = ['•', '·', 'o', 'O', '●']

function sampleChars(str, maxLen) {
  const chars = [...String(str ?? '')]
  if (chars.length === 0) return []
  if (chars.length <= maxLen) return chars
  const step = Math.max(1, Math.floor(chars.length / maxLen))
  const out = []
  for (let i = 0; i < chars.length && out.length < maxLen; i += step) out.push(chars[i])
  return out
}

function pickColor(idx, customPalette) {
  const palette = customPalette ?? ['var(--accent)', 'var(--accent2)', 'var(--accent3)', 'rgba(56,189,248,1)', 'rgba(239,68,68,1)']
  return palette[idx % palette.length]
}

function getVowelChars(str) {
  const s = String(str ?? '')
  const out = []
  for (const ch of s) {
    if (/\p{L}/u.test(ch) && isVowelChar(ch)) out.push(ch)
  }
  return out
}

function getLetterChars(str) {
  const s = String(str ?? '')
  const out = []
  for (const ch of s) {
    if (/\p{L}/u.test(ch)) out.push(ch)
  }
  return out
}

function GlyphLine({ text, maxLen = 18, className = '', srLabel, palette }) {
  const sampled = useMemo(() => sampleChars(text, maxLen), [text, maxLen])
  return (
    <span className={`iltr-glyphline inline-flex flex-wrap items-center gap-[0.22rem] ${className}`}>
      {srLabel ? <span className="sr-only">{srLabel}</span> : null}
      {sampled.map((ch, i) => {
        const cp = ch.codePointAt(0) ?? 0
        const glyph = GLYPH_CHARS[(cp + i * 13) % GLYPH_CHARS.length]
        const color = pickColor(cp + i * 17, palette)
        return (
          <span
            key={`${cp}-${i}`}
            className="iltr-glyph"
            style={{ color, animationDelay: `${-i * 0.07}s` }}
            aria-hidden="true"
            title="Symbol hint"
          >
            {glyph}
          </span>
        )
      })}
    </span>
  )
}

function DateDots({ text }) {
  const digits = String(text ?? '').match(/\d/g) ?? []
  const d = digits.slice(0, 12)
  return (
    <span className="iltr-dots inline-flex flex-wrap items-center gap-1" aria-hidden="true">
      {d.length === 0 ? (
        <span className="inline-block text-[0.95em] opacity-60">•</span>
      ) : (
        d.map((ch, i) => {
          const n = Number(ch)
          const dot = DIGIT_DOTS[(n + i) % DIGIT_DOTS.length]
          return (
            <span
              key={`${ch}-${i}`}
              className="iltr-dot"
              style={{ animationDelay: `${-i * 0.1}s` }}
            >
              {dot}
            </span>
          )
        })
      )}
    </span>
  )
}

function VowelBeads({ text, maxBeads = 10 }) {
  const vowels = useMemo(() => getVowelChars(text).slice(0, maxBeads), [text, maxBeads])
  return (
    <div className="iltr-beads flex flex-wrap items-center gap-2" aria-hidden="true">
      {vowels.length === 0 ? <span className="opacity-70">…</span> : null}
      {vowels.map((v, i) => {
        const base = String(v).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
        const color =
          base === 'a'
            ? 'var(--accent)'
            : base === 'e'
              ? 'var(--accent2)'
              : base === 'i'
                ? 'rgba(167,139,250,1)'
                : base === 'o'
                  ? 'rgba(56,189,248,1)'
                  : base === 'u'
                    ? 'var(--accent3)'
                    : 'rgba(244,114,182,1)'
        return (
          <span
            key={`${v}-${i}`}
            className="iltr-bead"
            style={{ background: color, animationDelay: `${-i * 0.11}s` }}
            title="Vowel sound"
          />
        )
      })}
    </div>
  )
}

function VowelNoiseMeter({ text }) {
  const meter = useMemo(() => {
    const letters = getLetterChars(text).length
    if (letters === 0) return { vowelPct: 0, consonantPct: 0 }
    const vowels = getVowelChars(text).length
    const vowelPct = Math.round((vowels / letters) * 100)
    return { vowelPct, consonantPct: Math.max(0, 100 - vowelPct) }
  }, [text])

  return (
    <div className="iltr-meter">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold tracking-widest opacity-75">SOUND MAP</span>
        <span className="text-[11px] font-mono opacity-80">{meter.vowelPct}% vowels</span>
      </div>
      <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-base-content/10">
        <div className="h-full rounded-full" style={{ width: `${meter.vowelPct}%`, background: 'linear-gradient(90deg,var(--accent),var(--accent2))' }} />
        <div
          className="relative -top-3 h-3 rounded-full opacity-70"
          style={{
            marginLeft: `${meter.vowelPct}%`,
            width: `${Math.max(0, 100 - meter.vowelPct)}%`,
            background: 'linear-gradient(90deg,rgba(16,185,129,0.9),rgba(56,189,248,0.85))',
          }}
        />
      </div>
    </div>
  )
}

function conditionGlyphSeed(condition) {
  const c = String(condition ?? '')
  let s = 0
  for (const ch of c) s = (s + (ch.codePointAt(0) ?? 0) * 17) % 997
  return s
}

function NewsCategoryIcon({ category }) {
  const map = {
    Sport: '🏟️',
    Tech: '🧠',
    Climate: '🌍',
    Culture: '🎭',
    Economy: '🏭',
  }
  return map[category] ?? '📰'
}

export default function YouDontKnowHowToReadLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [coachMode, setCoachMode] = useState(true)
  const [teacherOverride, setTeacherOverride] = useState(false)

  const unreadCount = useMemo(() => emails.filter((e) => !e.read).length, [])

  const vibe = useMemo(() => {
    // A tiny “difficulty” gauge: more letters + fewer vowels => harder to “guess by sounds”.
    const all = emails
      .slice(0, 14)
      .map((e) => `${e.subject} ${e.preview}`)
      .join(' ')
    const letters = getLetterChars(all).length
    const vowels = getVowelChars(all).length
    if (letters === 0) return { vowelPct: 0, difficulty: 100 }
    const vowelPct = Math.round((vowels / letters) * 100)
    const difficulty = Math.max(0, Math.min(100, Math.round(100 - vowelPct)))
    return { vowelPct, difficulty }
  }, [])

  const weatherSeed = useMemo(() => conditionGlyphSeed(weather.condition), [])

  return (
    <div className="iltr-root relative min-h-dvh overflow-x-hidden pb-28">
      <style>{`
        .iltr-root{
          background:
            radial-gradient(ellipse at 10% 10%, rgba(124,58,237,0.10), transparent 45%),
            radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.12), transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.12), transparent 55%),
            linear-gradient(180deg, var(--bg), var(--bg2));
          color: var(--text);
          font-family: var(--font-main), system-ui, sans-serif;
          background-size: 100% 100%;
        }
        .iltr-paper-tear{
          background:
            repeating-linear-gradient(120deg, rgba(0,0,0,0.05), rgba(0,0,0,0.05) 2px, transparent 2px, transparent 10px);
          mix-blend-mode: multiply;
          opacity: 0.12;
          filter: contrast(1.2);
        }
        .iltr-eraser{
          filter: drop-shadow(0 16px 30px rgba(0,0,0,0.18));
          animation: iltr-eraser-float 5.8s ease-in-out infinite;
        }
        @keyframes iltr-eraser-float{
          0%,100%{ transform: translate3d(0,0,0) rotate(-8deg); opacity:0.55; }
          50%{ transform: translate3d(18px,-16px,0) rotate(7deg); opacity:0.85; }
        }
        .iltr-glyph{
          font-size: 1.1rem;
          line-height: 1;
          opacity: 0.98;
          text-shadow: 0 0 18px rgba(124,58,237,0.12);
          transform: translateY(0) scale(1);
          animation: iltr-glyph-bop 2.1s ease-in-out infinite;
        }
        @keyframes iltr-glyph-bop{
          0%,100%{ transform: translateY(0) scale(1); }
          50%{ transform: translateY(-3px) scale(1.06); }
        }
        .iltr-dots .iltr-dot{
          display:inline-block;
          transform: translateY(0);
          animation: iltr-dot-bounce 1.9s ease-in-out infinite;
          opacity:0.85;
          color: var(--text2);
          font-size: 1.05em;
        }
        @keyframes iltr-dot-bounce{
          0%,100%{ transform: translateY(0); }
          50%{ transform: translateY(-4px); }
        }
        .iltr-bead{
          width: 14px;
          height: 14px;
          border-radius: 999px;
          box-shadow: 0 0 0 4px rgba(255,255,255,0.35), 0 10px 22px rgba(0,0,0,0.12);
          animation: iltr-bead-pop 2.3s ease-in-out infinite;
        }
        @keyframes iltr-bead-pop{
          0%,100%{ transform: translateY(0) scale(1); opacity:0.78; }
          50%{ transform: translateY(-5px) scale(1.12); opacity:1; }
        }
        .iltr-card{
          background: var(--card);
          border: 1px solid var(--border);
        }
        .iltr-card:hover{
          transform: translateY(-2px);
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="iltr-paper-tear absolute inset-0" aria-hidden="true" />
        <div className="iltr-eraser absolute right-6 top-24 text-5xl md:text-6xl opacity-60" aria-hidden="true">
          🧽
        </div>
        <div className="absolute left-1/2 top-10 -translate-x-1/2 opacity-30 text-6xl md:text-7xl" aria-hidden="true">
          🧠
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-6 md:px-6 md:py-10">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="text-5xl md:text-6xl select-none">🧩</div>
              <div>
                <h1
                  className="m-0 text-4xl font-black leading-tight md:text-5xl"
                  style={{ fontFamily: 'var(--font-display), cursive', color: 'var(--accent)' }}
                >
                  Shape Reading™
                </h1>
                <p className="mt-1 text-sm opacity-85">
                  {unreadCount} unread messages. Tap a tile to decode the vibe.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="badge badge-lg bg-base-100/70 border border-base-content/10 text-base-content/90">
                Difficulty: <span className="font-semibold tabular-nums">{vibe.difficulty}</span>/100
              </div>
              <div className="badge badge-lg bg-base-100/70 border border-base-content/10 text-base-content/90">
                Sound bias: <span className="font-semibold tabular-nums">{vibe.vowelPct}% vowels</span>
              </div>
              <div className="badge badge-lg bg-base-100/70 border border-base-content/10 text-base-content/90">
                Weather seed: <span className="font-semibold tabular-nums">{weatherSeed}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
            <div className="join w-full sm:w-auto">
              <button
                type="button"
                className={`btn join-item ${coachMode ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setCoachMode(true)}
              >
                Coach
              </button>
              <button
                type="button"
                className={`btn join-item ${!coachMode ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setCoachMode(false)}
              >
                Bare hints
              </button>
            </div>

            <button type="button" className="btn btn-accent w-full sm:w-auto" onClick={onSwitchPersona}>
              Change persona
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <main className="lg:col-span-7 xl:col-span-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display), cursive', color: 'var(--accent)' }}>
                Inbox glyph tiles
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-sm bg-base-100/70 border border-base-content/10 text-base-content/80">
                  Hint: colors = sound clues
                </span>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {emails.map((email) => {
                const on = selectedEmail?.id === email.id
                return (
                  <li key={email.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(email)}
                      className={`iltr-card card card-border border border-base-content/10 bg-base-100/40 transition-all duration-200 hover:shadow-xl ${
                        on ? 'ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-transparent' : 'shadow-sm'
                      }`}
                    >
                      <div className="card-body gap-3 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="text-3xl leading-none" aria-hidden="true">
                            {email.from.avatar}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {!email.read ? (
                              <span className="badge badge-sm border-0 bg-primary/90 text-primary-content">
                                NEW!
                              </span>
                            ) : (
                              <span className="badge badge-sm badge-neutral/80 bg-base-200/50 border border-base-content/10">
                                read
                              </span>
                            )}
                            <span className="opacity-80">
                              <DateDots text={email.date} />
                            </span>
                          </div>
                        </div>

                        <div>
                          <GlyphLine
                            text={email.subject}
                            maxLen={16}
                            className="font-bold"
                            srLabel={`Subject: ${email.subject}`}
                          />
                          {coachMode ? (
                            <div className="mt-2 flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <GlyphLine text={email.preview} maxLen={13} srLabel={`Preview: ${email.preview}`} />
                              </div>
                              <div className="shrink-0">
                                <VowelBeads text={email.subject} maxBeads={7} />
                              </div>
                            </div>
                          ) : (
                            <div className="mt-2 opacity-80">
                              <GlyphLine text={email.preview} maxLen={12} srLabel={`Preview: ${email.preview}`} />
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </main>

          <aside className="lg:col-span-5 xl:col-span-4 space-y-6">
            <section className="card border border-base-content/10 bg-base-100/35 backdrop-blur-md">
              <div className="card-body gap-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display), cursive', color: 'var(--accent2)' }}>
                    Weather sounds
                  </h2>
                  <div className="text-4xl" aria-hidden="true">
                    {weather.icon}
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-6xl font-black leading-none tabular-nums" style={{ color: 'var(--accent)' }}>
                      {weather.temp}°C
                    </div>
                    <div className="mt-2">
                      <GlyphLine text={weather.condition} maxLen={13} srLabel={`Weather condition: ${weather.condition}`} />
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <VowelNoiseMeter text={weather.condition} />
                  </div>
                </div>

                <ul className="mt-2 flex flex-wrap gap-2 border-t border-base-content/10 pt-3">
                  {weather.forecast.map((f) => (
                    <li key={f.day} className="badge badge-lg bg-base-100/60 border border-base-content/10 py-3">
                      <span className="mr-1" aria-hidden="true">
                        {f.icon}
                      </span>
                      <span className="font-bold tabular-nums">{f.high}°</span>
                      <span className="opacity-70">/</span>
                      <span className="opacity-80 tabular-nums">{f.low}°</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="card border border-base-content/10 bg-base-100/35 backdrop-blur-md">
              <div className="card-body gap-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display), cursive', color: 'var(--accent)' }}>
                    Market pulses
                  </h2>
                  <span className="text-3xl" aria-hidden="true">
                    💹
                  </span>
                </div>
                <ul className="space-y-3">
                  {stocks.map((s) => {
                    const up = s.changePct >= 0
                    const tone = up ? 'text-success' : 'text-error'
                    return (
                      <li key={s.ticker}>
                        <button
                          type="button"
                          className="w-full rounded-box border border-base-content/10 bg-base-100/50 px-3 py-3 text-left transition-all hover:shadow-lg"
                          onClick={() => {
                            // micro-joy: clicking “jiggles” by switching coil mode
                            setTeacherOverride((v) => !v)
                          }}
                          aria-label={`Stock ${s.ticker}`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <div className="text-2xl" aria-hidden="true">
                                  {up ? '🟢' : '🔴'}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <GlyphLine text={s.ticker} maxLen={8} srLabel={`Ticker: ${s.ticker}`} />
                                  </div>
                                  <div className="text-xs opacity-75">{s.name}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <MiniSpark series={s.series} stroke={up ? 'var(--accent3)' : 'rgba(239,68,68,1)'} className="hidden sm:block" />
                              <div className="text-right">
                                <div className="font-bold tabular-nums">
                                  {s.currency}
                                  {s.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </div>
                                <div className={`text-xs font-semibold ${tone}`}>
                                  {up ? '▲' : '▼'} {s.changePct >= 0 ? '+' : ''}
                                  {s.changePct.toFixed(2)}%
                                </div>
                              </div>
                            </div>
                          </div>
                          {teacherOverride ? (
                            <div className="mt-2 text-[10px] opacity-70">
                              Tap “teacher override” is ON. (Your brain gets a cheat sheet.) Click again to calm down.
                            </div>
                          ) : null}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>

            <section className="card border border-base-content/10 bg-base-100/35 backdrop-blur-md">
              <div className="card-body gap-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display), cursive', color: 'var(--accent2)' }}>
                    Headline confetti
                  </h2>
                  <span className="text-3xl" aria-hidden="true">
                    📰
                  </span>
                </div>
                <ul className="space-y-3">
                  {news.map((n) => (
                    <li key={n.id}>
                      <div className="rounded-box border border-base-content/10 bg-base-100/50 p-3 transition-all hover:shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl" aria-hidden="true">
                              {n.emoji}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold uppercase tracking-widest opacity-70">
                                <span className="mr-2" aria-hidden="true">
                                  <NewsCategoryIcon category={n.category} />
                                </span>
                                {n.category}
                              </div>
                              <GlyphLine text={n.title} maxLen={14} srLabel={`News title: ${n.title}`} />
                              <div className="mt-1 opacity-75 text-[11px]">
                                <GlyphLine text={`${n.source} ${n.time}`} maxLen={10} srLabel={`Source: ${n.source} time: ${n.time}`} />
                              </div>
                            </div>
                          </div>
                          <div className="hidden sm:block">
                            <DateDots text={n.time} />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-base-300/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="iltr-modal-title"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-box border border-base-content/10 bg-base-100/70 backdrop-blur-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-base-content/10 bg-base-100/50 px-5 py-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {selectedEmail.from.avatar}
                  </span>
                  <div className="min-w-0">
                    <h3 id="iltr-modal-title" className="m-0 text-lg font-bold" style={{ fontFamily: 'var(--font-display), cursive', color: 'var(--accent)' }}>
                      Teacher decode tape
                    </h3>
                    <div className="text-xs opacity-70">
                      <span className="sr-only">From</span> {selectedEmail.from.name} · {selectedEmail.date}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <GlyphLine text={selectedEmail.subject} maxLen={24} srLabel={`Subject: ${selectedEmail.subject}`} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={() => setTeacherOverride((v) => !v)}
                >
                  {teacherOverride ? 'Teacher override: ON' : 'Teacher override: OFF'}
                </button>
                <button type="button" className="btn btn-sm btn-circle" onClick={() => setSelectedEmail(null)} aria-label="Close modal">
                  ✕
                </button>
              </div>
            </div>

            <div className="px-5 py-5">
              {coachMode ? (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="w-full sm:max-w-[360px]">
                    <VowelNoiseMeter text={`${selectedEmail.subject} ${selectedEmail.preview}`} />
                    <div className="mt-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-semibold tracking-widest opacity-75">VOWEL BEADS</span>
                        <span className="text-[11px] font-mono opacity-80">
                          {getVowelChars(selectedEmail.subject).length} vowel hits
                        </span>
                      </div>
                      <div className="mt-2">
                        <VowelBeads text={selectedEmail.subject} maxBeads={14} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="rounded-box border border-base-content/10 bg-base-100/50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold tracking-widest opacity-70">GUESS PROMPT</div>
                          <div className="text-sm mt-1 font-bold" style={{ fontFamily: 'var(--font-display), cursive' }}>
                            “What do the shapes want?”
                          </div>
                        </div>
                        <div className="text-4xl" aria-hidden="true">
                          {selectedEmail.read ? '😌' : '🧠'}
                        </div>
                      </div>
                      <div className="mt-3">
                        <GlyphLine text={`${selectedEmail.subject} ${selectedEmail.preview}`} maxLen={30} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-bold opacity-85" style={{ fontFamily: 'var(--font-display), cursive' }}>
                    Message body (glyph form)
                  </h4>
                  <span className="text-[11px] opacity-70">
                    {teacherOverride ? 'Cheat view active' : 'Letters stay hidden'}
                  </span>
                </div>

                <div className="mt-3 rounded-box border border-base-content/10 bg-base-100/55 p-4">
                  {teacherOverride ? (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {selectedEmail.body}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="text-xs opacity-70">
                        Your brain maps strokes to sounds. Here’s the rhythm:
                      </div>
                      <div className="iltr-body-glyphs">
                        {sampleChars(selectedEmail.body, 54).map((ch, i) => {
                          const cp = ch.codePointAt(0) ?? 0
                          const glyph = GLYPH_CHARS[(cp + i * 9) % GLYPH_CHARS.length]
                          const color = pickColor(cp + i * 19)
                          return (
                            <span
                              key={`${cp}-${i}`}
                              className="iltr-glyph"
                              style={{ color, fontSize: i % 7 === 0 ? '1.3rem' : '1.05rem', animationDelay: `${-i * 0.045}s` }}
                              aria-hidden="true"
                            >
                              {glyph}
                            </span>
                          )
                        })}
                      </div>

                      <div className="mt-3">
                        <div className="text-xs font-semibold tracking-widest opacity-70">VOWEL SNAPSHOT</div>
                        <div className="mt-2">
                          <VowelBeads
                            text={vowelizeText(selectedEmail.body)}
                            maxBeads={16}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="sr-only">{selectedEmail.body}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

