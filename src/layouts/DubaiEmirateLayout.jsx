import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function DubaiEmirateLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 45% at 15% 20%, color-mix(in srgb, var(--accent) 12%, transparent), transparent),
          radial-gradient(ellipse 55% 40% at 100% 0%, color-mix(in srgb, var(--accent2) 10%, transparent), transparent),
          var(--bg)
        `,
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="dubai-gold-sky pointer-events-none absolute inset-0 opacity-95" aria-hidden />
      <div
        className="pointer-events-none absolute -right-[20%] top-0 h-[min(85vh,720px)] w-[55%] opacity-[0.22]"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, var(--accent2) 55%, transparent) 0%, color-mix(in srgb, var(--accent) 25%, transparent) 45%, transparent 78%)`,
          clipPath: 'polygon(20% 100%, 35% 0%, 100% 0%, 100% 100%)',
        }}
        aria-hidden
      />
      <div
        className="realtor-shimmer pointer-events-none absolute inset-x-0 top-0 h-32 opacity-40"
        aria-hidden
      />

      <header
        className="relative z-10 border-b-2 px-4 py-6 md:px-10"
        style={{
          borderColor: 'color-mix(in srgb, var(--accent) 45%, var(--border))',
          boxShadow: '0 8px 40px -12px color-mix(in srgb, var(--accent) 28%, transparent), inset 0 -1px 0 color-mix(in srgb, var(--accent2) 18%, transparent)',
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="dubai-palm-sway">
            <p className="mb-1 text-[10px] tracking-[0.45em]" style={{ color: 'var(--accent2)' }}>
              EMIRATE · PRIVATE MAIL
            </p>
            <h1
              className="text-4xl md:text-6xl"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--accent2)',
                textShadow: '0 0 42px color-mix(in srgb, var(--accent) 55%, transparent), 0 1px 0 color-mix(in srgb, var(--accent) 40%, transparent)',
              }}
            >
              Skyline Inbox
            </h1>
            <p className="mt-2 max-w-md text-sm opacity-70">
              Correspondence above the clouds · {emails.length} sealed threads · zero ordinary folders
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="dubai-sparkle text-2xl" aria-hidden>
              ✦
            </span>
            <button
              type="button"
              onClick={onSwitchPersona}
              className="btn btn-outline btn-sm border-2 uppercase tracking-widest"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              Exit majlis
            </button>
          </div>
        </div>
        <div
          className="mx-auto mt-4 max-w-6xl overflow-x-hidden border-t pt-2 text-[10px] tracking-[0.25em]"
          style={{ borderColor: 'color-mix(in srgb, var(--accent) 35%, var(--border))', color: 'var(--accent2)' }}
        >
          <div className="dubai-ticker-inner flex w-max gap-8 px-4 opacity-90">
            <span className="pr-12">
              BURJ VIEWS · PALM RESIDENCES · GOLD SOUQ · NIGHT SAFARI · EXPO LEGACY · HELI PAD RSVP ·
            </span>
            <span>
              BURJ VIEWS · PALM RESIDENCES · GOLD SOUQ · NIGHT SAFARI · EXPO LEGACY · HELI PAD RSVP ·
            </span>
          </div>
        </div>
      </header>

      <div
        className="relative z-10 mx-auto grid max-w-6xl gap-0 md:grid-cols-[1fr_minmax(0,340px)] md:gap-px"
        style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--accent) 22%, var(--border)), var(--border))' }}
      >
        <main
          className="min-h-[50vh] p-5 md:p-10"
          style={{
            background: 'linear-gradient(165deg, color-mix(in srgb, var(--bg2) 92%, var(--accent3)) 0%, var(--bg) 100%)',
          }}
        >
          {selectedEmail ? (
            <article
              className="relative overflow-hidden rounded-box p-[3px] shadow-2xl md:p-[3px]"
              style={{
                background: 'linear-gradient(135deg, var(--accent2), var(--accent), color-mix(in srgb, var(--accent2) 70%, #fff) 50%, var(--accent))',
                boxShadow: '0 0 80px -12px color-mix(in srgb, var(--accent) 45%, transparent), inset 0 1px 0 color-mix(in srgb, var(--accent2) 40%, transparent)',
              }}
            >
              <div
                className="relative rounded-[calc(0.5rem-2px)] border p-6 md:p-10"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent) 35%, var(--card))',
                  background: `linear-gradient(180deg, color-mix(in srgb, var(--card) 88%, var(--accent3)) 0%, var(--card) 100%)`,
                }}
              >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-30 blur-3xl"
                style={{ background: 'var(--accent2)' }}
                aria-hidden
              />
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <p className="text-[10px] tracking-[0.35em] opacity-50">ROYAL THREAD</p>
                  <h2
                    className="mt-1 text-2xl md:text-3xl"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'color-mix(in srgb, var(--accent2) 88%, var(--text))',
                    }}
                  >
                    {selectedEmail.subject}
                  </h2>
                </div>
                <div className="text-right text-sm opacity-80">
                  <p className="text-xs opacity-50">From</p>
                  <p className="font-semibold">{selectedEmail.from.name}</p>
                  <p className="mt-2 text-xs opacity-50">{selectedEmail.date}</p>
                </div>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed opacity-90">{selectedEmail.body}</div>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="badge badge-outline uppercase" style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}>
                  Attache gold
                </span>
                <span className="badge badge-ghost border border-white/10" style={{ color: 'var(--text2)' }}>
                  Concierge follow-up
                </span>
              </div>
              </div>
            </article>
          ) : (
            <div className="flex min-h-[320px] items-center justify-center opacity-40">
              <p style={{ fontFamily: 'var(--font-display)' }} className="text-xl tracking-widest">
                Select a thread from the dhow dock →
              </p>
            </div>
          )}
        </main>

        <aside
          className="flex flex-col border-t md:border-t-0"
          style={{
            background: `linear-gradient(180deg, color-mix(in srgb, var(--card) 85%, var(--accent3)) 0%, var(--card) 100%)`,
          }}
        >
          <div className="sticky top-0 max-h-[min(70vh,560px)] overflow-y-auto">
            <div className="flex items-center justify-between border-b px-4 py-3 text-[10px] tracking-widest" style={{ borderColor: 'var(--border)', color: 'var(--accent2)' }}>
              <span>DHOW DOCK</span>
              <span className="opacity-50">{emails.filter(e => !e.read).length} new</span>
            </div>
            <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {emails.map((e, i) => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className="group flex w-full gap-3 px-4 py-4 text-left transition-colors hover:bg-white/5"
                    style={{
                      background: selectedEmail?.id === e.id ? 'var(--accent3)' : undefined,
                      transform: `skewY(-${i % 2 === 0 ? 0 : 0}deg)`,
                    }}
                  >
                    <span className="text-2xl transition-transform group-hover:scale-110">{e.from.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                          {e.subject}
                        </span>
                        {!e.read && (
                          <span className="badge badge-xs shrink-0 border-0" style={{ background: 'var(--accent)', color: '#0a0805' }}>
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs opacity-50">{e.from.name}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="mt-auto space-y-3 border-t p-4 text-xs"
            style={{
              borderColor: 'var(--border)',
              background: 'linear-gradient(160deg, var(--bg2) 0%, color-mix(in srgb, var(--bg2) 75%, var(--accent3)) 100%)',
            }}
          >
            <div
              className="flex items-center justify-between rounded-box border p-3"
              style={{ borderColor: 'color-mix(in srgb, var(--accent) 40%, var(--border))', boxShadow: 'inset 0 1px 0 color-mix(in srgb, var(--accent2) 12%, transparent)' }}
            >
              <span className="opacity-60">Desert air</span>
              <span className="text-lg">{weather.icon}</span>
              <span>{weather.temp}°</span>
            </div>
            <div
              className="rounded-box border p-3"
              style={{ borderColor: 'color-mix(in srgb, var(--accent) 35%, var(--border))', boxShadow: 'inset 0 1px 0 color-mix(in srgb, var(--accent2) 10%, transparent)' }}
            >
              <p className="mb-2 text-[10px] tracking-widest" style={{ color: 'var(--accent2)', opacity: 0.75 }}>
                EMIRATE INDEX
              </p>
              {stocks.map(s => (
                <div key={s.ticker} className="flex justify-between py-0.5">
                  <span style={{ color: 'var(--accent2)' }}>{s.ticker}</span>
                  <span>{s.changePct}%</span>
                </div>
              ))}
            </div>
            <p className="line-clamp-2 opacity-70">{news[0]?.title}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
