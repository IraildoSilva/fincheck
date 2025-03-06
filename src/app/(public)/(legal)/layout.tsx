import { LegalLayoutHeader } from '@/components/legal-layout-header'
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
        <LegalLayoutHeader/>

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
