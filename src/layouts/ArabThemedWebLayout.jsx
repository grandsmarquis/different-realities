import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

function sparkStroke(pct) {
  return pct >= 0 ? '#34d399' : '#fb7185'
}

function GeometricRosette({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M32 4L38 22L56 18L44 32L56 46L38 42L32 60L26 42L8 46L20 32L8 18L26 22L32 4Z"
        fill="currentColor"
        opacity="0.2"
      />
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.35" />
    </svg>
  )
}

function Lantern({ delayClass = '' }) {
  return (
    <div className={`flex flex-col items-center ${delayClass}`}>
      <div className="h-6 w-px bg-gradient-to-b from-transparent via-[color-mix(in_srgb,var(--accent)_70%,transparent)] to-[color-mix(in_srgb,var(--accent)_40%,transparent)]" />
      <div
        className="relative h-14 w-11 rounded-b-2xl rounded-t-sm border-2 shadow-lg"
        style={{
          borderColor: 'var(--accent)',
          background: `radial-gradient(ellipse 80% 70% at 50% 30%, color-mix(in srgb, var(--accent2) 45%, #f59e0b) 0%, color-mix(in srgb, var(--accent) 35%, #7c2d12) 55%, #1c0a04 100%)`,
          boxShadow: `0 0 28px color-mix(in srgb, var(--accent) 35%, transparent), inset 0 -4px 12px rgba(0,0,0,0.5)`,
        }}
      >
        <div
          className="absolute inset-x-1 top-2 h-6 rounded-sm opacity-70"
          style={{
            background: `linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)`,
          }}
        />
        <div className="absolute bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-200/90 blur-[2px]" />
      </div>
    </div>
  )
}

function MosaicBackdrop() {
  const tile = `%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath fill='%23d4af37' fill-opacity='0.06' d='M40 0L48 24L72 16L56 40L72 64L48 56L40 80L32 56L8 64L24 40L8 16L32 24Z'/%3E%3C/svg%3E`
  return (
    <div
      className="arabweb-mosaic-glow pointer-events-none fixed inset-0 z-0"
      style={{ backgroundImage: `url("data:image/svg+xml,${tile}")` }}
      aria-hidden
    />
  )
}

function StarField() {
  const dots = [
    { t: '12%', l: '8%', d: '0s' },
    { t: '22%', l: '88%', d: '-1.2s' },
    { t: '68%', l: '12%', d: '-2.4s' },
    { t: '78%', l: '76%', d: '-0.8s' },
    { t: '40%', l: '42%', d: '-1.8s' },
  ]
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {dots.map((p, i) => (
        <span
          key={i}
          className="arabweb-star-twinkle absolute h-1 w-1 rounded-full bg-[color-mix(in_srgb,var(--accent2)_80%,white)] shadow-[0_0_6px_var(--accent2)]"
          style={{ top: p.t, left: p.l, animationDelay: p.d }}
        />
      ))}
    </div>
  )
}

function NewsTicker() {
  const bits = news.map((n) => `${n.emoji} ${n.title}`).join('   ✦   ')
  return (
    <div
      className="arabweb-ticker-wrap border-y border-[var(--border)] py-2.5"
      style={{ background: 'color-mix(in srgb, var(--bg2) 88%, transparent)' }}
    >
      <div className="arabweb-ticker-track text-sm font-medium text-[var(--text2)]" style={{ fontFamily: 'var(--font-ar)' }}>
        <span className="whitespace-nowrap px-4">
          <span className="text-[var(--accent)]">أخبار السوق</span> · {bits}
        </span>
        <span className="whitespace-nowrap px-4" aria-hidden>
          <span className="text-[var(--accent)]">أخبار السوق</span> · {bits}
        </span>
      </div>
    </div>
  )
}

function StockRow({ s }) {
  const data = s.series.map((v, i) => ({ v, i }))
  const up = s.changePct >= 0
  return (
    <div className="flex gap-3 border-b border-[var(--border)] py-3 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="font-bold text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
          {s.ticker}
        </p>
        <p className="line-clamp-1 text-xs text-[var(--text2)]">{s.name}</p>
        <p className={`font-mono text-sm font-semibold ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
          {s.currency}
          {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          <span className="ms-1 text-xs opacity-90">
            {up ? '▲' : '▼'}
            {Math.abs(s.changePct).toFixed(2)}%
          </span>
        </p>
      </div>
      <div className="h-12 w-[4.5rem] shrink-0 opacity-95">
        <ResponsiveContainer width="100%" height={48} debounce={50}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="v" stroke={sparkStroke(s.changePct)} strokeWidth={1.5} dot={false} isAnimationActive={false} />
            <Tooltip
              formatter={(v) => [`${s.currency}${Number(v).toFixed(2)}`, '']}
              contentStyle={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                fontSize: 11,
                color: 'var(--text)',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default function ArabThemedWebLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-x-hidden"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: `
          radial-gradient(ellipse 90% 60% at 100% 0%, color-mix(in srgb, var(--accent3) 55%, transparent), transparent),
          radial-gradient(ellipse 70% 50% at 0% 100%, color-mix(in srgb, var(--accent2) 12%, transparent), transparent),
          linear-gradient(175deg, var(--bg) 0%, var(--bg2) 45%, var(--bg) 100%)
        `,
      }}
    >
      <MosaicBackdrop />
      <StarField />

      <div className="pointer-events-none absolute start-4 top-24 z-[2] flex gap-6 md:start-10 md:top-28" aria-hidden>
        <div className="arabweb-lantern">
          <Lantern />
        </div>
        <div className="arabweb-lantern-delay hidden sm:block">
          <Lantern />
        </div>
      </div>

      <div className="pointer-events-none absolute end-8 top-36 z-[2] opacity-40 md:end-16" aria-hidden>
        <GeometricRosette className="arabweb-gem-slow h-32 w-32 text-[var(--accent)]" />
      </div>

      <header className="relative z-10 px-4 pb-6 pt-8 md:px-10 md:pt-10">
        <div className="arabweb-gold-shimmer-line mx-auto mb-4 h-0.5 max-w-4xl rounded-full opacity-80" />
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-start">
            <p className="mb-1 text-xs tracking-[0.35em] text-[var(--accent2)] opacity-90" style={{ fontFamily: 'var(--font-ar)' }}>
              سوق المعلومات الرقمية
            </p>
            <h1
              className="text-4xl font-semibold leading-tight md:text-6xl"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--accent)',
                textShadow: '0 0 40px color-mix(in srgb, var(--accent) 35%, transparent)',
              }}
            >
              خيمة البريد
            </h1>
            <p className="mt-2 max-w-lg text-sm text-[var(--text2)] md:mx-0 mx-auto">
              Arabian-nights browser fantasy — same inbox, weather, headlines & tickers. Pick a scroll from the rug rack.
            </p>
            <p className="mt-1 text-xs text-[var(--text2)] opacity-75">
              {unread} unread · {emails.length} threads · lanterns optional, Wi‑Fi mandatory
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
            <span className="arabweb-star-twinkle text-2xl text-[var(--accent2)]" aria-hidden>
              ✦
            </span>
            <button
              type="button"
              onClick={onSwitchPersona}
              className="btn btn-outline btn-sm border-2 uppercase tracking-widest"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              مغادرة السوق
            </button>
          </div>
        </div>
        <div
          className="mx-auto mt-6 hidden h-16 max-w-2xl items-end justify-center gap-1 rounded-t-[3rem] border-x-2 border-t-2 px-8 md:flex"
          style={{ borderColor: 'var(--border)' }}
          aria-hidden
        >
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${28 + ((i % 4) + 1) * 10}%`,
                background: `linear-gradient(180deg, color-mix(in srgb, var(--accent) ${25 + (i % 3) * 12}%, transparent), transparent)`,
              }}
            />
          ))}
        </div>
      </header>

      <NewsTicker />

      <div
        className="relative z-10 mx-auto grid max-w-6xl gap-px md:grid-cols-[minmax(0,300px)_1fr]"
        style={{ background: 'var(--border)' }}
      >
        <aside
          className="flex flex-col border-t md:border-t-0"
          style={{
            background: `linear-gradient(200deg, color-mix(in srgb, var(--card) 92%, var(--bg)) 0%, var(--card) 100%)`,
          }}
        >
          <div className="border-b border-[var(--border)] px-4 py-3">
            <p className="text-[10px] tracking-[0.3em] text-[var(--accent2)]" style={{ fontFamily: 'var(--font-ar)' }}>
              بساط الرسائل
            </p>
            <p className="text-xs text-[var(--text2)]">{unread} جديد</p>
          </div>
          <ul className="max-h-[min(52vh,480px)] divide-y divide-[var(--border)] overflow-y-auto">
            {emails.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className="group flex w-full gap-3 px-4 py-3.5 text-start transition-all hover:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]"
                  style={{
                    background: selectedEmail?.id === e.id ? 'color-mix(in srgb, var(--accent3) 65%, transparent)' : undefined,
                  }}
                >
                  <span className="text-2xl transition-transform group-hover:scale-110">{e.from.avatar}</span>
                  <div className="min-w-0 flex-1" dir="ltr">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-semibold">{e.subject}</span>
                      {!e.read && (
                        <span className="badge badge-xs shrink-0 border-0 bg-[var(--accent2)] text-[var(--bg)]">جديد</span>
                      )}
                    </div>
                    <p className="truncate text-xs text-[var(--text2)]">{e.from.name}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main
          className="min-h-[50vh] space-y-6 p-5 md:p-8"
          style={{
            background: `linear-gradient(195deg, var(--bg) 0%, color-mix(in srgb, var(--bg2) 40%, var(--bg)) 100%)`,
          }}
        >
          {selectedEmail ? (
            <article
              dir="ltr"
              className="arabweb-card-lift relative overflow-hidden rounded-2xl border-2 p-6 shadow-xl md:p-8"
              style={{
                borderColor: 'var(--border)',
                background: `linear-gradient(145deg, color-mix(in srgb, var(--card) 95%, var(--accent3)) 0%, var(--card) 100%)`,
              }}
            >
              <GeometricRosette className="pointer-events-none absolute -end-6 -top-6 h-24 w-24 text-[var(--accent)] opacity-30" />
              <div className="relative flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border)] pb-4">
                <div className="min-w-0">
                  <p className="text-[10px] tracking-[0.4em] text-[var(--accent2)]">OPEN SCROLL</p>
                  <h2 className="mt-1 text-2xl font-semibold md:text-3xl">{selectedEmail.subject}</h2>
                  <p className="mt-2 text-sm text-[var(--text2)]">
                    <span className="font-medium text-[var(--text)]">{selectedEmail.from.name}</span> · {selectedEmail.from.email}
                  </p>
                </div>
                <div className="text-end text-sm text-[var(--text2)]">
                  <p>{selectedEmail.date}</p>
                  <p className="font-mono">{selectedEmail.time}</p>
                </div>
              </div>
              <div className="relative mt-6 whitespace-pre-wrap leading-relaxed text-[var(--text)]/95">{selectedEmail.body}</div>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="badge badge-outline border-[var(--accent)] text-[var(--accent)]">مختوم بالشمع الرقمي</span>
                <span className="badge badge-ghost border border-[var(--border)]">جني البريد وافق</span>
              </div>
            </article>
          ) : (
            <div
              className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center opacity-60"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="text-4xl">📜</span>
              <p className="mt-3 max-w-sm text-sm" style={{ fontFamily: 'var(--font-ar)' }}>
                اختر رسالة من البساط — تظهر هنا كلفافة سحرية
              </p>
              <p className="mt-1 text-xs text-[var(--text2)]">Choose an email from the rug rack →</p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            <div
              className="arabweb-card-lift rounded-2xl border-2 p-4 shadow-lg md:col-span-1"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--card)',
                animationDelay: '-1.5s',
              }}
            >
              <p className="text-center text-xs font-semibold text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                الطقس
              </p>
              <div className="mt-3 flex flex-col items-center gap-2">
                <span className="arabweb-weather-emoji text-5xl">{weather.icon}</span>
                <p className="text-3xl font-bold">{weather.temp}°</p>
                <p className="text-center text-sm text-[var(--text2)]">{weather.condition}</p>
                <p className="text-xs text-[var(--text2)] opacity-80">
                  {weather.city} · {weather.wind} km/h wind · {weather.humidity}% humidity
                </p>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-1 border-t border-[var(--border)] pt-3">
                {weather.forecast.map((d) => (
                  <div key={d.day} className="flex flex-col items-center text-center text-[0.65rem] text-[var(--text2)]">
                    <span>{d.day}</span>
                    <span className="text-base">{d.icon}</span>
                    <span className="font-mono text-[var(--text)]">{d.high}°</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl border-2 p-4 shadow-lg md:col-span-2"
              style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
            >
              <p className="mb-3 text-center text-xs font-semibold text-[var(--accent)] md:text-start" style={{ fontFamily: 'var(--font-display)' }}>
                الأخبار
              </p>
              <ul className="space-y-3">
                {news.map((n) => (
                  <li
                    key={n.id}
                    className="flex gap-3 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_40%,transparent)] p-3 transition-transform hover:scale-[1.01]"
                  >
                    <span className="text-2xl">{n.emoji}</span>
                    <div className="min-w-0 flex-1" dir="ltr">
                      <p className="font-medium leading-snug">{n.title}</p>
                      <p className="mt-1 text-xs text-[var(--text2)]">
                        {n.source} · {n.category} · {n.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="rounded-2xl border-2 p-5 shadow-lg"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <p className="mb-1 text-center text-xs font-semibold text-[var(--accent)] md:text-start" style={{ fontFamily: 'var(--font-display)' }}>
              أسواق الليل
            </p>
            <p className="mb-4 text-center text-[10px] text-[var(--text2)] md:text-start">Night bazaar tickers — sparklines from the same data</p>
            <div className="divide-y divide-[var(--border)]">{stocks.map((s) => <StockRow key={s.ticker} s={s} />)}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
