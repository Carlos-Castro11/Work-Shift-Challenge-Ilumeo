import FadeIn from '@/components/common/Animations/FadeIn'
import LoadingButton from '@/components/common/LoadingButton'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useEndShiftMutation } from '@/hooks/shift/useEndShift'
import { useStartShiftMutation } from '@/hooks/shift/useStartShift'
import { useTodayShifts } from '@/hooks/shift/useTodayShift'
import { msToTimeParts, pad } from '@/utils/time'
import { useEffect, useState } from 'react'

function getCurrentTime() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  return { hours, minutes }
}

export default function WorkShiftClockAndControls() {
  const { data: shifts = [], isLoading } = useTodayShifts()
  const activeShift = shifts.find((s) => !s.end)

  const startMutation = useStartShiftMutation()
  const endMutation = useEndShiftMutation()

  const [ms, setMs] = useState(0)
  const [running, setRunning] = useState(false)
  const [time, setTime] = useState(getCurrentTime())
  const [loadingClock, setLoadingClock] = useState(true)

  useEffect(() => {
    setLoadingClock(false)
    setTime(getCurrentTime())
    const interval = setInterval(() => setTime(getCurrentTime()), 60000)
    return () => clearInterval(interval)
  }, [])

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

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => setMs((prev) => prev + 1000), 1000)
    return () => clearInterval(interval)
  }, [running])

  const handleStart = () => {
    setRunning(true)
    startMutation.mutate(undefined, {
      onSuccess: (newShift) => {
        const start = new Date(newShift.start).getTime()
        setMs(Date.now() - start)
      },
      onError: () => setRunning(false),
    })
  }

  const handleEnd = () => {
    setRunning(false)
    endMutation.mutate(undefined, {
      onError: () => setRunning(true),
    })
  }

  const { hours, minutes, seconds } = msToTimeParts(ms < 0 ? 0 : ms)

  if (isLoading || loadingClock)
    return <Skeleton className="h-full w-full rounded-md" />

  return (
    <FadeIn
      direction="top"
      className="space-y-4 p-5 border rounded-lg border-border-foreground h-full place-content-center">
      <div className="grid gap-6 grid-cols-2 border border-border-foreground rounded-lg px-2 py-2">
        <div className="text-center">
          <span className="text-muted-foreground font-primary text-xs lg:text-sm">
            Horário atual
          </span>
          <div className="text-xl md:text-2xl lg:text-xl xl:text-3xl font-sans">
            {`${time.hours}:${time.minutes}`}
          </div>
        </div>

        <div className="text-center">
          <span className="text-muted-foreground font-primary text-xs lg:text-sm">
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
          {startMutation.isPending ? <LoadingButton /> : 'Entrar'}
        </Button>
        <Button
          variant="destructive"
          onClick={handleEnd}
          disabled={!running || endMutation.isPending}>
          {endMutation.isPending ? <LoadingButton /> : 'Sair'}
        </Button>
      </div>
    </FadeIn>
  )
}
