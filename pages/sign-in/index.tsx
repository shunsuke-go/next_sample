import Head from 'next/head'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import { LoginForm } from '~/types/User'
import { UserForm } from '~/components/organisms/UserForm'
import { Box, Text } from '@chakra-ui/react'
import { useUser } from '~/hooks/use-user'
import styles from '~/styles/Home.module.css'
import { UserService } from '~/services/UserService'
import { AxiosError } from 'axios'
import { NextPage } from 'next'
import { SessionService } from '~/services/SessionService'

const SignInPage: NextPage = () => {
  const router = useRouter()
  const [_, setUser] = useUser()
  const onSubmit = async (form: LoginForm) => {
    try {
      const { token } = await UserService.login({ data: form })
      const user = await SessionService.get({})
      setCookie(null, 'token', token)
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
      <Head>
        <title>Awosome To Do</title>
        <meta name="description" content="awesome to do app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.container}>
        <UserForm onSubmit={onSubmit}/>
      </Box>
    </Box>
  )
}

export default SignInPage