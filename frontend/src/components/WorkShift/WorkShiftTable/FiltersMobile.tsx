import { DialogBase } from '@/components/common/Dialog'
import { FilterSelect } from '@/components/common/Filters/FilterSelect'
import { Button } from '@/components/ui/button'
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
import { Filter, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

export function FiltersMobile() {
  const [open, setOpen] = useState(false)
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

  const { control, handleSubmit, reset } = useForm<WorkShiftFiltersType>({
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
    setOpen(false)
  }

  function handleClearFilters() {
    setSearchParams((urlState) => {
      urlState.delete('filterDateRange')
      urlState.delete('status')
      urlState.delete('duration')
      urlState.delete('startPeriod')
      urlState.delete('endPeriod')
      urlState.set('page', '1')
      return urlState
    })

    reset({
      filterDateRange: 'all',
      status: 'all',
      duration: 'all',
      startPeriod: 'all',
      endPeriod: 'all',
    })
  }

  return (
    <DialogBase
      title="Filtrar turnos"
      icon={<Filter className="w-4 h-4" />}
      triggerText="Filtros"
      open={open}
      onOpenChange={setOpen}>
      <form onSubmit={handleSubmit(updateParams)}>
        <div className="grid grid-cols-2 gap-4">
          <FilterSelect
            name="filterDateRange"
            label="Período"
            control={control}
            options={dateOptions}
            display={{
              all: 'Todos',
              today: 'Hoje',
              last10days: 'Últimos 10 dias',
              last30days: 'Últimos 30 dias',
            }}
          />
          <FilterSelect
            name="status"
            label="Status"
            control={control}
            options={statusOptions}
            display={{
              all: 'Todos',
              open: 'Em andamento',
              closed: 'Finalizados',
            }}
          />
          <FilterSelect
            name="duration"
            label="Duração"
            control={control}
            options={durationOptions}
            display={{
              all: 'Todas',
              '>1h': 'maior que 1h',
              '<1h': 'menor que 1h',
              '>5h': 'maior que 5h',
              '<5h': 'menor que 5h',
            }}
          />
          <FilterSelect
            name="startPeriod"
            label="Horários de entrada"
            control={control}
            options={periodOptions}
            display={{
              all: 'Todos',
              morning: 'Antes do meio-dia',
              afternoon: 'Depois do meio-dia',
            }}
          />
          <FilterSelect
            name="endPeriod"
            label="Horários de saída"
            control={control}
            options={periodOptions}
            display={{
              all: 'Todos',
              morning: 'Antes do meio-dia',
              afternoon: 'Depois do meio-dia',
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button
            onClick={handleClearFilters}
            type="button"
            variant="destructive"
            size="sm"
            className="gap-1 text-xs">
            <X className="w-3 h-3" />
            Limpar
          </Button>
          <Button type="submit" size="sm" className="text-xs">
            Aplicar filtros
          </Button>
        </div>
      </form>
    </DialogBase>
  )
}
