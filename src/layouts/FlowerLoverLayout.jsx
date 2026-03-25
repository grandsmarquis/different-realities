import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

/** Pink-forward blooms for beds and repeats */
const FLORAL = ['🌸', '🌷', '💮', '🏵️', '🌺', '💐', '🪷', '🌹', '💕', '🌼', '✿', '❀']

/** Scattered fixed flowers: top %, left %, size rem, delay s, tilt deg */
const SCATTER = [
  { t: 6, l: 4, s: 1.75, d: 0, tilt: -6 },
  { t: 14, l: 18, s: 1.35, d: 0.3, tilt: 4 },
  { t: 8, l: 88, s: 1.9, d: 0.1, tilt: 8 },
  { t: 22, l: 94, s: 1.2, d: 0.5, tilt: -3 },
  { t: 38, l: 2, s: 1.5, d: 0.2, tilt: 5 },
  { t: 52, l: 8, s: 1.65, d: 0.7, tilt: -8 },
  { t: 68, l: 5, s: 1.25, d: 0.4, tilt: 2 },
  { t: 45, l: 96, s: 1.55, d: 0.6, tilt: -5 },
  { t: 62, l: 91, s: 1.4, d: 0.15, tilt: 7 },
  { t: 78, l: 12, s: 1.8, d: 0.8, tilt: -4 },
  { t: 88, l: 28, s: 1.3, d: 0.35, tilt: 6 },
  { t: 92, l: 72, s: 1.6, d: 0.55, tilt: -7 },
  { t: 30, l: 48, s: 1.1, d: 0.9, tilt: 3 },
  { t: 55, l: 42, s: 1.45, d: 0.25, tilt: -2 },
  { t: 72, l: 52, s: 1.15, d: 0.65, tilt: 9 },
  { t: 18, l: 52, s: 1.7, d: 0.45, tilt: -9 },
  { t: 95, l: 48, s: 1.5, d: 0.75, tilt: 0 },
]

export default function FlowerLoverLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: `
          radial-gradient(ellipse 100% 60% at 50% -15%, color-mix(in srgb, var(--accent2) 35%, transparent), transparent 55%),
          radial-gradient(ellipse 70% 45% at 0% 40%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 50%),
          radial-gradient(ellipse 60% 50% at 100% 60%, color-mix(in srgb, var(--accent2) 22%, transparent), transparent 50%),
          linear-gradient(180deg, var(--bg2) 0%, var(--bg) 45%, color-mix(in srgb, var(--accent3) 85%, #1a0f18) 100%)
        `,
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      {SCATTER.map((pos, i) => (
        <span
          key={`scatter-${i}`}
          className="flower-bob pointer-events-none fixed z-[1] select-none opacity-[0.55] md:opacity-70"
          style={{
            top: `${pos.t}%`,
            left: `${pos.l}%`,
            fontSize: `clamp(${pos.s * 0.85}rem, ${pos.s * 1.1}vw, ${pos.s * 1.15}rem)`,
            animationDelay: `${pos.d}s`,
            '--fl-tilt': `${pos.tilt}deg`,
          }}
          aria-hidden
        >
          {FLORAL[i % FLORAL.length]}
        </span>
      ))}

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.45]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 25%, color-mix(in srgb, var(--accent2) 20%, transparent) 0 3px, transparent 4px),
            radial-gradient(circle at 75% 55%, color-mix(in srgb, var(--accent) 16%, transparent) 0 2px, transparent 3px),
            radial-gradient(circle at 40% 80%, color-mix(in srgb, var(--accent2) 14%, transparent) 0 2px, transparent 3px)
          `,
          backgroundSize: '56px 56px, 72px 72px, 64px 64px',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-between px-2 pt-2 opacity-50 md:px-6"
        aria-hidden
      >
        <span className="flower-bob text-2xl md:text-3xl" style={{ '--fl-tilt': '-12deg', animationDelay: '0.1s' }}>
          🌸
        </span>
        <span className="flower-bob text-3xl md:text-4xl" style={{ '--fl-tilt': '10deg', animationDelay: '0.4s' }}>
          🌷
        </span>
        <span className="flower-bob text-2xl md:text-3xl" style={{ '--fl-tilt': '6deg', animationDelay: '0.2s' }}>
          💮
        </span>
      </div>

      <header
        className="relative z-10 border-b px-4 py-8 text-center md:px-8"
        style={{
          borderColor: 'var(--border)',
          background: 'linear-gradient(180deg, color-mix(in srgb, var(--accent3) 40%, transparent) 0%, transparent 100%)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-6 overflow-hidden opacity-[0.22] md:gap-10" aria-hidden>
          {['🌸', '🌺', '🌷', '🪷', '💐', '🌹', '🌸', '🌺'].map((f, i) => (
            <span key={i} className="flower-bob text-4xl md:text-6xl" style={{ '--fl-tilt': `${(i % 5) - 2}deg`, animationDelay: `${i * 0.15}s` }}>
              {f}
            </span>
          ))}
        </div>
        <p className="relative z-[1] text-[10px] tracking-[0.5em]" style={{ color: 'var(--text2)' }}>
          CONSERVATORY · INBOX
        </p>
        <h1
          className="flower-bob relative z-[1] mt-2 text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)', textShadow: '0 0 40px color-mix(in srgb, var(--accent2) 45%, transparent)' }}
        >
          Pollen &amp; Post
        </h1>
        <p className="relative z-[1] mx-auto mt-2 max-w-md text-sm opacity-80">
          Every message is a cutting · {emails.length} stems waiting in the mist house
        </p>
        <div className="relative z-[1] mt-3 flex justify-center gap-2 text-xl opacity-60 md:text-2xl" aria-hidden>
          {['🌷', '💕', '🌸', '💕', '🌷'].map((f, i) => (
            <span key={i} className="flower-bob inline-block" style={{ animationDelay: `${i * 0.12}s`, '--fl-tilt': `${i % 2 === 0 ? -4 : 4}deg` }}>
              {f}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={onSwitchPersona}
          className="btn btn-outline btn-sm relative z-[1] mt-6 border-2"
          style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}
        >
          Leave greenhouse
        </button>
      </header>

      <div className="relative z-10 mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[280px_1fr] md:px-6">
        <div className="relative">
          <span className="flower-bob pointer-events-none absolute -left-2 top-1/4 z-[2] text-3xl opacity-70 md:-left-4 md:text-4xl" style={{ '--fl-tilt': '-14deg' }} aria-hidden>
            🌺
          </span>
          <span className="flower-bob pointer-events-none absolute -right-1 bottom-1/3 z-[2] text-2xl opacity-65 md:text-3xl" style={{ '--fl-tilt': '12deg', animationDelay: '0.5s' }} aria-hidden>
            🌸
          </span>
          <div className="absolute inset-0 rounded-full opacity-35 blur-3xl" style={{ background: 'var(--accent2)' }} aria-hidden />
          <div
            className="relative rounded-full border-2 p-6 shadow-xl"
            style={{
              borderColor: 'color-mix(in srgb, var(--accent2) 55%, var(--border))',
              background: `linear-gradient(145deg, color-mix(in srgb, var(--card) 70%, var(--accent3)) 0%, var(--card) 100%)`,
              aspectRatio: '1',
              maxWidth: 'min(100%, 320px)',
              margin: '0 auto',
              boxShadow: '0 0 48px color-mix(in srgb, var(--accent2) 25%, transparent)',
            }}
          >
            <div className="relative flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-full">
              <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-2 p-3 opacity-40 md:gap-3 md:p-4" aria-hidden>
                {[...FLORAL, ...FLORAL, '🌸', '🌷', '💮'].map((f, i) => (
                  <span key={i} className="flower-bob text-lg md:text-xl" style={{ animationDelay: `${(i % 12) * 0.15}s`, '--fl-tilt': `${(i % 7) - 3}deg` }}>
                    {f}
                  </span>
                ))}
              </div>
              <p className="relative z-[1] text-center text-[10px] uppercase tracking-widest opacity-50">Rotate bed</p>
              <div className="relative z-[1] max-h-[min(52vh,360px)] w-full space-y-2 overflow-y-auto px-2">
                {emails.map((e, i) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className="flex w-full items-center gap-2 rounded-full border px-3 py-2 text-left text-xs transition-all hover:scale-[1.02]"
                    style={{
                      borderColor: selectedEmail?.id === e.id ? 'var(--accent)' : 'var(--border)',
                      background: selectedEmail?.id === e.id ? 'color-mix(in srgb, var(--accent3) 80%, transparent)' : 'color-mix(in srgb, var(--bg2) 60%, transparent)',
                    }}
                  >
                    <span className="text-lg">{e.from.avatar}</span>
                    <span className="line-clamp-2 min-w-0 flex-1">{e.subject}</span>
                    {!e.read && <span className="size-2 shrink-0 rounded-full" style={{ background: 'var(--accent2)' }} aria-hidden />}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div
            className="relative mx-auto mt-6 max-w-[280px] rounded-box border p-3 text-xs"
            style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg2) 90%, var(--accent2))' }}
          >
            <div className="pointer-events-none absolute -top-2 right-4 text-lg opacity-60 flower-bob" style={{ '--fl-tilt': '8deg' }} aria-hidden>
              🌷
            </div>
            <div className="relative h-12 overflow-hidden rounded-lg" style={{ background: 'color-mix(in srgb, var(--accent3) 80%, var(--accent))' }}>
              {[0, 1, 2, 3, 4, 5].map(i => (
                <span key={i} className="flower-pollen" style={{ left: `${12 + i * 15}%`, bottom: 4, animationDelay: `${i * 0.35}s` }} aria-hidden />
              ))}
              <p className="absolute inset-0 flex items-center justify-center gap-2">
                <span className="flower-bob text-base" style={{ '--fl-tilt': '5deg' }} aria-hidden>
                  🌸
                </span>
                <span>{weather.icon}</span>
                <span>{weather.condition}</span>
                <span className="flower-bob text-base" style={{ '--fl-tilt': '-5deg', animationDelay: '0.3s' }} aria-hidden>
                  🌺
                </span>
              </p>
            </div>
          </div>
        </div>

        <main className="relative min-h-[320px]">
          <div className="pointer-events-none absolute -top-6 left-1/2 z-[2] flex -translate-x-1/2 gap-3 text-2xl opacity-50 md:gap-4 md:text-3xl" aria-hidden>
            {['💮', '🌸', '🌷', '🌸', '💮'].map((f, i) => (
              <span key={i} className="flower-bob" style={{ animationDelay: `${i * 0.2}s`, '--fl-tilt': `${i % 2 === 0 ? -6 : 6}deg` }}>
                {f}
              </span>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-box border-2 p-1" style={{ borderColor: 'var(--accent2)', boxShadow: '0 0 32px color-mix(in srgb, var(--accent2) 20%, transparent)' }}>
            <div
              className="relative rounded-box p-6 md:p-10"
              style={{
                background: `linear-gradient(165deg, color-mix(in srgb, var(--card) 85%, var(--accent3)) 0%, var(--card) 55%, color-mix(in srgb, var(--card) 92%, var(--accent2)) 100%)`,
                minHeight: 'min(60vh, 520px)',
              }}
            >
              <div className="pointer-events-none absolute inset-0 flex flex-wrap content-start justify-around gap-4 p-4 opacity-[0.12] md:opacity-[0.18]" aria-hidden>
                {[...FLORAL, ...FLORAL].map((f, i) => (
                  <span key={i} className="flower-bob text-3xl md:text-4xl" style={{ animationDelay: `${(i % 8) * 0.2}s`, '--fl-tilt': `${(i % 5) - 2}deg` }}>
                    {f}
                  </span>
                ))}
              </div>
              <div className="pointer-events-none absolute -left-2 bottom-16 text-5xl opacity-20 flower-bob md:text-7xl" style={{ '--fl-tilt': '-10deg' }} aria-hidden>
                🌹
              </div>
              <div className="pointer-events-none absolute -right-2 top-12 text-6xl opacity-15 flower-bob md:text-8xl" style={{ '--fl-tilt': '12deg', animationDelay: '0.4s' }} aria-hidden>
                🪷
              </div>
              <div className="pointer-events-none absolute -right-4 top-8 text-5xl opacity-25 flower-bob md:text-7xl" style={{ '--fl-tilt': '8deg' }} aria-hidden>
                🦋
              </div>
              {selectedEmail ? (
                <>
                  <div className="relative z-[1] mb-2 flex justify-center gap-2 text-lg opacity-50" aria-hidden>
                    {['🌸', '💕', '🌷'].map((f, i) => (
                      <span key={i} className="flower-bob" style={{ animationDelay: `${i * 0.18}s` }}>
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="relative z-[1] mb-6 flex flex-wrap items-start justify-between gap-4">
                    <h2 className="text-2xl md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <div className="text-right text-sm opacity-70">
                      <p>{selectedEmail.from.name}</p>
                      <p className="mt-1">{selectedEmail.date}</p>
                    </div>
                  </div>
                  <div className="relative z-[1] whitespace-pre-wrap leading-relaxed opacity-90">{selectedEmail.body}</div>
                  <div className="relative z-[1] mt-10 flex flex-wrap gap-2 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                    {['Pressed', 'Dried', 'Scented'].map(tag => (
                      <span key={tag} className="badge badge-outline gap-1" style={{ borderColor: 'var(--accent2)' }}>
                        <span aria-hidden>🌸</span>
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="relative z-[1] flex h-full min-h-[280px] flex-col items-center justify-center gap-3 opacity-50">
                  <div className="flex flex-wrap justify-center gap-3 text-4xl md:gap-4 md:text-5xl" aria-hidden>
                    {['🌷', '🌸', '💮', '🌺', '🌷'].map((f, i) => (
                      <span key={i} className="flower-bob" style={{ animationDelay: `${i * 0.15}s`, '--fl-tilt': `${(i % 3) - 1}deg` }}>
                        {f}
                      </span>
                    ))}
                  </div>
                  <p className="text-center text-sm md:text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--text2)' }}>
                    Pick a bloom from the round bed
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] opacity-85">
            <span className="flower-bob text-base opacity-70" style={{ '--fl-tilt': '-5deg' }} aria-hidden>
              🌸
            </span>
            {stocks.map(s => (
              <span key={s.ticker} className="rounded-full border px-2 py-0.5" style={{ borderColor: 'color-mix(in srgb, var(--accent2) 40%, var(--border))' }}>
                {s.ticker} {s.changePct}%
              </span>
            ))}
            <span className="flower-bob text-base opacity-70" style={{ '--fl-tilt': '5deg', animationDelay: '0.3s' }} aria-hidden>
              🌷
            </span>
            <span className="ml-auto line-clamp-1 max-w-full">{news[0]?.title}</span>
          </div>
        </main>
      </div>
    </div>
  )
}
