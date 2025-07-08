import { LoginForm } from '@/components/Forms/LoginForm'
import HeadPageTitle from '@/components/common/HeadPageTitle'
import Bg from '../../assets/images/bg-login.avif'
import Logo from '../../assets/images/logo.png'

export default function Login() {
  return (
    <>
      <HeadPageTitle title="Login" />
      <div
        className="h-screen bg-cover bg-center flex items-center justify-center text-foreground"
        style={{
          backgroundImage: `url(${Bg})`,
        }}>
        <div className="border border-primary-foreground p-6 rounded-lg md:min-w-[400px] space-y-7 backdrop-blur-md bg-background/70">
          <div className="flex justify-center">
            <img className="max-w-[200px]" src={Logo} alt="Logo Ilumeo" />
          </div>
          <p className="text-center text-muted-foreground font-primary">
            Bem-vindo ao desafio técnico!
          </p>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}
