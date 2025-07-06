import { Router } from 'express'
import { workShiftRoutes } from '@/modules/shifts/routes'
import { userRoutes } from '@/modules/user/routes'

export const router = Router()

router.use('/api/users', userRoutes)
router.use('/api/shifts', workShiftRoutes)
