type DividerProps = {
  styles?: string
}

export default function Divider({ styles }: DividerProps) {
  return (
    <div
      className={`h-[1px] w-full bg-gradient-to-r from-transparent via-muted-foreground to-transparent ${styles}`}
    />
  )
}
