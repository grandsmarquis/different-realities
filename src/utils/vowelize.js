/** Keep only vowels (Latin + common accents + æ/œ); preserve digits and common numeric/punct chars. */
const KEEP = /[\d\s\n$€%°/+\-:,.]/

const LIG = /^(æ|œ)$/iu

export function isVowelChar(ch) {
  if (LIG.test(ch)) return true
  if (!/\p{L}/u.test(ch)) return false
  const base = ch.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
  return 'aeiouy'.includes(base)
}

export function vowelizeText(str) {
  return [...String(str).normalize('NFC')]
    .map((ch) => {
      if (KEEP.test(ch)) return ch
      if (!/\p{L}/u.test(ch)) return ''
      return isVowelChar(ch) ? ch : ''
    })
    .join('')
}

export function vowelHueClass(ch) {
  const base = ch.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
  if (base === 'a') return 'vo-a'
  if (base === 'e') return 'vo-e'
  if (base === 'i') return 'vo-i'
  if (base === 'o') return 'vo-o'
  if (base === 'u') return 'vo-u'
  if (base === 'y') return 'vo-y'
  if (base === 'æ' || base === 'œ') return 'vo-ae'
  return 'vo-n'
}
