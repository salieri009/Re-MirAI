'use client'

import ToastContainer from '@/components/organisms/ToastContainer'

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  )
}
