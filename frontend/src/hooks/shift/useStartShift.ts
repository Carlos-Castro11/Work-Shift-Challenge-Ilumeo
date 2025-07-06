import { startShift } from '@/api/workShift/startShift'
import { errorHelper } from '@/utils/ErrorHelper'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useStartShiftMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: startShift,
    onSuccess: () => {
      toast.success('Turno iniciado com sucesso', { id: 'start-shift-success' })

      queryClient.invalidateQueries({ queryKey: ['today-shifts'] })
      queryClient.invalidateQueries({ queryKey: ['work-shifts-history'] })
    },
    onError: (err: unknown) => {
      const message = errorHelper(err)
      toast.error(message)
    },
  })
}
