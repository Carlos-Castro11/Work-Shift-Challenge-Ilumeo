import type { IWorkShift } from '@/types/WorkShift'
import { create } from 'zustand'

interface TodayShiftStore {
  todayShifts: IWorkShift[] | null
  setTodayShifts: (shifts: IWorkShift[] | null) => void
}

export const useTodayShiftStore = create<TodayShiftStore>((set) => ({
  todayShifts: null,
  setTodayShifts: (shifts) => set({ todayShifts: shifts }),
}))
