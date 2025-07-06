import type { ListShiftsDTO } from '@/types/dtos/listShift.dto'
import type { IWorkShiftRepository } from '../repository/workShift.repository'
import { end } from './end'
import { list } from './list'
import { listToday } from './listToday'
import { start } from './start'

export class WorkShiftService {
  constructor(private readonly workShiftRepository: IWorkShiftRepository) {}

  list = (userId: string, filters: ListShiftsDTO) =>
    list(userId, filters, this.workShiftRepository)

  start = (userId: string) => start(userId, this.workShiftRepository)
  end = (userId: string) => end(userId, this.workShiftRepository)
  listToday = (userId: string) => listToday(userId, this.workShiftRepository)
}
