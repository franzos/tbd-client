export function wordsToUrl(val: string) {
  return val.replace(/ /g, '-')
}

export function wordsFromUrl(val: string) {
  return val.replace(/-/g, ' ')
}
