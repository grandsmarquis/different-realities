import { useState } from 'react'
import { personas } from '../personas'

const personaColors = {
  grandmother: { bg: '#fdf6f0', accent: '#c0744a', text: '#3d2b1f' },
  teenager: { bg: '#0a0a0f', accent: '#00ff88', text: '#e0e0ff' },
  office: { bg: '#f0f2f5', accent: '#0f4c81', text: '#1c1e21' },
  hipster: { bg: '#f9f8f6', accent: '#1a1a18', text: '#1a1a18' },
  french: { bg: '#f8f7f4', accent: '#002395', text: '#1a1a2e' },
  kawaii: {
    bg: 'linear-gradient(145deg, #ffd6e8 0%, #e8d5ff 40%, #c8f7dc 85%, #fff9c4 100%)',
    accent: '#ff6eb4',
    text: '#5c3d62',
  },
  casino: {
    bg: 'linear-gradient(165deg, #3d1520 0%, #12080c 55%, #1a0a12 100%)',
    accent: '#ffd700',
    text: '#f5e6c8',
  },
  cyberpunk: {
    bg: 'linear-gradient(145deg, #000000 0%, #010a01 60%, #001a00 100%)',
    accent: '#00ff41',
    text: '#00ff41',
  },
  retro: {
    bg: 'linear-gradient(180deg, #000080 0%, #0000aa 50%, #000080 100%)',
    accent: '#ff00ff',
    text: '#ffffff',
  },
  conspiracy: {
    bg: 'linear-gradient(160deg, #2a1f0e 0%, #1a1408 60%, #0d0a04 100%)',
    accent: '#cc0000',
    text: '#e8d5a3',
  },
  zen: { bg: '#f7f3ec', accent: '#2c1810', text: '#1a1208' },
  startup: {
    bg: 'linear-gradient(145deg, #f8faff 0%, #eff6ff 100%)',
    accent: '#6366f1',
    text: '#0a0a1a',
  },
  academic: { bg: '#f8f5ee', accent: '#1e3a5f', text: '#1a1510' },
  privacy: {
    bg: 'linear-gradient(160deg, #0d0d0d 0%, #141414 100%)',
    accent: '#33ff33',
    text: '#33ff33',
  },
  analyst: { bg: '#f0f4f8', accent: '#3182ce', text: '#1a202c' },
  child: {
    bg: 'linear-gradient(160deg, #fef9c3 0%, #fce7f3 50%, #dbeafe 100%)',
    accent: '#dc2626',
    text: '#1d4ed8',
  },
  win98: {
    bg: 'linear-gradient(180deg, #008080 0%, #005f5f 100%)',
    accent: '#000080',
    text: '#ffffff',
  },
  xbox360: {
    bg: 'linear-gradient(165deg, #050805 0%, #0f1a0c 45%, #050805 100%)',
    accent: '#9bf00b',
    text: '#dfffd0',
  },
  wii: {
    bg: 'linear-gradient(185deg, #7ec8f5 0%, #c8ecff 50%, #e8f7ff 100%)',
    accent: '#0ea5e9',
    text: '#0c4a6e',
  },
  vista: {
    bg: 'linear-gradient(160deg, #0a1628 0%, #162b55 50%, #0a1628 100%)',
    accent: '#4fb3e8',
    text: '#ffffff',
  },
  space: {
    bg: 'linear-gradient(160deg, #030b1a 0%, #050f22 60%, #020810 100%)',
    accent: '#00d4ff',
    text: '#e8a040',
  },
  medieval: {
    bg: 'linear-gradient(160deg, #edd88a 0%, #c8a040 50%, #f0d880 100%)',
    accent: '#8b1a1a',
    text: '#2c1008',
  },
  pirate: {
    bg: 'linear-gradient(165deg, #c8a06a 0%, #8b6030 60%, #d4b878 100%)',
    accent: '#8b1a00',
    text: '#1a0800',
  },
  graffiti: {
    bg: 'linear-gradient(145deg, #111111 0%, #1e1e1e 50%, #1a1a1a 100%)',
    accent: '#ff2d55',
    text: '#ffffff',
  },
  circus: {
    bg: 'linear-gradient(160deg, #1a0808 0%, #0f0505 50%, #1a0808 100%)',
    accent: '#ffd700',
    text: '#ffd700',
  },
  safari: {
    bg: 'linear-gradient(160deg, #f5e4b8 0%, #ead8a0 60%, #f5e4b8 100%)',
    accent: '#8b4513',
    text: '#2c1800',
  },
  mythology: {
    bg: 'linear-gradient(160deg, #080512 0%, #0d0a1c 50%, #08051a 100%)',
    accent: '#c8a855',
    text: '#e8d5a3',
  },
  vinyl: {
    bg: 'linear-gradient(160deg, #1a1210 0%, #221a16 50%, #1a1210 100%)',
    accent: '#c87941',
    text: '#e8d5a8',
  },
  bonsai: {
    bg: 'linear-gradient(160deg, #f0f4ea 0%, #e4ecda 60%, #f0f4ea 100%)',
    accent: '#3d6b2a',
    text: '#1a2a10',
  },
  sumo: {
    bg: 'linear-gradient(160deg, #faf5e4 0%, #f0e8cc 50%, #faf5e4 100%)',
    accent: '#cc0000',
    text: '#0a0000',
  },
  alien: {
    bg: 'linear-gradient(160deg, #010d0a 0%, #020f0c 50%, #010d0a 100%)',
    accent: '#00ffcc',
    text: '#7fff9e',
  },
  productivity: {
    bg: 'linear-gradient(160deg, #fafaf8 0%, #f0f0ec 50%, #fafaf8 100%)',
    accent: '#ef4444',
    text: '#1a1a16',
  },
  pilot: {
    bg: 'linear-gradient(160deg, #000000 0%, #040404 50%, #000000 100%)',
    accent: '#ffa500',
    text: '#00d0aa',
  },
  yacht: {
    bg: 'linear-gradient(165deg, #061018 0%, #0c2840 50%, #061018 100%)',
    accent: '#c9a962',
    text: '#e8f4fc',
  },
  tattoo: {
    bg: 'linear-gradient(160deg, #0d0c0b 0%, #1a1210 50%, #0d0c0b 100%)',
    accent: '#c45c26',
    text: '#f4e4c1',
  },
  barista: {
    bg: 'linear-gradient(165deg, #1c1410 0%, #2a1f18 50%, #1c1410 100%)',
    accent: '#c4a574',
    text: '#f5ebe0',
  },
  submarine: {
    bg: 'linear-gradient(160deg, #020810 0%, #051820 50%, #020810 100%)',
    accent: '#00ffaa',
    text: '#7dffc8',
  },
  futureAi: {
    bg: 'linear-gradient(145deg, #050014 0%, #1a0066 40%, #050014 100%)',
    accent: '#00f0ff',
    text: '#e8f0ff',
  },
  alienGuide: {
    bg: 'linear-gradient(160deg, #0a0f12 0%, #0d2a22 50%, #0a0f12 100%)',
    accent: '#ff00aa',
    text: '#c8fff0',
  },
  scuba: {
    bg: 'linear-gradient(180deg, #023e8a 0%, #032a3a 50%, #001219 100%)',
    accent: '#ff9f1c',
    text: '#e0f7ff',
  },
  luxuryRealtor: {
    bg: 'linear-gradient(160deg, #0f0e0c 0%, #2a2418 50%, #0f0e0c 100%)',
    accent: '#d4af37',
    text: '#faf6ef',
  },
  homeless: {
    bg: 'linear-gradient(160deg, #2a2620 0%, #3d362c 50%, #2a2620 100%)',
    accent: '#c9a227',
    text: '#ebe6dc',
  },
  asmr: {
    bg: 'linear-gradient(165deg, #1a1528 0%, #2d2540 50%, #1a1528 100%)',
    accent: '#e8b4f8',
    text: '#f0e8ff',
  },
  hypebeast: {
    bg: 'linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
    accent: '#ff3b30',
    text: '#ffffff',
  },
}

const personaFonts = {
  grandmother: "'Georgia', serif",
  teenager: "'Impact', sans-serif",
  office: "'Arial', sans-serif",
  hipster: "'Georgia', serif",
  french: "'Georgia', serif",
  kawaii: "'Nunito', 'Zen Maru Gothic', sans-serif",
  casino: "'Limelight', 'Oswald', sans-serif",
  cyberpunk: "'Orbitron', 'Share Tech Mono', monospace",
  retro: "'VT323', monospace",
  conspiracy: "'Special Elite', 'Courier Prime', monospace",
  zen: "'Noto Serif', serif",
  startup: "'Poppins', sans-serif",
  academic: "'EB Garamond', serif",
  privacy: "'Inconsolata', monospace",
  analyst: "'Roboto', sans-serif",
  child: "'Caveat', 'Schoolbell', cursive",
  win98: "'Tahoma', 'Arial', sans-serif",
  xbox360: "'Orbitron', 'Exo 2', sans-serif",
  wii: "'Fredoka', 'Nunito', sans-serif",
  vista: "'Segoe UI', 'Nunito', sans-serif",
  space: "'Space Mono', monospace",
  medieval: "'UnifrakturMaguntia', cursive",
  pirate: "'Pirata One', cursive",
  graffiti: "'Permanent Marker', cursive",
  circus: "'Lilita One', cursive",
  safari: "'Teko', sans-serif",
  mythology: "'Cinzel Decorative', serif",
  vinyl: "'Abril Fatface', serif",
  bonsai: "'Josefin Sans', sans-serif",
  sumo: "'Noto Serif JP', serif",
  alien: "'Syncopate', sans-serif",
  productivity: "'Rubik', sans-serif",
  pilot: "'B612', sans-serif",
  yacht: "'Cinzel', serif",
  tattoo: "'Bebas Neue', sans-serif",
  barista: "'DM Serif Display', serif",
  submarine: "'Share Tech Mono', monospace",
  futureAi: "'Rajdhani', sans-serif",
  alienGuide: "'Audiowide', sans-serif",
  scuba: "'Outfit', sans-serif",
  luxuryRealtor: "'Playfair Display', serif",
  homeless: "'Newsreader', serif",
  asmr: "'Comfortaa', sans-serif",
  hypebeast: "'Archivo Black', sans-serif",
}

export default function PersonaSelector({ onSelectPersona }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-auto"
      style={{ background: '#0d0d0d', padding: '2rem 1rem' }}
    >
      {/* Title */}
      <div className="text-center mb-8">
        <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 300, letterSpacing: '0.2rem', fontFamily: 'Georgia, serif', marginBottom: '0.5rem' }}>
          who are you?
        </h1>
        <p style={{ color: '#666', fontSize: '0.82rem', letterSpacing: '0.1rem' }}>
          The same inbox. {personas.length} completely different worlds.
        </p>
      </div>

      {/* Persona cards grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', maxWidth: 1300, width: '100%' }}>
        {personas.map(persona => {
          const colors = personaColors[persona.id] || { bg: '#1a1a1a', accent: '#888', text: '#fff' }
          const isHovered = hoveredId === persona.id
          return (
            <button
              key={persona.id}
              onClick={() => onSelectPersona(persona)}
              onMouseEnter={() => setHoveredId(persona.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                width: 'clamp(110px, 13vw, 150px)',
                height: 'clamp(150px, 18vw, 190px)',
                background: colors.bg,
                border: isHovered ? `2px solid ${colors.accent}` : '2px solid transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                padding: '1rem 0.75rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transform: isHovered ? 'translateY(-5px) scale(1.04)' : 'translateY(0) scale(1)',
                transition: 'all 0.2s ease',
                boxShadow: isHovered ? `0 12px 30px ${colors.accent}55` : '0 3px 12px rgba(0,0,0,0.4)',
              }}
            >
              <span style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1 }}>{persona.emoji}</span>
              <span style={{
                fontSize: 'clamp(0.65rem, 1.2vw, 0.82rem)',
                fontWeight: 600,
                color: colors.text,
                fontFamily: personaFonts[persona.id] || 'system-ui',
                textAlign: 'center',
                lineHeight: 1.2,
                wordBreak: 'break-word',
              }}>
                {persona.label}
              </span>
              <span style={{
                fontSize: 'clamp(0.55rem, 1vw, 0.65rem)',
                color: colors.text,
                opacity: 0.6,
                textAlign: 'center',
                lineHeight: 1.3,
                fontFamily: 'system-ui, sans-serif',
                display: isHovered ? 'block' : 'none',
              }}>
                {persona.description}
              </span>
              <div style={{
                width: isHovered ? '80%' : '0%',
                height: 2,
                background: colors.accent,
                borderRadius: 1,
                transition: 'width 0.2s ease',
              }} />
            </button>
          )
        })}
      </div>

      <p style={{ color: '#333', fontSize: '0.7rem', marginTop: '2rem', letterSpacing: '0.1rem' }}>
        same data · {personas.length} realities
      </p>
    </div>
  )
}
