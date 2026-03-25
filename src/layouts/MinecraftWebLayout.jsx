import { useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const chestRow = t =>
  ({
    work: 'Stronghold desk',
    personal: 'Bed spawn stash',
    finance: 'Vault row',
    promo: 'Spawn point ads',
    newsletter: 'Lectern shelf',
    social: 'Multiplayer tab',
    dev: 'Redstone mail',
    shopping: 'Villager trades',
    travel: 'Nether portal trips',
  }[t] || 'Unknown chunk')

function CreeperPeek({ reduced }) {
  if (reduced) return null
  return (
    <div className="mc-creeper-peek pointer-events-none fixed bottom-24 right-2 z-[60] sm:bottom-28 sm:right-6" aria-hidden>
      <svg
        viewBox="0 0 8 8"
        className="mc-creeper-face h-14 w-14 border-4 border-[#1a1a1a] shadow-[4px_4px_0_#000]"
        preserveAspectRatio="xMidYMid meet"
      >
        <title>Creeper</title>
        <rect width="8" height="8" fill="#5d8c3e" />
        <rect x="1" y="2" width="2" height="2" fill="#0d0d0d" />
        <rect x="5" y="2" width="2" height="2" fill="#0d0d0d" />
        <rect x="2" y="5" width="4" height="1" fill="#0d0d0d" />
        <rect x="1" y="6" width="1" height="2" fill="#0d0d0d" />
        <rect x="6" y="6" width="1" height="2" fill="#0d0d0d" />
        <rect x="2" y="6" width="1" height="1" fill="#0d0d0d" />
        <rect x="5" y="6" width="1" height="1" fill="#0d0d0d" />
      </svg>
    </div>
  )
}

export default function MinecraftWebLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [justOpened, setJustOpened] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    if (!selectedEmail) return
    setJustOpened(true)
    const t = setTimeout(() => setJustOpened(false), 650)
    return () => clearTimeout(t)
  }, [selectedEmail?.id])

  const unread = useMemo(() => emails.filter(e => !e.read).length, [])

  return (
    <div
      className="mc-world relative min-h-dvh overflow-x-hidden text-[#1e1e1e]"
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <div className="mc-sky-layer pointer-events-none fixed inset-0 z-0" aria-hidden>
        {!reducedMotion && (
          <>
            <div className="mc-sun" />
            <div className="mc-cloud mc-cloud-a" />
            <div className="mc-cloud mc-cloud-b" />
            <div className="mc-cloud mc-cloud-c" />
          </>
        )}
        <div className="mc-stars" />
      </div>
      <div className="mc-ground pointer-events-none fixed bottom-0 left-0 right-0 z-[1] h-16 sm:h-24" aria-hidden />

      <div className="mc-mobs pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
        {!reducedMotion && (
          <>
            <span className="mc-mob mc-mob-chicken">🐔</span>
            <span className="mc-mob mc-mob-pig">🐷</span>
            <span className="mc-mob mc-mob-bee">🐝</span>
          </>
        )}
      </div>

      <CreeperPeek reduced={reducedMotion} />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-3 px-3 pb-4 pt-3 sm:px-4 sm:pb-6 sm:pt-4">
        <header className="mc-panel mc-panel-outer p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`mc-block-grass hidden size-12 shrink-0 sm:block ${reducedMotion ? '' : 'mc-block-wiggle'}`}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="mc-pixel-title text-[10px] leading-tight text-[#3a3a3a] sm:text-xs">SINGLEPLAYER · THE WEB</p>
                <h1 className="mc-pixel-title text-sm tracking-tight text-[#2d5016] sm:text-base md:text-lg">
                  MINECRAFT.EXE
                </h1>
                <p className="mt-0.5 font-mono text-[11px] text-[#555]">Same inbox. Blockier reality.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="mc-hud-bars hidden flex-col gap-1 sm:flex" title="Health / Hunger (decorative)">
                <div className="mc-bar mc-bar-health" style={{ width: `${Math.min(100, 100 - unread * 8)}%` }} />
                <div className="mc-bar mc-bar-food" style={{ width: '72%' }} />
              </div>
              <div className="mc-panel mc-slot px-3 py-1.5 text-center font-mono text-xs font-bold tabular-nums">
                <span className="text-[#666]">XP</span> {emails.length - unread}
              </div>
              <button
                type="button"
                className="mc-btn mc-pixel-title text-[9px] sm:text-[10px]"
                onClick={onSwitchPersona}
              >
                Save & Quit
              </button>
            </div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row lg:items-stretch">
          <aside className="lg:w-[min(100%,280px)] lg:shrink-0" aria-label="Chest inventory">
            <div className="mc-panel mc-panel-outer p-2 sm:p-3">
              <h2 className="mc-pixel-title mb-2 border-b-2 border-[#555] pb-1 text-center text-[9px] text-[#333] sm:text-[10px]">
                LARGE CHEST
              </h2>
              <ul className="mc-chest-grid grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {emails.map(e => {
                  const active = selectedEmail?.id === e.id
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedEmail(e)}
                        className={`mc-slot mc-slot-interactive group relative w-full p-2 text-left transition-transform ${active ? 'mc-slot-active' : ''}`}
                      >
                        {!reducedMotion && active && <span className="mc-crack-overlay" aria-hidden />}
                        <div className="flex items-start gap-2">
                          <span
                            className={`mc-item-icon flex size-10 shrink-0 items-center justify-center border-2 border-[#2a2a2a] bg-[#c6c6c6] text-lg shadow-[inset_2px_2px_0_#fff,inset_-2px_-2px_0_#555] ${!e.read && !reducedMotion ? 'mc-enchant-shimmer' : ''}`}
                          >
                            {e.from.avatar ?? '📧'}
                          </span>
                          <div className="min-w-0 flex-1">
                            {!e.read && (
                              <span className="mc-pixel-title mb-0.5 inline-block bg-[#55aa55] px-1 py-0.5 text-[7px] text-white">
                                NEW DROP
                              </span>
                            )}
                            <p className="line-clamp-2 font-mono text-[11px] font-bold leading-snug text-[#222]">{e.subject}</p>
                            <p className="mt-0.5 font-mono text-[10px] text-[#666]">{e.from.name}</p>
                            <p className="mc-pixel-title mt-1 text-[7px] tracking-wide text-[#888]">{chestRow(e.tag)}</p>
                          </div>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>

          <main className="min-h-[220px] flex-1 lg:min-h-[320px]">
            {selectedEmail ? (
              <div
                className={`mc-panel mc-panel-book relative h-full min-h-[220px] overflow-hidden p-4 sm:p-5 lg:min-h-0 ${justOpened && !reducedMotion ? 'mc-book-pop' : ''}`}
              >
                <div className="mc-book-ribbon pointer-events-none absolute -right-1 top-4 h-24 w-3 bg-[#8b4513] shadow-md" aria-hidden />
                <h2 className="mc-pixel-title text-[10px] text-[#5c4033]">WRITTEN BOOK</h2>
                <p className="mc-pixel-title mt-1 text-sm text-[#2d5016] sm:text-base">{selectedEmail.subject}</p>
                <p className="mt-1 font-mono text-xs text-[#666]">
                  by {selectedEmail.from.name} · {selectedEmail.date} {selectedEmail.time}
                </p>
                <div className="mc-scroll-body mt-4 max-h-[min(50vh,320px)] overflow-y-auto border-2 border-[#d4c4a8] bg-[#faf8f0] p-3 font-mono text-sm leading-relaxed whitespace-pre-wrap text-[#2a2a2a] shadow-inner">
                  {selectedEmail.body}
                </div>
                <button
                  type="button"
                  className="mc-btn mc-pixel-title mt-4 text-[9px]"
                  onClick={() => setSelectedEmail(null)}
                >
                  ← Done Reading
                </button>
              </div>
            ) : (
              <div className="mc-panel mc-panel-outer flex h-full min-h-[220px] flex-col items-center justify-center gap-3 p-8 text-center lg:min-h-0">
                <div className={`text-5xl sm:text-6xl ${reducedMotion ? '' : 'mc-pickaxe-swing'}`} aria-hidden>
                  ⛏️
                </div>
                <p className="mc-pixel-title max-w-xs text-[10px] leading-relaxed text-[#444]">
                  MINING FOR MAIL… OPEN A SLOT FROM THE CHEST
                </p>
                <p className="font-mono text-xs text-[#777]">Tip: Unread messages sparkle like enchanted gear.</p>
              </div>
            )}
          </main>

          <aside className="flex flex-col gap-3 lg:w-52 lg:shrink-0">
            <section className="mc-panel mc-panel-outer p-3" aria-label="Biome weather">
              <h2 className="mc-pixel-title mb-2 flex items-center gap-2 border-b-2 border-[#555] pb-1 text-[9px] text-[#333]">
                <span className="text-base">🌤️</span> F3 BIOME
              </h2>
              <p className="mc-pixel-title text-[8px] text-[#666]">{weather.city}</p>
              <p className="my-2 text-center text-4xl">{weather.icon}</p>
              <p className="text-center font-mono text-sm font-bold">{weather.temp}°C</p>
              <p className="text-center font-mono text-xs text-[#555]">{weather.condition}</p>
              <p className="mt-2 font-mono text-[10px] text-[#888]">
                Wind {weather.wind} km/h · Humidity {weather.humidity}%
              </p>
            </section>

            <section className="mc-panel mc-panel-outer p-3" aria-label="Villager emerald market">
              <h2 className="mc-pixel-title mb-2 border-b-2 border-[#555] pb-1 text-[9px] text-[#333]">EMERALD MARKET</h2>
              <ul className="space-y-2">
                {stocks.map(s => (
                  <li
                    key={s.ticker}
                    className="mc-slot flex items-center justify-between gap-2 px-2 py-1.5 font-mono text-xs"
                  >
                    <span className="font-bold">{s.ticker}</span>
                    <span className={s.changePct >= 0 ? 'text-[#2d7a2d]' : 'text-[#aa2222]'}>
                      {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mc-panel mc-panel-outer p-3" aria-label="Village bulletin">
              <h2 className="mc-pixel-title mb-2 border-b-2 border-[#555] pb-1 text-[9px] text-[#333]">VILLAGE BOARD</h2>
              <ul className="space-y-2">
                {news.map(n => (
                  <li
                    key={n.id}
                    className="mc-sign-post rounded border-2 border-[#6b4e2e] bg-[#deb887] px-2 py-2 font-mono text-[10px] leading-snug text-[#3d2914] shadow-[2px_2px_0_#0003]"
                  >
                    <span className="mr-1">{n.emoji}</span>
                    {n.title}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        <div className="mc-hotbar mc-panel-outer mx-auto flex max-w-xl items-end justify-center gap-1 px-2 py-2 sm:gap-1.5">
          {['📬', weather.icon, '📰', '💎', '⛏️', '🧱', '🌾', '🪣', '🗺️'].map((icon, i) => (
            <div
              key={i}
              className={`mc-hotbar-slot flex size-9 items-center justify-center border-2 border-[#1a1a1a] bg-[#8b8b8b] text-sm shadow-[inset_2px_2px_0_#aaa,inset_-2px_-2px_0_#555] sm:size-10 sm:text-base ${i === 0 ? 'ring-2 ring-[#ffff55] ring-offset-1 ring-offset-[#3a3a3a]' : ''}`}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
