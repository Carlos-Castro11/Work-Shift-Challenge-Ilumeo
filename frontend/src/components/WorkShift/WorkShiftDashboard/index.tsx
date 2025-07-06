import WorkShiftInfo from '@/components/WorkShift/WorkShiftCard/WorkShiftInfo'
import FadeIn from '@/components/common/Animations/FadeIn'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useEndShiftMutation } from '@/hooks/shift/useEndShift'
import { useStartShiftMutation } from '@/hooks/shift/useStartShift'
import { useTodayShifts } from '@/hooks/shift/useTodayShift'
import useMedia from '@/hooks/useMedia'
import { msToTimeParts, pad } from '@/utils/time'
import { useEffect, useState } from 'react'
import WorkShiftWarning from '../WorkShiftCard/WorkShiftWarning'

function getCurrentTime() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  return { hours, minutes }
}

export default function ShiftDashboard() {
  const { data: shifts = [], isLoading } = useTodayShifts()
  const activeShift = shifts.find((s) => !s.end)

  const startMutation = useStartShiftMutation()
  const endMutation = useEndShiftMutation()

  const [ms, setMs] = useState(0)
  const [running, setRunning] = useState(false)
  const [time, setTime] = useState(getCurrentTime())
  const [loadingClock, setLoadingClock] = useState(true)
  const isDesktop = useMedia('(min-width: 1024px)')

  // Atualiza relógio a cada minuto
  useEffect(() => {
    setLoadingClock(false)
    setTime(getCurrentTime())
    const interval = setInterval(() => setTime(getCurrentTime()), 60000)
    return () => clearInterval(interval)
  }, [])

  // Inicia cronômetro se houver turno ativo
  useEffect(() => {
    if (activeShift) {
      const start = new Date(activeShift.start).getTime()
      setMs(Date.now() - start)
      setRunning(true)
    } else {
      setMs(0)
      setRunning(false)
    }
  }, [activeShift])

  // Atualiza ms a cada segundo quando o turno está rodando
  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => setMs((prev) => prev + 1000), 1000)
    return () => clearInterval(interval)
  }, [running])

  const handleStart = () => {
    startMutation.mutate(undefined, {
      onSuccess: (newShift) => {
        const start = new Date(newShift.start).getTime()
        setMs(Date.now() - start)
        setRunning(true)
      },
    })
  }

  const handleEnd = () => {
    endMutation.mutate(undefined, {
      onSuccess: () => setRunning(false),
    })
  }

  const { hours, minutes, seconds } = msToTimeParts(ms)

  if (isLoading || loadingClock)
    return <Skeleton className="h-full w-full rounded-md" />

  return (
    <FadeIn
      direction="bottom"
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-foreground">
      {isDesktop && <WorkShiftInfo />}

      <div className="space-y-4 p-5 border rounded-lg border-background-secondary h-full place-content-center">
        <div className="grid gap-6 grid-cols-2 border border-background-secondary rounded-lg px-2 py-2">
          <div className="text-center">
            <span className="text-muted-foreground font-secondary text-xs lg:text-sm">
              Horário atual
            </span>
            <div className="text-xl md:text-2xl lg:text-xl xl:text-3xl font-sans">
              {`${time.hours}:${time.minutes}`}
            </div>
          </div>

          <div className="text-center">
            <span className="text-muted-foreground font-secondary text-xs lg:text-sm">
              Cronômetro
            </span>
            <div className="text-xl md:text-2xl lg:text-xl xl:text-3xl font-mono">
              {`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Button
            onClick={handleStart}
            disabled={running || startMutation.isPending}>
            {startMutation.isPending ? 'Entrando...' : 'Entrar'}
          </Button>
          <Button
            variant="destructive"
            onClick={handleEnd}
            disabled={!running || endMutation.isPending}>
            {endMutation.isPending ? 'Saindo...' : 'Sair'}
          </Button>
        </div>
      </div>

      {isDesktop && <WorkShiftWarning />}
    </FadeIn>
  )
}
