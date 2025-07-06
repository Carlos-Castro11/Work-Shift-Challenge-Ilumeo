import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface IDialogBaseProps {
  icon?: ReactNode
  title: string
  description?: string
  triggerText?: string
  children?: ReactNode
  contentClassName?: string
  variant?: 'default' | 'secondary'
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DialogBase({
  icon,
  title,
  description,
  triggerText = 'Abrir',
  children,
  contentClassName,
  variant = 'default',
  open,
  onOpenChange,
}: IDialogBaseProps) {
  const background =
    variant === 'default' ? 'bg-background-secondary' : 'bg-background'
  const hoverBackground =
    variant === 'default' ? 'bg-background' : 'bg-background-secondary'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div
          className={`${background} text-xs text-text-color box-border items-center border border-primary-foreground rounded py-2 px-3 flex gap-2 cursor-pointer
          transition-all w-fit duration-300 hover:${hoverBackground}
          `}>
          <i className="text-primary">{icon}</i>
          <h4 className="font-secondary">{triggerText}</h4>
        </div>
      </DialogTrigger>

      <DialogContent
        className={cn(
          'rounded-lg sm:max-w-[625px] text-secondary-foreground',
          contentClassName,
        )}>
        <DialogHeader className="mb-5">
          <DialogTitle>
            <h3 className="text-secondary-foreground text-xl">{title}</h3>
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  )
}
