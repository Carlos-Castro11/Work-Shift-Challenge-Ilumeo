import { Router } from 'express'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { WorkShiftController } from './controller/workShift.controller'
import { workShiftRepository } from './repository/workShift.repository'
import { WorkShiftService } from './service'

const workShiftRoutes = Router()

const workShiftService = new WorkShiftService(workShiftRepository)
const workShiftController = new WorkShiftController(workShiftService)

workShiftRoutes.get(
  '/',
  authMiddleware,
  workShiftController.list.bind(workShiftController),
)

workShiftRoutes.post(
  '/start',
  authMiddleware,
  workShiftController.start.bind(workShiftController),
)

workShiftRoutes.patch(
  '/end',
  authMiddleware,
  workShiftController.end.bind(workShiftController),
)

workShiftRoutes.get(
  '/today',
  authMiddleware,
  workShiftController.listToday.bind(workShiftController),
)

export { workShiftRoutes }
