import { personaMap } from './personaList.js'

const personaModules = import.meta.glob(['./*.js', '!./index.js', '!./personaList.js'], {
  import: 'default',
})

export { personas, personaMap } from './personaList.js'

/**
 * Lazy-load full persona (Layout, cssVars, fonts). Selector uses lightweight `personas` from personaList.
 */
export function loadPersona(id) {
  const meta = personaMap[id]
  if (!meta?.loadKey) {
    return Promise.reject(new Error(`Unknown persona: ${id}`))
  }
  const modulePath = `./${meta.loadKey}.js`
  const loader = personaModules[modulePath]
  if (!loader) {
    return Promise.reject(new Error(`No module for ${modulePath}`))
  }
  return loader()
}
