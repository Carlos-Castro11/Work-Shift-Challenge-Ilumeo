import { z } from 'zod'

export const listTodayWorkShiftSchema = z.object({})

export type ListTodayWorkShiftDTO = z.infer<typeof listTodayWorkShiftSchema>
