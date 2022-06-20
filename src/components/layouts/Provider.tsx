import React, { PropsWithChildren } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie'
import { UserProvider } from '~/hooks/use-user'

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <CookiesProvider>
      <ChakraProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </ChakraProvider>
    </CookiesProvider>
  )
}