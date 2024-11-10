import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

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
    <html lang="en">
      <body className={cn(fontSans.className, 'antialiased')}>{children}</body>
    </html>
  )
}
