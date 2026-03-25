import { useState, useEffect, useRef } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const SURF_LINGO = {
  work: { vibe: 'GNARLY DROP', color: '#ff6b35', emoji: '🤙' },
  personal: { vibe: 'STOKED VIBES', color: '#00d4aa', emoji: '🌺' },
  finance: { vibe: 'SKETCHY BREAK', color: '#ffd700', emoji: '💸' },
  promo: { vibe: 'KOOK WAVE', color: '#ff6b35', emoji: '🙄' },
  newsletter: { vibe: 'DAILY SWELL', color: '#7fd8ff', emoji: '🌊' },
  social: { vibe: 'BEACH BROS', color: '#00d4aa', emoji: '🏄' },
}

const surfReports = [
  { break: 'Pipeline', swell: '8-10ft', wind: 'Offshore', rating: '🔥🔥🔥🔥🔥' },
  { break: 'Mavericks', swell: '15-20ft', wind: 'Onshore', rating: '🔥🔥🔥' },
  { break: 'Rincon', swell: '4-6ft', wind: 'Glassy', rating: '🔥🔥🔥🔥' },
  { break: 'Inbox Reef', swell: `${3 + Math.floor(Math.random() * 8)}ft`, wind: 'Cross', rating: '🔥🔥' },
]

const surfQuotes = [
  'The best surfer out there is the one having the most fun. 🤙',
  'Bro, your inbox is FIRING right now!',
  "Paddle hard, reply fast, hang loose — that's the way.",
  "Don't be a kook. Read your emails before they close out.",
  'Life is better when you surf. And when your inbox is at zero.',
]

export default function SurferLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [wavePhase, setWavePhase] = useState(0)
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [selectedReport, setSelectedReport] = useState(0)
  const [surfboardAngle, setSurfboardAngle] = useState(0)
  const canvasRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => setWavePhase(p => p + 0.03), 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setQuoteIdx(q => (q + 1) % surfQuotes.length), 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setSurfboardAngle(a => Math.sin(Date.now() / 1000) * 8), 50)
    return () => clearInterval(interval)
  }, [])

  // Wave canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame
    let phase = 0

    function draw() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Multiple wave layers
      const waves = [
        { amp: 18, freq: 0.012, speed: 0.02, y: canvas.height * 0.55, color: 'rgba(0,212,170,0.15)' },
        { amp: 14, freq: 0.016, speed: 0.03, y: canvas.height * 0.65, color: 'rgba(0,180,150,0.2)' },
        { amp: 10, freq: 0.022, speed: 0.05, y: canvas.height * 0.75, color: 'rgba(0,150,120,0.25)' },
        { amp: 6, freq: 0.03, speed: 0.07, y: canvas.height * 0.85, color: 'rgba(0,100,80,0.3)' },
      ]

      waves.forEach(w => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height)
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = w.y + Math.sin(x * w.freq + phase * w.speed / 0.02) * w.amp
          ctx.lineTo(x, y)
        }
        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()
        ctx.fillStyle = w.color
        ctx.fill()
      })

      // Foam
      ctx.beginPath()
      for (let x = 0; x <= canvas.width; x += 3) {
        const y = canvas.height * 0.55 + Math.sin(x * 0.012 + phase * 0.02) * 18
        if (Math.sin(x * 0.08 + phase * 0.1) > 0.7) {
          ctx.arc(x, y, Math.random() * 2 + 0.5, 0, Math.PI * 2)
        }
      }
      ctx.fillStyle = 'rgba(255,255,255,0.15)'
      ctx.fill()

      phase++
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frame)
  }, [])

  const unread = emails.filter(e => !e.read).length

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(180deg, #001830 0%, #002040 30%, #001428 100%)',
      color: 'var(--text)',
      fontFamily: 'var(--font-main)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes sunRays {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes waveText {
          0%, 100% { transform: translateY(0px); }
          25% { transform: translateY(-3px); }
          75% { transform: translateY(3px); }
        }
        @keyframes hangLoose {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes surfIn {
          0% { transform: translateX(-100px) rotate(-15deg); opacity: 0; }
          100% { transform: translateX(0) rotate(0deg); opacity: 1; }
        }
        @keyframes glowCycle {
          0% { box-shadow: 0 0 10px rgba(0,212,170,0.3); }
          33% { box-shadow: 0 0 20px rgba(255,107,53,0.4); }
          66% { box-shadow: 0 0 20px rgba(255,215,0,0.3); }
          100% { box-shadow: 0 0 10px rgba(0,212,170,0.3); }
        }
        @keyframes tealPulse {
          0%, 100% { text-shadow: 0 0 8px rgba(0,212,170,0.5); }
          50% { text-shadow: 0 0 20px rgba(0,212,170,0.8), 0 0 40px rgba(0,212,170,0.4); }
        }
        .wave-text span { display: inline-block; animation: waveText 2s ease-in-out infinite; }
        .wave-text span:nth-child(1) { animation-delay: 0s; }
        .wave-text span:nth-child(2) { animation-delay: 0.1s; }
        .wave-text span:nth-child(3) { animation-delay: 0.2s; }
        .wave-text span:nth-child(4) { animation-delay: 0.3s; }
        .wave-text span:nth-child(5) { animation-delay: 0.4s; }
        .hang-loose { animation: hangLoose 2s ease-in-out infinite; }
        .surf-in { animation: surfIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .glow-cycle { animation: glowCycle 6s ease-in-out infinite; }
        .teal-pulse { animation: tealPulse 2.5s ease-in-out infinite; }
      `}</style>

      {/* Wave canvas background */}
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 w-full h-full" />

      {/* Sun decoration */}
      <div className="pointer-events-none fixed z-0" style={{ top: -80, right: -80, width: 300, height: 300 }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,200,0,0.15) 0%, rgba(255,107,53,0.08) 50%, transparent 70%)',
          animation: 'sunRays 30s linear infinite',
        }} />
      </div>

      {/* Header - Beach board */}
      <header className="relative z-10" style={{
        background: 'linear-gradient(180deg, rgba(0,10,30,0.95) 0%, rgba(0,15,40,0.9) 100%)',
        borderBottom: '3px solid rgba(0,212,170,0.4)',
        padding: '1.5rem 2rem',
      }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            {/* Animated title */}
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.3em', marginBottom: 6, opacity: 0.8 }}>
              🏄 HANG LOOSE INBOX · EST. ALWAYS SUMMER
            </div>
            <h1 className="wave-text" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              lineHeight: 1.1,
              marginBottom: 6,
            }}>
              {'SURF MAIL'.split('').map((c, i) => (
                <span key={i} style={{
                  color: ['#00d4aa', '#ff6b35', '#ffd700', '#7fd8ff', '#00d4aa', '#ff6b35', '#ffd700', '#00d4aa'][i],
                  animationDelay: `${i * 0.12}s`,
                }}>{c === ' ' ? '\u00A0' : c}</span>
              ))}
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: '0.8rem' }}>
              {unread} waves to catch · {emails.length} in the set
            </p>
            <p key={quoteIdx} style={{ color: 'var(--accent)', fontSize: '0.78rem', fontStyle: 'italic', marginTop: 6, opacity: 0.9 }}>
              🤙 {surfQuotes[quoteIdx]}
            </p>
          </div>

          <div className="flex flex-col gap-3 items-end">
            {/* Surfboard emoji rotated */}
            <div className="hang-loose" style={{ fontSize: '3rem', transformOrigin: 'center', filter: 'drop-shadow(0 0 10px rgba(0,212,170,0.4))' }}>
              🏄
            </div>
            <button type="button" onClick={onSwitchPersona} style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, rgba(0,212,170,0.2), rgba(0,212,170,0.1))',
              border: '2px solid var(--accent)',
              color: 'var(--accent)',
              borderRadius: 999,
              padding: '7px 18px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
            }}>
              🌊 CHANGE BREAK
            </button>
          </div>
        </div>

        {/* Surf report strip */}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: 4 }}>
          {surfReports.map((r, i) => (
            <button key={i} type="button" onClick={() => setSelectedReport(i)} style={{
              flexShrink: 0,
              background: selectedReport === i ? 'rgba(0,212,170,0.2)' : 'rgba(0,0,0,0.4)',
              border: `2px solid ${selectedReport === i ? 'var(--accent)' : 'rgba(0,212,170,0.2)'}`,
              borderRadius: 8,
              padding: '6px 14px',
              cursor: 'pointer',
              textAlign: 'left',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>{r.break}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text)', fontWeight: 700 }}>{r.swell}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text2)' }}>{r.wind} · {r.rating}</div>
            </button>
          ))}
        </div>
      </header>

      <div className="relative z-10 grid lg:grid-cols-12" style={{ minHeight: 'calc(100vh - 240px)' }}>

        {/* Email list - wave set */}
        <div className="lg:col-span-4 border-r overflow-y-auto" style={{ borderColor: 'rgba(0,212,170,0.2)', background: 'rgba(0,5,15,0.7)', backdropFilter: 'blur(8px)' }}>
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid rgba(0,212,170,0.2)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--accent)',
          }}>
            🌊 THE SET — {emails.length} WAVES INCOMING
          </div>

          {emails.map((email, i) => {
            const vibe = SURF_LINGO[email.tag] || SURF_LINGO.work
            return (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid rgba(0,212,170,0.1)',
                  cursor: 'pointer',
                  background: selectedEmail?.id === email.id
                    ? `rgba(0,212,170,0.1)`
                    : 'transparent',
                  borderLeft: `4px solid ${selectedEmail?.id === email.id ? vibe.color : 'transparent'}`,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'rgba(0,212,170,0.05)' }}
                onMouseLeave={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  {/* Wave height indicator */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                    {[3, 2, 1].map(h => (
                      <div key={h} style={{
                        width: 4,
                        height: h === 3 ? 14 : h === 2 ? 10 : 6,
                        borderRadius: 2,
                        background: h <= (email.read ? 1 : 3) ? vibe.color : 'rgba(255,255,255,0.1)',
                        transition: 'background 0.3s',
                      }} />
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: '0.58rem', color: vibe.color, fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
                        {vibe.emoji} {vibe.vibe}
                      </span>
                      {!email.read && (
                        <span style={{ fontSize: '0.6rem', color: vibe.color, fontFamily: 'var(--font-display)' }}>NEW</span>
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
                      🤙 {email.from.name}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Main wave */}
        <div className="lg:col-span-5 overflow-y-auto p-6" style={{ backdropFilter: 'blur(4px)' }}>
          {selectedEmail ? (
            <div className="surf-in">
              <div style={{
                background: 'rgba(0,10,25,0.9)',
                border: `2px solid ${(SURF_LINGO[selectedEmail.tag] || SURF_LINGO.work).color}`,
                borderRadius: 16,
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                boxShadow: `0 0 30px ${(SURF_LINGO[selectedEmail.tag] || SURF_LINGO.work).color}22`,
              }}>
                {/* Header stripe */}
                <div style={{
                  background: `linear-gradient(135deg, ${(SURF_LINGO[selectedEmail.tag] || SURF_LINGO.work).color}33, rgba(0,0,0,0.5))`,
                  borderBottom: `2px solid ${(SURF_LINGO[selectedEmail.tag] || SURF_LINGO.work).color}66`,
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                }}>
                  {/* Surfboard design */}
                  <div style={{
                    width: 40, height: 60,
                    borderRadius: '50% 50% 40% 40%',
                    background: `linear-gradient(180deg, ${(SURF_LINGO[selectedEmail.tag] || SURF_LINGO.work).color}, #001830)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0,
                    border: `1px solid ${(SURF_LINGO[selectedEmail.tag] || SURF_LINGO.work).color}`,
                    boxShadow: `0 0 12px ${(SURF_LINGO[selectedEmail.tag] || SURF_LINGO.work).color}44`,
                    transform: `rotate(${surfboardAngle}deg)`,
                    transition: 'transform 0.5s ease',
                  }}>
                    {(SURF_LINGO[selectedEmail.tag] || SURF_LINGO.work).emoji}
                  </div>
                  <div className="flex-1">
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: (SURF_LINGO[selectedEmail.tag] || SURF_LINGO.work).color, letterSpacing: '0.2em', marginBottom: 4 }}>
                      {(SURF_LINGO[selectedEmail.tag] || SURF_LINGO.work).vibe} · WAVE #{selectedEmail.id}
                    </div>
                    <h2 style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)', lineHeight: 1.3 }}>
                      {selectedEmail.subject}
                    </h2>
                    <p style={{ color: 'var(--text2)', fontSize: '0.75rem', marginTop: 6 }}>
                      🏄 {selectedEmail.from.name} · {selectedEmail.date} · {selectedEmail.time}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(0,212,170,0.15)',
                    borderRadius: 10,
                    padding: '1.25rem',
                    fontSize: '0.9rem',
                    lineHeight: 1.9,
                    color: 'var(--text)',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {selectedEmail.body}
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button type="button" style={{
                      background: `linear-gradient(135deg, ${(SURF_LINGO[selectedEmail.tag] || SURF_LINGO.work).color}, rgba(0,180,140,0.8))`,
                      color: '#001830',
                      border: 'none',
                      borderRadius: 999,
                      padding: '8px 20px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}>
                      🤙 REPLY BRO
                    </button>
                    <button type="button" onClick={() => setSelectedEmail(null)} style={{
                      background: 'rgba(0,212,170,0.05)',
                      border: '1px solid rgba(0,212,170,0.2)',
                      color: 'var(--text2)',
                      borderRadius: 999,
                      padding: '8px 20px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                    }}>
                      ← PADDLE BACK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
              <div className="hang-loose" style={{ fontSize: '5rem', filter: 'drop-shadow(0 0 20px rgba(0,212,170,0.5))', marginBottom: '1rem' }}>🏄</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--accent)', marginBottom: 8, letterSpacing: '0.1em' }}>
                WAITING FOR THE PERFECT WAVE
              </div>
              <p style={{ color: 'var(--text2)', fontSize: '0.88rem', opacity: 0.7 }}>
                Pick a wave from the set, bro.<br />
                <em>It's gonna be totally tubular.</em>
              </p>

              {/* Board wax pattern */}
              <div style={{ marginTop: '2rem', display: 'flex', gap: 8, alignItems: 'center' }}>
                {['🌊', '🤙', '🏄', '🤙', '🌊'].map((s, i) => (
                  <span key={i} className="hang-loose" style={{ fontSize: i === 2 ? '2rem' : '1.2rem', animationDelay: `${i * 0.3}s`, opacity: 0.7 }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Beach hut */}
        <div className="lg:col-span-3 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: 'rgba(0,212,170,0.2)', background: 'rgba(0,5,15,0.6)', backdropFilter: 'blur(6px)' }}>

          {/* Weather */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 10, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              ☀️ BEACH CONDITIONS
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 6 }}>{weather.icon}</div>
              <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--text)' }}>{weather.temp}°C</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>{weather.condition}</div>
              <div style={{ marginTop: 8, fontSize: '0.72rem' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
                  {weather.temp > 28 ? '🔥 PERFECT BEACH DAY!' :
                   weather.temp > 20 ? '😎 STOKED. LET\'S GO.' :
                   weather.temp > 10 ? '🤙 DECENT. SUIT UP.' :
                   '❄️ WETSUIT REQUIRED BRO.'}
                </span>
              </div>
            </div>
          </div>

          {/* Active surf report */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid rgba(0,212,170,0.3)`, borderRadius: 10, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              📍 {surfReports[selectedReport].break.toUpperCase()}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
              {[['SWELL', surfReports[selectedReport].swell], ['WIND', surfReports[selectedReport].wind]].map(([k, v]) => (
                <div key={k} style={{ textAlign: 'center', background: 'rgba(0,212,170,0.05)', borderRadius: 6, padding: '6px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.5rem', color: 'var(--text2)', letterSpacing: '0.1em' }}>{k}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 700 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', fontSize: '1.2rem' }}>{surfReports[selectedReport].rating}</div>
          </div>

          {/* Stocks as wipeout risk */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 10, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              📊 WIPEOUT RISK
            </div>
            {stocks.map(s => (
              <div key={s.ticker} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text2)', fontFamily: 'var(--font-display)', fontSize: '0.68rem' }}>{s.ticker}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 40, height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min(100, Math.abs(s.changePct) * 20)}%`,
                      background: s.changePct >= 0 ? 'var(--accent)' : 'var(--accent2)',
                      borderRadius: 999,
                      transition: 'width 1s ease',
                    }} />
                  </div>
                  <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : 'var(--accent2)', fontSize: '0.7rem', fontFamily: 'var(--font-display)' }}>
                    {s.changePct >= 0 ? '▲' : '▼'}{Math.abs(s.changePct)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* News as beach gossip */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 10, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🏖️ BEACH BUZZ
            </div>
            {news.slice(0, 3).map((n, i) => (
              <div key={i} style={{ fontSize: '0.72rem', color: 'var(--text2)', marginBottom: 6, paddingBottom: 6, borderBottom: i < 2 ? '1px solid rgba(0,212,170,0.1)' : 'none', lineHeight: 1.4 }}>
                🤙 {n.title}
              </div>
            ))}
          </div>

          {/* Stoke meter */}
          <div style={{ background: 'rgba(0,212,170,0.06)', border: '1px solid var(--accent)', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🔥 STOKE METER
            </div>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{
                  width: 8, height: 24,
                  borderRadius: 2,
                  background: i < (10 - unread) ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                  transition: 'background 0.5s',
                }} />
              ))}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text2)', marginTop: 6 }}>
              {unread === 0 ? 'FULLY STOKED! 🔥' : `${unread} waves to catch`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
