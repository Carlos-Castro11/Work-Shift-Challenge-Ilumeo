import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface ICardBaseProps {
  title: string
  icon?: ReactNode
  children: ReactNode
}

export default function CardBase({ title, icon, children }: ICardBaseProps) {
  return (
    <Card className="h-full font-secondary text-sm text-muted-foreground bg-background border-background-secondary">
      <CardHeader>
        <CardTitle className="text-sm xl:text-base text-foreground font-secondary">
          <div className="flex gap-2 items-center">
            {icon && <i>{icon}</i>}
            <span>{title}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <div className="h-[1px] w-full bg-background-secondary" />
      <CardContent className="space-y-2 mt-4 text-xs">{children}</CardContent>
    </Card>
  )
}
