import { create } from 'zustand'

interface IIsDesktopStore {
  isDesktop: boolean | null
  setIsDesktop: (isDesktop: boolean) => void
}

export const useIsDesktopStore = create<IIsDesktopStore>((set) => ({
  isDesktop: null,
  setIsDesktop: (isDesktop) => set({ isDesktop }),
}))
