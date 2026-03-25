import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const mobileToys = ['🧸', '⭐', '☁️', '🍼', '🎈']

export default function BabyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden"
      style={{
        background: 'linear-gradient(185deg, var(--bg) 0%, var(--bg2) 55%, #e3f2fd 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      {/* Soft clouds */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="baby-cloud baby-cloud-1 absolute h-24 w-40 rounded-full opacity-60" style={{ background: '#fff', top: '6%', left: '-5%' }} />
        <div className="baby-cloud baby-cloud-2 absolute h-20 w-36 rounded-full opacity-50" style={{ background: '#fff', top: '12%', right: '-8%' }} />
        <div className="baby-cloud baby-cloud-3 absolute h-16 w-28 rounded-full opacity-45" style={{ background: '#fff', bottom: '20%', left: '10%' }} />
      </div>

      {/* Crib curve + mobile */}
      <div className="relative z-10">
        <div
          className="mx-auto -mb-8 h-24 w-[min(100%,520px)] rounded-b-[100%] border-x-4 border-b-4 shadow-inner"
          style={{ borderColor: 'var(--border)', background: 'linear-gradient(180deg, color-mix(in srgb, var(--accent2) 35%, white), var(--card))' }}
        />
        <div className="relative mx-auto flex h-36 w-full max-w-md justify-center">
          <div className="baby-mobile-spin relative h-32 w-32 md:h-36 md:w-36">
            {mobileToys.map((toy, i) => {
              const angle = (360 / mobileToys.length) * i
              const arm = 56
              return (
                <span
                  key={toy}
                  className="absolute left-1/2 top-1/2 text-2xl md:text-3xl"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${arm}px) rotate(${-angle}deg)`,
                  }}
                >
                  {toy}
                </span>
              )
            })}
          </div>
        </div>

        <div className="mx-auto max-w-lg px-4 pb-8 pt-4">
          <div className="text-center">
            <h1 className="m-0 text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              gaa gaa inbox!!!
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text2)' }}>
              {emails.filter(e => !e.read).length} shiny new things · bababababa
            </p>
            <button
              type="button"
              className="btn btn-sm mt-3 rounded-full border-2 font-semibold"
              style={{ borderColor: 'var(--accent)', background: 'var(--card)', color: 'var(--text)' }}
              onClick={onSwitchPersona}
            >
              go bye-bye (switch)
            </button>
          </div>

          {/* Weather rattle card */}
          <div
            className="baby-wobble-card mt-6 rounded-[2rem] border-4 p-5 shadow-lg"
            style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}
          >
            <div className="flex items-center gap-4">
              <span className="baby-bounce-emoji text-5xl">{weather.icon}</span>
              <div>
                <p className="m-0 text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  outside is {weather.temp}°
                </p>
                <p className="m-0 text-sm" style={{ color: 'var(--text2)' }}>{weather.city} · {weather.condition} · wowee</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {weather.forecast.map(d => (
                <span key={d.day} className="baby-star-twinkle inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'var(--bg2)', color: 'var(--text)' }}>
                  {d.icon} {d.day}
                </span>
              ))}
            </div>
          </div>

          {/* Emails as soft blocks */}
          <p className="mt-8 mb-3 text-center text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
            my letters (goo)
          </p>
          <div className="flex flex-col gap-4">
            {emails.map((email, i) => (
              <button
                key={email.id}
                type="button"
                className="baby-wobble-card text-left rounded-[1.75rem] border-4 p-4 shadow-md transition-transform hover:scale-[1.02]"
                style={{
                  borderColor: i % 2 ? 'var(--accent)' : 'var(--accent2)',
                  background: 'linear-gradient(135deg, #fff, color-mix(in srgb, var(--bg2) 40%, white))',
                }}
                onClick={() => setSelectedEmail(email)}
              >
                <div className="flex gap-3">
                  <span className="text-4xl">{email.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>
                      {email.from.name}
                    </p>
                    <p className="m-0 mt-1 text-sm font-semibold">{email.subject}</p>
                    <p className="m-0 mt-1 line-clamp-2 text-xs" style={{ color: 'var(--text2)' }}>{email.preview}</p>
                    {!email.read && (
                      <span className="mt-2 inline-block rounded-full px-3 py-0.5 text-[10px] font-bold text-white" style={{ background: 'var(--accent)' }}>
                        NEW!!! (peek)
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Blocks / stocks */}
          <div className="mt-8 rounded-[2rem] border-4 p-4" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <p className="m-0 mb-3 text-center font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
              stacking blocks (numbers)
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {stocks.map((s, i) => (
                <div
                  key={s.ticker}
                  className="baby-block-stack flex flex-col items-center rounded-xl px-2 py-2"
                  style={{
                    background: i % 3 === 0 ? 'var(--accent2)' : i % 3 === 1 ? 'var(--accent)' : 'var(--bg2)',
                    color: i % 3 === 1 ? '#fff' : 'var(--text)',
                    animationDelay: `${i * 0.15}s`,
                  }}
                >
                  <span className="text-lg font-black">{s.ticker}</span>
                  <span className="text-[10px] opacity-90">{s.changePct >= 0 ? '↑ up' : '↓ down'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* News as picture book row */}
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {news.map(n => (
              <div
                key={n.id}
                className="shrink-0 w-48 rounded-2xl border-4 p-3 shadow-md"
                style={{ borderColor: 'var(--accent2)', background: '#fff' }}
              >
                <div className="text-center text-3xl">{n.emoji}</div>
                <p className="m-0 mt-2 text-xs leading-snug" style={{ color: 'var(--text)' }}>{n.title}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm" style={{ color: 'var(--text2)' }}>
            *babble* end of page *babble*
          </p>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(74, 111, 165, 0.35)', backdropFilter: 'blur(6px)' }}
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="baby-wobble-card max-h-[80vh] w-full max-w-md overflow-y-auto rounded-[2rem] border-4 p-6 shadow-2xl"
            style={{ borderColor: 'var(--accent)', background: '#fff' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center text-5xl">{selectedEmail.from.avatar}</div>
            <p className="mt-2 text-center text-xs font-bold tracking-wider" style={{ color: 'var(--accent)' }}>STORY TIME</p>
            <h3 className="mt-1 text-center text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{selectedEmail.subject}</h3>
            <p className="text-center text-sm" style={{ color: 'var(--text2)' }}>told by {selectedEmail.from.name}</p>
            <div className="mt-4 whitespace-pre-line text-sm leading-relaxed">{selectedEmail.body}</div>
            <button type="button" className="btn btn-block mt-5 rounded-full border-0 text-lg font-bold" style={{ background: 'var(--accent2)', color: 'var(--text)' }} onClick={() => setSelectedEmail(null)}>
              night night (close)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
