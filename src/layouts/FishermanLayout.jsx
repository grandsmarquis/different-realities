import { useState, useEffect, useRef } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const FISH = ['🐟', '🐠', '🐡', '🦈', '🐙', '🦑', '🦐', '🦞', '🦀', '🐬']
const FISH_NAMES = ['Bluefin Tuna', 'Sea Bass', 'Cod', 'Mackerel', 'Trout', 'Snapper']
const tagLabel = t => ({
  work: { name: 'WORKING WATERS', fish: '🐟' },
  personal: { name: 'HOME PORT', fish: '🦐' },
  finance: { name: 'DEEP POCKET SEA', fish: '💰' },
  promo: { name: 'BAIT WATERS', fish: '🎣' },
  newsletter: { name: 'DAILY CATCH', fish: '📰' },
  social: { name: 'HARBOR GOSSIP', fish: '🦀' },
}[t] || { name: 'OPEN OCEAN', fish: '🌊' })

const wisdoms = [
  '"Give a man an email, he reads for a day. Teach him to fish, he reads nothing."',
  '"The big ones always get away... into the spam folder."',
  '"Still waters run deep. This inbox is running very still."',
  '"A bad day fishing is better than a good day answering emails."',
  '"Patience is a virtue. So is not replying all."',
]

function WaveLayer({ offset = 0, opacity = 0.3, height = 40, speed = 8, color = '#4a9ebb' }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: offset,
      left: 0, right: 0,
      height: height,
      overflow: 'hidden',
    }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '200%', height: '100%', animation: `waveMove ${speed}s linear infinite`, opacity }}>
        <path d="M0,30 C240,50 480,10 720,30 C960,50 1200,10 1440,30 L1440,60 L0,60 Z" fill={color} />
      </svg>
    </div>
  )
}

export default function FishermanLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [fishingLine, setFishingLine] = useState(0)
  const [caughtFish, setCaughtFish] = useState([])
  const [reeling, setReeling] = useState(false)
  const [wisdomIdx, setWisdomIdx] = useState(0)
  const [tide, setTide] = useState(0)
  const [bobber, setBobber] = useState({ y: 0, active: false })

  useEffect(() => {
    const interval = setInterval(() => {
      setWisdomIdx(w => (w + 1) % wisdoms.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTide(t => (t + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setBobber(b => ({ ...b, y: Math.sin(Date.now() / 800) * 4 }))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  function castLine(email) {
    setReeling(true)
    setTimeout(() => {
      setReeling(false)
      setCaughtFish(f => [...f, { id: email.id, fish: FISH[email.id % FISH.length], name: email.from.name }])
      setSelectedEmail(email)
    }, 400)
  }

  const unread = emails.filter(e => !e.read).length
  const waveY = Math.sin(tide * Math.PI / 180) * 3

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(180deg, #0a1628 0%, #0d1e35 50%, #091420 100%)',
      color: 'var(--text)',
      fontFamily: 'var(--font-main)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes bobberFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fishSwim {
          0% { transform: translateX(-60px) scaleX(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 60px)) scaleX(1); opacity: 0; }
        }
        @keyframes lineReel {
          0% { height: 0; opacity: 0; }
          100% { height: 120px; opacity: 1; }
        }
        @keyframes catchBounce {
          0% { transform: translateY(-40px) scale(0); opacity: 0; }
          60% { transform: translateY(5px) scale(1.1); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes fogDrift {
          0% { transform: translateX(-20px); opacity: 0.08; }
          50% { transform: translateX(20px); opacity: 0.12; }
          100% { transform: translateX(-20px); opacity: 0.08; }
        }
        .bobber-anim { animation: bobberFloat 1.5s ease-in-out infinite; }
        .fish-swim { animation: fishSwim 12s linear infinite; }
        .catch-bounce { animation: catchBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .ripple-anim { animation: ripple 2s ease-out infinite; }
        .fog-drift { animation: fogDrift 8s ease-in-out infinite; }
        .line-reel { animation: lineReel 0.4s ease-out forwards; }
      `}</style>

      {/* Fog layer */}
      <div className="fog-drift pointer-events-none fixed inset-0 z-0" style={{
        background: 'radial-gradient(ellipse at 30% 40%, rgba(200,230,240,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(200,230,240,0.05) 0%, transparent 50%)',
      }} />

      {/* Swimming fish decoration */}
      <div className="pointer-events-none fixed z-0" style={{ bottom: 60, left: 0, right: 0, height: 60 }}>
        {FISH.slice(0, 4).map((f, i) => (
          <div key={i} className="fish-swim absolute" style={{
            top: `${20 + i * 15}%`,
            fontSize: `${0.8 + (i % 3) * 0.4}rem`,
            animationDelay: `${i * 3}s`,
            animationDuration: `${10 + i * 4}s`,
            opacity: 0.25,
          }}>{f}</div>
        ))}
      </div>

      {/* Ocean bottom waves */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-0" style={{ height: 100 }}>
        <WaveLayer offset={0} opacity={0.3} height={50} speed={12} color="#0d2a3d" />
        <WaveLayer offset={10} opacity={0.2} height={40} speed={8} color="#1a3d52" />
        <WaveLayer offset={20} opacity={0.15} height={35} speed={5} color="#4a9ebb" />
      </div>

      {/* Dock header */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(180deg, #0d1e35 0%, #0a1628 100%)',
        borderBottom: '3px solid #2a4a5c',
        padding: '1.25rem 2rem',
      }}>
        {/* Wood plank texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(100,60,20,0.05) 80px, rgba(100,60,20,0.05) 81px)',
          pointerEvents: 'none',
        }} />

        <div className="relative flex items-start justify-between flex-wrap gap-4">
          <div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--accent2)', marginBottom: 4, fontFamily: 'var(--font-display)', opacity: 0.8 }}>
              ⚓ DOCKSIDE DISPATCH · EST. 1962
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 3vw, 2.5rem)',
              color: 'var(--text)',
              lineHeight: 1.1,
              textShadow: '1px 1px 0 #000',
            }}>
              🎣 THE OLD MAN'S MAILBOX
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: '0.8rem', marginTop: 4 }}>
              {unread} messages on the line · {caughtFish.length} reeled in today
            </p>

            {/* Wisdom ticker */}
            <div style={{
              marginTop: 8,
              fontSize: '0.75rem',
              color: 'var(--text2)',
              fontStyle: 'italic',
              opacity: 0.8,
              maxWidth: 500,
            }}>
              <span key={wisdomIdx}>{wisdoms[wisdomIdx]}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-col">
            {/* Tide chart */}
            <div style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid #1e3a52',
              borderRadius: 6,
              padding: '8px 16px',
              textAlign: 'center',
              minWidth: 100,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', color: 'var(--text2)', letterSpacing: '0.15em', marginBottom: 2 }}>TIDE</div>
              <div style={{ fontSize: '1.5rem' }}>🌊</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent2)', fontFamily: 'var(--font-display)' }}>
                {waveY > 0 ? 'RISING' : 'FALLING'}
              </div>
            </div>

            <button type="button" onClick={onSwitchPersona} style={{
              fontFamily: 'var(--font-display)',
              background: 'rgba(232,160,64,0.1)',
              border: '2px solid var(--accent)',
              color: 'var(--accent)',
              borderRadius: 4,
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: '0.72rem',
              letterSpacing: '0.05em',
            }}>
              ⚓ CHANGE PORT
            </button>
          </div>
        </div>
      </header>

      {/* Fishing rod decorative bar */}
      <div className="relative z-10" style={{ background: 'rgba(10,20,30,0.8)', borderBottom: '1px solid #1e3a52', padding: '0.5rem 2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #8b6020, #a07830)', borderRadius: 999, flex: 1 }} />
        <div className="bobber-anim" style={{ fontSize: '0.9rem' }}>🔴</div>
        <div style={{ height: 3, background: '#1e3a52', borderRadius: 999, width: 40 }} />
        <span style={{ fontSize: '0.65rem', color: 'var(--text2)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', opacity: 0.7 }}>
          LINE {reeling ? 'REELING...' : 'CAST'}
        </span>
      </div>

      <div className="relative z-10 grid lg:grid-cols-12" style={{ minHeight: 'calc(100vh - 200px)' }}>

        {/* Email list - catch log */}
        <div className="lg:col-span-4 border-r overflow-y-auto" style={{ borderColor: '#1e3a52', background: 'rgba(5,15,25,0.7)' }}>
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '2px solid #1e3a52',
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--accent)',
          }}>
            📋 CAPTAIN'S LOG · {emails.length} MESSAGES
          </div>

          {emails.map((email, i) => {
            const meta = tagLabel(email.tag)
            const isCaught = caughtFish.some(f => f.id === email.id)
            return (
              <div
                key={email.id}
                onClick={() => castLine(email)}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid rgba(30,58,82,0.5)',
                  cursor: 'pointer',
                  background: selectedEmail?.id === email.id
                    ? 'rgba(74,158,187,0.1)'
                    : 'transparent',
                  borderLeft: `4px solid ${selectedEmail?.id === email.id ? 'var(--accent2)' : 'transparent'}`,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'rgba(74,158,187,0.05)' }}
                onMouseLeave={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  {/* Fish indicator */}
                  <div style={{
                    fontSize: '1.4rem',
                    opacity: isCaught ? 1 : 0.4,
                    filter: isCaught ? 'drop-shadow(0 0 6px rgba(74,158,187,0.6))' : 'none',
                    flexShrink: 0,
                    transition: 'all 0.3s',
                  }}>
                    {isCaught ? FISH[i % FISH.length] : '🎣'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontSize: '0.58rem', color: 'var(--accent2)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
                        {meta.name}
                      </span>
                      {!email.read && (
                        <span style={{ fontSize: '0.6rem', color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>●</span>
                      )}
                    </div>
                    <p style={{
                      fontSize: '0.85rem',
                      color: email.read ? 'var(--text2)' : 'var(--text)',
                      fontWeight: email.read ? 400 : 700,
                      lineHeight: 1.3,
                      marginBottom: 2,
                    }} className="truncate">{email.subject}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text2)', opacity: 0.6 }} className="truncate">
                      From the waters of {email.from.name}
                    </p>
                    <div style={{ marginTop: 4, fontSize: '0.6rem', color: 'var(--accent)', opacity: 0.7 }}>
                      {isCaught ? '✅ CAUGHT' : '🎣 CAST LINE TO OPEN'}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Main reading dock */}
        <div className="lg:col-span-5 overflow-y-auto p-6">
          {selectedEmail ? (
            <div>
              {/* Message header - dock board */}
              <div style={{
                background: 'rgba(10,20,30,0.9)',
                border: '2px solid var(--accent2)',
                borderRadius: 8,
                overflow: 'hidden',
                backdropFilter: 'blur(8px)',
              }}>
                {/* Plank header */}
                <div style={{
                  background: 'linear-gradient(135deg, #1e3a52, #0d2a3d)',
                  borderBottom: '2px solid var(--accent2)',
                  padding: '1.25rem',
                  position: 'relative',
                }}>
                  {/* Wood grain lines */}
                  {[0,1,2].map(i => (
                    <div key={i} style={{ position: 'absolute', top: `${20 + i * 25}%`, left: 0, right: 0, height: 1, background: 'rgba(100,60,20,0.1)' }} />
                  ))}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 8px rgba(74,158,187,0.5))' }}>
                      {FISH[selectedEmail.id % FISH.length]}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 2 }}>
                        {tagLabel(selectedEmail.tag).name} · REEL #{selectedEmail.id}
                      </div>
                      <h2 style={{ color: 'var(--text)', fontSize: '1.1rem', fontFamily: 'var(--font-display)', lineHeight: 1.3 }}>
                        {selectedEmail.subject}
                      </h2>
                    </div>
                  </div>

                  <div style={{ marginTop: 8, display: 'flex', gap: '1rem', fontSize: '0.72rem', color: 'var(--text2)' }}>
                    <span>⚓ {selectedEmail.from.name}</span>
                    <span>📅 {selectedEmail.date}</span>
                    <span>🕐 {selectedEmail.time}</span>
                  </div>
                </div>

                {/* Net texture body */}
                <div style={{ padding: '1.5rem', position: 'relative' }}>
                  {/* Net pattern overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='M0 10 L20 10 M10 0 L10 20' stroke='rgba(74,158,187,0.04)' stroke-width='1'/%3E%3C/svg%3E")`,
                    pointerEvents: 'none',
                  }} />

                  <div style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid #1e3a52',
                    borderRadius: 6,
                    padding: '1.25rem',
                    fontSize: '0.9rem',
                    lineHeight: 1.9,
                    color: 'var(--text)',
                    whiteSpace: 'pre-wrap',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    {selectedEmail.body}
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', gap: 8, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                    <button type="button" style={{
                      background: 'linear-gradient(135deg, var(--accent2), #2a6a8a)',
                      color: '#000',
                      border: 'none',
                      borderRadius: 4,
                      padding: '8px 18px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                    }}>
                      🎣 REPLY
                    </button>
                    <button type="button" onClick={() => setSelectedEmail(null)} style={{
                      background: 'rgba(74,158,187,0.08)',
                      border: '1px solid #1e3a52',
                      color: 'var(--text2)',
                      borderRadius: 4,
                      padding: '8px 18px',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                    }}>
                      ← BACK TO DOCK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
              {/* Fishing scene */}
              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem' }}>🎣</div>
                {/* Line */}
                <div style={{ position: 'absolute', top: '100%', left: '55%', width: 2, height: 80, background: 'linear-gradient(180deg, #8b6020, transparent)', transformOrigin: 'top' }} />
                {/* Bobber */}
                <div className="bobber-anim" style={{ position: 'absolute', top: 'calc(100% + 80px)', left: '45%', fontSize: '1rem' }}>🔴</div>
                {/* Ripple */}
                <div className="ripple-anim" style={{ position: 'absolute', top: 'calc(100% + 90px)', left: '30%', width: 40, height: 16, border: '1px solid rgba(74,158,187,0.4)', borderRadius: '50%' }} />
              </div>

              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--accent2)', marginBottom: 8, letterSpacing: '0.1em' }}>
                WAITING FOR A BITE...
              </div>
              <p style={{ color: 'var(--text2)', fontSize: '0.85rem', opacity: 0.7, fontStyle: 'italic' }}>
                Click an email to cast your line<br />and reel it in, son.
              </p>

              {caughtFish.length > 0 && (
                <div style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', background: 'rgba(74,158,187,0.08)', border: '1px solid #1e3a52', borderRadius: 6 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: 6 }}>TODAY'S CATCH</div>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {caughtFish.map((f, i) => (
                      <span key={i} className="catch-bounce" style={{ fontSize: '1.2rem' }}>{f.fish}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Harbor sidebar */}
        <div className="lg:col-span-3 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: '#1e3a52', background: 'rgba(5,15,25,0.6)' }}>

          {/* Weather at sea */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid #1e3a52', borderRadius: 6, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              ⛵ SEA CONDITIONS
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 8px rgba(74,158,187,0.4))' }}>{weather.icon}</span>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text)' }}>{weather.temp}°C</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>{weather.condition}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--accent)', marginTop: 2, fontFamily: 'var(--font-display)' }}>
                  WIND: {weather.wind || 12}kph
                </div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: '0.7rem', color: weather.temp < 10 ? '#4444ff' : weather.temp > 30 ? '#ff8c00' : 'var(--accent3)', fontStyle: 'italic' }}>
              {weather.temp < 10 ? '🥶 Dress warm. Fish bite in cold water.' :
               weather.temp > 30 ? '☀️ Fish are deep. Use longer line.' :
               '✅ Perfect conditions. Get out there!'}
            </div>
          </div>

          {/* Catch log */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid #1e3a52', borderRadius: 6, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🐟 WHAT'S BITING
            </div>
            {FISH_NAMES.map((name, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.75rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--text2)' }}>{FISH[i]} {name}</span>
                <span style={{ color: i < 3 ? 'var(--accent3)' : 'var(--text2)', fontSize: '0.65rem', fontFamily: 'var(--font-display)' }}>
                  {['HOT', 'GOOD', 'FAIR', 'SLOW', 'SLOW', 'COLD'][i]}
                </span>
              </div>
            ))}
          </div>

          {/* Stocks as fish market prices */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid #1e3a52', borderRadius: 6, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🏪 FISH MARKET PRICES
            </div>
            {stocks.map(s => (
              <div key={s.ticker} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text2)', fontFamily: 'var(--font-display)', fontSize: '0.7rem' }}>{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : '#ff4444', fontFamily: 'var(--font-display)', fontSize: '0.7rem' }}>
                  {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%
                </span>
              </div>
            ))}
          </div>

          {/* News as harbor radio */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid #1e3a52', borderRadius: 6, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              📻 HARBOR RADIO
            </div>
            {news.slice(0, 3).map((n, i) => (
              <div key={i} style={{ fontSize: '0.72rem', color: 'var(--text2)', marginBottom: 6, paddingBottom: 6, borderBottom: i < 2 ? '1px solid rgba(30,58,82,0.5)' : 'none', lineHeight: 1.4, fontStyle: 'italic', opacity: 0.8 }}>
                🌊 {n.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
