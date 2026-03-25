import grandmother from './grandmother'
import teenager from './teenager'
import office from './office'
import hipster from './hipster'
import french from './french'
import kawaii from './kawaii'
import casino from './casino'
import cyberpunk from './cyberpunk'
import retro from './retro'
import conspiracy from './conspiracy'
import zen from './zen'
import startup from './startup'
import academic from './academic'
import privacy from './privacy'
import analyst from './analyst'
import child from './child'
import win98 from './win98'
import vista from './vista'

export const personas = [
  grandmother, teenager, office, hipster, french,
  kawaii, casino, cyberpunk, retro, conspiracy,
  zen, startup, academic, privacy, analyst, child,
  win98, vista,
]

export const personaMap = Object.fromEntries(personas.map(p => [p.id, p]))
