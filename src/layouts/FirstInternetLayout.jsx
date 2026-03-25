import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function FirstInternetLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const visitorCount = 1240891 + emails.length * 73 + stocks.length * 11

  return (
    <div
      className="first-net-blink min-h-screen overflow-x-hidden"
      style={{
        background: 'repeating-linear-gradient(90deg, #000080 0px, #000080 40px, #000060 40px, #000060 80px)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="mx-auto max-w-4xl border-4 border-[var(--border)] bg-[var(--card)] text-[#000080] shadow-[8px_8px_0_#ff00ff]">
        <div className="border-b-4 border-[#00ffff] bg-[#ffff00] p-2 text-center">
          <p className="first-guestbook-marquee font-bold text-[#000080]">
            ★ WELCOME TO MY HOMEPAGE!!! ★ BEST VIEWED IN NETSCAPE ★ SIGN MY GUESTBOOK ★
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-[#000080] bg-[#c0c0c0] p-3">
          <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem' }}>
            UNDER CONSTRUCTION 🚧
          </span>
          <span className="rounded bg-black px-2 py-1 text-xs font-bold text-[#00ff00]">YOU ARE VISITOR #{visitorCount}</span>
          <button
            type="button"
            className="btn btn-xs border-2 border-[#000080] bg-[#ff00ff] font-bold text-white hover:bg-[#ff44ff]"
            onClick={onSwitchPersona}
          >
            CLICK 4 OTHER SITE
          </button>
        </div>

        <div className="grid gap-4 p-4 md:grid-cols-[1fr_200px]">
          <main>
            <h1 className="text-center text-3xl font-bold text-[#ff00ff]" style={{ textShadow: '2px 2px 0 #00ffff' }}>
              MY COOL E-MAIL ZONE
            </h1>
            <p className="mt-2 text-center text-sm font-bold">(these are REAL messages from the computer)</p>

            <table className="mt-6 w-full border-4 border-[#000080] border-collapse bg-white text-left text-sm">
              <tbody>
                {emails.map(email => (
                  <tr key={email.id} className="border-2 border-[#000080]">
                    <td className="border-2 border-[#000080] p-2 align-top text-2xl">{email.from.avatar}</td>
                    <td className="border-2 border-[#000080] p-2">
                      <button type="button" className="w-full text-left font-bold text-[#0000ff] underline hover:bg-[#ffff00]" onClick={() => setSelectedEmail(email)}>
                        {email.subject}
                      </button>
                      <p className="mt-1 text-xs">{email.preview.slice(0, 100)}…</p>
                    </td>
                    <td className="hidden w-24 border-2 border-[#000080] p-2 text-xs sm:table-cell">{email.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>

          <aside className="space-y-3">
            <div className="border-4 border-[#ff00ff] bg-[#00ffff] p-2 text-center text-xs font-bold text-black">
              WEATHER.EXE
              <p className="mt-2 text-lg">
                {weather.icon} {weather.temp}°C
              </p>
            </div>
            <div className="border-4 border-[#00ff00] bg-black p-2 font-mono text-[10px] text-[#00ff00]">
              STOCK.TXT
              {stocks.map(s => (
                <p key={s.ticker}>
                  {s.ticker} … {s.changePct.toFixed(2)}%
                </p>
              ))}
            </div>
            <div className="rotate-1 border-2 border-[#000080] bg-[#ffff00] p-2 text-[10px] font-bold leading-tight">
              NEWS CLIPS:
              {news.slice(0, 3).map(n => (
                <p key={n.id} className="mt-1">
                  {n.emoji} {n.title}
                </p>
              ))}
            </div>
            <div className="text-center text-4xl">🌈✨🐠</div>
          </aside>
        </div>

        <div className="border-t-4 border-[#000080] bg-[#000080] p-2 text-center text-xs text-[#00ffff]">
          © 1997–2026 ME · LAST UPDATED: TODAY · HOTMAIL RULEZ
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000080]/90 p-4" onClick={() => setSelectedEmail(null)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto border-8 border-[#ffff00] bg-[#c0c0c0] p-4 text-[#000080]" onClick={e => e.stopPropagation()}>
            <p className="text-center font-bold text-[#ff00ff]">*** MESSAGE WINDOW ***</p>
            <h2 className="mt-2 text-center text-lg font-bold">{selectedEmail.subject}</h2>
            <p className="text-center text-sm">FROM: {selectedEmail.from.name}</p>
            <hr className="my-4 border-t-2 border-[#000080]" />
            <pre className="whitespace-pre-wrap font-sans text-sm">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-block mt-4 border-4 border-[#000080] bg-[#00ff00] font-bold text-black" onClick={() => setSelectedEmail(null)}>
              [ OK ]
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
