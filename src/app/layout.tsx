import type { Metadata } from 'next'
import './globals.css'
import { fonts } from './fonts'
import { Providers } from './providers'


export const metadata: Metadata = {
  title: 'Meu Mercado',
  description: 'Acompanhe seus gastos no mercantil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body><Providers>{children}</Providers></body>
    </html>
  )
}
