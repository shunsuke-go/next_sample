import React from 'react'
import * as yup from 'yup'
import { LoginForm } from '~/types/User'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Flex, FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react'

type Props = {
  onSubmit: (form: LoginForm) => void
}
export const UserForm: React.FC<Props> = ({ onSubmit }) => {
  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection='column' alignItems='center' mt={5}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor='email' fontSize={'12px'}>メールアドレス</FormLabel>
          <Input {...register('email')}/>
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} mt={5}>
          <FormLabel htmlFor='password' fontSize={'12px'}>パスワード</FormLabel>
          <Input {...register('password')} type='password'/>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit' w={'50%'} mt={5}>ログイン</Button>
      </Flex>
    </form>
  )
}