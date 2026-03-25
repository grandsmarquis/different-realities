/** e→3, o→0, l→7 (ASCII, case-insensitive) for 733tc0d3 persona copy */
export function leet733Str(s) {
  if (s == null || typeof s !== 'string') return s
  return s.replace(/e/gi, '3').replace(/o/gi, '0').replace(/l/gi, '7')
}
