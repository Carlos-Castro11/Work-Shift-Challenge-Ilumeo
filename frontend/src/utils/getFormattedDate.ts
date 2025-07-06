export function getFormattedDate() {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return formatter.format(now).replace(' de ', ' ').replace(' de ', ', ')
}
