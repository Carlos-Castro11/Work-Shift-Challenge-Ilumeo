import FadeIn from '@/components/common/Animations/FadeIn'
import { AlertTriangle } from 'lucide-react'
import CardBase from '../../common/Card'

export default function WorkShiftWarning() {
  return (
    <FadeIn direction="right" className="h-full">
      <CardBase title="Aviso!" icon={<AlertTriangle />}>
        <div className="text-muted-foreground font-primary space-y-1">
          <p className="text-xs xl:text-sm leading-relaxed">
            Conhecer seus direitos como trabalhador é essencial para garantir
            uma jornada justa e saudável. Fique atento(a) aos seus horários,
            pausas e carga horária diária. Em caso de dúvidas, consulte as
            normas da Consolidação das Leis do Trabalho (CLT).
          </p>
          <a
            href="https://www.gov.br/trabalho-e-emprego/pt-br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-xs hover:text-blue-800 transition-colors">
            Informações trabalhistas no portal do Governo
          </a>
        </div>
      </CardBase>
    </FadeIn>
  )
}
