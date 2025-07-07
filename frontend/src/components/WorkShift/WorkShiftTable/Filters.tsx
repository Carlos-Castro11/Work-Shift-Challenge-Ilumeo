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
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

export function WorkShiftTableFilter() {
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
    <form
      onSubmit={handleSubmit(updateParams)}
      className="flex flex-wrap gap-4 items-center text-foreground">
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
        onChangeExtra={() => handleSubmit(updateParams)()}
        width="w-[180px]"
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
        onChangeExtra={() => handleSubmit(updateParams)()}
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
        onChangeExtra={() => handleSubmit(updateParams)()}
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
        onChangeExtra={() => handleSubmit(updateParams)()}
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
        onChangeExtra={() => handleSubmit(updateParams)()}
      />

      <Button
        onClick={handleClearFilters}
        type="button"
        variant="default"
        size="sm"
        className="text-xs flex items-center gap-1 place-self-end">
        <X className="w-3 h-3" />
        <span>Limpar</span>
      </Button>
    </form>
  )
}
