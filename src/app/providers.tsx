'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from './session-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
  <ChakraProvider>
    <SessionProvider>{children}</SessionProvider>
  </ChakraProvider>
  )
}