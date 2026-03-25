import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'
import { vowelizeText, vowelHueClass } from '../utils/vowelize'

function VowelRainbow({ text, className = '' }) {
  const v = vowelizeText(text)
  return (
    <span className={className}>
      {[...v].map((ch, i) => (
        <span key={i} className={`inline-block vo-vowel ${vowelHueClass(ch)}`}>
          {ch}
        </span>
      ))}
    </span>
  )
}

function FloatingVowels() {
  const letters = ['A', 'E', 'I', 'O', 'U', 'Å', 'Ï', 'Ö', 'Ü', 'Æ']
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {letters.map((L, i) => (
        <span
          key={L + i}
          className={`vo-float-bubble absolute select-none font-black opacity-[0.12] vo-vowel ${vowelHueClass(L)}`}
          style={{
            left: `${(i * 17 + 7) % 88}%`,
            top: `${(i * 23 + 11) % 78}%`,
            fontSize: `${2.2 + (i % 4) * 0.9}rem`,
            animationDelay: `${-i * 0.7}s`,
          }}
        >
          {L}
        </span>
      ))}
    </div>
  )
}

function EyeChartGraphic({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 220 140" aria-hidden>
      <defs>
        <linearGradient id="vo-eye-lid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
        <radialGradient id="vo-eye-iris" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="55%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#6366f1" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="70" rx="100" ry="62" fill="url(#vo-eye-lid)" stroke="#a78bfa" strokeWidth="2" />
      <ellipse cx="110" cy="70" rx="72" ry="48" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" opacity="0.95" />
      <circle cx="110" cy="70" r="34" fill="url(#vo-eye-iris)" className="vo-iris-spin" />
      <circle cx="110" cy="70" r="14" fill="#020617" />
      <text
        x="110"
        y="76"
        textAnchor="middle"
        fill="#fef08a"
        fontSize="11"
        fontFamily="var(--font-display), system-ui"
        fontWeight="800"
        letterSpacing="0.35em"
        className="vo-pupil-aeiou"
      >
        AEIOU
      </text>
    </svg>
  )
}

export default function VowelsOnlyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length
  const marquee = news.map((n) => `${n.emoji} ${vowelizeText(n.title)} · `).join('')

  return (
    <div
      className="vo-root relative min-h-full overflow-x-hidden pb-28 text-[var(--text)]"
      style={{ fontFamily: 'var(--font-main), system-ui, sans-serif' }}
    >
      <style>{`
        @keyframes vo-bg-flow {
          0%, 100% { background-position: 0% 40%; }
          50% { background-position: 100% 60%; }
        }
        @keyframes vo-float-bubble {
          0%, 100% { transform: translate(0, 0) rotate(-6deg) scale(1); }
          50% { transform: translate(18px, -28px) rotate(8deg) scale(1.08); }
        }
        @keyframes vo-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes vo-iris-spin {
          from { transform: rotate(0deg); transform-origin: 110px 70px; }
          to { transform: rotate(360deg); transform-origin: 110px 70px; }
        }
        @keyframes vo-pulse-vowel {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.12); filter: brightness(1.2); }
        }
        @keyframes vo-wobble {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        .vo-root {
          background: linear-gradient(125deg, #1e0a3a 0%, #312e81 28%, #4c1d95 52%, #831843 78%, #1e1b4b 100%);
          background-size: 280% 280%;
          animation: vo-bg-flow 22s ease infinite;
        }
        .vo-float-bubble { animation: vo-float-bubble 9s ease-in-out infinite; }
        .vo-marquee-inner {
          display: inline-block;
          white-space: nowrap;
          animation: vo-marquee 48s linear infinite;
        }
        .vo-iris-spin { animation: vo-iris-spin 28s linear infinite; }
        .vo-pupil-aeiou { animation: vo-pulse-vowel 2.4s ease-in-out infinite; }
        .vo-wobble { animation: vo-wobble 3s ease-in-out infinite; display: inline-block; }
        .vo-vowel.vo-a { color: #f87171; text-shadow: 0 0 14px rgba(248, 113, 113, 0.5); }
        .vo-vowel.vo-e { color: #fbbf24; text-shadow: 0 0 14px rgba(251, 191, 36, 0.5); }
        .vo-vowel.vo-i { color: #a78bfa; text-shadow: 0 0 14px rgba(167, 139, 250, 0.5); }
        .vo-vowel.vo-o { color: #38bdf8; text-shadow: 0 0 14px rgba(56, 189, 248, 0.5); }
        .vo-vowel.vo-u { color: #4ade80; text-shadow: 0 0 14px rgba(74, 222, 128, 0.5); }
        .vo-vowel.vo-y { color: #f472b6; text-shadow: 0 0 14px rgba(244, 114, 182, 0.5); }
        .vo-vowel.vo-ae { color: #fb923c; text-shadow: 0 0 14px rgba(251, 146, 60, 0.5); }
        .vo-vowel.vo-n { color: inherit; text-shadow: none; }
        .vo-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 12px 40px rgba(167, 139, 250, 0.25), 0 0 0 1px rgba(56, 189, 248, 0.2);
        }
      `}</style>

      <FloatingVowels />

      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.09]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #f472b6 0%, transparent 45%), radial-gradient(circle at 80% 70%, #38bdf8 0%, transparent 40%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 px-4 pb-10 pt-6 sm:px-6">
        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap items-start gap-5">
            <EyeChartGraphic className="vo-wobble h-28 w-44 shrink-0 sm:h-32 sm:w-52" />
            <div>
              <p className="mb-1 text-xs font-semibold tracking-[0.4em] text-[var(--accent2)]/90">
                <VowelRainbow text="welcome to" />
              </p>
              <h1
                className="text-3xl leading-tight sm:text-4xl md:text-5xl"
                style={{
                  fontFamily: 'var(--font-display), cursive',
                  color: 'var(--accent)',
                  textShadow: '0 0 32px rgba(244, 114, 182, 0.45)',
                  letterSpacing: '0.04em',
                }}
              >
                <span className="vo-wobble mr-2" aria-hidden>
                  👁️
                </span>
                Vowel Vision™
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--text)]/88">
                <VowelRainbow
                  className="font-medium"
                  text={`Consonants? Never heard of them. ${unread} unread messages, but only the juicy vowels get through your filter.`}
                />
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline border-[var(--accent2)] text-[var(--accent2)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#1e0a3a]"
            onClick={onSwitchPersona}
          >
            <VowelRainbow text="change persona" />
          </button>
        </header>

        <div className="mb-6 overflow-hidden rounded-box border border-[var(--accent)]/40 bg-base-300/30 py-2.5 backdrop-blur-md">
          <div className="vo-marquee-inner px-2 text-sm font-semibold tracking-wide text-[var(--text)]/95">
            <span className="pr-20">{marquee}</span>
            <span className="pr-20">{marquee}</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <main className="lg:col-span-7 xl:col-span-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="badge badge-lg border-0 bg-[var(--accent)] text-[#1e0a3a]">
                <VowelRainbow text="inbox" />
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[var(--accent2)] to-transparent" />
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {emails.map((email) => (
                <li key={email.id}>
                  <button
                    type="button"
                    className="vo-card card card-border border-[var(--accent2)]/35 bg-base-300/35 text-left backdrop-blur-md transition-all duration-300"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="card-body gap-2 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-2xl" aria-hidden>
                          {email.from.avatar}
                        </span>
                        {!email.read && (
                          <span className="badge badge-sm animate-pulse border-0 bg-secondary text-secondary-content text-[10px]">
                            <VowelRainbow text="new" />
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] font-medium tracking-wider text-[var(--accent2)]/85">
                        <VowelRainbow text="from" />{' '}
                        <VowelRainbow text={email.from.name} className="font-bold" />
                      </p>
                      <p className="line-clamp-2 text-sm font-semibold leading-snug">
                        <VowelRainbow text={email.subject} />
                      </p>
                      <p className="line-clamp-2 text-xs opacity-80">
                        <VowelRainbow text={email.preview} />
                      </p>
                      <div className="card-actions mt-1 justify-between text-[10px] opacity-65">
                        <span>
                          <VowelRainbow text={email.date} />
                        </span>
                        <span className="rounded bg-[var(--accent2)]/20 px-2 py-0.5">
                          <VowelRainbow text={email.tag} />
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </main>

          <aside className="flex flex-col gap-6 lg:col-span-5 xl:col-span-4">
            <section className="card border-2 border-[var(--accent2)]/50 bg-gradient-to-br from-base-300/80 to-base-200/40 shadow-xl shadow-[var(--accent)]/15 backdrop-blur-sm">
              <div className="card-body gap-3 p-5">
                <div className="mb-1 flex items-center justify-between">
                  <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display), cursive' }}>
                    <VowelRainbow text="sky vowels" />
                  </h2>
                  <span className="text-3xl" aria-hidden>
                    {weather.icon}
                  </span>
                </div>
                <p className="text-5xl font-black leading-none sm:text-6xl">
                  <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] bg-clip-text text-transparent">
                    {weather.temp}°C
                  </span>
                </p>
                <p className="text-sm font-semibold">
                  <VowelRainbow text={weather.condition} />
                </p>
                <p className="text-xs opacity-75">
                  <VowelRainbow text={`${weather.city}, ${weather.country}`} />
                </p>
                <p className="text-[10px] tracking-wide text-[var(--accent2)]/90">
                  <VowelRainbow text={`wind ${weather.wind} km/h · humidity ${weather.humidity}%`} />
                </p>
                <ul className="mt-2 flex flex-wrap gap-2 border-t border-base-content/10 pt-3">
                  {weather.forecast.map((f) => (
                    <li
                      key={f.day}
                      className="rounded-lg border border-[var(--accent2)]/25 bg-base-100/20 px-2 py-1 text-center text-[10px]"
                    >
                      <span className="text-lg leading-none" aria-hidden>
                        {f.icon}
                      </span>
                      <div className="mt-0.5 font-medium">
                        <VowelRainbow text={f.day} />
                      </div>
                      <div className="opacity-80">
                        {f.high}° / {f.low}°
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="card card-border border-[var(--accent)]/40 bg-base-300/30 backdrop-blur-sm">
              <div className="card-body gap-3 p-5">
                <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display), cursive' }}>
                  <VowelRainbow text="money vowels" />
                </h2>
                <ul className="space-y-3">
                  {stocks.map((s) => (
                    <li
                      key={s.ticker}
                      className="flex items-center justify-between gap-2 rounded-xl border border-[var(--accent2)]/25 bg-base-100/15 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-sm font-bold tracking-widest text-[var(--accent2)]">
                          <VowelRainbow text={s.ticker} />
                        </p>
                        <p className="truncate text-[10px] opacity-65">
                          <VowelRainbow text={s.name} />
                        </p>
                      </div>
                      <MiniSpark series={s.series} stroke="var(--accent2)" className="hidden sm:block" />
                      <div className="shrink-0 text-right">
                        <p className="font-mono text-sm font-bold">
                          {s.currency}
                          {s.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <p className={s.changePct >= 0 ? 'text-success text-xs font-bold' : 'text-error text-xs font-bold'}>
                          {s.changePct >= 0 ? '▲ ' : '▼ '}
                          {s.changePct >= 0 ? '+' : ''}
                          {s.changePct.toFixed(2)}%
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="card border-2 border-dashed border-[var(--accent2)]/50 bg-base-200/25 backdrop-blur-sm">
              <div className="card-body gap-3 p-5">
                <h2 className="flex items-center gap-2 text-lg font-bold" style={{ fontFamily: 'var(--font-display), cursive' }}>
                  <span aria-hidden>📰</span>
                  <VowelRainbow text="headlines" />
                </h2>
                <ul className="space-y-3">
                  {news.map((n) => (
                    <li key={n.id} className="border-l-4 border-[var(--accent)] pl-3">
                      <p className="text-xs font-semibold leading-snug">
                        <span aria-hidden>{n.emoji} </span>
                        <VowelRainbow text={n.title} />
                      </p>
                      <p className="mt-1 text-[10px] tracking-wide opacity-65">
                        <VowelRainbow text={`${n.source} · ${n.time} · ${n.category}`} />
                      </p>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0820]/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vo-email-title"
        >
          <div className="max-h-[min(90dvh,720px)] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-[var(--accent2)] bg-gradient-to-b from-base-300 to-base-200 shadow-2xl shadow-[var(--accent)]/30">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-2 border-b border-base-content/10 bg-base-300/95 px-4 py-3 backdrop-blur-sm">
              <div className="min-w-0">
                <p className="text-2xl" aria-hidden>
                  {selectedEmail.from.avatar}
                </p>
                <p id="vo-email-title" className="text-lg font-bold leading-tight">
                  <VowelRainbow text={selectedEmail.subject} />
                </p>
                <p className="text-[10px] tracking-wide text-[var(--accent2)]">
                  <VowelRainbow text={selectedEmail.from.name} /> · <VowelRainbow text={selectedEmail.time} />
                </p>
              </div>
              <button type="button" className="btn btn-sm btn-circle btn-ghost shrink-0" onClick={() => setSelectedEmail(null)} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="px-4 py-4 text-sm leading-relaxed whitespace-pre-wrap">
              <VowelRainbow text={selectedEmail.body} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
