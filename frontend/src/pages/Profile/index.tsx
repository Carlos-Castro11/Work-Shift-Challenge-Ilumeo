import FadeIn from '@/components/common/Animations/FadeIn'
import HeadPageTitle from '@/components/common/HeadPageTitle'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useMedia from '@/hooks/useMedia'
import { useAuthStore } from '@/store/useAuthStore'
import profileImg from '../../assets/images/profile.avif'

export default function Profile() {
  const user = useAuthStore((state) => state.user)
  const isDesktop = useMedia('(min-width: 1024px)')
  return (
    <>
      <HeadPageTitle title={'Perfil'} />
      <div className="flex mt-4 text-foreground justify-center">
        <div className="grid md:grid-cols-2 gap-10 justify-center">
          {isDesktop && (
            <FadeIn className="md:max-w-[300px] max-w-[250px]" direction="left">
              <img
                className="rounded-lg shadow-md"
                src={profileImg}
                alt="profile"
              />
            </FadeIn>
          )}
          <FadeIn
            direction="right"
            className="border border-primary-foreground p-5 rounded-lg">
            <h1 className="text-4xl font-secondary">
              Olá, {user?.name.split(' ')[0]}!
            </h1>
            <div className="mt-5 space-y-5">
              <div>
                <Label>Nome completo</Label>
                <Input
                  disabled
                  value={user?.name}
                  className="bg-background-secondary"
                />
              </div>
              <div>
                <Label>E-mail</Label>
                <Input
                  disabled
                  value={user?.email}
                  className="bg-background-secondary"
                />
              </div>
              <div>
                <Label>Meta semanal de horas trabalhadas</Label>
                <Input value={20} className="bg-background-secondary" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  )
}
