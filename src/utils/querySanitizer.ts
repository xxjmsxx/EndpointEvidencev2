export function sanitizeHeaderValue(str: string) {
  return str.replace(/[\u2013\u2014]/g, "-");
}
