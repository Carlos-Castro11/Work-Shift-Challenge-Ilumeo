import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface ICardBaseProps {
  title: string
  icon?: ReactNode
  children: ReactNode
}

export default function CardBase({ title, icon, children }: ICardBaseProps) {
  return (
    <Card className="h-full font-primary text-sm text-muted-foreground bg-background border-border-foreground">
      <CardHeader>
        <CardTitle className="text-sm xl:text-base text-foreground font-primary">
          <div className="flex gap-2 items-center">
            {icon && <i>{icon}</i>}
            <span>{title}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <div className="h-[1px] w-full bg-border-foreground" />
      <CardContent className="space-y-2 mt-4 text-xs">{children}</CardContent>
    </Card>
  )
}
