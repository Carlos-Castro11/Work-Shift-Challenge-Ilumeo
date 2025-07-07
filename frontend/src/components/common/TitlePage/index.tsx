interface ITitlePage {
  title: string
}

export default function TitlePage({ title }: ITitlePage) {
  return (
    <h1
      className={`text-foreground font-secondary text-3xl font-bold tracking-wide relative
        after:absolute after:content-[''] after:bg-gradient-to-r after:from-primary after:to-transparent after:h-[2px] after:w-[50%] after:left-0 after:bottom-0 after:rounded-lg`}>
      {title}
    </h1>
  )
}
