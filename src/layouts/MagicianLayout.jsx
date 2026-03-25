import { useState, useEffect, useRef } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const SUITS = ['♠', '♥', '♦', '♣']
const MAGIC_WORDS = ['ABRACADABRA', 'ALACAZAM!', 'HOCUS POCUS', 'PRESTO!', 'OPEN SESAME', 'ALAKAZAM!']
const REVEALS = ['Nothing up my sleeve...', 'Watch closely now...', 'The hand is quicker than the eye...', 'Observe carefully...', 'Pay attention to THIS...']

const tagLabel = t => ({
  work: { name: 'THE BUSINESS TRICK', suit: '♠' },
  personal: { name: 'THE HEART SPELL', suit: '♥' },
  finance: { name: 'THE MONEY ILLUSION', suit: '♦' },
  promo: { name: 'THE GRAND DECEPTION', suit: '♣' },
  newsletter: { name: 'THE ORACLE SCROLL', suit: '★' },
  social: { name: 'THE MIND LINK', suit: '✦' },
}[t] || { name: 'THE UNKNOWN ACT', suit: '?' })

function ParticleField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame = 0
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 0.3,
      opacity: Math.random(),
      hue: Math.random() * 60 + 260,
    }))

    function draw() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.y -= p.speed
        p.x += p.drift
        p.opacity += (Math.random() - 0.5) * 0.05
        p.opacity = Math.max(0.1, Math.min(1, p.opacity))
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`
        ctx.fill()
      })
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frame)
  }, [])
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} />
}

export default function MagicianLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [revealedCards, setRevealedCards] = useState({})
  const [magicWord, setMagicWord] = useState(0)
  const [hatOpen, setHatOpen] = useState(false)
  const [revealText, setRevealText] = useState('')
  const [selectedCard, setSelectedCard] = useState(null)
  const [handCards, setHandCards] = useState(() =>
    emails.slice(0, 5).map((e, i) => ({ ...e, cardIdx: i, suit: SUITS[i % 4], faceUp: false }))
  )

  useEffect(() => {
    const interval = setInterval(() => setMagicWord(m => (m + 1) % MAGIC_WORDS.length), 3000)
    return () => clearInterval(interval)
  }, [])

  function revealEmail(email) {
    setRevealText(REVEALS[Math.floor(Math.random() * REVEALS.length)])
    setRevealedCards(r => ({ ...r, [email.id]: true }))
    setSelectedEmail(email)
  }

  function flipCard(card) {
    setHandCards(h => h.map(c => c.id === card.id ? { ...c, faceUp: !c.faceUp } : c))
  }

  const unread = emails.filter(e => !e.read).length

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(ellipse at 50% 0%, #2d0055 0%, #08000f 50%, #100018 100%)',
      color: 'var(--text)',
      fontFamily: 'var(--font-main)',
    }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(2deg); }
          66% { transform: translateY(-6px) rotate(-1deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cardReveal {
          0% { transform: rotateY(90deg) scale(0.8); opacity: 0; }
          100% { transform: rotateY(0deg) scale(1); opacity: 1; }
        }
        @keyframes sparkleRing {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(3) rotate(360deg); opacity: 0; }
        }
        @keyframes magicPulse {
          0%, 100% { box-shadow: 0 0 15px rgba(156,39,176,0.4), 0 0 30px rgba(156,39,176,0.2); }
          50% { box-shadow: 0 0 30px rgba(156,39,176,0.7), 0 0 60px rgba(156,39,176,0.4), 0 0 100px rgba(156,39,176,0.1); }
        }
        @keyframes goldShimmer {
          0% { color: #ffd700; text-shadow: 0 0 5px #ffd700; }
          50% { color: #fff8dc; text-shadow: 0 0 15px #ffd700, 0 0 30px #ff8c00; }
          100% { color: #ffd700; text-shadow: 0 0 5px #ffd700; }
        }
        @keyframes cardFlip {
          0% { transform: perspective(600px) rotateY(0deg); }
          50% { transform: perspective(600px) rotateY(90deg); }
          100% { transform: perspective(600px) rotateY(0deg); }
        }
        @keyframes hatPop {
          0% { transform: scaleY(0) translateY(20px); opacity: 0; }
          60% { transform: scaleY(1.1) translateY(-4px); }
          100% { transform: scaleY(1) translateY(0); opacity: 1; }
        }
        .float-anim { animation: float 4s ease-in-out infinite; }
        .magic-pulse { animation: magicPulse 3s ease-in-out infinite; }
        .gold-shimmer { animation: goldShimmer 2s ease-in-out infinite; }
        .card-reveal { animation: cardReveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .hat-pop { animation: hatPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      {/* Particle field */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <ParticleField />
      </div>

      {/* Stars and symbols scattered */}
      {['✦', '★', '✧', '◆', '✦', '★'].map((s, i) => (
        <div key={i} className="float-anim pointer-events-none fixed" style={{
          top: `${10 + i * 15}%`,
          left: `${5 + i * 17}%`,
          fontSize: `${0.8 + (i % 3) * 0.4}rem`,
          color: 'rgba(156,39,176,0.3)',
          animationDelay: `${i * 0.7}s`,
          zIndex: 1,
        }}>{s}</div>
      ))}

      {/* Header - Grand Marquee */}
      <header className="relative z-10" style={{
        background: 'linear-gradient(180deg, rgba(45,0,85,0.9) 0%, rgba(20,0,40,0.8) 100%)',
        borderBottom: '2px solid rgba(156,39,176,0.4)',
        padding: '2rem',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
      }}>
        {/* Top ornament */}
        <div style={{ marginBottom: 8, color: 'var(--accent2)', fontSize: '0.8rem', letterSpacing: '0.5em' }}>
          ✦ ✦ ✦ ✦ ✦
        </div>

        <div className="gold-shimmer" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.65rem',
          letterSpacing: '0.5em',
          marginBottom: 8,
        }}>
          THE MAGNIFICENT
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
          background: 'linear-gradient(135deg, #ffd700, #e8d5ff, #ffd700)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 3s linear infinite',
          lineHeight: 1.1,
          marginBottom: 8,
        }}>
          INBOX OF ILLUSIONS
        </h1>

        <p style={{ color: 'var(--text2)', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: 16 }}>
          {unread} mysteries await · All is not as it seems
        </p>

        {/* Magic word display */}
        <div className="magic-pulse" style={{
          display: 'inline-block',
          background: 'rgba(156,39,176,0.15)',
          border: '2px solid var(--accent)',
          borderRadius: 8,
          padding: '8px 24px',
          marginBottom: 16,
        }}>
          <span key={magicWord} className="gold-shimmer" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            letterSpacing: '0.2em',
          }}>
            {MAGIC_WORDS[magicWord]}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Magic hat reveal button */}
          <button
            type="button"
            onClick={() => setHatOpen(h => !h)}
            style={{
              background: hatOpen ? 'rgba(156,39,176,0.3)' : 'rgba(0,0,0,0.5)',
              border: '2px solid var(--accent)',
              color: 'var(--text)',
              borderRadius: 8,
              padding: '8px 20px',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              transition: 'all 0.3s',
            }}
          >
            🎩 {hatOpen ? 'CLOSE HAT' : 'OPEN HAT'}
          </button>

          <button type="button" onClick={onSwitchPersona} style={{
            background: 'none',
            border: '1px solid rgba(156,39,176,0.5)',
            color: 'var(--text2)',
            borderRadius: 8,
            padding: '8px 20px',
            cursor: 'pointer',
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
          }}>
            ✦ CHANGE ACT
          </button>
        </div>

        {/* Hat contents */}
        {hatOpen && (
          <div className="hat-pop" style={{
            marginTop: '1.5rem',
            background: 'rgba(0,0,0,0.7)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '1rem',
            maxWidth: 400,
            margin: '1.5rem auto 0',
            textAlign: 'left',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🐇 FROM THE HAT...
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['🐇 White Rabbit', '🌸 Silk Scarf', '🕊️ Two Doves', '🪄 Magic Wand', '💐 Bouquet', '🎭 Theatre Mask'].map((item, i) => (
                <span key={i} style={{
                  background: 'rgba(156,39,176,0.15)',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  color: 'var(--text)',
                }}>{item}</span>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Card hand display - top horizontal area */}
      <div className="relative z-10" style={{
        background: 'rgba(10,0,20,0.6)',
        borderBottom: '1px solid rgba(156,39,176,0.2)',
        padding: '1rem 2rem',
        backdropFilter: 'blur(6px)',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--text2)', letterSpacing: '0.25em', marginBottom: 10 }}>
          ✦ YOUR HAND — CLICK A CARD TO FLIP
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {handCards.map((card, i) => (
            <div
              key={card.id}
              onClick={() => { flipCard(card); if (!card.faceUp) revealEmail(card) }}
              style={{
                width: 72,
                height: 100,
                borderRadius: 8,
                cursor: 'pointer',
                background: card.faceUp
                  ? 'linear-gradient(135deg, #fff8f8, #fff)'
                  : 'linear-gradient(135deg, #3d0060, #1a003d)',
                border: `2px solid ${card.faceUp ? (card.suit === '♥' || card.suit === '♦' ? '#cc0000' : '#000') : 'rgba(156,39,176,0.6)'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: selectedEmail?.id === card.id
                  ? '0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(156,39,176,0.4)'
                  : '0 4px 15px rgba(0,0,0,0.5)',
                transition: 'all 0.3s',
                position: 'relative',
                transform: `rotate(${(i - 2) * 6}deg) translateY(${Math.abs(i - 2) * 5}px)`,
                transformOrigin: 'bottom center',
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = `rotate(0deg) translateY(-12px) scale(1.05)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${(i - 2) * 6}deg) translateY(${Math.abs(i - 2) * 5}px)` }}
            >
              {card.faceUp ? (
                <>
                  <div style={{ position: 'absolute', top: 4, left: 6, fontSize: '0.6rem', color: card.suit === '♥' || card.suit === '♦' ? '#cc0000' : '#000', fontWeight: 700 }}>
                    {card.suit}
                  </div>
                  <div style={{ fontSize: '1.2rem', color: card.suit === '♥' || card.suit === '♦' ? '#cc0000' : '#000' }}>{card.suit}</div>
                  <div style={{ fontSize: '0.4rem', textAlign: 'center', color: '#333', padding: '0 4px', marginTop: 2, lineHeight: 1.3 }}>
                    {card.subject.slice(0, 20)}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '1.5rem', opacity: 0.4 }}>✦</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.4rem', color: 'var(--text2)', letterSpacing: '0.1em', marginTop: 2 }}>MYSTERY</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 grid lg:grid-cols-12" style={{ minHeight: 'calc(100vh - 380px)' }}>

        {/* Scrolls list */}
        <div className="lg:col-span-4 border-r overflow-y-auto" style={{ borderColor: 'rgba(61,0,96,0.5)', backdropFilter: 'blur(6px)' }}>
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid rgba(61,0,96,0.5)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--accent)',
            background: 'rgba(0,0,0,0.4)',
          }}>
            📜 THE BOOK OF SECRETS · {emails.length} SCROLLS
          </div>

          {emails.map((email, i) => {
            const meta = tagLabel(email.tag)
            const isRevealed = revealedCards[email.id]
            return (
              <div
                key={email.id}
                onClick={() => revealEmail(email)}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid rgba(61,0,96,0.3)',
                  cursor: 'pointer',
                  background: selectedEmail?.id === email.id
                    ? 'rgba(156,39,176,0.1)'
                    : 'rgba(0,0,0,0.2)',
                  borderLeft: `4px solid ${selectedEmail?.id === email.id ? 'var(--accent)' : 'transparent'}`,
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'rgba(156,39,176,0.06)' }}
                onMouseLeave={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'rgba(0,0,0,0.2)' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  {/* Suit symbol */}
                  <div style={{
                    width: 32, height: 32,
                    borderRadius: 6,
                    background: 'rgba(156,39,176,0.15)',
                    border: '1px solid rgba(156,39,176,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem',
                    color: SUITS[i % 4] === '♥' || SUITS[i % 4] === '♦' ? '#ff4444' : 'var(--text)',
                    flexShrink: 0,
                    boxShadow: isRevealed ? '0 0 8px rgba(156,39,176,0.4)' : 'none',
                  }}>
                    {isRevealed ? SUITS[i % 4] : '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: '0.58rem', color: 'var(--accent2)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', marginBottom: 2 }}>
                      {meta.suit} {meta.name}
                    </div>
                    <p style={{
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                      color: isRevealed ? 'var(--text2)' : 'var(--text)',
                      lineHeight: 1.3,
                      marginBottom: 2,
                    }} className="truncate">{email.subject}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text2)', opacity: 0.6 }} className="truncate">
                      {email.from.name}
                    </p>
                  </div>
                  {!email.read && (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)', flexShrink: 0, marginTop: 4 }} />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Stage */}
        <div className="lg:col-span-5 overflow-y-auto p-6" style={{ backdropFilter: 'blur(6px)' }}>
          {selectedEmail ? (
            <div className="card-reveal">
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--text2)', letterSpacing: '0.3em', marginBottom: 6 }}>
                  ✦ {revealText} ✦
                </div>
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🎩✨</div>
              </div>

              <div className="magic-pulse" style={{
                background: 'rgba(12,0,24,0.85)',
                border: '2px solid var(--accent)',
                borderRadius: 12,
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
              }}>
                {/* Velvet header */}
                <div style={{
                  background: 'linear-gradient(135deg, #3d0060, #1a003d)',
                  padding: '1.5rem',
                  textAlign: 'center',
                  borderBottom: '2px solid rgba(156,39,176,0.4)',
                  position: 'relative',
                }}>
                  {/* Sparkle corners */}
                  <div style={{ position: 'absolute', top: 8, left: 12, color: 'var(--accent2)', fontSize: '1rem' }}>✦</div>
                  <div style={{ position: 'absolute', top: 8, right: 12, color: 'var(--accent2)', fontSize: '1rem' }}>✦</div>

                  <div style={{ fontSize: '0.6rem', color: 'var(--accent2)', fontFamily: 'var(--font-display)', letterSpacing: '0.3em', marginBottom: 8 }}>
                    {tagLabel(selectedEmail.tag).suit} {tagLabel(selectedEmail.tag).name}
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                    color: 'var(--text)',
                    fontStyle: 'italic',
                    lineHeight: 1.3,
                  }}>
                    {selectedEmail.subject}
                  </h2>
                  <p style={{ color: 'var(--text2)', fontSize: '0.75rem', marginTop: 8, fontStyle: 'italic' }}>
                    Revealed by {selectedEmail.from.name} · {selectedEmail.date}
                  </p>
                </div>

                {/* Body - scroll unfurling */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(156,39,176,0.25)',
                    borderRadius: 8,
                    padding: '1.25rem',
                    fontSize: '0.9rem',
                    lineHeight: 1.9,
                    color: 'var(--text)',
                    whiteSpace: 'pre-wrap',
                    fontStyle: 'italic',
                    position: 'relative',
                  }}>
                    <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', color: 'var(--accent)', fontSize: '0.8rem' }}>✦</div>
                    {selectedEmail.body}
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button type="button" style={{
                      background: 'linear-gradient(135deg, var(--accent), #6a1080)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 20px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      boxShadow: '0 4px 20px rgba(156,39,176,0.4)',
                    }}>
                      🪄 CAST REPLY
                    </button>
                    <button type="button" onClick={() => setSelectedEmail(null)} style={{
                      background: 'rgba(156,39,176,0.08)',
                      border: '1px solid rgba(156,39,176,0.3)',
                      color: 'var(--text2)',
                      borderRadius: 8,
                      padding: '8px 20px',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                    }}>
                      ← BACK TO SHADOWS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
              <div className="float-anim" style={{ fontSize: '5rem', filter: 'drop-shadow(0 0 30px rgba(156,39,176,0.5))', marginBottom: '1rem' }}>🎩</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--accent2)', marginBottom: 8 }}>
                THE STAGE AWAITS
              </div>
              <p style={{ color: 'var(--text2)', fontSize: '0.88rem', fontStyle: 'italic', opacity: 0.8 }}>
                Select a scroll to reveal its secrets...<br />
                <em>if you dare.</em>
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: 12 }}>
                {['✦', '★', '✧', '◆', '✦'].map((s, i) => (
                  <span key={i} className="float-anim" style={{ fontSize: '1.5rem', color: 'var(--accent)', animationDelay: `${i * 0.6}s`, opacity: 0.6 }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Oracle sidebar */}
        <div className="lg:col-span-3 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: 'rgba(61,0,96,0.5)', backdropFilter: 'blur(6px)' }}>

          {/* Crystal ball weather */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(156,39,176,0.3)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🔮 THE CRYSTAL BALL
            </div>
            <div style={{ fontSize: '2.5rem', marginBottom: 6, filter: 'drop-shadow(0 0 10px rgba(156,39,176,0.6))' }}>{weather.icon}</div>
            <p style={{ color: 'var(--text)', fontSize: '0.85rem' }}>{weather.condition}</p>
            <p style={{ color: 'var(--text2)', fontSize: '0.75rem' }}>{weather.temp}°C</p>
            <p style={{ color: 'var(--accent)', fontSize: '0.72rem', fontStyle: 'italic', marginTop: 6 }}>
              "The spirits whisper of {weather.condition.toLowerCase()}..."
            </p>
          </div>

          {/* Stocks as fortunes */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(156,39,176,0.3)', borderRadius: 8, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              💎 THE FORTUNE CARDS
            </div>
            {stocks.map((s, i) => (
              <div key={s.ticker} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.78rem', alignItems: 'center', paddingBottom: 6, borderBottom: i < stocks.length - 1 ? '1px solid rgba(61,0,96,0.3)' : 'none' }}>
                <span style={{ color: 'var(--text2)', fontFamily: 'var(--font-display)', fontSize: '0.7rem' }}>{SUITS[i % 4]} {s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? '#00ff88' : '#ff4444', fontWeight: 700 }}>
                  {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%
                </span>
              </div>
            ))}
          </div>

          {/* News as prophecy */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(156,39,176,0.3)', borderRadius: 8, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              📜 THE PROPHECIES
            </div>
            {news.slice(0, 4).map((n, i) => (
              <div key={i} style={{ fontSize: '0.72rem', color: 'var(--text2)', marginBottom: 8, paddingBottom: 8, borderBottom: i < 3 ? '1px solid rgba(61,0,96,0.3)' : 'none', lineHeight: 1.4, fontStyle: 'italic' }}>
                ✦ {n.title}
              </div>
            ))}
          </div>

          {/* Tricks tally */}
          <div style={{ background: 'rgba(156,39,176,0.08)', border: '1px solid var(--accent)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🎭 SHOW STATS
            </div>
            <div style={{ fontSize: '1.8rem', color: 'var(--accent2)', fontFamily: 'var(--font-display)' }}>
              {Object.keys(revealedCards).length}/{emails.length}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text2)', marginTop: 4 }}>
              scrolls revealed
            </div>
            {Object.keys(revealedCards).length === emails.length && (
              <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--accent2)', fontStyle: 'italic' }}>
                ✦ NOTHING REMAINS HIDDEN ✦
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
