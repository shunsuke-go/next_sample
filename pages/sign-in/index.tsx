import Head from 'next/head'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import { LoginForm } from '~/types/User'
import { UserForm } from '~/components/organisms/UserForm'
import { Box, Text } from '@chakra-ui/react'
import { useUser } from '~/hooks/use-user'
import styles from 'styles/Home.module.css'
import { AxiosError } from 'axios'
import { NextPage } from 'next'
import { SessionService } from '~/services/SessionService'
import Link from 'next/link'

const SignInPage: NextPage = () => {
  const router = useRouter()
  const [_, setUser] = useUser()
  const onSubmit = async (form: LoginForm) => {
    try {
      const response = await SessionService.login(form)
      const user = await SessionService.get()
      if (!response?.token) throw new AxiosError('error')
      setCookie(null, 'token', response?.token)
      setUser(user)
      router.replace('/tasks')
    } catch(e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message)
      }
    }
  }

  return (
    <Box>
      <Text textAlign='center'>ログインページ</Text>
      <Box className={styles.container}>
        <UserForm onSubmit={onSubmit}/>
        <Link href='/sign-up'>Sign up</Link>
      </Box>
    </Box>
  )
}

export default SignInPage