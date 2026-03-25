import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const ledgerTag = (t) =>
  ({
    work: '御用',
    personal: '私信',
    finance: '金庫',
    promo: '回し者',
    newsletter: '広報',
    social: '顔',
    dev: '道具',
    shopping: '仕入',
    travel: '遠征',
  }[t] || '雑件')

const telopLine = news.map((n) => `${n.emoji} ${n.title}`).join('  ·  ')

const stockUpColor = '#f87171'
const stockDownColor = '#4ade80'

export default function YakuzaBossLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="yakuza-boss-root relative min-h-dvh overflow-x-hidden pb-6"
      style={{
        background: `
          radial-gradient(ellipse 100% 80% at 50% -30%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 50%),
          radial-gradient(ellipse 70% 50% at 100% 80%, color-mix(in srgb, var(--accent2) 25%, transparent), transparent 45%),
          linear-gradient(165deg, var(--bg) 0%, var(--bg2) 55%, #060304 100%)
        `,
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="yakuza-boss-fog pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="yakuza-boss-rain pointer-events-none absolute inset-0 z-[1] opacity-70" aria-hidden />
      <div className="yakuza-boss-scanlines pointer-events-none absolute inset-0 z-[2]" aria-hidden />

      {/* Abstract neon alley silhouette */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-32 opacity-40 md:h-40" aria-hidden>
        <svg className="h-full w-full" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="yakuzaAlley" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent2)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path fill="url(#yakuzaAlley)" d="M0 100 L0 40 L35 55 L60 25 L95 45 L130 15 L165 50 L200 20 L235 48 L270 18 L305 52 L340 28 L375 55 L400 35 L400 100 Z" />
        </svg>
      </div>

      {/* Stylized dragon stroke — original abstract path, not traditional irezumi copy */}
      <div className="pointer-events-none absolute -right-8 top-16 z-[1] hidden w-48 opacity-25 md:block lg:w-56" aria-hidden>
        <svg viewBox="0 0 200 120" className="yakuza-boss-dragon w-full">
          <path
            className="yakuza-boss-dragon-path"
            fill="none"
            stroke="var(--accent3)"
            strokeWidth="1.2"
            strokeLinecap="round"
            d="M8 96 Q40 72 52 48 Q64 24 88 20 Q112 16 128 36 Q144 56 168 44 Q184 36 192 24 M52 48 Q72 64 96 60 Q120 56 140 68 M88 20 Q96 8 108 12"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 pt-4 md:px-5 md:pt-6">
        <header className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b-2 pb-4" style={{ borderColor: 'var(--accent2)' }}>
          <div>
            <p className="m-0 text-[10px] font-bold tracking-[0.4em] opacity-60" style={{ color: 'var(--accent3)' }}>
              KUMICHO TERMINAL · 組長卓
            </p>
            <h1
              className="yakuza-boss-neon m-0 mt-1 text-3xl font-bold tracking-tight md:text-4xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
            >
              極道ダッシュボード
            </h1>
            <p className="m-0 mt-1 max-w-xl text-sm opacity-80" style={{ color: 'var(--text2)' }}>
              連絡帳 · 港の空 · 事務所テレビ · 会の金融線 — 全部ここ。礼儀正しく、派手に。
            </p>
          </div>
          <button
            type="button"
            className="btn btn-sm gap-2 border-2 bg-base-100/10 backdrop-blur-sm"
            style={{ borderColor: 'var(--accent3)', color: 'var(--accent3)' }}
            onClick={onSwitchPersona}
          >
            <span aria-hidden>🚪</span>
            表の世界へ
          </button>
        </header>

        <div
          className="yakuza-boss-telop-shell mb-4 overflow-hidden rounded-sm border-2 py-2 shadow-lg"
          style={{
            borderColor: 'var(--accent2)',
            background: 'linear-gradient(180deg, #1a0a0c 0%, #0d0506 100%)',
            boxShadow: '0 0 24px color-mix(in srgb, var(--accent) 25%, transparent)',
          }}
          role="region"
          aria-label="Scrolling news headlines"
        >
          <div className="yakuza-boss-telop-track text-sm font-bold tracking-wide" style={{ color: '#fef3c7' }}>
            <span className="whitespace-nowrap px-6">
              <span className="mr-3 rounded px-2 py-0.5 text-xs text-white" style={{ background: 'var(--accent)' }}>
                速報
              </span>
              {telopLine}
            </span>
            <span className="whitespace-nowrap px-6" aria-hidden>
              <span className="mr-3 rounded px-2 py-0.5 text-xs text-white" style={{ background: 'var(--accent)' }}>
                速報
              </span>
              {telopLine}
            </span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="yakuza-boss-hanko inline-flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold" style={{ borderColor: 'var(--accent)', color: 'var(--accent3)' }} aria-hidden>
                印
              </span>
              <h2 className="m-0 text-sm font-bold tracking-widest" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)' }}>
                組の連絡帳
              </h2>
            </div>
            <div className="space-y-2">
              {emails.map((e) => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`yakuza-boss-mail-card card card-border w-full text-left transition-transform hover:scale-[1.01] ${on ? 'ring-2 ring-[color:var(--accent)]' : ''}`}
                    style={{
                      borderColor: on ? 'var(--accent)' : 'var(--border)',
                      background: on ? 'color-mix(in srgb, var(--accent) 12%, var(--card))' : 'var(--card)',
                    }}
                  >
                    <div className="card-body gap-2 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-2xl leading-none">{e.from.avatar}</span>
                        <div className="flex flex-wrap justify-end gap-1">
                          <span
                            className="badge border-0 text-xs font-bold text-white"
                            style={{ background: e.read ? 'color-mix(in srgb, var(--text2) 50%, #333)' : 'var(--accent2)' }}
                          >
                            {e.read ? '済' : '未処理'}
                          </span>
                          <span className="badge badge-ghost badge-xs border opacity-80" style={{ borderColor: 'var(--border)' }}>
                            {ledgerTag(e.tag)}
                          </span>
                        </div>
                      </div>
                      <p className={`m-0 line-clamp-2 text-sm leading-snug ${e.read ? 'opacity-75' : 'font-bold'}`}>{e.subject}</p>
                      <p className="m-0 text-xs opacity-60">{e.from.name}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl" aria-hidden>
                📜
              </span>
              <h2 className="m-0 text-sm font-bold tracking-widest" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)' }}>
                極秘ビューア
              </h2>
            </div>
            {selectedEmail ? (
              <div
                className="card border-2 shadow-xl"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent3) 45%, var(--border))',
                  background: `
                    linear-gradient(160deg, color-mix(in srgb, var(--card) 92%, var(--accent2)) 0%, var(--card) 45%),
                    repeating-linear-gradient(0deg, transparent, transparent 28px, color-mix(in srgb, var(--accent) 5%, transparent) 28px, color-mix(in srgb, var(--accent) 5%, transparent) 29px)
                  `,
                  boxShadow: '0 0 40px color-mix(in srgb, var(--accent2) 20%, transparent)',
                }}
              >
                <div className="card-body p-4 md:p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--border)' }}>
                    <div>
                      <p className="m-0 text-xs opacity-60">{selectedEmail.date}</p>
                      <h3 className="m-0 mt-1 text-lg font-bold md:text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)' }}>
                        {selectedEmail.subject}
                      </h3>
                      <p className="m-0 mt-1 text-sm opacity-80">
                        {selectedEmail.from.avatar} {selectedEmail.from.name}
                      </p>
                    </div>
                    <span className="badge badge-outline font-bold" style={{ borderColor: 'var(--accent3)', color: 'var(--accent3)' }}>
                      {ledgerTag(selectedEmail.tag)}
                    </span>
                  </div>
                  <div className="max-h-[min(48vh,520px)] overflow-y-auto whitespace-pre-wrap text-sm leading-[1.85] opacity-90">
                    {selectedEmail.body}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex min-h-[200px] flex-col items-center justify-center rounded-box border-2 border-dashed p-8 opacity-60"
                style={{ borderColor: 'var(--border)' }}
              >
                <p className="m-0 text-center text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                  左の連絡を
                  <br />
                  お選びください
                </p>
                <span className="mt-3 text-4xl opacity-40" aria-hidden>
                  🀄
                </span>
              </div>
            )}
          </main>

          <div className="flex flex-col gap-4 lg:col-span-3">
            <section
              className="yakuza-boss-weather card card-border relative overflow-hidden border-2 shadow-md"
              style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}
            >
              <div className="relative px-4 pb-10 pt-4">
                <h3 className="m-0 text-xs font-bold tracking-[0.25em] opacity-80" style={{ color: 'var(--accent3)' }}>
                  港の空模様
                </h3>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-5xl drop-shadow-md">{weather.icon}</span>
                  <div>
                    <p className="m-0 text-2xl font-bold">{weather.temp}°C</p>
                    <p className="m-0 text-sm opacity-75">{weather.condition}</p>
                    <p className="m-0 text-xs opacity-50">
                      {weather.city} · 風 {weather.wind} km/h
                    </p>
                  </div>
                </div>
                <div className="divider my-2 opacity-30" />
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0 text-[10px] opacity-80">
                  {weather.forecast.slice(0, 4).map((d) => (
                    <li key={d.day} className="rounded border px-2 py-1" style={{ borderColor: 'var(--border)' }}>
                      {d.day} {d.icon} {d.high}°
                    </li>
                  ))}
                </ul>
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 opacity-30" aria-hidden>
                  <svg viewBox="0 0 320 56" className="h-full w-full" preserveAspectRatio="none">
                    <path
                      fill="var(--accent2)"
                      d="M0 56 L0 40 Q80 20 160 36 T320 32 L320 56 Z"
                      opacity="0.4"
                    />
                  </svg>
                </div>
              </div>
            </section>

            <section className="card card-border border-2 shadow-lg" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <div className="card-body gap-3 p-4">
                <h3 className="m-0 text-xs font-bold tracking-[0.25em]" style={{ color: 'var(--accent3)' }}>
                  会の金融線
                </h3>
                <p className="m-0 text-[10px] opacity-50">※ 任侠ルール：赤が上、緑が下（映画の見た目です）</p>
                {stocks.map((s, i) => {
                  const up = s.changePct >= 0
                  const stroke = up ? stockUpColor : stockDownColor
                  return (
                    <div
                      key={s.ticker}
                      className="yakuza-boss-stock-row flex items-center gap-2 rounded-lg border px-2 py-2"
                      style={{ animationDelay: `${i * 0.35}s` }}
                      style={{
                        borderColor: 'var(--border)',
                        background: up ? 'color-mix(in srgb, #7f1d1d 18%, transparent)' : 'color-mix(in srgb, #14532d 14%, transparent)',
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-bold">{s.ticker}</span>
                          <span className="text-sm font-black tabular-nums" style={{ color: stroke }}>
                            {up ? '↗' : '↘'} {s.changePct > 0 ? '+' : ''}
                            {s.changePct}%
                          </span>
                        </div>
                        <p className="m-0 truncate text-[10px] opacity-50">{s.name}</p>
                      </div>
                      <MiniSpark series={s.series} stroke={stroke} />
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="card border-2 shadow-md" style={{ borderColor: 'var(--accent)', background: 'color-mix(in srgb, var(--card) 88%, var(--accent2))' }}>
              <div className="card-body max-h-56 overflow-y-auto p-3">
                <h3 className="m-0 mb-2 text-xs font-bold tracking-[0.25em]" style={{ color: 'var(--accent3)' }}>
                  テレビ欄外伝
                </h3>
                <ul className="m-0 list-none space-y-2 p-0">
                  {news.map((n) => (
                    <li key={n.id} className="rounded-md border bg-base-100/5 p-2 text-xs backdrop-blur-sm" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex items-start gap-2">
                        <span className="text-lg leading-none">{n.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <p className="m-0 font-bold leading-snug">{n.title}</p>
                          <p className="m-0 mt-0.5 text-[10px] opacity-60">
                            {n.source} · {n.time}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] tracking-widest opacity-40" style={{ color: 'var(--text2)' }}>
          本画面はフィクションの事務所です · 仁義なきブラウザ
        </p>
      </div>
    </div>
  )
}
