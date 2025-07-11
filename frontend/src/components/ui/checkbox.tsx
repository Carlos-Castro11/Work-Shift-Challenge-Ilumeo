import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-text-color ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors duration-200 ease-in-out',
      'data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:border-primary-foreground',
      className,
    )}
    {...props}>
    <CheckboxPrimitive.Indicator
      className={cn(
        'flex items-center justify-center text-current',
        'transition-all duration-200 ease-in-out',
        'scale-0 data-[state=checked]:scale-100 opacity-0 data-[state=checked]:opacity-100',
      )}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
