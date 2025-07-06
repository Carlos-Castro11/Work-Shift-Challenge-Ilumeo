type ErrorWithResponse = {
  response: {
    data?: {
      error?: string
    }
  }
}

export function errorHelper(err: unknown): string {
  if (isErrorWithResponse(err)) {
    return err.response.data?.error ?? 'Erro inesperado do servidor.'
  }

  if (err instanceof Error) {
    return err.message
  }

  return 'Erro desconhecido.'
}

function isErrorWithResponse(err: unknown): err is ErrorWithResponse {
  return (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    typeof (err as Record<string, unknown>).response === 'object'
  )
}
