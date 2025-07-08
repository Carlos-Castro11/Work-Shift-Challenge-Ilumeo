import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type MenuExpandedState = {
  isMenuExpanded: boolean
  setIsMenuExpanded: (isMenuExpanded: boolean) => void
}

export const useIsMenuExpandedStore = create<MenuExpandedState>()(
  persist(
    (set) => ({
      isMenuExpanded: false,
      setIsMenuExpanded: (isMenuExpanded) => set(() => ({ isMenuExpanded })),
    }),
    {
      name: 'menu-expanded-storage',
      partialize: (state) => ({ isMenuExpanded: state.isMenuExpanded }),
    },
  ),
)
