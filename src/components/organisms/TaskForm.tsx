import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Task } from '~/types/Task'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import { TaskFormType } from '~/services/TaskService'

type Props = {
  onSubmit: (form: TaskFormType, id?: number) => void;
  task?: Task;
  isUpdate?: boolean;
};
export const TaskForm: React.FC<Props> = ({ onSubmit, task, isUpdate }) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required()
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<TaskFormType>({
    resolver: yupResolver(schema)
  })

  return (
    <Flex flexDirection="column" alignItems="center" mt={5}>
      <form
        onSubmit={handleSubmit((form) => {
          onSubmit(form, task?.id)
        })}
      >
        <Flex flexDirection="column" alignItems="center" mt={5}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor="title" fontSize={'12px'}>
              title
            </FormLabel>
            <Input {...register('title')} defaultValue={task?.title} />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description} mt={5}>
            <FormLabel htmlFor="description" fontSize={'12px'}>
              description
            </FormLabel>
            <Input
              {...register('description')}
              defaultValue={task?.description}
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          {isUpdate && (
            <FormControl isInvalid={!!errors.description} mt={5}>
              <FormLabel htmlFor="isDone" fontSize={'12px'}>
                isDone?
              </FormLabel>
              <Controller
                name="isDone"
                control={control}
                defaultValue={task?.isDone ? '1' : '2'}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <Box>
                      <Radio value="1">done</Radio>
                    </Box>
                    <Box>
                      <Radio value="2">not yet</Radio>
                    </Box>
                  </RadioGroup>
                )}
              />
            </FormControl>
          )}
          <Button type="submit" colorScheme="blue" my={10} alignSelf="stretch">
            create
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}
