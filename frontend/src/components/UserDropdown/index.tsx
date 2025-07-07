import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { useLogout } from '@/hooks/user/useLogout'
import { useAuthStore } from '@/store/useAuthStore'
import { ChevronDown, LogOut, User } from 'lucide-react'

export function UserDropdown() {
  const logout = useLogout()
  const user = useAuthStore((state) => state.user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-fit items-center flex text-foreground border border-primary-foreground bg-background-secondary gap-2 px-3 py-1 rounded-md cursor-pointer text-sm font-medium hover:bg-background transition">
          <User className="w-4 h-4 text-primary" />

          {user ? (
            <span>{user.name}</span>
          ) : (
            <Skeleton className="h-5 w-20 rounded-md" />
          )}

          <ChevronDown className="w-4 h-4 text-primary" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={logout}
          className="flex cursor-pointer items-center gap-2 text-destructive focus:bg-destructive/10">
          <LogOut className="w-4 h-4" />
          <span className="text-foreground">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
