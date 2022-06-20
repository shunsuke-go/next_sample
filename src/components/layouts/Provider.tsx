import React, { PropsWithChildren } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthPropider } from './AuthProvider'
import { CookiesProvider } from 'react-cookie'
import { UserProvider } from '~/hooks/use-user'

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <CookiesProvider>
      <ChakraProvider>
        <UserProvider>
          <AuthPropider>
            {children}
          </AuthPropider>
        </UserProvider>
      </ChakraProvider>
    </CookiesProvider>
  )
}