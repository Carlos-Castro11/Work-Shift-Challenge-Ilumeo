import { Helmet } from 'react-helmet-async'

interface HeadPageTitleProps {
  title: string
}

export default function HeadPageTitle({ title }: HeadPageTitleProps) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}
