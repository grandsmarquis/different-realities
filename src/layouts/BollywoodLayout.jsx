import { useState, useEffect, useRef, useMemo } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const dialogues = [
  'Ek baar jo maine commitment kar di, toh phir main khud ki bhi nahi sunta!',
  'Mogambo khush hua!',
  'Pushpa, I hate tears!',
  'Mere paas maa hai.',
  'Picture abhi baaki hai mere dost!',
  'Bade bade deshon mein… inbox aise hi hote hain.',
  'Dil toh pagal hai… aur notifications bhi!',
]

const stars = ['✨', '⭐', '💫', '🌟', '✦', '★', '✧']

const tagLabel = t =>
  ({
    work: '🎬 KAAM',
    personal: '💕 DIL',
    finance: '💰 PAISA',
    promo: '📢 NATAK',
    newsletter: '📰 AKHBAAR',
    social: '🫶 YAAR',
  }[t] || '🎭 SCENE')

function MarigoldPetal({ left, delay, duration }) {
  return (
    <span
      className="pointer-events-none absolute text-lg opacity-70"
      style={{
        left,
        top: '-2rem',
        animation: `bollywood-petal-fall ${duration}s linear ${delay}s forwards`,
      }}
      aria-hidden
    >
      🌼
    </span>
  )
}

export default function BollywoodLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [currentDialogue, setCurrentDialogue] = useState(0)
  const [sparkles, setSparkles] = useState([])
  const [filmReel, setFilmReel] = useState(0)
  const [petals, setPetals] = useState([])
  const containerRef = useRef(null)
  const petalId = useRef(0)

  const newsMarquee = useMemo(() => news.map(n => `${n.emoji} ${n.title}`).join('  ✦  '), [])
  const stockMarquee = useMemo(
    () => stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'} ${Math.abs(s.changePct).toFixed(2)}%`).join('  ·  '),
    []
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDialogue(d => (d + 1) % dialogues.length)
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFilmReel(r => (r + 1) % 8)
    }, 160)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const drop = setInterval(() => {
      const id = petalId.current++
      const left = `${8 + Math.random() * 84}%`
      const delay = Math.random() * 0.5
      const duration = 5 + Math.random() * 2.5
      setPetals(p => [...p.slice(-10), { id, left, delay, duration }])
      setTimeout(() => setPetals(p => p.filter(x => x.id !== id)), (delay + duration + 0.5) * 1000)
    }, 900)
    return () => clearInterval(drop)
  }, [])

  function handleMouseMove(e) {
    if (Math.random() > 0.88) {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      setSparkles(s => [...s.slice(-14), { id, x, y, star: stars[Math.floor(Math.random() * stars.length)] }])
      setTimeout(() => setSparkles(s => s.filter(sp => sp.id !== id)), 1100)
    }
  }

  const unread = emails.filter(e => !e.read).length

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bollywood-masala-root relative min-h-screen overflow-x-hidden text-[#ffd6ef]"
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <style>{`
        @keyframes bollywood-glitter {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.4) rotate(180deg); opacity: 0.85; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes bollywood-dialogue {
          0% { opacity: 0; transform: translateY(12px) scale(0.96); }
          12% { opacity: 1; transform: translateY(0) scale(1); }
          78% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-10px) scale(0.96); }
        }
        @keyframes bollywood-heartbeat {
          0%, 100% { transform: scale(1); }
          18% { transform: scale(1.28); }
          32% { transform: scale(1); }
          48% { transform: scale(1.18); }
          70% { transform: scale(1); }
        }
        @keyframes bollywood-entrance {
          0% { opacity: 0; transform: perspective(400px) rotateX(8deg) translateY(24px); }
          100% { opacity: 1; transform: perspective(400px) rotateX(0) translateY(0); }
        }
        @keyframes bollywood-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes bollywood-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bollywood-pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255, 20, 147, 0.5)); }
          50% { filter: drop-shadow(0 0 22px rgba(255, 215, 0, 0.65)); }
        }
        @keyframes bollywood-dance {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-10px) rotate(6deg); }
        }
        @keyframes bollywood-petal-fall {
          0% { transform: translateY(-4vh) rotate(0deg) scale(0.9); opacity: 0; }
          8% { opacity: 0.9; }
          100% { transform: translateY(110vh) rotate(720deg) scale(1.1); opacity: 0.2; }
        }
        @keyframes bollywood-shimmer-title {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .bollywood-masala-root {
          --bollywood-saffron: #ff6b00;
          --bollywood-magenta: #ff1493;
          --bollywood-gold: #ffd700;
          --bollywood-indigo: #1e0a3c;
        }
        .bollywood-sparkle-pop { animation: bollywood-glitter 1.1s ease-out forwards; }
        .bollywood-heartbeat { animation: bollywood-heartbeat 2.1s ease-in-out infinite; }
        .bollywood-dialogue-fade { animation: bollywood-dialogue 4.2s ease-in-out infinite; }
        .bollywood-dramatic-in { animation: bollywood-entrance 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .bollywood-marquee-track { animation: bollywood-marquee 38s linear infinite; }
        .bollywood-marquee-track-fast { animation: bollywood-marquee 22s linear infinite; }
        .bollywood-title-shimmer {
          background: linear-gradient(90deg, var(--bollywood-gold), #fff8dc, var(--bollywood-magenta), var(--bollywood-gold));
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: bollywood-shimmer-title 4s linear infinite;
        }
        .bollywood-dancer { animation: bollywood-dance 0.9s ease-in-out infinite; }
        .bollywood-dancer:nth-child(2) { animation-delay: 0.15s; }
        .bollywood-dancer:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

      {/* Deep stage background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% -20%, rgba(255, 107, 0, 0.22) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 100% 50%, rgba(255, 20, 147, 0.12) 0%, transparent 45%),
            radial-gradient(ellipse 60% 40% at 0% 80%, rgba(124, 58, 237, 0.2) 0%, transparent 40%),
            linear-gradient(165deg, #0f0224 0%, #1a0638 35%, #12011f 100%)
          `,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed left-1/2 top-1/2 -z-10 h-[min(140vw,900px)] w-[min(140vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.11] blur-3xl"
        style={{
          background: 'conic-gradient(from 0deg, #ff1493, #ff6b00, #ffd700, #a855f7, #ec4899, #ff1493)',
          animation: 'bollywood-spin-slow 48s linear infinite',
        }}
        aria-hidden
      />

      {/* Velvet curtains (decorative) */}
      <div className="pointer-events-none fixed inset-y-0 left-0 z-[5] w-[min(8vw,72px)] bg-gradient-to-r from-red-950/90 to-transparent" aria-hidden />
      <div className="pointer-events-none fixed inset-y-0 right-0 z-[5] w-[min(8vw,72px)] bg-gradient-to-l from-red-950/90 to-transparent" aria-hidden />

      {/* Falling marigolds */}
      <div className="pointer-events-none fixed inset-0 z-[4] overflow-hidden" aria-hidden>
        {petals.map(p => (
          <MarigoldPetal key={p.id} left={p.left} delay={p.delay} duration={p.duration} />
        ))}
      </div>

      {/* Cursor sparkles */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {sparkles.map(sp => (
          <div
            key={sp.id}
            className="bollywood-sparkle-pop absolute text-lg"
            style={{
              left: sp.x,
              top: sp.y,
              transform: 'translate(-50%, -50%)',
              color: 'var(--accent2)',
            }}
            aria-hidden
          >
            {sp.star}
          </div>
        ))}
      </div>

      {/* Gossip marquee */}
      <div className="relative z-20 border-b border-fuchsia-500/30 bg-black/50 backdrop-blur-sm">
        <div className="flex overflow-hidden py-2">
          <div className="bollywood-marquee-track flex shrink-0 whitespace-nowrap">
            <span className="px-8 text-xs font-bold uppercase tracking-[0.25em] text-amber-200/95 sm:text-sm">
              ✦ MASALA BREAKING ✦ {newsMarquee} ✦ MASALA BREAKING ✦ {newsMarquee}
            </span>
            <span className="px-8 text-xs font-bold uppercase tracking-[0.25em] text-amber-200/95 sm:text-sm" aria-hidden>
              ✦ MASALA BREAKING ✦ {newsMarquee} ✦ MASALA BREAKING ✦ {newsMarquee}
            </span>
          </div>
        </div>
      </div>

      {/* Box office ticker */}
      <div className="relative z-20 border-b border-amber-500/25 bg-purple-950/60">
        <div className="flex overflow-hidden py-1.5">
          <div className="bollywood-marquee-track-fast flex shrink-0 whitespace-nowrap font-mono text-xs text-cyan-200/90 sm:text-sm">
            <span className="px-6">
              🎟️ BOX OFFICE COLLECTIONS · {stockMarquee} · 🎟️ BOX OFFICE COLLECTIONS · {stockMarquee}
            </span>
            <span className="px-6" aria-hidden>
              🎟️ BOX OFFICE COLLECTIONS · {stockMarquee} · 🎟️ BOX OFFICE COLLECTIONS · {stockMarquee}
            </span>
          </div>
        </div>
      </div>

      {/* Film perforation strip */}
      <div className="relative z-20 flex gap-0.5 overflow-hidden border-b border-purple-900/80 bg-[#060010] py-1">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="flex h-5 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-purple-900 text-[0.5rem] text-purple-800"
            style={{
              background: i % 2 === filmReel % 2 ? 'rgba(255,20,147,0.12)' : 'transparent',
            }}
            aria-hidden
          >
            🎬
          </div>
        ))}
      </div>

      {/* Header — poster */}
      <header className="relative z-20 overflow-hidden border-b-2 border-amber-500/40 bg-gradient-to-br from-fuchsia-950/90 via-purple-950/95 to-indigo-950/90 px-4 py-8 text-center sm:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 30% 40%, rgba(255,20,147,0.2) 0%, transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(255,215,0,0.12) 0%, transparent 50%)',
          }}
          aria-hidden
        />
        {['✨', '💫', '⭐', '✨', '💫', '⭐'].map((s, i) => (
          <span
            key={i}
            className="pointer-events-none absolute text-lg opacity-50 sm:text-xl"
            style={{
              top: `${12 + (i % 3) * 22}%`,
              left: `${8 + i * 14}%`,
              animation: `bollywood-spin-slow ${8 + i * 2}s linear infinite`,
            }}
            aria-hidden
          >
            {s}
          </span>
        ))}

        <div className="relative z-10 mx-auto max-w-4xl">
          <p
            className="mb-2 text-[0.65rem] uppercase tracking-[0.45em] text-amber-300/90 sm:text-xs"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ✦ 100% NTR-free zone ✦ U/A: Unread Approved ✦
          </p>

          <div className="mb-3 flex justify-center gap-4 text-3xl sm:text-4xl" aria-hidden>
            <span className="bollywood-dancer inline-block" style={{ animation: 'bollywood-dance 0.85s ease-in-out infinite' }}>
              🕺
            </span>
            <span
              className="bollywood-dancer inline-block"
              style={{ animation: 'bollywood-dance 0.85s ease-in-out 0.12s infinite' }}
            >
              💃
            </span>
            <span
              className="bollywood-dancer inline-block"
              style={{ animation: 'bollywood-dance 0.85s ease-in-out 0.24s infinite' }}
            >
              🕺
            </span>
          </div>

          <h1
            className="bollywood-title-shimmer mb-2 text-4xl leading-tight sm:text-5xl md:text-6xl"
            style={{
              fontFamily: 'var(--font-display)',
              animation: 'bollywood-shimmer-title 4s linear infinite, bollywood-pulse-glow 3s ease-in-out infinite',
            }}
          >
            INBOX-EESWARI
          </h1>
          <p className="text-base italic text-pink-300/90 sm:text-lg">
            {unread} नए dil-ki-baatein · {emails.length} total scenes
          </p>

          <div className="card mx-auto mt-5 max-w-xl border border-amber-500/35 bg-black/45 shadow-xl shadow-fuchsia-900/30 backdrop-blur-md">
            <div className="card-body py-4">
              <p
                key={currentDialogue}
                className="bollywood-dialogue-fade m-0 text-center text-sm italic text-amber-100 sm:text-base"
              >
                🎬 “{dialogues[currentDialogue]}”
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <span className="bollywood-heartbeat text-2xl">💕</span>
            <button
              type="button"
              className="btn btn-primary rounded-full border-0 bg-gradient-to-r from-fuchsia-600 to-pink-600 px-8 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-fuchsia-600/40 hover:from-fuchsia-500 hover:to-pink-500"
              style={{ fontFamily: 'var(--font-display)' }}
              onClick={onSwitchPersona}
            >
              🎭 Change film
            </button>
            <span className="bollywood-heartbeat text-2xl [animation-delay:0.35s]">💕</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 grid min-h-[min(70vh,640px)] lg:grid-cols-12">
        {/* Scene list */}
        <aside className="border-fuchsia-900/40 lg:col-span-4 lg:border-r">
          <div className="sticky top-0 z-[1] border-b border-fuchsia-900/50 bg-purple-950/80 px-4 py-3 backdrop-blur-md">
            <p
              className="m-0 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-amber-400"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              🎞️ Film ki playlist
            </p>
            <p className="m-0 mt-0.5 text-xs text-pink-200/70">{emails.length} scenes · pick your drama</p>
          </div>
          <div className="max-h-[55vh] overflow-y-auto lg:max-h-none">
            {emails.map((email, i) => (
              <button
                key={email.id}
                type="button"
                onClick={() => setSelectedEmail(email)}
                className={`flex w-full flex-col gap-2 border-b border-fuchsia-950/50 p-4 text-left transition-all hover:bg-fuchsia-950/30 ${
                  selectedEmail?.id === email.id
                    ? 'border-l-4 border-l-secondary bg-fuchsia-950/40 shadow-[inset_0_0_24px_rgba(255,20,147,0.08)]'
                    : 'border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent text-xl shadow-md ${
                      selectedEmail?.id === email.id ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-purple-950' : ''
                    }`}
                  >
                    {email.from.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="badge badge-sm border-amber-500/40 bg-amber-500/15 text-amber-200">
                        {tagLabel(email.tag)}
                      </span>
                      {!email.read && <span className="badge badge-error badge-xs">NEW</span>}
                    </div>
                    <p
                      className={`truncate text-sm ${email.read ? 'font-normal text-pink-200/55' : 'font-bold text-pink-50'}`}
                    >
                      {email.subject}
                    </p>
                    <p className="truncate text-xs italic text-pink-300/50">— {email.from.name}</p>
                  </div>
                  <span
                    className="shrink-0 font-mono text-[0.6rem] uppercase tracking-widest text-purple-500/80"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main stage */}
        <main className="border-fuchsia-900/30 p-4 sm:p-6 lg:col-span-5 lg:border-r">
          {selectedEmail ? (
            <div className="bollywood-dramatic-in">
              <div className="mb-6 text-center">
                <p
                  className="mb-1 text-[0.65rem] uppercase tracking-[0.4em] text-secondary"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  ✦ Spotlight ✦
                </p>
                <h2
                  className="text-xl font-bold leading-snug text-pink-50 sm:text-2xl"
                  style={{
                    fontFamily: 'var(--font-display)',
                    textShadow: '0 0 24px rgba(255,20,147,0.45)',
                  }}
                >
                  {selectedEmail.subject}
                </h2>
                <p className="mt-2 text-sm italic text-amber-200/80">Starring: {selectedEmail.from.name}</p>
              </div>

              <div className="card border-2 border-secondary/50 bg-gradient-to-b from-purple-950/80 to-[#0a0318] shadow-2xl shadow-fuchsia-950/50">
                <div className="card-body p-0">
                  <div className="flex items-center gap-4 bg-gradient-to-r from-secondary/90 to-fuchsia-800/90 p-5">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-full border-[3px] border-amber-300 bg-white/10 text-3xl shadow-lg shadow-amber-500/20">
                      {selectedEmail.from.avatar}
                    </div>
                    <div>
                      <p
                        className="m-0 text-[0.65rem] uppercase tracking-[0.2em] text-amber-200"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        Hero / heroine
                      </p>
                      <p className="m-0 text-lg font-bold text-white">{selectedEmail.from.name}</p>
                      <p className="m-0 mt-1 text-xs text-white/70">
                        {selectedEmail.date} · {selectedEmail.time} · {tagLabel(selectedEmail.tag)}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="rounded-box border border-fuchsia-900/60 bg-black/40 p-4 text-sm leading-relaxed text-pink-100/95 italic sm:text-base">
                      {selectedEmail.body}
                    </div>
                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm rounded-full border-0 sm:btn-md"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        💕 Reply karo
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm rounded-full border border-fuchsia-800/80 text-pink-200 sm:btn-md"
                        onClick={() => setSelectedEmail(null)}
                      >
                        ← Interval
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
              <div
                className="mb-4 text-7xl sm:text-8xl"
                style={{ animation: 'bollywood-pulse-glow 2.5s ease-in-out infinite' }}
                aria-hidden
              >
                🎬
              </div>
              <h2 className="text-2xl text-amber-200 sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                Lights… camera…
              </h2>
              <p className="mt-2 max-w-sm text-pink-200/70">Koi email chuniye — picture shuru!</p>
              <div className="mt-8 flex gap-3 text-2xl">
                {['💕', '✨', '🌟', '💫', '⭐'].map((s, i) => (
                  <span
                    key={`idle-${i}`}
                    className="bollywood-heartbeat inline-block"
                    style={{ animationDelay: `${i * 0.25}s` }}
                    aria-hidden
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Sidebar — weather, stocks, gossip cards */}
        <aside className="space-y-4 border-t border-fuchsia-900/40 p-4 lg:col-span-3 lg:border-t-0 lg:border-l lg:border-fuchsia-900/40">
          <div className="card border border-amber-500/30 bg-purple-950/70 shadow-lg shadow-purple-950/40 backdrop-blur-sm">
            <div className="card-body gap-3 p-4">
              <h3
                className="card-title text-sm uppercase tracking-[0.2em] text-amber-300"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                🌦️ Aaj ka mausam
              </h3>
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-5xl leading-none" aria-hidden>
                  {weather.icon}
                </span>
                <div>
                  <p className="m-0 text-3xl font-bold text-pink-50">
                    {weather.temp}°
                    <span className="text-lg font-normal text-pink-300/60"> feels {weather.feels_like}°</span>
                  </p>
                  <p className="m-0 text-sm text-pink-200/80">
                    {weather.city}, {weather.country}
                  </p>
                </div>
              </div>
              <p className="m-0 text-sm italic text-secondary">{weather.condition}</p>
              <div className="flex flex-wrap gap-2 text-xs text-pink-200/70">
                <span className="badge badge-outline border-fuchsia-500/50">💧 {weather.humidity}%</span>
                <span className="badge badge-outline border-fuchsia-500/50">💨 {weather.wind} km/h</span>
              </div>
              <div className="divider my-1 border-fuchsia-900/50 text-[0.6rem] uppercase tracking-widest text-purple-400">
                5-day trailer
              </div>
              <div className="flex flex-wrap gap-2">
                {weather.forecast.map(d => (
                  <div
                    key={d.day}
                    className="rounded-lg border border-fuchsia-800/40 bg-black/30 px-2 py-1.5 text-center text-[0.65rem]"
                  >
                    <div className="font-bold text-amber-200/90">{d.day}</div>
                    <div className="text-lg leading-none">{d.icon}</div>
                    <div className="text-pink-200/80">
                      {d.high}° / {d.low}°
                    </div>
                  </div>
                ))}
              </div>
              <p className="m-0 text-center text-xs italic text-pink-300/60">
                {weather.temp > 30
                  ? '“Garmi mein bhi dil jalta hai” 🔥'
                  : weather.temp < 15
                    ? '“Thandi raat, dil ki baat” ❄️'
                    : '“Mausam perfect hai — slow-mo walk?” 💕'}
              </p>
            </div>
          </div>

          <div className="card border border-cyan-500/25 bg-black/45 shadow-inner shadow-cyan-950/20">
            <div className="card-body gap-3 p-4">
              <h3
                className="card-title text-sm uppercase tracking-[0.2em] text-cyan-200/90"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                💰 Producer’s portfolio
              </h3>
              {stocks.map(s => (
                <div
                  key={s.ticker}
                  className="flex items-center justify-between gap-2 rounded-lg border border-purple-900/50 bg-purple-950/40 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="m-0 font-mono text-sm font-bold text-pink-100">{s.ticker}</p>
                    <p className="m-0 truncate text-xs text-pink-300/50">{s.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="m-0 font-mono text-xs text-pink-200/80">
                      {s.currency}
                      {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                    <span
                      className={`badge badge-sm font-mono ${
                        s.changePct >= 0 ? 'badge-success text-success-content' : 'badge-error text-error-content'
                      }`}
                    >
                      {s.changePct >= 0 ? '📈' : '📉'} {s.changePct > 0 ? '+' : ''}
                      {s.changePct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card border border-fuchsia-600/35 bg-gradient-to-br from-fuchsia-950/50 to-purple-950/80">
            <div className="card-body gap-3 p-4">
              <h3
                className="card-title text-sm uppercase tracking-[0.2em] text-pink-300"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                💬 Filmi gossip
              </h3>
              <ul className="menu menu-sm rounded-box bg-black/25 p-0">
                {news.map((n, i) => (
                  <li key={n.id ?? i}>
                    <span className="flex flex-col items-start gap-0.5 py-3 text-left">
                      <span className="text-lg leading-none">{n.emoji}</span>
                      <span className="text-xs leading-snug text-pink-100/90">{n.title}</span>
                      <span className="text-[0.65rem] uppercase tracking-wider text-purple-400">
                        {n.source} · {n.time}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card border-2 border-amber-400/40 bg-gradient-to-br from-amber-500/10 to-fuchsia-600/10">
            <div className="card-body items-center p-4 text-center">
              <h3 className="card-title justify-center text-xs uppercase tracking-[0.25em] text-amber-200">
                ⭐ Housefull rating
              </h3>
              <div className="text-2xl" aria-hidden>
                {'⭐'.repeat(5)}
              </div>
              <p className="text-xs italic text-pink-200/75">“{unread} unread — still a blockbuster!”</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom perforation */}
      <div className="relative z-20 flex gap-0.5 overflow-hidden border-t border-purple-900/80 bg-[#060010] py-1">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="flex h-5 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-purple-900 text-[0.5rem] text-purple-800"
            style={{
              background: i % 2 !== filmReel % 2 ? 'rgba(255,215,0,0.08)' : 'transparent',
            }}
            aria-hidden
          >
            💕
          </div>
        ))}
      </div>
    </div>
  )
}
