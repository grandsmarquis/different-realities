import { useId } from 'react'
import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagLabel = (t) =>
  ({
    work: '직장',
    personal: '사적',
    finance: '금융',
    promo: '안내',
    newsletter: '소식',
    social: '교제',
    dev: '개발',
    shopping: '구매',
    travel: '여행',
  }[t] || '통신')

const telopLine = news.map((n) => `${n.emoji} ${n.title}`).join('  ·  ')

function VictoryStar({ className }) {
  const gid = useId().replace(/:/g, '')
  const gradId = `nkStarGrad-${gid}`
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4d6d" />
          <stop offset="55%" stopColor="#c41e3a" />
          <stop offset="100%" stopColor="#7a1020" />
        </linearGradient>
      </defs>
      <polygon
        fill={`url(#${gradId})`}
        stroke="#d4af37"
        strokeWidth="2"
        points="50,6 61,38 96,38 68,58 79,92 50,72 21,92 32,58 4,38 39,38"
      />
    </svg>
  )
}

export default function NorthKoreanPatriotLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="nk-patriot-root relative min-h-dvh overflow-x-hidden pb-4"
      style={{
        background: `
          radial-gradient(ellipse 90% 60% at 50% -30%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 50%),
          radial-gradient(ellipse 70% 45% at 100% 80%, color-mix(in srgb, var(--accent3) 35%, transparent), transparent 45%),
          linear-gradient(175deg, var(--bg) 0%, var(--bg2) 42%, #05080c 100%)
        `,
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      {/* CRT scanlines */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.035]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.45) 2px, rgba(0,0,0,0.45) 3px)',
        }}
        aria-hidden
      />

      {/* Ribbon waves */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.12]" aria-hidden>
        <div className="nk-patriot-ribbon-a absolute -left-1/4 top-[12%] h-24 w-[150%] -rotate-6 rounded-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent blur-sm" />
        <div className="nk-patriot-ribbon-b absolute -right-1/4 top-[55%] h-20 w-[150%] rotate-3 rounded-full bg-gradient-to-r from-transparent via-[var(--accent2)] to-transparent blur-sm" />
      </div>

      {/* Corner stars */}
      <VictoryStar className="nk-patriot-star-a pointer-events-none absolute -left-6 top-8 z-[1] h-24 w-24 opacity-90 drop-shadow-[0_0_20px_rgba(196,30,58,0.5)] md:left-2 md:h-28 md:w-28" />
      <VictoryStar className="nk-patriot-star-b pointer-events-none absolute -right-4 top-[22%] z-[1] h-16 w-16 opacity-70 md:right-4 md:h-20 md:w-20" />

      {/* Tower silhouette */}
      <div className="pointer-events-none absolute bottom-0 right-[-5%] z-0 w-[min(42vw,280px)] opacity-25 md:right-[2%]" aria-hidden>
        <div className="nk-patriot-tower">
          <svg viewBox="0 0 120 200" className="h-auto w-full" preserveAspectRatio="xMidYMax meet">
            <defs>
              <linearGradient id="nkTowerGlow" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#1a2744" />
                <stop offset="100%" stopColor="#3d5a80" />
              </linearGradient>
            </defs>
            <path
              fill="url(#nkTowerGlow)"
              d="M60 4 L72 28 L68 32 L75 195 L45 195 L52 32 L48 28 Z"
            />
            <path fill="var(--accent2)" opacity="0.35" d="M58 40 L62 40 L61 52 L59 52 Z" />
            <path fill="var(--accent2)" opacity="0.25" d="M56 70 L64 70 L63 85 L57 85 Z" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 pt-4 md:px-5 md:pt-6">
        <header className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b-4 pb-4" style={{ borderColor: 'var(--accent)' }}>
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <span className="nk-patriot-seal hidden shrink-0 sm:inline-flex" aria-hidden>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-4 text-2xl" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
                ★
              </span>
            </span>
            <div className="min-w-0">
              <p className="m-0 text-[10px] font-bold tracking-[0.4em] opacity-80" style={{ color: 'var(--accent2)', fontFamily: 'var(--font-display)' }}>
                조선 중앙 정보 단말 · VICTORY FEED
              </p>
              <h1
                className="m-0 mt-1 text-3xl font-black uppercase tracking-tight md:text-[2.15rem]"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text)',
                  textShadow: '0 0 24px color-mix(in srgb, var(--accent) 45%, transparent), 2px 2px 0 var(--accent3)',
                }}
              >
                단일화 대시보드
              </h1>
              <p className="m-0 mt-1 max-w-xl text-sm leading-snug opacity-85" style={{ color: 'var(--text2)', fontFamily: 'var(--font-display)' }}>
                서신 · 하늘 보고 · 위대한 소식 · 경제 전선 — 한 화면에 모은 필승 데이터 (패러디)
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm gap-2 border-2 bg-base-100/10 text-base-100 backdrop-blur-sm hover:bg-base-100/20"
            style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}
            onClick={onSwitchPersona}
          >
            <span aria-hidden>🌐</span>
            다른 세계로
          </button>
        </header>

        {/* Broadcast ticker */}
        <div
          className="mb-4 overflow-hidden rounded-none border-y-4 py-2 shadow-lg"
          style={{ borderColor: 'var(--accent)', background: 'linear-gradient(180deg, #0a0f18 0%, #050810 100%)' }}
          role="region"
          aria-label="Scrolling news headlines"
        >
          <div className="nk-patriot-telop-track flex text-sm font-bold tracking-wide text-[#fef9c3]">
            <span className="whitespace-nowrap px-6">
              <span className="mr-3 rounded-none border-2 px-2 py-0.5 text-xs text-[var(--accent2)]" style={{ borderColor: 'var(--accent2)' }}>
                속보
              </span>
              {telopLine}
            </span>
            <span className="whitespace-nowrap px-6" aria-hidden>
              <span className="mr-3 rounded-none border-2 px-2 py-0.5 text-xs text-[var(--accent2)]" style={{ borderColor: 'var(--accent2)' }}>
                속보
              </span>
              {telopLine}
            </span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl" aria-hidden>
                ✉️
              </span>
              <h2 className="m-0 text-sm font-black uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                공민 서신 목록
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
                    className={`card card-border w-full text-left transition-transform hover:scale-[1.02] ${on ? 'ring-2 ring-[var(--accent)]' : ''}`}
                    style={{
                      borderColor: on ? 'var(--accent)' : 'var(--border)',
                      background: on ? 'color-mix(in srgb, var(--accent) 12%, var(--card))' : 'var(--card)',
                      borderWidth: 2,
                    }}
                  >
                    <div className="card-body gap-2 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-2xl leading-none">{e.from.avatar}</span>
                        <div className="flex flex-wrap justify-end gap-1">
                          {!e.read && (
                            <span className="nk-patriot-stamp badge border-0 text-xs font-black uppercase text-white" style={{ background: 'var(--accent)' }}>
                              미열람
                            </span>
                          )}
                          <span className="badge badge-outline badge-xs border-[var(--accent2)] text-[var(--accent2)]">{tagLabel(e.tag)}</span>
                        </div>
                      </div>
                      <p className={`m-0 line-clamp-2 text-sm leading-snug ${e.read ? 'opacity-75' : 'font-bold'}`} style={{ fontFamily: 'var(--font-display)' }}>
                        {e.subject}
                      </p>
                      <p className="m-0 text-xs opacity-60">{e.from.name}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-5">
            <div className="mb-2 flex items-center gap-2">
              <span
                className="nk-patriot-stamp inline-flex h-10 w-10 items-center justify-center border-2 text-sm font-black"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent2)', background: 'var(--card)' }}
                aria-hidden
              >
                准
              </span>
              <h2 className="m-0 text-sm font-black uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                공식 열람 창
              </h2>
            </div>
            {selectedEmail ? (
              <div
                className="card border-4 shadow-2xl"
                style={{
                  borderColor: 'var(--accent3)',
                  background: `
                    linear-gradient(160deg, color-mix(in srgb, var(--card) 92%, var(--accent3)) 0%, var(--card) 50%),
                    repeating-linear-gradient(90deg, transparent, transparent 40px, color-mix(in srgb, var(--accent) 4%, transparent) 40px, color-mix(in srgb, var(--accent) 4%, transparent) 41px)
                  `,
                }}
              >
                <div className="card-body p-4 md:p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b-2 pb-3" style={{ borderColor: 'var(--border)' }}>
                    <div>
                      <p className="m-0 text-xs opacity-60">{selectedEmail.date}</p>
                      <h3 className="m-0 mt-1 text-lg font-black md:text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                        {selectedEmail.subject}
                      </h3>
                      <p className="m-0 mt-1 text-sm opacity-85">
                        {selectedEmail.from.avatar} {selectedEmail.from.name}
                      </p>
                    </div>
                    <span className="badge badge-lg border-2 font-bold" style={{ borderColor: 'var(--accent)', color: 'var(--text)' }}>
                      {tagLabel(selectedEmail.tag)}
                    </span>
                  </div>
                  <div className="max-h-[min(48vh,520px)] overflow-y-auto whitespace-pre-wrap text-sm leading-[1.85] opacity-90" style={{ fontFamily: 'var(--font-display)' }}>
                    {selectedEmail.body}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex min-h-[200px] flex-col items-center justify-center border-4 border-dashed p-8 opacity-50"
                style={{ borderColor: 'var(--border)' }}
              >
                <p className="m-0 text-center text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                  왼쪽 목록에서
                  <br />
                  서신을 선택하십시오
                </p>
              </div>
            )}
          </main>

          <div className="flex flex-col gap-4 lg:col-span-3">
            <section className="card card-border overflow-hidden border-4 shadow-xl" style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}>
              <div className="relative px-4 pb-10 pt-4">
                <h3 className="m-0 text-xs font-black uppercase tracking-[0.25em] opacity-90" style={{ color: 'var(--accent2)', fontFamily: 'var(--font-display)' }}>
                  혁명적 기후 보고
                </h3>
                <div className="mt-3 flex items-center gap-3">
                  <span className="nk-patriot-weather-emoji text-5xl drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">{weather.icon}</span>
                  <div>
                    <p className="m-0 text-3xl font-black tracking-tight">{weather.temp}°C</p>
                    <p className="m-0 text-sm opacity-80" style={{ fontFamily: 'var(--font-display)' }}>
                      {weather.condition}
                    </p>
                    <p className="m-0 text-xs opacity-55">
                      {weather.city} · 습도 {weather.humidity}%
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 opacity-40" aria-hidden>
                  <svg viewBox="0 0 320 56" className="h-full w-full" preserveAspectRatio="none">
                    <path fill="var(--accent3)" d="M0 56 L0 40 L60 28 L100 38 L160 12 L220 36 L280 22 L320 34 L320 56 Z" opacity="0.5" />
                    <path fill="var(--accent2)" d="M0 56 L320 56 L320 48 L0 48 Z" opacity="0.3" />
                  </svg>
                </div>
              </div>
            </section>

            <section className="card card-border border-4 shadow-lg" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <div className="card-body gap-3 p-4">
                <h3 className="m-0 text-xs font-black uppercase tracking-[0.25em]" style={{ color: 'var(--accent2)', fontFamily: 'var(--font-display)' }}>
                  경제 전선
                </h3>
                {stocks.map((s) => (
                  <div
                    key={s.ticker}
                    className="flex items-center gap-2 border-2 px-2 py-2"
                    style={{
                      borderColor: 'var(--border)',
                      background: s.changePct >= 0 ? 'color-mix(in srgb, #166534 12%, transparent)' : 'color-mix(in srgb, var(--accent) 10%, transparent)',
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-black tracking-wide">{s.ticker}</span>
                        <span className={`text-sm font-black ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                          {s.changePct >= 0 ? '▲' : '▼'} {s.changePct > 0 ? '+' : ''}
                          {s.changePct}%
                        </span>
                      </div>
                      <p className="m-0 truncate text-[10px] opacity-50">{s.name}</p>
                    </div>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#22c55e' : '#f87171'} />
                  </div>
                ))}
              </div>
            </section>

            <section className="card border-4 shadow-xl" style={{ borderColor: 'var(--accent2)', background: 'color-mix(in srgb, var(--card) 88%, var(--accent3))' }}>
              <div className="card-body max-h-64 overflow-y-auto p-3">
                <h3 className="m-0 mb-2 text-xs font-black uppercase tracking-[0.25em]" style={{ color: 'var(--accent2)', fontFamily: 'var(--font-display)' }}>
                  위대한 소식
                </h3>
                <ul className="m-0 list-none space-y-2 p-0">
                  {news.map((n) => (
                    <li
                      key={n.id}
                      className="rounded-none border-2 bg-base-100/5 p-2 text-xs shadow-md backdrop-blur-sm"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg leading-none">{n.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <p className="m-0 font-bold leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                            {n.title}
                          </p>
                          <p className="m-0 mt-0.5 text-[10px] opacity-55">
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

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.35em] opacity-45" style={{ color: 'var(--text2)', fontFamily: 'var(--font-display)' }}>
          본 화면은 창작 유머입니다 · 실제 방송과 무관합니다
        </p>
      </div>
    </div>
  )
}
