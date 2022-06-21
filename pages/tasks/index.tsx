import React, { useCallback, useMemo } from 'react'
import { NextPage } from 'next'
import { Task } from '~/types/Task'
import { TaskForm } from '~/components/organisms/TaskForm'
import TaskList from '~/components/organisms/TaskList'
import { useModal } from '~/hooks/use-modal'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { TaskService } from '~/services/TaskService'
import { TaskFormType, useTasks } from '~/services/TaskService'

const TaskPage: NextPage = () => {
  const { data: tasks, error, mutate } = useTasks<Task[]>({})
  const { onOpen, onClose, Modal } = useModal()
  const onClickCreate =  useCallback( async(form: TaskFormType) => {
    await TaskService.create(form)
    onClose()
    mutate()
  }, [])

  return (
    <>
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <Flex justifyContent='center' flexWrap='wrap'>
          <TaskList tasks={tasks} mutate={mutate}/>
        </Flex>
        <Box mt={5}>
          <Button onClick={onOpen}>create</Button>
        </Box>
      </Flex>
      <Modal
        modalHeader={useMemo(() => <Text>create a new tasks</Text>, [])}
        modalBody={useMemo(() => <TaskForm onSubmit={onClickCreate} />, [])}
      />
    </>
  )
}

export default TaskPage