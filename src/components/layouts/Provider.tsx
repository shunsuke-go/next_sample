import React, { PropsWithChildren } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthPropider } from './AuthProvider'
import { CookiesProvider } from 'react-cookie'
import { UserProvider } from '~/hooks/use-user'

export const Provider: React.FC<PropsWithChildren<{initialized: boolean}>> = ({ children, initialized }) => {
  return (
    <CookiesProvider>
      <ChakraProvider>
        <UserProvider>
          <AuthPropider initialized={initialized}>
            {children}
          </AuthPropider>
        </UserProvider>
      </ChakraProvider>
    </CookiesProvider>
  )
}