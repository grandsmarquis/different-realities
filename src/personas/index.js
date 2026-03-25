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
import xbox360 from './xbox360'
import wii from './wii'
import space from './space'
import medieval from './medieval'
import pirate from './pirate'
import graffiti from './graffiti'
import circus from './circus'
import safari from './safari'
import mythology from './mythology'
import vinyl from './vinyl'
import bonsai from './bonsai'
import sumo from './sumo'
import alien from './alien'
import productivity from './productivity'
import pilot from './pilot'
import yacht from './yacht'
import tattoo from './tattoo'
import barista from './barista'
import submarine from './submarine'
import futureAi from './futureAi'
import alienGuide from './alienGuide'
import scuba from './scuba'
import luxuryRealtor from './luxuryRealtor'
import homeless from './homeless'
import asmr from './asmr'
import hypebeast from './hypebeast'

export const personas = [
  grandmother, teenager, office, hipster, french,
  kawaii, casino, cyberpunk, retro, conspiracy,
  zen, startup, academic, privacy, analyst, child,
  win98, vista, xbox360, wii,
  space, medieval, pirate, graffiti, circus, safari,
  mythology, vinyl, bonsai, sumo, alien, productivity, pilot,
  yacht, tattoo, barista, submarine, futureAi, alienGuide, scuba,
  luxuryRealtor, homeless, asmr, hypebeast,
]

export const personaMap = Object.fromEntries(personas.map(p => [p.id, p]))
