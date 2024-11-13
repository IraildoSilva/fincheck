import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import QueryProvider from '@/components/query-provider'
import { Toaster } from '@/components/ui/sonner'

const fontSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Fincheck',
  description: 'O seu app de finanças',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.className, 'antialiased')}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
