export function parseParam<T extends Readonly<string[]>>(
  key: string,
  validValues: T,
  searchParams: URLSearchParams,
): T[number] | undefined {
  const value = searchParams.get(key)
  return validValues.includes(value as T[number])
    ? (value as T[number])
    : undefined
}
