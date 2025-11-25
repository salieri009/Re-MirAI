import type { Metadata } from 'next'
import '../styles/globals.css'
import { QueryProvider } from '@/lib/providers/QueryProvider'

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
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
