import { z } from 'zod'

export const filterDateOptions = [
  'today',
  'last10days',
  'last30days',
  'all',
] as const
export const statusOptions = ['all', 'open', 'closed'] as const
export const durationOptions = ['all', '>1h', '<1h', '>5h', '<5h'] as const
export const periodOptions = ['all', 'morning', 'afternoon'] as const

export const workShiftFiltersSchema = z.object({
  filterDateRange: z.enum(filterDateOptions).optional(),
  status: z.enum(statusOptions).optional(),
  duration: z.enum(durationOptions).optional(),
  startPeriod: z.enum(periodOptions).optional(),
  endPeriod: z.enum(periodOptions).optional(),
})

export type WorkShiftFiltersType = z.infer<typeof workShiftFiltersSchema>
