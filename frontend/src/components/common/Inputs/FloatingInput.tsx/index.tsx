import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

type FloatingInputProps = {
  name: string
  label: string
  type?: string
  className?: string
  icon?: ReactNode
}

export default function FloatingInput({
  name,
  label,
  type = 'text',
  className,
  icon,
}: FloatingInputProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder=" "
              className={cn('peer h-10 placeholder-transparent', className)}
            />
          </FormControl>
          <div className="pointer-events-none absolute right-3 top-[4px] text-xs text-muted-foreground peer-focus:text-primary transition-all">
            {icon}
          </div>
          <FormLabel
            className={cn(
              'pointer-events-none absolute left-3 top-[2px] text-xs text-muted-foreground transition-all',
              'peer-placeholder-shown:top-[2px] peer-placeholder-shown:text-sm peer-placeholder-shown:text-foreground/50',
              'peer-focus:-top-[30px] peer-focus:left-[0px] peer-focus:text-xs peer-focus:text-muted-foreground',
              field.value && '-top-[30px] left-0 text-xs text-muted-foreground',
            )}>
            {label}
          </FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
