export const dateOptions = ['today', 'last10days', 'last30days', 'all'] as const
export const statusOptions = ['all', 'open', 'closed'] as const
export const durationOptions = ['all', '>1h', '<1h', '>5h', '<5h'] as const
export const periodOptions = ['all', 'morning', 'afternoon'] as const

export const filtersMap = [
  {
    name: 'filterDateRange',
    label: 'Período',
    options: dateOptions,
    display: {
      all: 'Todos',
      today: 'Hoje',
      last10days: 'Últimos 10 dias',
      last30days: 'Últimos 30 dias',
    },
    width: 'w-[180px]',
  },
  {
    name: 'status',
    label: 'Status',
    options: statusOptions,
    display: {
      all: 'Todos',
      open: 'Em andamento',
      closed: 'Finalizados',
    },
  },
  {
    name: 'duration',
    label: 'Duração',
    options: durationOptions,
    display: {
      all: 'Todas',
      '>1h': '> 1h',
      '<1h': '< 1h',
      '>5h': '> 5h',
      '<5h': '< 5h',
    },
  },
  {
    name: 'startPeriod',
    label: 'Início do turno',
    options: periodOptions,
    display: {
      all: 'Todos horários',
      morning: 'Antes do meio-dia',
      afternoon: 'Depois do meio-dia',
    },
  },
  {
    name: 'endPeriod',
    label: 'Fim do turno',
    options: periodOptions,
    display: {
      all: 'Todos horários',
      morning: 'Antes do meio-dia',
      afternoon: 'Depois do meio-dia',
    },
  },
] as const
