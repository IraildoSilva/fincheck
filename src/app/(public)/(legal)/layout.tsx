import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'

interface LegalLayoutProps {
  children: React.ReactNode
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <>
      <div className="max-h-screen md:px-20 px-8 flex flex-col gap-y-6 xl:max-w-7xl mx-auto">
        <header className="pt-10 flex justify-between">
          <div className="space-y-5">
            <h1 className="text-primary text-3xl font-bold">Termos de Serviço</h1>

            <p className="text-muted-foreground">
              Última atualização: 04/03/2025
            </p>
          </div>

          <div>
            <Link href={'/register'}>
              <Button variant={'secondary'}>{'Criar conta'}</Button>
            </Link>
          </div>
        </header>

        <div className="flex-1 h-full flex max-h-fit">
          <ScrollArea className="h-[600px] flex-1 pr-5">{children}</ScrollArea>
        </div>

        <footer className="pb-10 flex items-center justify-center">
          <Button variant={'link'} className="text-base font-semibold" asChild>
            <Link href={'/register'}>Voltar para a página inicial</Link>
          </Button>
        </footer>
      </div>
    </>
  )
}
