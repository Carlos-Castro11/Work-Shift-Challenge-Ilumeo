import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useLogin } from '@/hooks/user/useLogin'
import { type LoginSchema, loginSchema } from '@/schemas/login.schema'
import { errorHelper } from '@/utils/ErrorHelper'
import { zodResolver } from '@hookform/resolvers/zod'
import { Key, Mail } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import FloatingInput from '../common/Inputs/FloatingInput.tsx'

export function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const login = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) navigate('/')
  }, [navigate])

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await login.mutateAsync(data)

      localStorage.setItem('token', res.token)
      toast.success('Login realizado com sucesso!')
      navigate('/')
    } catch (err) {
      const message = errorHelper(err)
      toast.error(message || 'Erro ao fazer login')
      console.error('❌ Erro no login:', err)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-8">
          <FloatingInput
            icon={<Mail size={16} />}
            name="email"
            label="E-mail"
            type="email"
          />
          <FloatingInput
            icon={<Key size={16} />}
            name="password"
            label="Senha"
            type="password"
          />
        </div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </Form>
  )
}
