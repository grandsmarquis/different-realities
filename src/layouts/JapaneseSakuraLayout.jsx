import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const PETALS = [
  { drift: '18px', dur: '12s', delay: '0s', left: '8%' },
  { drift: '-32px', dur: '16s', delay: '1s', left: '22%' },
  { drift: '24px', dur: '14s', delay: '2.5s', left: '41%' },
  { drift: '-20px', dur: '18s', delay: '0.8s', left: '58%' },
  { drift: '40px', dur: '13s', delay: '3s', left: '73%' },
  { drift: '-14px', dur: '15s', delay: '4s', left: '88%' },
  { drift: '28px', dur: '17s', delay: '1.2s', left: '95%' },
]

export default function JapaneseSakuraLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: `
          radial-gradient(ellipse 90% 60% at 10% 20%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 50%),
          radial-gradient(ellipse 70% 50% at 90% 10%, color-mix(in srgb, var(--accent2) 12%, transparent), transparent 48%),
          radial-gradient(ellipse 80% 45% at 50% 100%, color-mix(in srgb, var(--accent3) 35%, transparent), transparent 55%),
          linear-gradient(185deg, var(--bg2) 0%, var(--bg) 42%, color-mix(in srgb, var(--bg) 92%, var(--accent3)) 100%)
        `,
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="sakura-petal sakura-petal--pastel"
          style={{
            left: p.left,
            '--sakura-drift': p.drift,
            '--sakura-dur': p.dur,
            '--sakura-delay': p.delay,
          }}
          aria-hidden
        >
          🌸
        </span>
      ))}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, color-mix(in srgb, var(--accent) 35%, transparent) 0 1px, transparent 1px 52px),
            repeating-linear-gradient(0deg, color-mix(in srgb, var(--accent2) 30%, transparent) 0 1px, transparent 1px 52px)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        <aside
          className="order-2 flex w-full shrink-0 flex-col border-t lg:order-1 lg:w-52 lg:border-r lg:border-t-0"
          style={{
            borderColor: 'var(--border)',
            background: 'linear-gradient(180deg, color-mix(in srgb, var(--card) 88%, var(--accent2)) 0%, var(--card) 100%)',
          }}
        >
          <div className="overflow-x-hidden border-b py-2" style={{ borderColor: 'var(--border)' }}>
            <div className="sakura-river-flow flex w-max whitespace-nowrap text-[10px] tracking-[0.4em]" style={{ color: 'color-mix(in srgb, var(--accent) 65%, var(--text2))' }}>
              <span className="px-4">川 · KAWA · RIVER OF LETTERS · 川 · KAWA ·</span>
              <span className="px-4">川 · KAWA · RIVER OF LETTERS · 川 · KAWA ·</span>
            </div>
          </div>
          <nav className="max-h-[40vh] overflow-y-auto lg:max-h-none lg:flex-1">
            {emails.map(e => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelectedEmail(e)}
                className="flex w-full flex-col gap-1 border-b px-3 py-4 text-left transition-colors hover:bg-white/5"
                style={{
                  borderColor: 'var(--border)',
                  background: selectedEmail?.id === e.id ? 'color-mix(in srgb, var(--accent2) 22%, var(--card))' : undefined,
                }}
              >
                <span className="text-lg">{e.from.avatar}</span>
                <span className="line-clamp-2 text-xs leading-snug opacity-90" style={{ fontFamily: 'var(--font-display)' }}>
                  {e.subject}
                </span>
                {!e.read && (
                  <span className="badge badge-xs w-fit border-0 text-white" style={{ background: 'color-mix(in srgb, var(--accent) 75%, #e879a9)' }}>
                    新
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="hidden p-3 text-[10px] leading-relaxed opacity-60 lg:block" style={{ borderTop: '1px solid var(--border)' }}>
            <p>季節の便り</p>
            <p className="mt-1">{weather.icon} {weather.condition}</p>
          </div>
        </aside>

        <div className="order-1 flex min-w-0 flex-1 flex-col lg:order-2">
          <header
            className="flex flex-wrap items-center justify-between gap-4 border-b px-5 py-6"
            style={{
              borderColor: 'var(--border)',
              background: 'linear-gradient(180deg, color-mix(in srgb, var(--card) 70%, transparent) 0%, transparent 100%)',
            }}
          >
            <div>
              <p className="text-[10px] tracking-[0.5em]" style={{ color: 'var(--text2)' }}>
                花見 · HANAMI MAIL
              </p>
              <h1
                className="mt-1 text-3xl md:text-4xl"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'color-mix(in srgb, var(--accent) 55%, var(--text))',
                }}
              >
                桜下の手紙
              </h1>
            </div>
            <button
              type="button"
              onClick={onSwitchPersona}
              className="btn btn-ghost btn-sm gap-2 border border-transparent text-xs tracking-widest hover:border-[var(--border)]"
              style={{ color: 'var(--text2)' }}
            >
              別の季節へ
            </button>
          </header>

          <main className="flex-1 overflow-y-auto p-5 md:p-10">
            {selectedEmail ? (
              <div
                className="relative mx-auto max-w-2xl rounded-2xl border-2 px-6 py-10 shadow-xl md:px-14 md:py-12"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent2) 45%, var(--border))',
                  background: `
                    linear-gradient(135deg, color-mix(in srgb, var(--card) 92%, var(--accent3)) 0%, transparent 38%),
                    linear-gradient(180deg, #ffffff 0%, var(--card) 28%, color-mix(in srgb, var(--card) 96%, var(--accent)) 100%)
                  `,
                  boxShadow: '0 24px 48px -24px color-mix(in srgb, var(--accent2) 28%, transparent), 0 1px 0 color-mix(in srgb, #fff 80%, transparent)',
                }}
              >
                <div
                  className="pointer-events-none absolute left-0 top-0 h-full w-3 border-r opacity-50"
                  style={{ borderColor: 'color-mix(in srgb, var(--accent) 50%, transparent)' }}
                  aria-hidden
                />
                <div className="mb-8 flex flex-wrap justify-between gap-4 border-b pb-6" style={{ borderColor: 'var(--border)' }}>
                  <h2 className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {selectedEmail.subject}
                  </h2>
                  <div className="text-right text-sm opacity-70">
                    <p>{selectedEmail.from.name}</p>
                    <p className="mt-1 text-xs">{selectedEmail.date}</p>
                  </div>
                </div>
                <div className="whitespace-pre-wrap leading-[1.85] opacity-90">{selectedEmail.body}</div>
                <div className="mt-10 flex justify-end gap-2 opacity-50">
                  <span className="text-2xl" aria-hidden>
                    🍵
                  </span>
                  <span className="text-2xl" aria-hidden>
                    🌙
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center opacity-50">
                <p className="text-center text-lg tracking-wide" style={{ fontFamily: 'var(--font-display)', color: 'var(--text2)' }}>
                  左の川から
                  <br />
                  一通を選んでください
                </p>
              </div>
            )}
          </main>

          <footer
            className="flex flex-wrap gap-3 border-t p-4 text-xs"
            style={{
              borderColor: 'var(--border)',
              background: 'linear-gradient(0deg, color-mix(in srgb, var(--bg) 85%, var(--accent3)) 0%, var(--bg) 100%)',
            }}
          >
            {stocks.map(s => (
              <span
                key={s.ticker}
                className="badge badge-outline badge-sm gap-1"
                style={{ borderColor: 'color-mix(in srgb, var(--accent2) 35%, var(--border))', color: 'var(--text2)' }}
              >
                {s.ticker} {s.changePct}%
              </span>
            ))}
            <span className="badge badge-ghost badge-sm max-w-full truncate lg:ml-auto">{news[0]?.title}</span>
          </footer>
        </div>
      </div>
    </div>
  )
}
