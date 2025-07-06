export function getValidParam<T extends readonly string[]>(
  param: string | null,
  allowed: T,
  fallback: T[number],
): T[number] {
  return allowed.includes(param as T[number]) ? (param as T[number]) : fallback
}
