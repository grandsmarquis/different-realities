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
  ness: {
    bg: 'linear-gradient(160deg, #0f1f12 0%, #1a2f1a 50%, #0f1f12 100%)',
    accent: '#7cff6a',
    text: '#f8ffe8',
  },
  mushroomKingdom: {
    bg: 'linear-gradient(185deg, #5c94fc 0%, #2038ec 55%, #87ceeb 100%)',
    accent: '#f8d030',
    text: '#1a1a2e',
  },
  germanSoccerFan: {
    bg: 'linear-gradient(90deg, #000000 0%, #dd0000 50%, #ffcc00 100%)',
    accent: '#ffcc00',
    text: '#ffffff',
  },
  queenEngland: {
    bg: 'linear-gradient(160deg, #faf6ef 0%, #ebe4d6 50%, #f5efe6 100%)',
    accent: '#c9a227',
    text: '#1c1428',
  },
  trump: {
    bg: 'linear-gradient(165deg, #2a2418 0%, #1a1510 50%, #3d3428 100%)',
    accent: '#d4af37',
    text: '#f5f0e6',
  },
  punk: {
    bg: 'linear-gradient(125deg, #0c0c0c 0%, #1a0508 45%, #0c0c0c 100%)',
    accent: '#ff0040',
    text: '#f5f5f5',
  },
  alteredState: {
    bg: 'linear-gradient(160deg, #08060a 0%, #1a0a24 55%, #08060a 100%)',
    accent: '#c084fc',
    text: '#e8e0f0',
  },
  shibuyaHell: {
    bg: 'linear-gradient(135deg, #ec4899 0%, #7c3aed 40%, #fbbf24 100%)',
    accent: '#fbbf24',
    text: '#0a0612',
  },
  ebayMail: {
    bg: 'linear-gradient(180deg, #ffc439 0%, #f7f7f7 55%, #e5e5e5 100%)',
    accent: '#0064d2',
    text: '#1a1a1a',
  },
  rainforestMail: {
    bg: 'linear-gradient(165deg, #eaeded 0%, #d5d9d9 50%, #ffedd5 100%)',
    accent: '#ff9900',
    text: '#0f1111',
  },
  scammer: {
    bg: 'linear-gradient(160deg, #051208 0%, #0a1a0e 55%, #050a08 100%)',
    accent: '#00ff66',
    text: '#c8f5c8',
  },
  pizzaLover: {
    bg: 'linear-gradient(165deg, #3d1810 0%, #5c2a18 45%, #2c1208 100%)',
    accent: '#ff6b35',
    text: '#fff8f0',
  },
  baby: {
    bg: 'linear-gradient(160deg, #e8f4fc 0%, #fce4ec 50%, #e3f2fd 100%)',
    accent: '#ff8fab',
    text: '#4a6fa5',
  },
  grandfather: {
    bg: 'linear-gradient(165deg, #e8dcc8 0%, #d4c4a8 50%, #c9b896 100%)',
    accent: '#8b4513',
    text: '#2c2418',
  },
  tetrisPlayer: {
    bg: 'linear-gradient(165deg, #0a0a12 0%, #1a1a28 50%, #050508 100%)',
    accent: '#00f0f0',
    text: '#e8e8f0',
  },
  smurfFan: {
    bg: 'linear-gradient(185deg, #0d47a1 0%, #42a5f5 45%, #01579b 100%)',
    accent: '#29b6f6',
    text: '#ffffff',
  },
  princess: {
    bg: 'linear-gradient(160deg, #fff5f8 0%, #fce4ec 50%, #f8bbd9 100%)',
    accent: '#e91e8c',
    text: '#4a1942',
  },
  god: {
    bg: 'linear-gradient(165deg, #1a1530 0%, #3d3558 50%, #0f0a1a 100%)',
    accent: '#ffd700',
    text: '#fffef7',
  },
  cowboy: {
    bg: 'linear-gradient(175deg, #c9a66b 0%, #8b6914 40%, #5c3d2e 100%)',
    accent: '#8b4513',
    text: '#2c1810',
  },
  hobbit: {
    bg: 'linear-gradient(165deg, #558b2f 0%, #33691e 50%, #1b3d0a 100%)',
    accent: '#7cb342',
    text: '#fff8e7',
  },
  darthVador: {
    bg: 'linear-gradient(160deg, #000000 0%, #1a0505 55%, #000000 100%)',
    accent: '#ff2a2a',
    text: '#e8e8e8',
  },
  dubaiEmirate: {
    bg: 'linear-gradient(150deg, #060504 0%, #1a1508 40%, #e8c547 95%, #f5e6a8 100%)',
    accent: '#f5e6a8',
    text: '#fffef7',
  },
  japaneseSakura: {
    bg: 'linear-gradient(165deg, #f5efff 0%, #fdf8fa 45%, #e8f6f1 85%, #fceef8 100%)',
    accent: '#c4b5f5',
    text: '#5c5160',
  },
  flowerLover: {
    bg: 'linear-gradient(160deg, #1a0f18 0%, #4a1942 45%, #fb7185 130%)',
    accent: '#f472b6',
    text: '#fdf2f8',
  },
  hystericKareen: {
    bg: 'linear-gradient(125deg, #1a0505 0%, #450a0a 50%, #7f1d1d 100%)',
    accent: '#ef4444',
    text: '#fff5f5',
  },
  roadrager: {
    bg: 'linear-gradient(180deg, #0c4a6e 0%, #0a0a0c 55%, #f97316 130%)',
    accent: '#f97316',
    text: '#f8fafc',
  },
  sexworker: {
    bg: 'linear-gradient(160deg, #1f0f1c 0%, #120810 50%, #e879a9 140%)',
    accent: '#e879a9',
    text: '#fdf2f8',
  },
  bankRobber: {
    bg: 'linear-gradient(165deg, #050805 0%, #052e16 50%, #22c55e 120%)',
    accent: '#22c55e',
    text: '#dcfce7',
  },
  nftCollector: {
    bg: 'linear-gradient(165deg, #04111d 0%, #0f2435 55%, #2081e2 130%)',
    accent: '#2081e2',
    text: '#ffffff',
  },
  indianRestaurant: {
    bg: 'linear-gradient(160deg, #2d0f00 0%, #1a0800 50%, #3d1800 100%)',
    accent: '#ffd700',
    text: '#ffd080',
  },
  bollywood: {
    bg: 'linear-gradient(145deg, #3d0070 0%, #1a003d 50%, #6b0050 100%)',
    accent: '#ff1493',
    text: '#ff69b4',
  },
  plumber: {
    bg: 'linear-gradient(160deg, #0f1a1f 0%, #162028 50%, #0a1520 100%)',
    accent: '#00d4ff',
    text: '#7fd8ff',
  },
  magician: {
    bg: 'linear-gradient(145deg, #08000f 0%, #2d0055 40%, #100018 100%)',
    accent: '#9c27b0',
    text: '#e8d5ff',
  },
  fisherman: {
    bg: 'linear-gradient(180deg, #0a1628 0%, #0d1e35 50%, #091420 100%)',
    accent: '#e8a040',
    text: '#c8e6f0',
  },
  surfer: {
    bg: 'linear-gradient(160deg, #001830 0%, #002040 50%, #003a60 100%)',
    accent: '#00d4aa',
    text: '#7fd8ff',
  },
  gladiator: {
    bg: 'linear-gradient(160deg, #2d1800 0%, #1a1008 50%, #3a2000 100%)',
    accent: '#cc2200',
    text: '#e8c870',
  },
  dealHunter: {
    bg: 'linear-gradient(165deg, #0f172a 0%, #14532d 45%, #0c4a6e 100%)',
    accent: '#22c55e',
    text: '#f8fafc',
  },
  shyIntrovert: {
    bg: 'linear-gradient(160deg, #1a1625 0%, #2d2640 50%, #1e1b2e 100%)',
    accent: '#c4b5fd',
    text: '#e8e4f0',
  },
  nostalgicElder: {
    bg: 'linear-gradient(165deg, #5c4a3a 0%, #3d3428 50%, #2c241c 100%)',
    accent: '#c9a227',
    text: '#f5ebe0',
  },
  firstInternet: {
    bg: 'linear-gradient(180deg, #000080 0%, #000060 50%, #000040 100%)',
    accent: '#ff00ff',
    text: '#ffff00',
  },
  insomnia3am: {
    bg: 'linear-gradient(165deg, #0c1222 0%, #151d32 50%, #060912 100%)',
    accent: '#fbbf24',
    text: '#fde68a',
  },
  expertMode: {
    bg: 'linear-gradient(160deg, #050505 0%, #0a0a0a 100%)',
    accent: '#ffffff',
    text: '#e5e5e5',
  },
  elderA11y: {
    bg: 'linear-gradient(160deg, #ffffff 0%, #e5e7eb 100%)',
    accent: '#1d4ed8',
    text: '#111827',
  },
  dyslexiaFriendly: {
    bg: 'linear-gradient(165deg, #faf8f3 0%, #f0ebe3 100%)',
    accent: '#0d9488',
    text: '#1c1917',
  },
  meditation: {
    bg: 'linear-gradient(165deg, #1a2f2a 0%, #243d36 50%, #1a2f2a 100%)',
    accent: '#6ee7b7',
    text: '#ecfdf5',
  },
  postApocalypse: {
    bg: 'linear-gradient(160deg, #030805 0%, #052e16 55%, #020604 100%)',
    accent: '#4ade80',
    text: '#86efac',
  },
  celebration: {
    bg: 'linear-gradient(145deg, #4c1d95 0%, #7c3aed 45%, #db2777 100%)',
    accent: '#f472b6',
    text: '#fef3c7',
  },
  oneHandedMobile: {
    bg: 'linear-gradient(165deg, #0f1419 0%, #1a2332 50%, #0c1018 100%)',
    accent: '#38bdf8',
    text: '#f1f5f9',
  },
  waitingRoomBoredom: {
    bg: 'linear-gradient(180deg, #e8e4dc 0%, #d4cfc4 100%)',
    accent: '#8b7355',
    text: '#3d3830',
  },
  printedPaperMode: {
    bg: 'linear-gradient(180deg, #d4cfc4 0%, #a8a29e 100%)',
    accent: '#78350f',
    text: '#1c1917',
  },
  sixtySecondChallenge: {
    bg: 'linear-gradient(180deg, #0c0a09 0%, #292524 100%)',
    accent: '#ef4444',
    text: '#fef3c7',
  },
  bossWalksBy: {
    bg: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
    accent: '#22c55e',
    text: '#e2e8f0',
  },
  remindTomorrowMonths: {
    bg: 'linear-gradient(165deg, #fef9c3 0%, #fde68a 50%, #fcd34d 100%)',
    accent: '#ea580c',
    text: '#422006',
  },
  inboxZeroFantasy: {
    bg: 'linear-gradient(160deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
    accent: '#c026d3',
    text: '#3b0764',
  },
  mexicanSombrero: {
    bg: 'linear-gradient(165deg, #14532d 0%, #0f172a 45%, #ca8a04 120%)',
    accent: '#facc15',
    text: '#fef3c7',
  },
  cowgirl: {
    bg: 'linear-gradient(175deg, #bfdbfe 0%, #e9d5ff 50%, #fecdd3 100%)',
    accent: '#db2777',
    text: '#1e3a5f',
  },
  dominatrix: {
    bg: 'linear-gradient(160deg, #0a0508 0%, #1a0a12 55%, #2d0a14 100%)',
    accent: '#e11d48',
    text: '#f5e6e8',
  },
  pineapplePizza: {
    bg: 'linear-gradient(125deg, #facc15 0%, #ea580c 45%, #b91c1c 100%)',
    accent: '#fffbeb',
    text: '#1c1917',
  },
  dogLover: {
    bg: 'linear-gradient(165deg, #e0f2fe 0%, #fff7ed 50%, #ecfeff 100%)',
    accent: '#0284c7',
    text: '#0c4a6e',
  },
  catLover: {
    bg: 'linear-gradient(160deg, #fdf2f8 0%, #faf5ff 50%, #eef2ff 100%)',
    accent: '#db2777',
    text: '#5b21b6',
  },
  catReadingInbox: {
    bg: 'linear-gradient(165deg, #1e1b4b 0%, #4c1d95 50%, #312e81 100%)',
    accent: '#a78bfa',
    text: '#ede9fe',
  },
  dogReadingInbox: {
    bg: 'linear-gradient(170deg, #422006 0%, #292524 50%, #1c1917 100%)',
    accent: '#fbbf24',
    text: '#fffbeb',
  },
  dinosaursStillAlive: {
    bg: 'linear-gradient(165deg, #0c1912 0%, #14532d 50%, #1a1209 100%)',
    accent: '#fbbf24',
    text: '#ecfdf5',
  },
  donaldDuckInbox: {
    bg: 'linear-gradient(180deg, #2563eb 0%, #1e3a5f 55%, #172554 100%)',
    accent: '#facc15',
    text: '#ffffff',
  },
  swissCheeseLover: {
    bg: 'linear-gradient(180deg, #0f766e 0%, #115e59 50%, #134e4a 100%)',
    accent: '#fde68a',
    text: '#f0fdfa',
  },
  trader: {
    bg: 'linear-gradient(160deg, #030712 0%, #0f172a 100%)',
    accent: '#22c55e',
    text: '#e2e8f0',
  },
  fmBroadcaster: {
    bg: 'linear-gradient(165deg, #1c1410 0%, #292018 100%)',
    accent: '#fbbf24',
    text: '#fef3c7',
  },
  developer: {
    bg: 'linear-gradient(180deg, #252526 0%, #1e1e1e 100%)',
    accent: '#569cd6',
    text: '#d4d4d4',
  },
  bobMarleyInbox: {
    bg: 'linear-gradient(165deg, #14532d 0%, #1c1917 50%, #0f172a 100%)',
    accent: '#facc15',
    text: '#ecfccb',
  },
  gasPricesRising: {
    bg: 'linear-gradient(165deg, #3e2723 0%, #bf360c 40%, #1a0a06 100%)',
    accent: '#ffea00',
    text: '#fff8e1',
  },
  bitcoinCrashing: {
    bg: 'linear-gradient(160deg, #450a0a 0%, #1c0505 55%, #0a0202 100%)',
    accent: '#f87171',
    text: '#fecaca',
  },
  bitcoinMooning: {
    bg: 'linear-gradient(155deg, #14532d 0%, #422006 45%, #052e16 100%)',
    accent: '#fbbf24',
    text: '#ecfccb',
  },
  sectGuruInbox: {
    bg: 'linear-gradient(165deg, #3b0764 0%, #1e0533 50%, #0c0618 100%)',
    accent: '#c4b5fd',
    text: '#faf5ff',
  },
  chineseRestaurantOwner: {
    bg: 'linear-gradient(160deg, #7f1d1d 0%, #451a03 50%, #0c0a09 100%)',
    accent: '#fbbf24',
    text: '#fef3c7',
  },
  nflProPlayer: {
    bg: 'linear-gradient(180deg, #0f172a 0%, #14532d 40%, #020617 100%)',
    accent: '#f59e0b',
    text: '#f8fafc',
  },
  oldschoolInternet: {
    bg: 'linear-gradient(90deg, #000060 0%, #330066 50%, #000060 100%)',
    accent: '#00ffff',
    text: '#ffff00',
  },
  myspaceCom: {
    bg: 'linear-gradient(135deg, #ff1493 0%, #9400d3 50%, #00bfff 100%)',
    accent: '#ffff00',
    text: '#ffffff',
  },
  earlyFacebook: {
    bg: 'linear-gradient(180deg, #3b5998 0%, #e9eaed 100%)',
    accent: '#8b9dc3',
    text: '#1c1e21',
  },
  pixelArt: {
    bg: 'linear-gradient(180deg, #0f380f 0%, #306230 100%)',
    accent: '#9bbc0f',
    text: '#ffd700',
  },
  blackAndWhite: {
    bg: 'linear-gradient(180deg, #f5f5f5 0%, #eaeaea 100%)',
    accent: '#000000',
    text: '#111111',
  },
  redAndBlue: {
    bg: 'linear-gradient(90deg, #450a0a 0%, #1e1b4b 50%, #172554 100%)',
    accent: '#60a5fa',
    text: '#fecaca',
  },
  itsTheWeekend: {
    bg: 'linear-gradient(165deg, #fef08a 0%, #fda4af 40%, #a78bfa 100%)',
    accent: '#db2777',
    text: '#1e1b4b',
  },
  ohShitItsMonday: {
    bg: 'linear-gradient(180deg, #64748b 0%, #334155 100%)',
    accent: '#f59e0b',
    text: '#e2e8f0',
  },
  youAreDrunk: {
    bg: 'linear-gradient(165deg, #4c1d95 0%, #86198f 50%, #701a75 100%)',
    accent: '#f472b6',
    text: '#faf5ff',
  },
  youAreHangover: {
    bg: 'linear-gradient(180deg, #292524 0%, #1c1917 100%)',
    accent: '#78716c',
    text: '#d6d3d1',
  },
  youArePoor: {
    bg: 'repeating-linear-gradient(90deg, #e7e5e4 0px, #e7e5e4 12px, #d6d3d1 12px, #d6d3d1 24px)',
    accent: '#b45309',
    text: '#44403c',
  },
  youAreRich: {
    bg: 'linear-gradient(165deg, #0c0a09 0%, #292524 50%, #1c1917 100%)',
    accent: '#d4af37',
    text: '#fafaf9',
  },
  doctor: {
    bg: 'linear-gradient(165deg, #ecfdf5 0%, #ccfbf1 50%, #e2e8f0 100%)',
    accent: '#0d9488',
    text: '#0f172a',
  },
  brokeStudent: {
    bg: 'linear-gradient(165deg, #431407 0%, #292524 50%, #1c1917 100%)',
    accent: '#fb923c',
    text: '#ffedd5',
  },
  islandLost: {
    bg: 'linear-gradient(180deg, #7dd3fc 0%, #fde68a 55%, #fcd34d 100%)',
    accent: '#ea580c',
    text: '#422006',
  },
  noInternet: {
    bg: 'linear-gradient(180deg, #c0c0c0 0%, #a8a8a8 100%)',
    accent: '#000080',
    text: '#1a1a1a',
  },
  lotteryWinner: {
    bg: 'linear-gradient(165deg, #2e1065 0%, #4c1d95 40%, #831843 100%)',
    accent: '#fbbf24',
    text: '#fef3c7',
  },
  athlete: {
    bg: 'linear-gradient(135deg, #ea580c 0%, #b91c1c 50%, #7c2d12 100%)',
    accent: '#a3e635',
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
  ness: "'Press Start 2P', monospace",
  mushroomKingdom: "'Bungee', cursive",
  germanSoccerFan: "'Bebas Neue', sans-serif",
  queenEngland: "'Cinzel Decorative', serif",
  trump: "'Anton', sans-serif",
  punk: "'Rubik Glitch', sans-serif",
  alteredState: "'Syne Mono', monospace",
  shibuyaHell: "'RocknRoll One', sans-serif",
  ebayMail: "'Comic Neue', sans-serif",
  rainforestMail: "'DM Sans', sans-serif",
  scammer: "'Share Tech Mono', monospace",
  pizzaLover: "'Pacifico', cursive",
  baby: "'Fredoka', sans-serif",
  grandfather: "'Libre Baskerville', serif",
  tetrisPlayer: "'Press Start 2P', monospace",
  smurfFan: "'Fredoka', sans-serif",
  princess: "'Great Vibes', cursive",
  god: "'Cinzel', serif",
  cowboy: "'Rye', serif",
  hobbit: "'Libre Baskerville', serif",
  darthVador: "'Orbitron', sans-serif",
  dubaiEmirate: "'Cinzel', serif",
  japaneseSakura: "'Shippori Mincho', serif",
  flowerLover: "'Fraunces', serif",
  hystericKareen: "'Bebas Neue', sans-serif",
  roadrager: "'Russo One', sans-serif",
  sexworker: "'Cormorant Garamond', serif",
  bankRobber: "'Share Tech Mono', monospace",
  nftCollector: "'Inter', sans-serif",
  indianRestaurant: "'Cinzel', serif",
  bollywood: "'Pacifico', cursive",
  plumber: "'Black Ops One', cursive",
  magician: "'Cinzel Decorative', serif",
  fisherman: "'Rye', cursive",
  surfer: "'Pacifico', cursive",
  gladiator: "'Cinzel', serif",
  dealHunter: "'Bebas Neue', sans-serif",
  shyIntrovert: "'Quicksand', sans-serif",
  nostalgicElder: "'Libre Baskerville', serif",
  firstInternet: "'Comic Neue', sans-serif",
  insomnia3am: "'Spline Sans', sans-serif",
  expertMode: "'IBM Plex Mono', monospace",
  elderA11y: "'Atkinson Hyperlegible', sans-serif",
  dyslexiaFriendly: "'Lexend', sans-serif",
  meditation: "'Cormorant Garamond', serif",
  postApocalypse: "'Share Tech Mono', monospace",
  celebration: "'Fredoka', sans-serif",
  oneHandedMobile: "'DM Sans', sans-serif",
  waitingRoomBoredom: "'Libre Franklin', sans-serif",
  printedPaperMode: "'Courier Prime', monospace",
  sixtySecondChallenge: "'Chakra Petch', sans-serif",
  bossWalksBy: "'IBM Plex Mono', monospace",
  remindTomorrowMonths: "'Quicksand', sans-serif",
  inboxZeroFantasy: "'Syne', sans-serif",
  mexicanSombrero: "'Passion One', cursive",
  cowgirl: "'Oswald', sans-serif",
  dominatrix: "'Cinzel', serif",
  pineapplePizza: "'Bangers', cursive",
  dogLover: "'Fredoka', sans-serif",
  catLover: "'Patrick Hand', cursive",
  catReadingInbox: "'Sniglet', cursive",
  dogReadingInbox: "'Chewy', cursive",
  dinosaursStillAlive: "'Abril Fatface', serif",
  donaldDuckInbox: "'Bangers', cursive",
  swissCheeseLover: "'Fraunces', serif",
  trader: "'Orbitron', sans-serif",
  fmBroadcaster: "'Bebas Neue', sans-serif",
  developer: "'JetBrains Mono', monospace",
  bobMarleyInbox: "'Lilita One', cursive",
  gasPricesRising: "'Orbitron', sans-serif",
  bitcoinCrashing: "'Bebas Neue', sans-serif",
  bitcoinMooning: "'Syne', sans-serif",
  sectGuruInbox: "'Cinzel Decorative', serif",
  chineseRestaurantOwner: "'ZCOOL XiaoWei', serif",
  nflProPlayer: "'Anton', sans-serif",
  oldschoolInternet: "'VT323', monospace",
  myspaceCom: "'Pacifico', cursive",
  earlyFacebook: 'Tahoma, Geneva, Verdana, sans-serif',
  pixelArt: "'Press Start 2P', monospace",
  blackAndWhite: "'Libre Baskerville', serif",
  redAndBlue: "'Russo One', sans-serif",
  itsTheWeekend: "'Bungee', cursive",
  ohShitItsMonday: "'Special Elite', cursive",
  youAreDrunk: "'Shrikhand', cursive",
  youAreHangover: "'Instrument Serif', serif",
  youArePoor: "'Courier Prime', monospace",
  youAreRich: "'Playfair Display', serif",
  doctor: "'Libre Baskerville', serif",
  brokeStudent: "'Outfit', sans-serif",
  islandLost: "'Gelasio', serif",
  noInternet: "'VT323', monospace",
  lotteryWinner: "'Playfair Display', serif",
  athlete: "'Bebas Neue', sans-serif",
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
