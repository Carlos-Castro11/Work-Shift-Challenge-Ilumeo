import { FilterSelect } from '@/components/common/Filters/FilterSelect'
import { Button } from '@/components/ui/button'
import {
  dateOptions,
  durationOptions,
  periodOptions,
  statusOptions,
} from '@/constants/workShiftFilters'
import { useWorkShiftFilters } from '@/hooks/shift/useWorkShiftFilters'
import { X } from 'lucide-react'

export function WorkShiftTableFilter() {
  const { control, handleSubmit, updateParams, clearFilters } =
    useWorkShiftFilters()

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
        width="w-[180px]"
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
        width="w-[180px]"
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
        width="w-[180px]"
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
        width="w-[180px]"
      />

      <Button
        onClick={clearFilters}
        type="button"
        variant="destructive"
        size="sm"
        className="text-xs flex items-center gap-1 place-self-end">
        <X className="w-3 h-3" />
        <span>Limpar</span>
      </Button>
    </form>
  )
}
