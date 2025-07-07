import { z } from 'zod'

export const listShiftsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => !Number.isNaN(val as number) && (val as number) > 0, {
      message: 'Page must be a positive number',
    }),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => !Number.isNaN(val as number) && (val as number) > 0, {
      message: 'Limit must be a positive number',
    }),

  filterDateRange: z
    .enum(['today', 'last10days', 'last30days', 'all'])
    .optional(),

  status: z.enum(['open', 'closed', 'all']).optional(),

  duration: z.enum(['>1h', '<1h', '>5h', '<5h', 'all']).optional(),

  startPeriod: z.enum(['morning', 'afternoon', 'all']).optional(),

  endPeriod: z.enum(['morning', 'afternoon', 'all']).optional(),

  filter: z.enum(['last10days', 'month']).optional(),

  month: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{4}-\d{2}$/.test(val), {
      message: 'Month must be in YYYY-MM format',
    }),
})

export type ListShiftsDTO = z.infer<typeof listShiftsSchema>
