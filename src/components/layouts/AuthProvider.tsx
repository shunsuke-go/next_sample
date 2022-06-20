import React, {PropsWithChildren, useEffect } from 'react'
import { useUser } from '~/hooks/use-user'
import { parseCookies } from 'nookies'
import { SessionService } from '~/services/SessionService'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import SignInPage from 'pages/sign-in'

export const AuthPropider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useUser()
  const router = useRouter()

  useEffect(() => {
    (async() => {
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
      } catch(e) {
        if (e instanceof AxiosError) {
          console.log(e.response?.data?.message)
          router.push('sign-in')
        }
      }
    })()
  }, [user])


  return (
    <>
      {user ? children : <SignInPage/>}
    </>
  )
}