import { useState, useEffect } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const spices = ['🌶️', '🧄', '🫚', '🫛', '🪴', '🌿', '⭐', '🟤']
const todaySpecials = [
  'Chicken Biryani — ₹280',
  'Dal Makhani — ₹180',
  'Paneer Tikka Masala — ₹220',
  'Butter Naan (4 pcs) — ₹60',
  'Gulab Jamun — ₹80',
  'Mango Lassi — ₹90',
]
const tagLabel = t => ({
  work: '🍛 कामकाजी',
  personal: '❤️ अपने लोग',
  finance: '💰 पैसा',
  promo: '📢 विज्ञापन',
  newsletter: '📰 खबरें',
  social: '🫶 सोशल',
}[t] || '📋 अन्य')

const spiceHeat = ['🌶️', '🌶️🌶️', '🌶️🌶️🌶️', '🌶️🌶️🌶️🌶️', '🌶️🌶️🌶️🌶️🌶️']

const mandalaPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='38' fill='none' stroke='%23ff450018' stroke-width='1'/%3E%3Ccircle cx='40' cy='40' r='28' fill='none' stroke='%23ffd70015' stroke-width='1'/%3E%3Ccircle cx='40' cy='40' r='18' fill='none' stroke='%23ff450012' stroke-width='1'/%3E%3Cpath d='M40 2 L42 38 L40 40 L38 38 Z' fill='%23ff450010'/%3E%3Cpath d='M40 78 L42 42 L40 40 L38 42 Z' fill='%23ff450010'/%3E%3Cpath d='M2 40 L38 42 L40 40 L38 38 Z' fill='%23ff450010'/%3E%3Cpath d='M78 40 L42 38 L40 40 L42 42 Z' fill='%23ff450010'/%3E%3C/svg%3E")`

export default function IndianRestaurantLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [steamVisible, setSteamVisible] = useState(true)
  const [tableOrder, setTableOrder] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [ticker, setTicker] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setSteamVisible(v => !v), 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setTicker(t => (t + 1) % todaySpecials.length), 3000)
    return () => clearInterval(interval)
  }, [])

  function addToOrder(item) {
    setTableOrder(o => [...o, item])
  }

  const unread = emails.filter(e => !e.read).length

  return (
    <div className="min-h-screen" style={{
      background: 'var(--bg)',
      backgroundImage: mandalaPattern,
      backgroundSize: '80px 80px',
      color: 'var(--text)',
      fontFamily: 'var(--font-main)',
    }}>
      <style>{`
        @keyframes steam {
          0% { transform: translateY(0) scaleX(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scaleX(1.3); opacity: 0.3; }
          100% { transform: translateY(-40px) scaleX(0.8); opacity: 0; }
        }
        @keyframes spiceFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(10deg); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(255,69,0,0.3); }
          50% { box-shadow: 0 0 25px rgba(255,215,0,0.5), 0 0 50px rgba(255,69,0,0.2); }
        }
        @keyframes tickerSlide {
          0% { opacity: 0; transform: translateY(10px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes diagonalStripes {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .steam-wisp {
          animation: steam 2s ease-out infinite;
        }
        .steam-wisp:nth-child(2) { animation-delay: 0.4s; }
        .steam-wisp:nth-child(3) { animation-delay: 0.8s; }
        .spice-float { animation: spiceFloat 3s ease-in-out infinite; }
        .glow-card { animation: glowPulse 3s ease-in-out infinite; }
        .ticker-item { animation: tickerSlide 3s ease-in-out; }
      `}</style>

      {/* Decorative top border - rangoli pattern */}
      <div style={{
        height: 8,
        background: 'repeating-linear-gradient(90deg, #ff4500, #ffd700 20px, #2d8b00 40px, #ffd700 60px, #ff4500 80px)',
      }} />

      {/* Header - Restaurant Sign */}
      <header style={{
        background: 'linear-gradient(135deg, #2d0f00 0%, #1a0800 50%, #2d0f00 100%)',
        borderBottom: '3px solid var(--accent2)',
        padding: '1.5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Floating spices */}
        <div className="absolute top-2 right-32 text-2xl spice-float" style={{ animationDelay: '0s' }}>🌶️</div>
        <div className="absolute top-4 right-48 text-xl spice-float" style={{ animationDelay: '1s' }}>🧄</div>
        <div className="absolute bottom-2 right-24 text-xl spice-float" style={{ animationDelay: '0.5s' }}>⭐</div>

        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--accent2)', marginBottom: 4, fontFamily: 'var(--font-display)' }}>
              ✦ शुभ स्वागत ✦ WELCOME ✦
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              color: 'var(--accent2)',
              lineHeight: 1.1,
              textShadow: '2px 2px 0 var(--accent), 4px 4px 8px rgba(0,0,0,0.5)',
            }}>
              🍛 SHARMA JI'S INBOX
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: '0.85rem', marginTop: 4 }}>
              {unread} नए संदेश आए हैं · Serving since 1987 · Est. Mumbai
            </p>

            {/* Today's special ticker */}
            <div style={{
              marginTop: 8,
              background: 'rgba(255,69,0,0.15)',
              border: '1px solid var(--accent)',
              borderRadius: 4,
              padding: '4px 12px',
              display: 'inline-block',
              fontSize: '0.8rem',
            }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                AAJ KA SPECIAL:{' '}
              </span>
              <span className="ticker-item" key={ticker} style={{ color: 'var(--accent2)' }}>
                {todaySpecials[ticker]}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            {/* Steam animation over imaginary bowl */}
            <div className="relative flex items-end justify-center" style={{ width: 80, height: 60 }}>
              <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
                {[0,1,2].map(i => (
                  <div key={i} className="steam-wisp" style={{
                    width: 4, height: 20, borderRadius: 999,
                    background: 'rgba(255,200,100,0.4)',
                    animationDelay: `${i * 0.4}s`,
                  }} />
                ))}
              </div>
              <div style={{ fontSize: '2.5rem', position: 'relative', zIndex: 1 }}>🍛</div>
            </div>
            <button type="button" onClick={onSwitchPersona} style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, var(--accent), #ff8c00)',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '6px 16px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
            }}>
              बदलें MENU
            </button>
          </div>
        </div>
      </header>

      {/* Spice rack nav */}
      <div style={{
        background: '#2d0f00',
        borderBottom: '2px solid var(--border)',
        padding: '8px 2rem',
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        <span style={{ color: 'var(--text2)', fontSize: '0.7rem', marginRight: 8, fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>MASALA FILTER:</span>
        {[['सभी ALL', null], ['🍛 Work', 'work'], ['❤️ Personal', 'personal'], ['💰 Finance', 'finance'], ['📢 Promo', 'promo']].map(([label, _]) => (
          <button key={label} type="button" style={{
            background: 'rgba(255,69,0,0.1)',
            border: '1px solid var(--border)',
            borderRadius: 3,
            padding: '3px 10px',
            color: 'var(--text)',
            fontSize: '0.72rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-main)',
          }}>
            {label}
          </button>
        ))}
        {spices.map((s, i) => (
          <span key={i} style={{ fontSize: '1rem', opacity: 0.7 }}>{s}</span>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-0" style={{ minHeight: 'calc(100vh - 220px)' }}>
        {/* Email list - styled as a menu */}
        <div className="lg:col-span-4 border-r overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid var(--border)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--accent)',
          }}>
            🪴 INBOX KI THALI — आपके संदेश
          </div>
          {emails.map((email, i) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              style={{
                padding: '1rem',
                borderBottom: '1px solid rgba(139,58,0,0.3)',
                cursor: 'pointer',
                background: selectedEmail?.id === email.id
                  ? 'rgba(255,69,0,0.12)'
                  : 'transparent',
                borderLeft: selectedEmail?.id === email.id
                  ? '4px solid var(--accent)'
                  : '4px solid transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'rgba(255,215,0,0.05)' }}
              onMouseLeave={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'transparent' }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: '0.6rem', color: 'var(--accent2)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
                      {tagLabel(email.tag)}
                    </span>
                    {!email.read && (
                      <span style={{
                        background: 'var(--accent)',
                        color: '#fff',
                        fontSize: '0.5rem',
                        padding: '1px 5px',
                        borderRadius: 2,
                        fontFamily: 'var(--font-display)',
                      }}>NAYA</span>
                    )}
                  </div>
                  <p style={{
                    fontWeight: email.read ? 400 : 700,
                    fontSize: '0.85rem',
                    color: email.read ? 'var(--text2)' : 'var(--text)',
                    lineHeight: 1.3,
                    marginBottom: 3,
                  }} className="truncate">{email.subject}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text2)', opacity: 0.7 }} className="truncate">
                    {email.from.name}
                  </p>
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text2)', opacity: 0.6, whiteSpace: 'nowrap' }}>
                  {email.time}
                </div>
              </div>
              {/* Spice heat meter */}
              <div style={{ marginTop: 6, fontSize: '0.65rem', color: 'var(--text2)', opacity: 0.5 }}>
                {spiceHeat[(i + email.id) % spiceHeat.length]}
              </div>
            </div>
          ))}
        </div>

        {/* Main content - like a restaurant table */}
        <div className="lg:col-span-5 overflow-y-auto p-6">
          {selectedEmail ? (
            <div>
              {/* Decorative divider */}
              <div style={{
                textAlign: 'center',
                marginBottom: '1.5rem',
                color: 'var(--accent2)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
              }}>
                ✦ OM SHANTI OM ✦ आपका संदेश ✦
              </div>

              <div className="glow-card" style={{
                background: 'var(--card)',
                border: '2px solid var(--border)',
                borderRadius: 8,
                overflow: 'hidden',
              }}>
                {/* Message header - like an order ticket */}
                <div style={{
                  background: 'linear-gradient(135deg, var(--accent), #8b2200)',
                  padding: '1rem 1.25rem',
                }}>
                  <div style={{ color: '#ffd070', fontSize: '0.65rem', fontFamily: 'var(--font-display)', letterSpacing: '0.15em', marginBottom: 4 }}>
                    ORDER #{selectedEmail.id.toString().padStart(3, '0')} · {tagLabel(selectedEmail.tag)}
                  </div>
                  <h2 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.1rem', lineHeight: 1.3 }}>
                    {selectedEmail.subject}
                  </h2>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginTop: 6 }}>
                    👤 {selectedEmail.from.name} · 📅 {selectedEmail.date} · 🕐 {selectedEmail.time}
                  </div>
                </div>

                {/* Message body - like a plate */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px dashed var(--border)',
                    borderRadius: 6,
                    padding: '1.25rem',
                    fontSize: '0.88rem',
                    lineHeight: 1.8,
                    color: 'var(--text)',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {selectedEmail.body}
                  </div>

                  {/* Footer actions */}
                  <div style={{ marginTop: '1rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => addToOrder(selectedEmail.subject)} style={{
                      background: 'linear-gradient(135deg, var(--accent3), #1a5a00)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '7px 16px',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-display)',
                    }}>
                      🍛 ORDER KARO
                    </button>
                    <button type="button" onClick={() => setSelectedEmail(null)} style={{
                      background: 'none',
                      border: '1px solid var(--border)',
                      color: 'var(--text2)',
                      borderRadius: 4,
                      padding: '7px 16px',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                    }}>
                      ← WAPIS JAO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 20px rgba(255,69,0,0.5))' }}>🍛</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--accent2)', marginBottom: 8 }}>
                खाना गरम है!
              </div>
              <div style={{ color: 'var(--text2)', fontSize: '0.9rem', opacity: 0.7 }}>
                Koi email chuniye<br />
                <em>Choose an email to read</em>
              </div>
              {/* Steam animation */}
              <div style={{ marginTop: '2rem', display: 'flex', gap: 16 }}>
                {['🌶️', '🧄', '⭐', '🪴', '🫛'].map((s, i) => (
                  <span key={i} className="spice-float" style={{ fontSize: '1.5rem', animationDelay: `${i * 0.4}s` }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Menu board & daily specials */}
        <div className="lg:col-span-3 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.3)' }}>

          {/* Weather as kitchen report */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 6, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🌡️ KITCHEN REPORT
            </div>
            <div style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 4 }}>{weather.icon}</div>
            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text)' }}>{weather.temp}°C</p>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text2)' }}>{weather.condition}</p>
            <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--accent)', marginTop: 4, fontStyle: 'italic' }}>
              {weather.temp > 30 ? 'Bahut garmi! AC chala do 🥵' :
               weather.temp < 15 ? 'Thandi hai! Chai banao ☕' :
               'Mausam sahi hai! Khana banao 🍳'}
            </p>
          </div>

          {/* Today's menu */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 6, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🍽️ AAJ KA MENU
            </div>
            {todaySpecials.map((item, i) => (
              <div key={i} onClick={() => setShowMenu(!showMenu)} style={{
                padding: '6px 0',
                borderBottom: i < todaySpecials.length - 1 ? '1px dashed rgba(139,58,0,0.3)' : 'none',
                fontSize: '0.78rem',
                color: 'var(--text)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <span>{item.split(' — ')[0]}</span>
                <span style={{ color: 'var(--accent2)', fontSize: '0.72rem' }}>{item.split(' — ')[1]}</span>
              </div>
            ))}
          </div>

          {/* Table order */}
          {tableOrder.length > 0 && (
            <div style={{ background: 'rgba(255,69,0,0.1)', border: '1px solid var(--accent)', borderRadius: 6, padding: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
                📋 AAPKA ORDER
              </div>
              {tableOrder.map((item, i) => (
                <div key={i} style={{ fontSize: '0.72rem', color: 'var(--text)', marginBottom: 4, padding: '4px 0', borderBottom: '1px dashed rgba(139,58,0,0.2)' }}>
                  {i + 1}. {item.slice(0, 40)}...
                </div>
              ))}
              <button type="button" onClick={() => setTableOrder([])} style={{
                marginTop: 8,
                background: 'none',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                fontSize: '0.7rem',
                padding: '4px 10px',
                borderRadius: 3,
                cursor: 'pointer',
              }}>
                साफ करें CLEAR
              </button>
            </div>
          )}

          {/* Stocks as market prices */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 6, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              📊 BAZAAR BHAV
            </div>
            {stocks.map(s => (
              <div key={s.ticker} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text2)' }}>{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent)', fontWeight: 700 }}>
                  {s.changePct >= 0 ? '▲' : '▼'}{Math.abs(s.changePct)}%
                </span>
              </div>
            ))}
          </div>

          {/* News as rumours */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 6, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🗞️ MOHALLA KI KHABAR
            </div>
            {news.slice(0, 4).map((n, i) => (
              <div key={i} style={{ fontSize: '0.72rem', color: 'var(--text2)', marginBottom: 6, paddingBottom: 6, borderBottom: i < 3 ? '1px dashed rgba(139,58,0,0.3)' : 'none', lineHeight: 1.4 }}>
                {n.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div style={{
        height: 8,
        background: 'repeating-linear-gradient(90deg, #2d8b00, #ffd700 20px, #ff4500 40px, #ffd700 60px, #2d8b00 80px)',
      }} />
    </div>
  )
}
