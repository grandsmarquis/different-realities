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
  vista: {
    bg: 'linear-gradient(160deg, #0a1628 0%, #162b55 50%, #0a1628 100%)',
    accent: '#4fb3e8',
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
  vista: "'Segoe UI', 'Nunito', sans-serif",
}

export default function PersonaSelector({ onSelect }) {
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
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', maxWidth: 1100, width: '100%' }}>
        {personas.map(persona => {
          const colors = personaColors[persona.id] || { bg: '#1a1a1a', accent: '#888', text: '#fff' }
          const isHovered = hoveredId === persona.id
          const isGradient = typeof colors.bg === 'string' && colors.bg.includes('gradient')
          return (
            <button
              key={persona.id}
              onClick={() => onSelect(persona)}
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
