import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

interface FilterSelectProps<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
  TValue extends string,
> {
  name: TFieldName
  label: string
  control: Control<TFieldValues>
  options: readonly TValue[]
  display: Record<TValue, string>
  width?: string
  onChangeExtra?: (value: TValue) => void
}

export function FilterSelect<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
  TValue extends string,
>({
  name,
  control,
  options,
  display,
  width = 'w-[fit]',
  onChangeExtra,
  label,
}: FilterSelectProps<TFieldValues, TFieldName, TValue>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <Label
            htmlFor=""
            className="text-muted-foreground font-primary text-xs">
            {label}
          </Label>
          <Select
            value={field.value}
            onValueChange={(val: TValue) => {
              field.onChange(val)
              onChangeExtra?.(val)
            }}>
            <SelectTrigger
              className={`h-8 ${width} font-primary border-primary-foreground bg-background-secondary transition-colors duration-300 hover:bg-background`}>
              <SelectValue>
                {field.value
                  ? display[field.value as TValue]
                  : display['all' as TValue]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options.map((value) => (
                <SelectItem key={value} value={value}>
                  {display[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  )
}
