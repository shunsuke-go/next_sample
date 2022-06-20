import React from 'react'
import { useForm } from 'react-hook-form'
import { Task } from '~/types/Task'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Flex, Text, FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react'
import { TaskService } from '~/services/TaskService'

type Props = {
  onClick: () => void
}
export const TaskForm: React.FC<Props> = ({ onClick }) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
  })

  const { register, handleSubmit, formState: { errors } } = useForm<Task>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (form: Task) => {
    await TaskService.create({ data: form })
    onClick()
  }


  return (
    <Flex flexDirection='column' alignItems='center' mt={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection='column' alignItems='center' mt={5}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor='title' fontSize={'12px'}>title</FormLabel>
            <Input {...register('title')}/>
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description} mt={5}>
            <FormLabel htmlFor='description' fontSize={'12px'}>description</FormLabel>
            <Input {...register('description')}/>
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          <Button type='submit' colorScheme='blue' my={10} alignSelf='stretch'>create</Button>
        </Flex>
      </form>
    </Flex>
  )
}