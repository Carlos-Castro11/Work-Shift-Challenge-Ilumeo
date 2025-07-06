import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-cente text-foreground">
      <h1 className="text-4xl font-bold">404 - Página não encontrada</h1>
      <p className="text-muted-foreground">
        A página que você tentou acessar não existe.
      </p>
      <Button onClick={() => navigate('/')}>Voltar para o início</Button>
    </div>
  )
}
