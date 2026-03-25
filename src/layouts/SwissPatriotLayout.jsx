import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const department = t =>
  ({
    work: 'Bundeskanzlei',
    personal: 'Chuchi & Stube',
    finance: 'FINMA-Post',
    promo: 'Werbung (Abstimmung: nei)',
    newsletter: 'Wahlchronik',
    social: 'Hornusser-Club',
    dev: 'ETH Lab',
    shopping: 'Migros Digital',
    travel: 'SBB Fernweh',
  }[t] || 'Gemeindekanzlei')

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

const SNOW_FLAKES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 7 + 13) % 100}%`,
  delay: `${(i * 0.7) % 12}s`,
  duration: `${10 + (i % 5) * 2.5}s`,
  size: 4 + (i % 4),
}))

function MountainSilhouette() {
  return (
    <svg
      className="swiss-patriot-mountain-drift pointer-events-none absolute bottom-0 left-0 right-0 h-24 w-full text-black/35 sm:h-32"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0 120 L0 85 L180 45 L320 70 L450 25 L580 55 L720 15 L880 50 L1020 30 L1200 75 L1200 120 Z"
      />
      <path
        fill="currentColor"
        className="opacity-60"
        d="M0 120 L0 95 L220 60 L400 80 L520 50 L680 75 L840 40 L1000 65 L1200 55 L1200 120 Z"
      />
    </svg>
  )
}

export default function SwissPatriotLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeCh = useMemo(
    () =>
      time.toLocaleTimeString('de-CH', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
    [time],
  )

  const dateCh = useMemo(
    () =>
      time.toLocaleDateString('de-CH', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
    [time],
  )

  const unread = emails.filter(e => !e.read).length

  return (
    <div
      className="swiss-patriot-sky relative min-h-dvh overflow-x-hidden pb-28 text-[var(--text)]"
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <div
        className="swiss-patriot-cross-bg pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div
          className="relative h-[min(88vw,520px)] w-[min(88vw,520px)] max-w-[90vw] opacity-[0.09]"
          style={{
            background: `
              linear-gradient(to bottom, transparent calc(50% - 12%), white calc(50% - 12%), white calc(50% + 12%), transparent calc(50% + 12%)),
              linear-gradient(to right, transparent calc(50% - 12%), white calc(50% - 12%), white calc(50% + 12%), transparent calc(50% + 12%))
            `,
          }}
        />
      </div>

      {SNOW_FLAKES.map(f => (
        <span
          key={f.id}
          className="swiss-patriot-snow absolute rounded-full bg-white/70 shadow-sm"
          style={{
            left: f.left,
            top: '-4vh',
            width: f.size,
            height: f.size,
            animationDuration: f.duration,
            animationDelay: f.delay,
          }}
          aria-hidden
        />
      ))}

      <MountainSilhouette />

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-6 md:px-5 md:py-8">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-white/15 pb-6">
          <div className="flex min-w-0 flex-1 items-start gap-4">
            <div className="relative shrink-0">
              <span className="swiss-patriot-cowbell absolute -right-2 -top-3 text-2xl drop-shadow-md" aria-hidden>
                🔔
              </span>
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white/90 bg-[#da020e] text-4xl shadow-lg"
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.35)' }}
              >
                🇨🇭
              </div>
            </div>
            <div className="min-w-0">
              <p className="m-0 text-[10px] font-extrabold uppercase tracking-[0.35em] text-yellow-200/90">
                Eidgenoss · 26 Kantone · 1 Posteingang
              </p>
              <h1 className="m-0 mt-1 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                Bundes-<span className="text-yellow-300">Inbox</span>
              </h1>
              <p className="m-0 mt-2 max-w-xl text-sm text-red-100/85">
                Grüezi, bonjour, buongiorno — same mails, but rated for punctuality, neutrality, and chocolate reserves.{' '}
                <span className="font-bold text-white">{unread}</span> pending &quot;Abstimmungen&quot;.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
            <div
              className="rounded-box border border-white/20 bg-black/25 px-4 py-2 text-right backdrop-blur-sm"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-orange-300">Bundeszeit</p>
              <p className="m-0 text-2xl font-semibold tabular-nums text-white">{timeCh}</p>
              <p className="m-0 text-xs text-red-200/80">{dateCh}</p>
            </div>
            <button type="button" className="btn btn-outline border-2 border-white/80 font-bold text-white hover:bg-white/10" onClick={onSwitchPersona}>
              Neutralität verlassen
            </button>
          </div>
        </header>

        <div className="swiss-patriot-marquee-wrap mb-6 overflow-hidden rounded-full border border-white/20 bg-black/30 py-2 text-sm font-bold text-white backdrop-blur-md">
          <div className="flex whitespace-nowrap">
            <span className="swiss-patriot-marquee-inner pr-16">
              Hopp Schwiiz · Pünktlich wie die SBB · Schoggi ist Strategievorrat · Direkte Demokratie auch für Spam ·
              Neutralität: diese News sind multilateral unverdächtig · Grüezi mitenand ·
            </span>
            <span className="swiss-patriot-marquee-inner pr-16" aria-hidden>
              Hopp Schwiiz · Pünktlich wie die SBB · Schoggi ist Strategievorrat · Direkte Demokratie auch für Spam ·
              Neutralität: diese News sind multilateral unverdächtig · Grüezi mitenand ·
            </span>
          </div>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-12">
          <div className="rounded-3xl border-2 border-white/25 bg-gradient-to-br from-sky-900/80 to-sky-950/90 p-4 text-sky-50 shadow-xl backdrop-blur-sm lg:col-span-4">
            <div className="flex items-center justify-between gap-2">
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-sky-200">MeteoSchweiz (fan edition)</p>
              <span className="text-xl" aria-hidden>
                🏔️
              </span>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <span className="text-5xl drop-shadow-md">{weather.icon}</span>
              <div>
                <p className="m-0 text-lg font-bold">{weather.condition}</p>
                <p className="m-0 text-sm text-sky-200/90">
                  {weather.temp}°C · {weather.city}
                </p>
                <p className="m-0 mt-1 text-xs text-sky-300/80">Wind {weather.wind} km/h — perfekt fürs Fähnchen</p>
              </div>
            </div>
          </div>

          <div className="swiss-patriot-ticker rounded-3xl border-2 border-orange-500/40 bg-neutral-950 p-4 text-orange-100 shadow-xl lg:col-span-8">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.25em] text-orange-400">SIX feeling · Kurse</p>
              <span className="badge badge-sm border-orange-500/50 bg-orange-500/20 font-mono text-orange-200">LIVE-ish</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {stocks.map(s => (
                <div
                  key={s.ticker}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-orange-500/25 bg-black/60 px-3 py-2"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <div className="min-w-0">
                    <p className="m-0 truncate text-xs font-bold text-orange-200">{s.ticker}</p>
                    <p className="m-0 truncate text-[10px] text-neutral-500">{s.name}</p>
                  </div>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#fb923c'} />
                  <div className="text-right">
                    <p className="m-0 text-sm font-bold tabular-nums text-white">
                      {s.currency}
                      {s.price}
                    </p>
                    <p className={`m-0 text-xs font-semibold tabular-nums ${s.changePct >= 0 ? 'text-green-400' : 'text-orange-300'}`}>
                      {s.changePct > 0 ? '+' : ''}
                      {s.changePct}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <nav className="lg:col-span-4">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-yellow-200">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-400" aria-hidden />
              Post aus allen Departementen
            </h2>
            <ul className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`group w-full rounded-2xl border-2 p-3 text-left transition-all duration-200 ${
                        on
                          ? 'scale-[1.02] border-yellow-300 bg-white text-red-950 shadow-lg'
                          : 'border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/15'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl transition-transform duration-200 group-hover:scale-110">{e.from.avatar}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {!e.read && (
                              <span className="badge badge-sm border-0 bg-[#da020e] font-bold text-white">NEU — abstimmen!</span>
                            )}
                            <span className="text-[10px] font-bold uppercase tracking-wide text-orange-300 group-hover:text-orange-200">
                              {department(e.tag)}
                            </span>
                          </div>
                          <p className={`m-0 mt-1 line-clamp-2 text-sm font-bold ${on ? 'text-red-950' : ''}`}>{e.subject}</p>
                          <p className={`m-0 text-xs ${on ? 'text-red-800/80' : 'text-red-100/70'}`}>{e.from.name}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <article className="relative overflow-hidden rounded-3xl border-4 border-white/90 bg-white text-red-950 shadow-2xl">
                <div
                  className="pointer-events-none absolute right-0 top-0 h-32 w-32 opacity-[0.07]"
                  aria-hidden
                  style={{
                    background: `
                      linear-gradient(to bottom, transparent calc(50% - 8%), #b91c1c calc(50% - 8%), #b91c1c calc(50% + 8%), transparent calc(50% + 8%)),
                      linear-gradient(to right, transparent calc(50% - 8%), #b91c1c calc(50% - 8%), #b91c1c calc(50% + 8%), transparent calc(50% + 8%))
                    `,
                  }}
                />
                <div className="relative p-5 md:p-7">
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-red-600">Bundesblatt · vertraulich (nicht)</p>
                  <h3 className="m-0 mt-2 text-xl font-extrabold md:text-2xl">{selectedEmail.subject}</h3>
                  <p className="m-0 mt-2 text-sm text-red-800/80">
                    {selectedEmail.from.name} · {selectedEmail.date} · {department(selectedEmail.tag)}
                  </p>
                  <div className="mt-5 max-h-[min(50vh,420px)] overflow-y-auto rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm leading-relaxed whitespace-pre-wrap text-red-950">
                    {selectedEmail.body}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" className="btn btn-sm bg-[#da020e] font-bold text-white hover:bg-red-700">
                      Zustimmung erteilt ✓
                    </button>
                    <button type="button" className="btn btn-sm btn-outline border-red-300 text-red-800" onClick={() => setSelectedEmail(null)}>
                      Zurück zum Ständerat
                    </button>
                  </div>
                </div>
              </article>
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/35 bg-white/5 p-8 text-center text-red-100">
                <p className="m-0 text-6xl">🗳️</p>
                <p className="m-0 mt-4 max-w-sm text-lg font-bold">Wählen Sie links eine Motion — wie im echten Bund.</p>
              </div>
            )}
          </main>

          <aside className="lg:col-span-3">
            <div className="sticky top-2 rounded-3xl border-2 border-yellow-400/40 bg-gradient-to-b from-red-950/90 to-black/80 p-4 text-yellow-50 shadow-xl backdrop-blur-sm">
              <p className="m-0 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-yellow-300">
                <span aria-hidden>📻</span>
                SRF deini Kopfzeilen
              </p>
              <ul className="mt-4 space-y-3">
                {news.map(n => (
                  <li
                    key={n.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm leading-snug transition-transform hover:translate-x-1"
                  >
                    <span className="mr-1">{n.emoji}</span>
                    {n.title}
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-4 text-center text-[10px] text-red-200/60">Keine ausländische Einmischung — nur dieselben Daten.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
