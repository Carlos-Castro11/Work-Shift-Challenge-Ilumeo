import FadeIn from '@/components/common/Animations/FadeIn'
import HeadPageTitle from '@/components/common/HeadPageTitle'
import { useAuthStore } from '@/store/useAuthStore'

export default function Profile() {
  const user = useAuthStore((state) => state.user)

  return (
    <>
      <HeadPageTitle title={'Perfil'} />
      <div className="flex gap-4 mt-4 text-foreground">
        <h1>Bem-vindo, {user?.name}</h1>
        <FadeIn direction="left" className="flex w-full">
          <p>Email: {user?.email}</p>
        </FadeIn>
      </div>
    </>
  )
}
