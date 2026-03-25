import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagLabel = (t) =>
  ({
    work: '勤務',
    personal: '私信',
    finance: '金融',
    promo: '案内',
    newsletter: '広報',
    social: '社交',
    dev: '開発',
    shopping: '買物',
    travel: '旅',
  }[t] || '通信')

const telopLine = news.map((n) => `${n.emoji} ${n.title}`).join('  ·  ')

export default function JapanesePatriotLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="jp-patriot-root relative min-h-dvh overflow-x-hidden pb-4"
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 100% -20%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 55%),
          radial-gradient(ellipse 80% 50% at 0% 100%, color-mix(in srgb, var(--accent2) 12%, transparent), transparent 50%),
          linear-gradient(168deg, var(--bg) 0%, var(--bg2) 45%, color-mix(in srgb, var(--bg) 88%, var(--accent2)) 100%)
        `,
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      {/* Rising sun + rays */}
      <div className="pointer-events-none absolute -right-24 -top-28 z-0 h-[min(52vw,420px)] w-[min(52vw,420px)] md:-right-16 md:-top-20" aria-hidden>
        <div className="jp-patriot-rays absolute inset-0 flex items-center justify-center opacity-[0.14]">
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, var(--accent) 0deg 4deg, transparent 4deg 10deg, var(--accent) 10deg 14deg, transparent 14deg 22deg, var(--accent) 22deg 26deg, transparent 26deg 34deg, var(--accent) 34deg 38deg, transparent 38deg 46deg, var(--accent) 46deg 50deg, transparent 50deg 58deg, var(--accent) 58deg 62deg, transparent 62deg 70deg, var(--accent) 70deg 74deg, transparent 74deg 82deg, var(--accent) 82deg 86deg, transparent 86deg 94deg, var(--accent) 94deg 98deg, transparent 98deg 106deg, var(--accent) 106deg 110deg, transparent 110deg 118deg, var(--accent) 118deg 122deg, transparent 122deg 130deg, var(--accent) 130deg 134deg, transparent 134deg 142deg, var(--accent) 142deg 146deg, transparent 146deg 154deg, var(--accent) 154deg 158deg, transparent 158deg 166deg, var(--accent) 166deg 170deg, transparent 170deg 178deg, var(--accent) 178deg 182deg, transparent 182deg 190deg, var(--accent) 190deg 194deg, transparent 194deg 202deg, var(--accent) 202deg 206deg, transparent 206deg 214deg, var(--accent) 214deg 218deg, transparent 218deg 226deg, var(--accent) 226deg 230deg, transparent 230deg 238deg, var(--accent) 238deg 242deg, transparent 242deg 250deg, var(--accent) 250deg 254deg, transparent 254deg 262deg, var(--accent) 262deg 266deg, transparent 266deg 274deg, var(--accent) 274deg 278deg, transparent 278deg 286deg, var(--accent) 286deg 290deg, transparent 290deg 298deg, var(--accent) 298deg 302deg, transparent 302deg 310deg, var(--accent) 310deg 314deg, transparent 314deg 322deg, var(--accent) 322deg 326deg, transparent 326deg 334deg, var(--accent) 334deg 338deg, transparent 338deg 346deg, var(--accent) 346deg 350deg, transparent 350deg 358deg, var(--accent) 358deg 360deg)`,
            }}
          />
        </div>
        <div
          className="jp-patriot-sun-glow absolute left-1/2 top-1/2 z-10 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'var(--accent)', boxShadow: '0 0 60px color-mix(in srgb, var(--accent) 45%, transparent)' }}
        />
      </div>

      {/* Paper cranes */}
      <span className="jp-patriot-crane pointer-events-none absolute left-0 top-[18%] z-[1] text-3xl opacity-70 md:text-4xl" aria-hidden>
        🕊️
      </span>
      <span className="jp-patriot-crane-delay pointer-events-none absolute left-0 top-[32%] z-[1] text-2xl opacity-50 md:text-3xl" aria-hidden>
        🕊️
      </span>

      <div className="relative z-10 mx-auto max-w-6xl px-3 pt-4 md:px-5 md:pt-6">
        <header className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b-2 pb-4" style={{ borderColor: 'var(--accent)' }}>
          <div>
            <p className="m-0 text-[10px] font-bold tracking-[0.35em] opacity-70" style={{ color: 'var(--accent2)' }}>
              朝日コマンド · RISING SUN DASH
            </p>
            <h1
              className="m-0 mt-1 text-3xl font-black tracking-tight md:text-4xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
            >
              愛国ダッシュボード
            </h1>
            <p className="m-0 mt-1 max-w-xl text-sm opacity-80" style={{ color: 'var(--text2)' }}>
              御消息 · 天候 · 速報 · 株式戦線 — 一画面で天下統一（のつもり）
            </p>
          </div>
          <button
            type="button"
            className="btn btn-sm gap-2 border-2 bg-base-100/80 backdrop-blur-sm"
            style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}
            onClick={onSwitchPersona}
          >
            <span aria-hidden>🎌</span>
            別の魂へ
          </button>
        </header>

        {/* TV-style telop */}
        <div
          className="mb-4 overflow-hidden rounded-sm border-2 py-2 shadow-md"
          style={{ borderColor: 'var(--accent)', background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)' }}
          role="region"
          aria-label="Scrolling news headlines"
        >
          <div className="jp-patriot-telop-track text-sm font-bold tracking-wide text-white">
            <span className="whitespace-nowrap px-6">
              <span className="mr-3 rounded bg-[var(--accent)] px-2 py-0.5 text-xs text-white">速報</span>
              {telopLine}
            </span>
            <span className="whitespace-nowrap px-6" aria-hidden>
              <span className="mr-3 rounded bg-[var(--accent)] px-2 py-0.5 text-xs text-white">速報</span>
              {telopLine}
            </span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Inbox */}
          <aside className="lg:col-span-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl" aria-hidden>
                📮
              </span>
              <h2 className="m-0 text-sm font-black tracking-widest" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                御消息リスト
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
                    className={`card card-border w-full text-left transition-all hover:scale-[1.01] ${on ? 'ring-2 ring-[var(--accent)]' : ''}`}
                    style={{
                      borderColor: on ? 'var(--accent)' : 'var(--border)',
                      background: on ? 'color-mix(in srgb, var(--accent) 8%, var(--card))' : 'var(--card)',
                    }}
                  >
                    <div className="card-body gap-2 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-2xl leading-none">{e.from.avatar}</span>
                        <div className="flex flex-wrap justify-end gap-1">
                          {!e.read && (
                            <span className="jp-patriot-stamp badge border-0 text-xs font-black text-white" style={{ background: 'var(--accent)' }}>
                              未開封
                            </span>
                          )}
                          <span className="badge badge-ghost badge-xs">{tagLabel(e.tag)}</span>
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

          {/* Email body */}
          <main className="lg:col-span-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="jp-patriot-stamp inline-flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg" style={{ borderColor: 'var(--accent3)', color: 'var(--accent2)' }} aria-hidden>
                印
              </span>
              <h2 className="m-0 text-sm font-black tracking-widest" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                勅書ビューア
              </h2>
            </div>
            {selectedEmail ? (
              <div
                className="card border-2 shadow-lg"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent2) 35%, var(--border))',
                  background: `
                    linear-gradient(145deg, color-mix(in srgb, var(--card) 95%, var(--accent3)) 0%, var(--card) 40%),
                    repeating-linear-gradient(0deg, transparent, transparent 31px, color-mix(in srgb, var(--accent2) 6%, transparent) 31px, color-mix(in srgb, var(--accent2) 6%, transparent) 32px)
                  `,
                }}
              >
                <div className="card-body p-4 md:p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--border)' }}>
                    <div>
                      <p className="m-0 text-xs opacity-60">{selectedEmail.date}</p>
                      <h3 className="m-0 mt-1 text-lg font-black md:text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                        {selectedEmail.subject}
                      </h3>
                      <p className="m-0 mt-1 text-sm opacity-80">
                        {selectedEmail.from.avatar} {selectedEmail.from.name}
                      </p>
                    </div>
                    <span className="badge badge-outline" style={{ borderColor: 'var(--accent3)', color: 'var(--accent2)' }}>
                      {tagLabel(selectedEmail.tag)}
                    </span>
                  </div>
                  <div className="max-h-[min(48vh,520px)] overflow-y-auto whitespace-pre-wrap text-sm leading-[1.85] opacity-90">
                    {selectedEmail.body}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex min-h-[200px] flex-col items-center justify-center rounded-box border-2 border-dashed p-8 opacity-50"
                style={{ borderColor: 'var(--border)' }}
              >
                <p className="m-0 text-center text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                  左の御消息を
                  <br />
                  お選びください
                </p>
              </div>
            )}
          </main>

          {/* Weather + stocks + news cards */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <section
              className="card card-border overflow-hidden border-2 shadow-md"
              style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}
            >
              <div className="relative px-4 pb-8 pt-4">
                <h3 className="m-0 text-xs font-black tracking-[0.2em] opacity-70" style={{ color: 'var(--accent2)' }}>
                  天候御挨拶
                </h3>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-5xl">{weather.icon}</span>
                  <div>
                    <p className="m-0 text-2xl font-black">{weather.temp}°C</p>
                    <p className="m-0 text-sm opacity-75">{weather.condition}</p>
                    <p className="m-0 text-xs opacity-50">
                      {weather.city} · 湿度 {weather.humidity}%
                    </p>
                  </div>
                </div>
                {/* Mt. Fuji silhouette */}
                <div className="jp-patriot-fuji pointer-events-none absolute bottom-0 left-0 right-0 h-16 opacity-50" aria-hidden>
                  <svg viewBox="0 0 320 80" className="h-full w-full" preserveAspectRatio="none">
                    <path
                      fill="var(--accent2)"
                      d="M0 80 L0 55 L45 40 L80 52 L120 22 L160 8 L200 24 L240 48 L280 38 L320 50 L320 80 Z"
                      opacity="0.35"
                    />
                    <path fill="var(--card)" d="M120 22 L160 8 L200 24 L180 32 L160 28 L140 32 Z" opacity="0.9" />
                  </svg>
                </div>
              </div>
            </section>

            <section className="card card-border border-2 shadow" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <div className="card-body gap-3 p-4">
                <h3 className="m-0 text-xs font-black tracking-[0.2em]" style={{ color: 'var(--accent2)' }}>
                  株式戦線
                </h3>
                {stocks.map((s) => (
                  <div
                    key={s.ticker}
                    className="flex items-center gap-2 rounded-lg border px-2 py-2"
                    style={{
                      borderColor: 'var(--border)',
                      background: s.changePct >= 0 ? 'color-mix(in srgb, #166534 8%, transparent)' : 'color-mix(in srgb, var(--accent) 7%, transparent)',
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-black">{s.ticker}</span>
                        <span className={`text-sm font-black ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                          {s.changePct >= 0 ? '↗' : '↘'} {s.changePct > 0 ? '+' : ''}
                          {s.changePct}%
                        </span>
                      </div>
                      <p className="m-0 truncate text-[10px] opacity-50">{s.name}</p>
                    </div>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#16a34a' : 'var(--accent)'} />
                  </div>
                ))}
              </div>
            </section>

            <section className="card border-2 shadow" style={{ borderColor: 'var(--accent)', background: 'color-mix(in srgb, var(--card) 92%, var(--accent))' }}>
              <div className="card-body max-h-64 overflow-y-auto p-3">
                <h3 className="m-0 mb-2 text-xs font-black tracking-[0.2em]" style={{ color: 'var(--accent2)' }}>
                  ニュース陣
                </h3>
                <ul className="m-0 list-none space-y-2 p-0">
                  {news.map((n) => (
                    <li key={n.id} className="rounded-md border bg-base-100/90 p-2 text-xs shadow-sm" style={{ borderColor: 'var(--border)' }}>
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
          本画面は愛とテクノロジーのフィクションです · 誇り高き一日を
        </p>
      </div>
    </div>
  )
}
