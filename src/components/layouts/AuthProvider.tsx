import React, { PropsWithChildren, useEffect } from 'react'
import { useUser } from '~/hooks/use-user'
import { parseCookies } from 'nookies'
import { SessionService } from '~/services/SessionService'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { Spinner, Flex } from '@chakra-ui/react'

type Props = {
  initialized: boolean
}
export const AuthPropider: NextPage<
  PropsWithChildren<Props>
> = ({ children, initialized }) => {
  const [user, setUser] = useUser()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      if (!initialized) return
      if (user) {
        router.push('/tasks')
        return
      }
      const { token } = parseCookies()
      if (!token) {
        router.push('/sign-in')
        return
      }
      try {
        const user = await SessionService.get({})
        setUser(user)
        router.push('/tasks')
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(e.response?.data?.message)
          router.push('sign-in')
        }
      }
    })()
  }, [user, initialized])

  return initialized ? (
    <>{children}</>
  ) : (
    <Flex justifyContent="center" h="100vh" alignItems="center">
      <Spinner color="blue.400" size="lg" />
    </Flex>
  )
}
