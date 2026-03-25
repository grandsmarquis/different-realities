import { createContext, useContext, useState, useEffect } from 'react'
import { emails } from '../data/emails'

export const PersonaContext = createContext(null)

export function PersonaProvider({ children }) {
  const [activePersona, setActivePersona] = useState(null)
  const [selectedEmail, setSelectedEmail] = useState(null)

  useEffect(() => {
    if (!activePersona) return

    // Modal, overlay, or full-page email view: start with nothing selected
    if (activePersona.emailSelectionInModal) {
      setSelectedEmail(null)
    } else {
      setSelectedEmail(emails[0] ?? null)
    }

    // Apply CSS vars to :root
    const root = document.documentElement
    Object.entries(activePersona.cssVars).forEach(([key, val]) => {
      root.style.setProperty(key, val)
    })

    // Load Google Fonts dynamically (skip if no fonts specified)
    if (activePersona.fonts && activePersona.fonts.length > 0) {
      const fontId = `persona-font-${activePersona.id}`
      const existing = document.getElementById(fontId)
      if (!existing) {
        document.querySelectorAll('[data-persona-font]').forEach(el => el.remove())
        const families = activePersona.fonts.map(f => `family=${f}`).join('&')
        const link = document.createElement('link')
        link.id = fontId
        link.rel = 'stylesheet'
        link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`
        link.setAttribute('data-persona-font', 'true')
        document.head.appendChild(link)
      }
    }
  }, [activePersona])

  return (
    <PersonaContext.Provider value={{ activePersona, setActivePersona, selectedEmail, setSelectedEmail }}>
      {children}
    </PersonaContext.Provider>
  )
}

export function usePersona() {
  return useContext(PersonaContext)
}
