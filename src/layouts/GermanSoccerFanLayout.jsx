import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const position = t =>
  ({
    work: 'MITTELFELD',
    personal: 'FAMILIE',
    finance: 'KASSIERER',
    promo: 'BANDENWERBUNG',
    newsletter: 'STADIONZEITUNG',
    social: 'FANKURVE',
    dev: 'VAR-ROOM',
    shopping: 'FANSHOP',
    travel: 'AUSWÄRTS',
  }[t] || 'BANK')

export default function GermanSoccerFanLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-neutral-950 text-neutral-100" style={{ fontFamily: 'var(--font-main)' }}>
      <div className="german-floodlights pointer-events-none absolute inset-x-0 top-0 z-0 h-40" aria-hidden />
      <div className="german-wave-overlay pointer-events-none absolute inset-0 z-0 opacity-[0.12]" aria-hidden />
      <div className="absolute inset-x-0 top-0 z-0 h-2 bg-gradient-to-r from-black via-[#dd0000] to-[#ffcc00]" aria-hidden />

      <header className="relative z-10 border-b border-white/10 bg-black/60 px-4 py-5 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.35em] text-[#ffcc00]">DEUTSCHLAND · 12. MANN</p>
            <h1 className="mt-1 text-4xl sm:text-5xl" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
              FANPOST <span className="text-[#dd0000]">INBOX</span>
            </h1>
          </div>
          <button type="button" className="btn btn-outline border-2 font-bold uppercase" style={{ borderColor: '#ffcc00', color: '#ffcc00' }} onClick={onSwitchPersona}>
            Wechsel die Tribüne
          </button>
        </div>
        <div className="german-scarf mx-auto mt-4 h-3 max-w-6xl overflow-hidden rounded-full" aria-hidden />
      </header>

      <div className="relative z-10 mx-auto max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-[#12121a]/95 shadow-2xl backdrop-blur-sm">
        <div className="german-marquee flex whitespace-nowrap border-b border-white/10 bg-black py-2 text-sm font-bold uppercase tracking-wider text-[#ffcc00]">
          <span className="german-marquee-inner inline-block pr-16">
            TOR TOR TOR · SCHLAND SCHLAND · SAME MAIL DIFFERENT STADION · AUF GEHTS · TOR TOR TOR · SCHLAND SCHLAND ·
          </span>
          <span className="german-marquee-inner inline-block pr-16" aria-hidden>
            TOR TOR TOR · SCHLAND SCHLAND · SAME MAIL DIFFERENT STADION · AUF GEHTS · TOR TOR TOR · SCHLAND SCHLAND ·
          </span>
        </div>

        <div className="flex flex-col lg:flex-row" style={{ minHeight: 'calc(100dvh - 200px)' }}>
          <aside className="border-b border-white/10 lg:w-80 lg:border-b-0 lg:border-r">
            <div className="sticky top-0 bg-gradient-to-b from-[#dd0000]/20 to-transparent px-3 py-2 text-center text-xs font-black uppercase tracking-widest text-[#ffcc00]">
              Aufstellung ({emails.length})
            </div>
            <ul className="max-h-[50vh] overflow-y-auto lg:max-h-none">
              {emails.map((e, i) => {
                const active = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left transition-colors hover:bg-white/5 ${active ? 'bg-[#dd0000]/25 border-l-4 border-l-[#ffcc00]' : ''}`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-black text-lg font-black text-[#ffcc00]" style={{ fontFamily: 'var(--font-display)' }}>
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {!e.read && <span className="german-tor-badge rounded px-2 py-0.5 text-[10px] font-black uppercase">Tor!!</span>}
                          <span className={`truncate font-bold ${active ? 'text-white' : 'text-neutral-300'}`}>{e.subject}</span>
                        </div>
                        <p className="text-xs text-neutral-400">{e.from.name}</p>
                        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-[#dd0000]">{position(e.tag)}</p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>

          <main className="flex-1 p-5 lg:p-8">
            {selectedEmail ? (
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#1a1a24] to-black p-6 shadow-inner">
                <div className="absolute -right-8 -top-8 text-[120px] opacity-[0.07]">⚽</div>
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffcc00]">Nachspielzeit · Lecture</p>
                  <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{selectedEmail.subject}</h2>
                  <p className="mt-1 text-sm text-neutral-400">
                    {selectedEmail.from.name} · {selectedEmail.date}
                  </p>
                  <div className="mt-5 rounded-lg border border-white/10 bg-black/40 p-4 leading-relaxed whitespace-pre-wrap text-neutral-200">{selectedEmail.body}</div>
                  <button type="button" className="btn btn-ghost btn-sm mt-4 gap-2 text-[#ffcc00]" onClick={() => setSelectedEmail(null)}>
                    ← Zurück in die Kabine
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-white/20 p-8 text-center">
                <p className="text-7xl german-ball-sway">⚽</p>
                <p className="mt-4 max-w-md text-lg font-bold text-neutral-400">Wähl einen Spieler links — dann geht&apos;s ab wie im Stadion.</p>
              </div>
            )}
          </main>

          <aside className="border-t border-white/10 lg:w-56 lg:border-l lg:border-t-0">
            <div className="space-y-4 p-4">
              <div className="rounded-lg border border-white/10 bg-black/50 p-3 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#dd0000]">Wetter im Stadion</p>
                <p className="text-4xl">{weather.icon}</p>
                <p className="font-bold">{weather.condition}</p>
                <p className="text-xs text-neutral-500">
                  {weather.temp}° · {weather.wind} km/h Wind
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/50 p-3">
                <p className="mb-2 text-center text-[10px] font-black uppercase text-[#ffcc00]">Tabelle (Stocks)</p>
                {stocks.map(s => (
                  <div key={s.ticker} className="flex justify-between border-b border-white/5 py-1 text-sm">
                    <span className="font-bold">{s.ticker}</span>
                    <span className={s.changePct >= 0 ? 'text-green-400' : 'text-red-400'}>{s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%</span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-white/10 bg-black/40 p-2 text-xs text-neutral-400">
                {news.slice(0, 3).map((n, i) => (
                  <p key={i} className="mb-2 border-l-2 border-[#dd0000] pl-2">
                    {n.title}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
