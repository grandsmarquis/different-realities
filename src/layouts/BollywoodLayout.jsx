import { useState, useEffect, useRef } from 'react'
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
  'Bade bade deshon mein... inbox aise hi hote hain.',
]

const stars = [
  '✨', '⭐', '💫', '🌟', '✦', '★', '✧',
]

const tagLabel = t => ({
  work: '🎬 KAAM',
  personal: '💕 DIL',
  finance: '💰 PAISA',
  promo: '📢 NATAK',
  newsletter: '📰 AKHBAAR',
  social: '🫶 YAAR',
}[t] || '🎭 SCENE')

export default function BollywoodLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [currentDialogue, setCurrentDialogue] = useState(0)
  const [sparkles, setSparkles] = useState([])
  const [filmReel, setFilmReel] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDialogue(d => (d + 1) % dialogues.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFilmReel(r => (r + 1) % 8)
    }, 150)
    return () => clearInterval(interval)
  }, [])

  function handleMouseMove(e) {
    if (Math.random() > 0.85) {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      setSparkles(s => [...s.slice(-12), { id, x, y, star: stars[Math.floor(Math.random() * stars.length)] }])
      setTimeout(() => setSparkles(s => s.filter(sp => sp.id !== id)), 1200)
    }
  }

  const unread = emails.filter(e => !e.read).length

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 20% 0%, #3d0070 0%, #0d0020 40%, #1a003d 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <style>{`
        @keyframes glitter {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes filmRoll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.3); }
          28% { transform: scale(1); }
          42% { transform: scale(1.2); }
          70% { transform: scale(1); }
        }
        @keyframes dramaticEntrance {
          0% { opacity: 0; transform: scale(0.5) rotateY(90deg); }
          60% { transform: scale(1.05) rotateY(-5deg); }
          100% { opacity: 1; transform: scale(1) rotateY(0deg); }
        }
        @keyframes dialogueFade {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          20% { opacity: 1; transform: translateY(0) scale(1); }
          80% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-20px) scale(0.95); }
        }
        @keyframes shimmerBg {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-60px) scale(0); opacity: 0; }
        }
        @keyframes rotateSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes neonPulse {
          0%, 100% { text-shadow: 0 0 5px #ff69b4, 0 0 10px #ff69b4, 0 0 20px #ff69b4; }
          50% { text-shadow: 0 0 10px #ff69b4, 0 0 25px #ff1493, 0 0 50px #ff1493, 0 0 80px #ff1493; }
        }
        .sparkle-pop { animation: glitter 1.2s ease-out forwards; }
        .heartbeat { animation: heartbeat 2s ease-in-out infinite; }
        .dialogue-fade { animation: dialogueFade 4s ease-in-out infinite; }
        .dramatic-in { animation: dramaticEntrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .neon-text { animation: neonPulse 2s ease-in-out infinite; }
        .float-up { animation: floatUp 1.2s ease-out forwards; }
      `}</style>

      {/* Sparkle layer */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {sparkles.map(sp => (
          <div key={sp.id} className="sparkle-pop absolute" style={{
            left: sp.x,
            top: sp.y,
            fontSize: '1.2rem',
            color: 'var(--accent2)',
            transform: 'translate(-50%, -50%)',
          }}>
            {sp.star}
          </div>
        ))}
      </div>

      {/* Film reel top strip */}
      <div style={{
        background: '#0a000f',
        borderBottom: '2px solid var(--border)',
        padding: '4px 0',
        display: 'flex',
        gap: 2,
        overflow: 'hidden',
      }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{
            width: 28,
            height: 20,
            border: '2px solid #3d0060',
            borderRadius: 2,
            background: i % 2 === filmReel % 2 ? 'rgba(255,20,147,0.1)' : 'transparent',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.55rem',
            color: '#6b0050',
          }}>
            🎬
          </div>
        ))}
      </div>

      {/* Header - Bollywood poster style */}
      <header style={{
        background: 'linear-gradient(135deg, #3d0070, #6b0050, #3d0070)',
        borderBottom: '3px solid var(--accent)',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Glitter background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(255,20,147,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,215,0,0.1) 0%, transparent 60%)',
        }} />

        {/* Stars scattered */}
        {['✨','💫','⭐','✨','💫','⭐','✨'].map((s, i) => (
          <div key={i} className="absolute" style={{
            top: `${10 + (i * 12)}%`,
            left: `${5 + (i * 13)}%`,
            fontSize: '1rem',
            opacity: 0.6,
            animation: `rotateSlow ${3 + i}s linear infinite`,
          }}>{s}</div>
        ))}

        <div className="relative z-10">
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--accent2)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>
            ✦ SUPER HIT ✦ BLOCKBUSTER ✦ MUST SEE ✦
          </div>
          <h1 className="neon-text" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            color: 'var(--accent2)',
            lineHeight: 1.1,
            marginBottom: 8,
          }}>
            💕 INBOX-WALA PYAAR 💕
          </h1>
          <p style={{ color: 'var(--accent)', fontSize: '1rem', fontStyle: 'italic', marginBottom: 12 }}>
            {unread} नए dil-ki-baatein aaye hain
          </p>

          {/* Rotating dialogue box */}
          <div style={{
            background: 'rgba(0,0,0,0.5)',
            border: '2px solid var(--accent)',
            borderRadius: 8,
            padding: '10px 20px',
            maxWidth: 500,
            margin: '0 auto 1rem',
            minHeight: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <p className="dialogue-fade" key={currentDialogue} style={{
              color: 'var(--accent2)',
              fontSize: '0.85rem',
              fontStyle: 'italic',
              textAlign: 'center',
            }}>
              🎬 "{dialogues[currentDialogue]}"
            </p>
          </div>

          <div className="flex justify-center items-center gap-4">
            <div className="heartbeat" style={{ fontSize: '1.5rem' }}>💕</div>
            <button type="button" onClick={onSwitchPersona} style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, var(--accent), #8b0060)',
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              padding: '8px 24px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              boxShadow: '0 4px 20px rgba(255,20,147,0.4)',
            }}>
              🎭 CHANGE FILM
            </button>
            <div className="heartbeat" style={{ fontSize: '1.5rem', animationDelay: '1s' }}>💕</div>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-12" style={{ minHeight: 'calc(100vh - 280px)' }}>

        {/* Email list - Film reel style */}
        <div className="lg:col-span-4 border-r overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid var(--border)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--accent)',
            background: 'rgba(0,0,0,0.4)',
          }}>
            🎞️ FILM KI PLAYLIST — {emails.length} SCENES
          </div>
          {emails.map((email, i) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              style={{
                padding: '1rem',
                borderBottom: '1px solid rgba(107,0,80,0.3)',
                cursor: 'pointer',
                background: selectedEmail?.id === email.id
                  ? 'rgba(255,20,147,0.12)'
                  : 'transparent',
                borderLeft: selectedEmail?.id === email.id
                  ? '4px solid var(--accent)'
                  : '4px solid transparent',
                transition: 'all 0.2s',
                position: 'relative',
              }}
              onMouseEnter={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'rgba(255,215,0,0.04)' }}
              onMouseLeave={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'transparent' }}
            >
              {/* Scene number */}
              <div style={{ position: 'absolute', top: 8, right: 8, fontFamily: 'var(--font-display)', fontSize: '0.55rem', color: 'var(--border)', letterSpacing: '0.1em' }}>
                SCENE {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', flexShrink: 0,
                  boxShadow: selectedEmail?.id === email.id ? '0 0 12px var(--accent)' : 'none',
                }}>
                  {email.from.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: '0.6rem', color: 'var(--accent2)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', marginBottom: 2 }}>
                    {tagLabel(email.tag)} {!email.read && '🔴'}
                  </div>
                  <p style={{
                    fontWeight: email.read ? 400 : 700,
                    fontSize: '0.85rem',
                    color: email.read ? 'rgba(255,105,180,0.5)' : 'var(--text)',
                    lineHeight: 1.3,
                    marginBottom: 2,
                  }} className="truncate">{email.subject}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text2)', opacity: 0.7, fontStyle: 'italic' }} className="truncate">
                    — {email.from.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main stage */}
        <div className="lg:col-span-5 overflow-y-auto p-6">
          {selectedEmail ? (
            <div className="dramatic-in">
              {/* Spotlight header */}
              <div style={{
                textAlign: 'center',
                marginBottom: '1.5rem',
                background: 'radial-gradient(ellipse at 50% 0%, rgba(255,20,147,0.15) 0%, transparent 70%)',
                padding: '1rem 0',
              }}>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--accent2)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>
                  ✦ SPOTLIGHT ON ✦
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 3vw, 1.6rem)',
                  color: 'var(--text)',
                  lineHeight: 1.3,
                  textShadow: '0 0 20px rgba(255,20,147,0.5)',
                }}>
                  {selectedEmail.subject}
                </h2>
                <p style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: 6, fontStyle: 'italic' }}>
                  Starring: {selectedEmail.from.name}
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #1a003d, #12001e)',
                border: '2px solid var(--accent)',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 0 30px rgba(255,20,147,0.2)',
              }}>
                {/* Hero panel */}
                <div style={{
                  background: 'linear-gradient(135deg, var(--accent), #6b0050)',
                  padding: '1.25rem',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '1rem',
                  alignItems: 'center',
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem',
                    border: '3px solid var(--accent2)',
                    boxShadow: '0 0 20px rgba(255,215,0,0.4)',
                  }}>
                    {selectedEmail.from.avatar}
                  </div>
                  <div>
                    <p style={{ color: 'var(--accent2)', fontFamily: 'var(--font-display)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                      HERO / HEROINE
                    </p>
                    <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>{selectedEmail.from.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem' }}>
                      {selectedEmail.date} · {selectedEmail.time} · {tagLabel(selectedEmail.tag)}
                    </p>
                  </div>
                </div>

                {/* Body - like movie subtitles */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(107,0,80,0.5)',
                    borderRadius: 8,
                    padding: '1.25rem',
                    fontSize: '0.9rem',
                    lineHeight: 1.9,
                    color: 'var(--text)',
                    whiteSpace: 'pre-wrap',
                    fontStyle: 'italic',
                  }}>
                    {selectedEmail.body}
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button type="button" style={{
                      background: 'linear-gradient(135deg, var(--accent), #8b0060)',
                      color: '#fff', border: 'none', borderRadius: 999,
                      padding: '8px 20px', cursor: 'pointer', fontSize: '0.8rem',
                      boxShadow: '0 4px 15px rgba(255,20,147,0.3)',
                    }}>
                      💕 REPLY KARO
                    </button>
                    <button type="button" onClick={() => setSelectedEmail(null)} style={{
                      background: 'none',
                      border: '1px solid var(--border)',
                      color: 'var(--text2)', borderRadius: 999,
                      padding: '8px 20px', cursor: 'pointer', fontSize: '0.8rem',
                    }}>
                      ← INTERVAL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 30px rgba(255,20,147,0.6))' }}>🎬</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--accent2)', marginBottom: 8 }}>
                LIGHTS... CAMERA...
              </h2>
              <p style={{ color: 'var(--text2)', opacity: 0.7, fontSize: '0.9rem', fontStyle: 'italic' }}>
                Koi email chuniye aur picture shuru kijiye!
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: 12 }}>
                {['💕', '✨', '🌟', '💫', '⭐'].map((s, i) => (
                  <span key={i} className="heartbeat" style={{ fontSize: '1.5rem', animationDelay: `${i * 0.4}s` }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Gossip & charts */}
        <div className="lg:col-span-3 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: 'var(--border)' }}>

          {/* Weather as mood */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', borderRadius: 8, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🌦️ AAJ KA MOOD
            </div>
            <div style={{ textAlign: 'center', fontSize: '2.5rem' }}>{weather.icon}</div>
            <p style={{ textAlign: 'center', color: 'var(--text)', fontSize: '0.85rem', marginTop: 4 }}>{weather.condition}</p>
            <p style={{ textAlign: 'center', color: 'var(--accent)', fontSize: '0.8rem', fontStyle: 'italic', marginTop: 4 }}>
              {weather.temp > 30 ? '"Garmi mein bhi dil jalta hai" 🔥' :
               weather.temp < 15 ? '"Thandi raat, dil ki baat" ❄️' :
               '"Mausam bhi romantic hai!" 💕'}
            </p>
          </div>

          {/* Stocks as chart shows */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', borderRadius: 8, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              💰 FILM BUDGET
            </div>
            {stocks.map(s => (
              <div key={s.ticker} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.78rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--text2)' }}>{s.ticker}</span>
                <span style={{
                  color: s.changePct >= 0 ? '#00ff88' : '#ff4444',
                  fontWeight: 700,
                }}>
                  {s.changePct >= 0 ? '📈' : '📉'} {Math.abs(s.changePct)}%
                </span>
              </div>
            ))}
          </div>

          {/* News as filmi gossip */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', borderRadius: 8, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              💬 FILMI GOSSIP
            </div>
            {news.slice(0, 4).map((n, i) => (
              <div key={i} style={{
                fontSize: '0.72rem',
                color: 'var(--text2)',
                marginBottom: 8,
                paddingBottom: 8,
                borderBottom: i < 3 ? '1px dashed rgba(107,0,80,0.4)' : 'none',
                lineHeight: 1.4,
                fontStyle: 'italic',
              }}>
                ✨ {n.title}
              </div>
            ))}
          </div>

          {/* Fan rating */}
          <div style={{ background: 'rgba(255,20,147,0.08)', border: '1px solid var(--accent)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              ⭐ FAN RATING
            </div>
            <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{'⭐'}</span>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text2)', fontStyle: 'italic' }}>
              "{unread} unread inbox ka superhit collection!"
            </p>
          </div>
        </div>
      </div>

      {/* Film reel bottom strip */}
      <div style={{
        background: '#0a000f',
        borderTop: '2px solid var(--border)',
        padding: '4px 0',
        display: 'flex',
        gap: 2,
        overflow: 'hidden',
      }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{
            width: 28,
            height: 20,
            border: '2px solid #3d0060',
            borderRadius: 2,
            background: i % 2 !== filmReel % 2 ? 'rgba(255,20,147,0.1)' : 'transparent',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.55rem',
            color: '#6b0050',
          }}>
            💕
          </div>
        ))}
      </div>
    </div>
  )
}
