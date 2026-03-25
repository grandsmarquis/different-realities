import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const ALARM_HOUR = 6
const ALARM_MINUTE = 0

function nextAlarmDate(from = new Date()) {
  const t = new Date(from)
  t.setHours(ALARM_HOUR, ALARM_MINUTE, 0, 0)
  if (t.getTime() <= from.getTime()) {
    t.setDate(t.getDate() + 1)
  }
  return t
}

function formatCountdown(ms) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return { h, m, sec }
}

function LampGlow() {
  return (
    <div className="pointer-events-none absolute -top-24 left-1/2 h-[min(55vh,420px)] w-[min(140vw,520px)] -translate-x-1/2 rounded-full opacity-90 blur-[80px]" aria-hidden>
      <div
        className="bedtime-lamp-glow absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse 50% 45% at 50% 40%, rgba(251, 191, 36, 0.45) 0%, rgba(245, 158, 11, 0.12) 45%, transparent 70%)',
        }}
      />
    </div>
  )
}

function FloatingMotes() {
  const motes = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const seed = (i * 7919 + 3) % 1000
        return {
          left: `${(seed * 7) % 100}%`,
          top: `${(seed * 11 + i * 13) % 92}%`,
          delay: `${(seed % 14) * 0.25}s`,
          dur: `${10 + (seed % 8)}s`,
          size: 2 + (seed % 3),
        }
      }),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {motes.map((mo, i) => (
        <span
          key={i}
          className="bedtime-mote absolute rounded-full bg-amber-200/25"
          style={{
            left: mo.left,
            top: mo.top,
            width: mo.size,
            height: mo.size,
            '--bedtime-mote-dur': `${mo.dur}s`,
            '--bedtime-mote-delay': mo.delay,
          }}
        />
      ))}
    </div>
  )
}

function AlarmClockGraphic({ hourDeg, minuteDeg }) {
  return (
    <div className="relative mx-auto flex w-full max-w-[220px] flex-col items-center">
      <div className="bedtime-alarm-bells relative z-10" aria-hidden>
        <svg viewBox="0 0 200 200" className="h-48 w-48 drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bedtime-clock-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <radialGradient id="bedtime-clock-face" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="100%" stopColor="#fde68a" />
            </radialGradient>
          </defs>
          <path
            d="M38 48 L28 28 Q26 22 32 24 L48 38"
            fill="#92400e"
            stroke="#451a03"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M162 48 L172 28 Q174 22 168 24 L152 38"
            fill="#92400e"
            stroke="#451a03"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="100" cy="108" r="72" fill="url(#bedtime-clock-body)" stroke="#78350f" strokeWidth="3" />
          <circle cx="100" cy="108" r="58" fill="url(#bedtime-clock-face)" stroke="#b45309" strokeWidth="2" />
          {[12, 3, 6, 9].map(n => {
            const h = n === 12 ? 0 : n
            const ang = (h / 12) * Math.PI * 2 - Math.PI / 2
            const x = 100 + Math.cos(ang) * 48
            const y = 108 + Math.sin(ang) * 48
            return (
              <text
                key={n}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#422006"
                style={{ fontFamily: 'var(--font-main)', fontSize: '11px', fontWeight: 700 }}
              >
                {n}
              </text>
            )
          })}
          <circle cx="100" cy="108" r="4" fill="#451a03" />
          <line
            x1="100"
            y1="108"
            x2="100"
            y2="72"
            stroke="#451a03"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ transform: `rotate(${hourDeg}deg)`, transformOrigin: '100px 108px' }}
          />
          <line
            x1="100"
            y1="108"
            x2="100"
            y2="58"
            stroke="#92400e"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ transform: `rotate(${minuteDeg}deg)`, transformOrigin: '100px 108px' }}
          />
          <ellipse cx="88" cy="96" rx="5" ry="3" fill="#451a03" opacity="0.35" />
          <ellipse cx="112" cy="96" rx="5" ry="3" fill="#451a03" opacity="0.35" />
          <path d="M92 118 Q100 124 108 118" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
      </div>
      <p className="bedtime-hero-float -mt-1 text-center text-xs font-medium tracking-wide text-[var(--text2)]">
        Alarm armed · 6:00 AM · no negotiation
      </p>
    </div>
  )
}

export default function EarlyTomorrowLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const alarmAt = useMemo(() => nextAlarmDate(now), [now])
  const { h, m, sec } = formatCountdown(alarmAt.getTime() - now.getTime())

  const h12 = now.getHours() % 12
  const mins = now.getMinutes()
  const secs = now.getSeconds()
  const minuteDeg = mins * 6 + secs * 0.1 - 90
  const hourDeg = h12 * 30 + mins * 0.5 - 90

  const newsTape = useMemo(() => news.map(n => `${n.emoji} ${n.title}`).join('   ·   '), [])

  return (
    <div
      className="relative min-h-full overflow-x-hidden pb-6"
      style={{
        background:
          'radial-gradient(ellipse 100% 80% at 50% -20%, rgba(251, 191, 36, 0.14) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 100% 100%, rgba(251, 113, 133, 0.06) 0%, transparent 45%), linear-gradient(168deg, #120d0a 0%, #1a120e 40%, #0f0c09 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <LampGlow />
      <FloatingMotes />

      <header className="relative z-10 border-b border-[var(--border)]/60 bg-[var(--bg)]/35 px-4 py-5 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <AlarmClockGraphic hourDeg={hourDeg} minuteDeg={minuteDeg} />
            <div className="min-w-0 text-center sm:pt-4 sm:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--accent)]">Mission: survive the morning</p>
              <h1 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                It’s late. You promised tomorrow-you an early start.
              </h1>
              <p className="mt-2 max-w-lg text-sm text-[var(--text2)]">
                This is the &ldquo;one last tab&rdquo; dashboard. Everything below is real data — wrapped in warm lighting so your brain thinks it’s wholesome.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 lg:items-end">
            <div
              className="bedtime-card-yawn card w-full max-w-xs border border-[var(--border)]/70 bg-[var(--card)]/85 p-4 text-center shadow-lg backdrop-blur-sm"
              style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.08)' }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text2)]">Sleep budget remaining</p>
              <p className="mt-2 font-mono text-3xl font-bold tabular-nums text-[var(--accent)]">
                {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(sec).padStart(2, '0')}
              </p>
              <p className="mt-1 text-xs text-[var(--text2)]">until the 6:00 AM alarm · hydrate · phone across the room (lol)</p>
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm text-[var(--text2)] hover:bg-[var(--accent)]/10 hover:text-[var(--text)]"
              onClick={onSwitchPersona}
            >
              I surrender — other personas
            </button>
          </div>
        </div>
      </header>

      <div
        className="relative z-10 overflow-hidden border-b border-[var(--border)]/40 bg-[var(--bg2)]/30 py-2"
        style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}
      >
        <div className="bedtime-news-marquee-inner flex w-max gap-16 whitespace-nowrap text-sm text-[var(--text2)]">
          <span>{newsTape}</span>
          <span aria-hidden>{newsTape}</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Inbox — &ldquo;I’ll just skim&rdquo; edition
            </h2>
            <p className="mt-1 text-sm text-[var(--text2)]">Tap an email. Future-you will pretend this never happened.</p>
          </div>
          <span className="badge border-[var(--border)] bg-[var(--card)] text-[var(--accent2)]">guilty pleasure</span>
        </div>

        <ul className="space-y-3">
          {emails.map((email, i) => (
            <li key={email.id} className="bedtime-card-yawn" style={{ animationDelay: `${i * 0.12}s` }}>
              <button
                type="button"
                onClick={() => setSelectedEmail(email)}
                className="card card-border group w-full border-[var(--border)]/70 bg-[var(--card)]/70 p-4 text-left backdrop-blur-sm transition hover:border-[var(--accent)]/45 hover:shadow-[0_0_24px_rgba(245,158,11,0.12)]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl opacity-90 transition group-hover:scale-110" aria-hidden>
                    {email.from.avatar}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[var(--text)]">{email.subject}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-[var(--text2)]">{email.preview}</p>
                  </div>
                  <span className="badge badge-ghost badge-sm shrink-0 border-[var(--border)]/50 text-[var(--text2)]">yawn…</span>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="bedtime-card-yawn card border-[var(--border)]/60 bg-gradient-to-b from-[var(--card)]/90 to-[var(--bg2)]/50 p-5 backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">Weather when you surface</p>
            <p className="mt-3 text-3xl">
              {weather.icon} {weather.temp}°C
            </p>
            <p className="mt-1 text-sm text-[var(--text2)]">{weather.condition}</p>
            <p className="mt-3 text-xs italic text-[var(--text2)]/80">Lay out clothes now or debate it half-asleep at dawn.</p>
          </div>

          <div className="bedtime-card-yawn card border-[var(--border)]/60 bg-gradient-to-b from-[var(--card)]/90 to-[var(--bg2)]/50 p-5 backdrop-blur-sm" style={{ animationDelay: '0.15s' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent2)]">Brain snacks (news)</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text)]/95">
              {news.slice(0, 3).map(n => (
                <li key={n.title} className="flex gap-2 border-l-2 border-[var(--accent)]/40 pl-2">
                  <span aria-hidden>{n.emoji}</span>
                  <span className="leading-snug">{n.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bedtime-card-yawn card border-[var(--border)]/60 bg-gradient-to-b from-[var(--card)]/90 to-[var(--bg2)]/50 p-5 backdrop-blur-sm" style={{ animationDelay: '0.3s' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text2)]">Stocks (definitely urgent at 1am)</p>
            <div className="mt-3 space-y-2 font-mono text-sm">
              {stocks.map(s => (
                <p key={s.ticker} className="flex justify-between gap-2 border-b border-[var(--border)]/30 pb-2 last:border-0">
                  <span className="text-[var(--text)]">{s.ticker}</span>
                  <span className={s.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                    {s.changePct >= 0 ? '+' : ''}
                    {s.changePct.toFixed(1)}%
                  </span>
                </p>
              ))}
            </div>
            <p className="mt-3 text-xs text-[var(--text2)]/75">Close this tab. The market will still exist after REM.</p>
          </div>
        </div>

        <div className="bedtime-hero-float mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-[var(--text2)]">
          <span className="text-2xl" aria-hidden>
            🛏️
          </span>
          <span className="max-w-md">
            Pro tip: brightness down, blue light filter up, and remember — the best notification is no notification. Good luck, legend.
          </span>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-md"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="bedtime-modal-soft max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_0_60px_rgba(245,158,11,0.12)]"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bedtime-email-title"
          >
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--accent)]">Fine, read it</p>
            <h2 id="bedtime-email-title" className="mt-3 text-center text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-1 text-center text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]/90">{selectedEmail.body}</pre>
            <button
              type="button"
              className="btn btn-block mt-6 border-0 bg-[var(--accent)] text-[#1c1008] hover:bg-[var(--accent)]/90"
              onClick={() => setSelectedEmail(null)}
            >
              OK OK · closing · going to sleep (narrator: they did not)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
