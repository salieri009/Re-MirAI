import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
import '../styles/tokens.css'
import '../global.css'
import { QueryProvider } from '@/lib/providers/QueryProvider'
import ClientProviders from '@/lib/providers/ClientProviders'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Re:MirAI - Discover How Your Friends See You',
  description: 'Create AI personas based on how your friends perceive you',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${manrope.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />

      </head>
      <body suppressHydrationWarning className="bg-background-dark text-text-primary font-sans antialiased selection:bg-fuchsia-300/60 selection:text-slate-900">
        <QueryProvider>
          <ClientProviders>
            {children}
          </ClientProviders>
        </QueryProvider>
      </body>
    </html>
  )
}
