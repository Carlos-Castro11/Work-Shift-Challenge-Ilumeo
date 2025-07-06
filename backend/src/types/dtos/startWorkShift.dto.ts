import { z } from 'zod'

export const startWorkShiftSchema = z.object({})

export type StartWorkShiftDTO = z.infer<typeof startWorkShiftSchema>
