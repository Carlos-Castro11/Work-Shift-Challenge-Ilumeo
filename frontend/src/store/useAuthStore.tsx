import type { IUser } from '@/types/User'
import { create } from 'zustand'

interface IAuthStore {
  user: IUser | null
  setUser: (user: IUser | null) => void
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
