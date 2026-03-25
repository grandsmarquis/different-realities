import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'

const arcLabel = (t) =>
  ({
    work: 'MAIN QUEST',
    personal: 'SIDE STORY',
    finance: 'LOOT DROP',
    promo: 'SPONSOR SEGMENT',
    newsletter: 'OFFICIAL BROADCAST',
    social: 'FANDOM HUB',
    dev: 'PATCH NOTES',
    shopping: 'GACHA SHOP',
    travel: 'FIELD TRIP',
  }[t] || 'EXTRA')

function SpeedLines() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]" aria-hidden>
      <defs>
        <linearGradient id="otaku-sl" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent2)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent2)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[...Array(18)].map((_, i) => (
        <line
          key={i}
          x1={`${-20 + i * 12}%`}
          y1="100%"
          x2={`${30 + i * 8}%`}
          y2="0%"
          stroke="url(#otaku-sl)"
          strokeWidth="1.2"
        />
      ))}
    </svg>
  )
}

function Petals({ reduced }) {
  if (reduced) return null
  const petals = ['🌸', '✨', '⭐', '🌸', '✨', '🎀', '⭐', '🌸']
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="otaku-petal absolute text-lg opacity-60"
          style={{
            left: `${8 + i * 11}%`,
            animationDelay: `${i * 1.4}s`,
            animationDuration: `${14 + i * 2}s`,
          }}
        >
          {p}
        </span>
      ))}
    </div>
  )
}

function EmailCard({ email, onOpen }) {
  const hot = !email.read
  return (
    <button
      type="button"
      onClick={() => onOpen(email)}
      className={`otaku-email-card group relative w-full overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-300 md:rounded-2xl md:p-5 ${
        hot ? 'otaku-hud-pulse border-[var(--accent)]' : 'border-[var(--border)] hover:border-[var(--accent2)]/60'
      }`}
      style={{
        background: hot
          ? 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, var(--bg2)) 0%, var(--card) 55%)'
          : 'linear-gradient(160deg, var(--card) 0%, color-mix(in srgb, var(--bg2) 70%, transparent) 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full opacity-25 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ background: hot ? 'var(--accent)' : 'var(--accent2)' }}
      />
      <div className="relative flex gap-3">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-lg border-2 text-2xl shadow-lg md:size-16 md:text-3xl"
          style={{
            borderColor: 'var(--accent2)',
            background: 'linear-gradient(145deg, var(--bg2), var(--bg))',
            boxShadow: '0 0 16px color-mix(in srgb, var(--accent2) 25%, transparent)',
          }}
        >
          {email.from.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--accent2)]">{arcLabel(email.tag)}</p>
          <p className="mt-1 truncate text-sm font-bold text-[var(--text)] md:text-base" style={{ fontFamily: 'var(--font-main)' }}>
            {email.subject}
          </p>
          <p className="mt-0.5 truncate text-xs text-[var(--text2)]">{email.from.name}</p>
          {hot && (
            <span className="badge badge-sm mt-2 border-0 font-bold uppercase tracking-wider" style={{ background: 'var(--accent)', color: '#fff' }}>
              NEW EP
            </span>
          )}
        </div>
      </div>
      <p className="relative mt-3 line-clamp-2 text-xs leading-relaxed text-[var(--text2)]">{email.preview}</p>
    </button>
  )
}

function WeatherHud({ reduced }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border-2 border-[var(--border)] p-4 md:p-5"
      style={{
        background: 'linear-gradient(165deg, color-mix(in srgb, var(--accent2) 12%, var(--bg2)) 0%, var(--card) 100%)',
        boxShadow: '0 0 24px color-mix(in srgb, var(--accent2) 15%, transparent)',
      }}
    >
      {!reduced && (
        <div
          className="otaku-radar-sweep pointer-events-none absolute left-1/2 top-1/2 size-[140%] opacity-20"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, transparent 300deg, var(--accent2) 330deg, transparent 360deg)`,
          }}
          aria-hidden
        />
      )}
      <div className="relative z-10">
        <p className="font-mono text-[10px] font-bold tracking-[0.35em] text-[var(--accent3)]" style={{ fontFamily: 'var(--font-display)' }}>
          TODAY&apos;S MOOD · 今日の空
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <span className="text-5xl drop-shadow-[0_0_12px_rgba(0,245,255,0.4)]">{weather.icon}</span>
          <div>
            <p className="text-3xl font-black tabular-nums text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
              {weather.temp}°
            </p>
            <p className="text-sm font-medium text-[var(--text2)]">
              {weather.city} · {weather.condition}
            </p>
            <p className="text-xs text-[var(--accent2)]">feels {weather.feels_like}° · wind {weather.wind} km/h</p>
          </div>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {weather.forecast.map((d) => (
            <li
              key={d.day}
              className="badge badge-lg gap-1 border border-[var(--border)] bg-base-300/30 font-mono text-[var(--text)]"
            >
              {d.day} {d.icon} {d.high}°
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function StockBossCard({ s }) {
  const up = s.changePct >= 0
  const bar = Math.min(100, Math.max(8, 52 + s.changePct * 6))
  const stroke = up ? 'var(--accent2)' : 'var(--accent)'
  return (
    <div
      className="rounded-xl border-2 border-[var(--border)] p-3 md:rounded-2xl md:p-4"
      style={{
        background: 'linear-gradient(180deg, var(--card) 0%, color-mix(in srgb, var(--bg2) 90%, transparent) 100%)',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-mono text-lg font-black tracking-tight text-[var(--accent2)]" style={{ fontFamily: 'var(--font-display)' }}>
            {s.ticker}
          </p>
          <p className="truncate text-[11px] text-[var(--text2)]">{s.name}</p>
        </div>
        <MiniSpark series={s.series} stroke={stroke} />
      </div>
      <p className="mt-2 font-mono text-sm font-bold tabular-nums" style={{ color: up ? '#4ade80' : '#fb7185' }}>
        {s.currency}
        {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}{' '}
        <span className="text-xs">
          ({up ? '▲' : '▼'}
          {Math.abs(s.changePct).toFixed(2)}%)
        </span>
      </p>
      <div className="mt-2">
        <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-[var(--text2)]">
          <span>BOSS HP</span>
          <span>{up ? 'CRIT!' : 'DOT…'}</span>
        </div>
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-base-300/40">
          <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${bar}%`, background: stroke, boxShadow: `0 0 10px ${stroke}` }} />
        </div>
      </div>
    </div>
  )
}

function EmailModal({ email, onClose }) {
  if (!email) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      style={{ background: 'color-mix(in srgb, #050308 75%, transparent)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative flex max-h-[min(92dvh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border-2 border-[var(--accent2)] shadow-2xl sm:rounded-3xl"
        style={{
          background: 'linear-gradient(180deg, #12081f 0%, #0a0612 45%, #050308 100%)',
          boxShadow: '0 0 40px color-mix(in srgb, var(--accent2) 35%, transparent), 0 0 80px color-mix(in srgb, var(--accent) 15%, transparent)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="otaku-mail-title"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--accent2) 2px, var(--accent2) 3px)',
        }} aria-hidden />
        <div className="relative flex items-start justify-between gap-3 border-b border-[var(--border)] p-4 md:p-6">
          <div className="flex min-w-0 flex-1 gap-3">
            <span className="text-4xl md:text-5xl">{email.from.avatar}</span>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-bold text-[var(--accent3)]">{arcLabel(email.tag)}</p>
              <h2 id="otaku-mail-title" className="mt-1 text-lg font-bold leading-snug text-[var(--text)] md:text-xl" style={{ fontFamily: 'var(--font-main)' }}>
                {email.subject}
              </h2>
              <p className="mt-1 text-xs text-[var(--text2)]">
                {email.from.name} · {email.date} · {email.time}
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-sm btn-circle btn-ghost shrink-0 text-[var(--accent2)]" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="relative min-h-0 flex-1 overflow-y-auto p-4 text-sm leading-relaxed whitespace-pre-wrap text-[var(--text)] md:p-6">
          {email.body}
        </div>
        <div
          className="relative border-t-2 px-3 py-2"
          style={{
            borderColor: 'var(--accent3)',
            background: 'linear-gradient(90deg, #1a0508 0%, #2d0a12 50%, #1a0508 100%)',
          }}
        >
          <p className="otaku-subtitle-bar text-center font-bold text-[var(--accent3)]" style={{ fontFamily: 'var(--font-main)', fontSize: '0.72rem' }}>
            【字幕】{email.subject.slice(0, 42)}
            {email.subject.length > 42 ? '…' : ''} · 感動のメール回 · 次回予告: 返信するぜ！
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AnimeOtakuModernLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const tickerItems = useMemo(() => {
    const parts = news.map((n) => `${n.emoji} ${n.title}`)
    return [...parts, ...parts]
  }, [])

  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      className="otaku-modern-root relative min-h-dvh overflow-x-hidden text-[var(--text)]"
      style={{ fontFamily: 'var(--font-main)', background: 'var(--bg)' }}
    >
      <div
        className={`pointer-events-none fixed inset-0 z-0 ${reducedMotion ? '' : 'otaku-bg-grid-anim'}`}
        style={{
          backgroundColor: 'var(--bg)',
          opacity: reducedMotion ? 0.35 : 0.55,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 55%), radial-gradient(ellipse 70% 50% at 100% 80%, color-mix(in srgb, var(--accent2) 22%, transparent), transparent 50%)',
        }}
        aria-hidden
      />
      {!reducedMotion && <SpeedLines />}
      <Petals reduced={reducedMotion} />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <header className="shrink-0 border-b border-[var(--border)] px-4 py-5 md:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div
                className={`relative flex size-[3.25rem] shrink-0 items-center justify-center rounded-2xl border-2 md:size-16 ${reducedMotion ? '' : 'otaku-logo-pulse'}`}
                style={{
                  borderColor: 'var(--accent2)',
                  background: 'linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%)',
                  boxShadow: '0 0 20px color-mix(in srgb, var(--accent) 45%, transparent)',
                }}
              >
                <span className="text-2xl md:text-3xl" aria-hidden>
                  ▶
                </span>
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[var(--accent3)] text-[10px] font-black text-black">
                  {unread}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] font-bold tracking-[0.4em] text-[var(--accent2)]" style={{ fontFamily: 'var(--font-display)' }}>
                  OTAKU_OS v2.0 · 配信中
                </p>
                <h1 className="mt-1 text-2xl font-black tracking-tight md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                  <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--accent3)] to-[var(--accent2)] bg-clip-text text-transparent">
                    SEASONAL DASHBOARD
                  </span>
                </h1>
                <p className="mt-1 text-sm text-[var(--text2)]">
                  {unread}話まだ見てない · 推しのメール、全部ここに集結！
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onSwitchPersona}
              className="btn border-2 font-bold uppercase tracking-wider"
              style={{
                borderColor: 'var(--accent2)',
                color: 'var(--bg)',
                background: 'var(--accent2)',
              }}
            >
              現実に戻る
            </button>
          </div>
        </header>

        <div className="otaku-news-ticker border-b border-[var(--border)] bg-[var(--bg2)]/80 py-2 backdrop-blur-sm">
          <div className="relative overflow-hidden">
            <p className="px-4 font-mono text-[10px] font-bold tracking-widest text-[var(--accent3)]">NEWS TICKER · 速報</p>
            <div className="relative mt-1 h-7 overflow-hidden">
              <div className={`flex gap-12 whitespace-nowrap ${reducedMotion ? '' : 'otaku-ticker-inner'}`}>
                {tickerItems.map((line, i) => (
                  <span key={i} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text)]">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="grid gap-6 lg:grid-cols-12">
            <section className="space-y-4 lg:col-span-7" aria-label="Inbox queue">
              <h2 className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.25em] text-[var(--accent2)]" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="text-lg">📼</span> STREAMING QUEUE · メール一覧
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {emails.map((e) => (
                  <EmailCard key={e.id} email={e} onOpen={setSelectedEmail} />
                ))}
              </div>
            </section>

            <aside className="space-y-5 lg:col-span-5">
              <WeatherHud reduced={reducedMotion} />
              <div>
                <h2 className="mb-3 flex items-center gap-2 font-mono text-xs font-bold tracking-[0.25em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                  <span className="text-lg">⚔️</span> MARKET RAID · 株ボス
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {stocks.map((s) => (
                    <StockBossCard key={s.ticker} s={s} />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border-2 border-dashed border-[var(--border)] p-4 text-center text-sm text-[var(--text2)]">
                <p className="text-2xl">🍜</p>
                <p className="mt-2 font-medium text-[var(--text)]">今日のお供: カップ麺 + 新作PVループ</p>
                <p className="mt-1 text-xs opacity-80">（この欄はフィギュア棚の空きスペースです）</p>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <EmailModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
