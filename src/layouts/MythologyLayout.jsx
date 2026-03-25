import { useContext, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const myth = t => ({ work:'A Decree from the Council', personal:"A Messenger's Errand", finance:'The Prophecy of Wealth', promo:"A Herald's Proclamation", newsletter:"The Chronicler's Scroll" }[t] || 'A Tale Untold')
const gods = ['Zeus', 'Hera', 'Apollo', 'Athena', 'Poseidon', 'Ares', 'Artemis', 'Hermes', 'Hephaestus']
const toGodName = (name) => gods[name.length % gods.length]

export default function MythologyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="min-h-screen" style={{
      background: `var(--bg) url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='1' fill='%23c8a855' opacity='0.4'/%3E%3Ccircle cx='40' cy='60' r='0.8' fill='%23c8a855' opacity='0.3'/%3E%3Ccircle cx='160' cy='30' r='1.2' fill='%23c8a855' opacity='0.25'/%3E%3Ccircle cx='30' cy='170' r='0.9' fill='%23c8a855' opacity='0.35'/%3E%3Ccircle cx='170' cy='150' r='0.7' fill='%23c8a855' opacity='0.3'/%3E%3Ccircle cx='80' cy='140' r='1' fill='%23c8a855' opacity='0.2'/%3E%3C/svg%3E")`,
      fontFamily: 'var(--font-main)', color: 'var(--text)',
    }}>
      {/* Epic header */}
      <div className="text-center py-8 px-4 border-b" style={{
        borderColor: 'var(--border)',
        background: 'linear-gradient(180deg, rgba(200,168,85,0.1) 0%, transparent 100%)',
      }}>
        <div className="text-xs tracking-widest opacity-60 mb-2">⚡ IN THE AGE BEFORE MEMORY ⚡</div>
        <h1 className="text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
          THE INBOX OF OLYMPUS
        </h1>
        <p className="max-w-xl mx-auto text-sm italic opacity-70 leading-relaxed">
          Hear now the tales carried forth by digital messenger sprites, deposited at the gates of thine inbox.
          {emails.filter(e=>!e.read).length} epistles yet unsealed. {emails.filter(e=>e.read).length} already known.
        </p>
        <button onClick={onSwitchPersona} className="mt-3 text-xs opacity-60 hover:opacity-100 tracking-widest border px-4 py-1"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
          ✦ CHANGE NARRATOR ✦
        </button>
      </div>

      <div className="flex" style={{ minHeight: 'calc(100vh - 180px)' }}>
        {/* Left: Messenger Tales list */}
        <div className="w-80 shrink-0 overflow-y-auto border-r" style={{ borderColor: 'var(--border)' }}>
          <div className="px-4 py-2 border-b text-xs tracking-widest text-center opacity-60" style={{ borderColor: 'var(--border)' }}>
            MESSAGES BORNE BY HERMES
          </div>
          {emails.map((e, i) => (
            <div key={e.id} onClick={() => setSelectedEmail(e)}
              className="px-4 py-4 border-b cursor-pointer hover:opacity-80"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'rgba(200,168,85,0.1)' : 'transparent',
                borderLeftWidth: selectedEmail?.id === e.id ? '3px' : '1px',
                borderLeftColor: selectedEmail?.id === e.id ? 'var(--accent)' : 'var(--border)',
              }}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs opacity-40 italic">{myth(e.tag)}</span>
                {!e.read && <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>UNREAD</span>}
              </div>
              <div className="font-bold mb-1" style={{ color: e.read ? 'var(--text2)' : 'var(--text)', fontFamily: 'var(--font-display)' }}>
                {e.subject}
              </div>
              <div className="text-xs italic opacity-60">
                Sent by {toGodName(e.from.name)}, God of {e.tag === 'work' ? 'Commerce' : e.tag === 'personal' ? 'Kinship' : 'Fortune'} · {e.date}
              </div>
            </div>
          ))}
        </div>

        {/* Center: Epic tale */}
        <div className="flex-1 overflow-y-auto p-8">
          {selectedEmail ? (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <div className="text-xs tracking-widest opacity-60 mb-1">— {myth(selectedEmail.tag).toUpperCase()} —</div>
                <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                  {selectedEmail.subject}
                </h2>
                <div className="text-sm italic opacity-70">
                  Bearing the seal of {toGodName(selectedEmail.from.name)}, dispatched on {selectedEmail.date}
                </div>
              </div>

              {/* Decorative divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px" style={{ background: 'var(--accent)', opacity: 0.3 }} />
                <span style={{ color: 'var(--accent)' }}>⚡</span>
                <div className="flex-1 h-px" style={{ background: 'var(--accent)', opacity: 0.3 }} />
              </div>

              {/* The tale */}
              <div className="border rounded p-6 mb-4" style={{ borderColor: 'var(--border)', background: 'rgba(200,168,85,0.05)' }}>
                <p className="text-sm leading-loose italic opacity-90 first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2"
                  style={{ fontFamily: 'var(--font-main)' }}>
                  {selectedEmail.body}
                </p>
              </div>

              <div className="text-center">
                <button onClick={() => setSelectedEmail(null)} className="text-xs opacity-50 hover:opacity-100 tracking-widest">
                  ✦ Return to the Scrolls ✦
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full opacity-20">
              <div className="text-center">
                <div className="text-6xl mb-4">⚡</div>
                <div className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>CHOOSE A MESSENGER'S TALE</div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Oracle */}
        <div className="w-64 shrink-0 border-l overflow-y-auto p-5 space-y-5" style={{ borderColor: 'var(--border)' }}>
          {/* Weather as oracle prophecy */}
          <div className="border rounded p-4 text-center" style={{ borderColor: 'var(--accent)', background: 'rgba(200,168,85,0.06)' }}>
            <div className="text-xs tracking-widest mb-2 opacity-60">⚡ THE ORACLE SPEAKS</div>
            <div className="text-4xl mb-2">{weather.icon}</div>
            <div className="font-bold" style={{ fontFamily: 'var(--font-display)' }}>{weather.condition}</div>
            <div className="text-xs opacity-60 mt-1">{weather.temp}° · Winds of {weather.wind}</div>
            <div className="text-xs italic opacity-50 mt-2 leading-relaxed">
              "The Fates decree: {weather.condition}"
            </div>
          </div>

          {/* Stocks as fate of kingdoms */}
          <div className="border rounded p-4" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs tracking-widest mb-2 opacity-60 text-center">THE FATE OF KINGDOMS</div>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-1.5 border-b text-sm" style={{ borderColor: 'var(--border)' }}>
                <span className="italic opacity-80">{s.name.split(' ')[0]}</span>
                <span style={{ color: s.changePct >= 0 ? '#80c840' : '#c84040' }}>
                  {s.changePct >= 0 ? '↑' : '↓'} {Math.abs(s.changePct)}%
                </span>
              </div>
            ))}
          </div>

          {/* News as chronicles */}
          <div className="border rounded p-4" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs tracking-widest mb-2 opacity-60 text-center">THE CHRONICLES</div>
            {news.slice(0,4).map((n,i) => (
              <div key={i} className="mb-2 pb-2 border-b text-xs italic opacity-70 leading-snug" style={{ borderColor: 'var(--border)' }}>
                "{n.title}" — {n.source}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
