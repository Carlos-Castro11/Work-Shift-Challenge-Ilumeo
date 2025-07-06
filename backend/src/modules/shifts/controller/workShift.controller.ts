import type { RequestHandler } from 'express'
import { listShiftsSchema } from '@/types/dtos/listShift.dto'
import type { WorkShiftService } from '../service'

export class WorkShiftController {
  constructor(private readonly workShiftService: WorkShiftService) {}

  list: RequestHandler = async (req, res) => {
    const validation = listShiftsSchema.safeParse(req.query)

    if (!validation.success) {
      res.status(400).json({ error: validation.error.format() })
      return
    }

    const userId = req.userId

    if (!userId) {
      res.status(401).json({ error: 'Token inválido ou ausente.' })
      return
    }

    try {
      const result = await this.workShiftService.list(userId, validation.data)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }

  start: RequestHandler = async (req, res) => {
    const userId = req.userId

    if (!userId) {
      res.status(401).json({ error: 'Token inválido ou ausente.' })
      return
    }

    try {
      const result = await this.workShiftService.start(userId)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }

  end: RequestHandler = async (req, res) => {
    const userId = req.userId

    if (!userId) {
      res.status(401).json({ error: 'Token inválido ou ausente.' })
      return
    }

    try {
      const result = await this.workShiftService.end(userId)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }

  listToday: RequestHandler = async (req, res) => {
    const userId = req.userId

    if (!userId) {
      res.status(401).json({ error: 'Token inválido ou ausente.' })
      return
    }

    try {
      const result = await this.workShiftService.listToday(userId)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }
}
