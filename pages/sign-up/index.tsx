import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import { LoginForm } from '~/types/User'
import { UserForm } from '~/components/organisms/UserForm'
import { Box, Text } from '@chakra-ui/react'
import { useUser } from '~/hooks/use-user'
import styles from 'styles/Home.module.css'
import { UserService } from '~/services/UserService'
import { AxiosError } from 'axios'
import { NextPage } from 'next'
import { SessionService } from '~/services/SessionService'
import Link from 'next/link'

const SignUpPage: NextPage = () => {
  const router = useRouter()
  const [_, setUser] = useUser()
  const onSubmit = async (form: LoginForm) => {
    try {
      const { token } = await UserService.create({ data: form })
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
      <Text textAlign='center'>Sign up</Text>
      <Box className={styles.container}>
        <UserForm onSubmit={onSubmit}/>
        <Link href='/sign-in'>sign in</Link>
      </Box>
    </Box>
  )
}

export default SignUpPage