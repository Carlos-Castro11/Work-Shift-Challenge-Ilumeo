import {
  dateOptions,
  durationOptions,
  periodOptions,
  statusOptions,
} from '@/constants/workShiftFilters'
import {
  type WorkShiftFiltersType,
  workShiftFiltersSchema,
} from '@/schemas/workShift.schema'
import { parseParam } from '@/utils/parseParams'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

export function useWorkShiftFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultValues: WorkShiftFiltersType = {
    filterDateRange:
      parseParam('filterDateRange', dateOptions, searchParams) ?? 'all',
    status: parseParam('status', statusOptions, searchParams) ?? 'all',
    duration: parseParam('duration', durationOptions, searchParams) ?? 'all',
    startPeriod:
      parseParam('startPeriod', periodOptions, searchParams) ?? 'all',
    endPeriod: parseParam('endPeriod', periodOptions, searchParams) ?? 'all',
  }

  const form = useForm<WorkShiftFiltersType>({
    resolver: zodResolver(workShiftFiltersSchema),
    defaultValues,
  })

  function updateParams(filters: WorkShiftFiltersType) {
    setSearchParams((urlState) => {
      for (const [key, value] of Object.entries(filters)) {
        if (value && value !== 'all') {
          urlState.set(key, value)
        } else {
          urlState.delete(key)
        }
      }
      urlState.set('page', '1')
      return urlState
    })
  }

  function clearFilters() {
    setSearchParams((urlState) => {
      for (const key of [
        'filterDateRange',
        'status',
        'duration',
        'startPeriod',
        'endPeriod',
      ]) {
        urlState.delete(key)
      }
      urlState.set('page', '1')
      return urlState
    })

    form.reset({
      filterDateRange: 'all',
      status: 'all',
      duration: 'all',
      startPeriod: 'all',
      endPeriod: 'all',
    })
  }

  return {
    control: form.control,
    handleSubmit: form.handleSubmit,
    reset: form.reset,
    updateParams,
    clearFilters,
  }
}
