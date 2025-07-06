import { AlertTriangle } from 'lucide-react'
import CardBase from '../../common/Card'

export default function WorkShiftWarning() {
  return (
    <CardBase title="Aviso!" icon={<AlertTriangle />}>
      <div className="text-muted-foreground font-secondary space-y-1 h-full">
        <p className="text-xs xl:text-sm leading-relaxed">
          Conhecer seus direitos como trabalhador é essencial para garantir uma
          jornada justa e saudável. Fique atento(a) aos seus horários, pausas e
          carga horária diária. Em caso de dúvidas, consulte as normas da
          Consolidação das Leis do Trabalho (CLT).
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
  )
}
