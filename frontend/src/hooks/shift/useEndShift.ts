import { endShift } from '@/api/workShift/endShift'
import { errorHelper } from '@/utils/ErrorHelper'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useEndShiftMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: endShift,
    onSuccess: () => {
      toast.success('Turno finalizado com sucesso', { id: 'end-shift-success' })

      queryClient.invalidateQueries({ queryKey: ['today-shifts'] })
      queryClient.invalidateQueries({ queryKey: ['work-shifts-history'] })
    },
    onError: (err: unknown) => {
      const message = errorHelper(err)
      toast.error(message)
    },
  })
}
