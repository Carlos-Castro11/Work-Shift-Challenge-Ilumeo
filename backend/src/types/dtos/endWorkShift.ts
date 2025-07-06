import { z } from 'zod'

export const endWorkShiftSchema = z.object({})

export type EndWorkShiftDTO = z.infer<typeof endWorkShiftSchema>
