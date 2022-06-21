import {
  Flex,
  Box,
  Text,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { KeyedMutator, mutate } from 'swr'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useModal } from '~/hooks/use-modal'
import { TaskFormType, TaskService } from '~/services/TaskService'
import styles from 'styles/Task.module.css'
import { Task } from '~/types/Task'
import { TaskForm } from './TaskForm'

type Props = {
  tasks?: Task[];
  mutate: KeyedMutator<Task[]>;
};
const TaskList: React.FC<Props> = ({ tasks }) => {
  const { onClose, onOpen, Modal } = useModal()
  const [resolver, setResolver] = useState<{
    exec:(val: boolean | PromiseLike<boolean>) => void;
  }>()
  const [modalKind, setModalKind] = useState<'delete' | 'edit'>()
  const [selectedTask, setSelectedTask] = useState<Task>()

  const onOpenDeleteAlert = async (taskId: number) => {
    setModalKind('delete')
    onOpen()
    const shouldDelete = await new Promise<boolean>((resolve) => {
      setResolver({ exec: resolve })
    })
    if (shouldDelete) {
      await TaskService.delete(taskId)
      mutate('/tasks')
    }
    onClose()
  }

  const onOpenUpdateModal = (task: Task) => {
    setModalKind('edit')
    setSelectedTask(task)
    onOpen()
  }

  const onSubmitTask = useCallback(async (task: TaskFormType, id?: number) => {
    if (!id) return
    await TaskService.update(id, task)
    onClose()
    mutate('/tasks')
  }, [])

  const ModalHeader = (
    <Text>{modalKind === 'delete' ? 'delete' : 'edit'} a task</Text>
  )

  const ModalBody =
    modalKind === 'delete' ? (
      <Text>can I delete this task?</Text>
    ) : (
      <TaskForm task={selectedTask} onSubmit={onSubmitTask} isUpdate={true} />
    )

  const ModalFooter =
    modalKind === 'delete' ? (
      <Flex>
        <Button mx={2} colorScheme="red" onClick={() => resolver?.exec(true)}>
          yes
        </Button>
        <Button mx={2} colorScheme="blue" onClick={() => resolver?.exec(false)}>
          no
        </Button>
      </Flex>
    ) : <></>

  return (
    <>
      {tasks?.map((task) => (
        <Flex className={styles.cardContainer} key={task.id}>
          <Flex flexDirection="column">
            <Flex justifyContent="space-between" overflowWrap={'break-word'}>
              <Text fontSize="16px" minW={0}>
                {task.title}
              </Text>
              <Menu>
                <MenuButton
                  bg="blue.50"
                  borderRadius={100}
                  p={1}
                  cursor="pointer"
                  alignSelf={'flex-start'}
                >
                  <BsThreeDotsVertical className={styles.threeDots} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => onOpenUpdateModal(task)}>
                    edit
                  </MenuItem>
                  <MenuItem onClick={() => onOpenDeleteAlert(task.id)}>
                    delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Text fontSize="12px" mt={2}>
              {task.description}
            </Text>
            <Text fontSize="12px" mt={2}>
              {task.isDone ? '完了' : '未達'}
            </Text>
          </Flex>
          <Flex justifyContent="flex-end">
            <Box className={styles.imageCircle} />
          </Flex>
        </Flex>
      ))}
      <Modal
        modalHeader={ModalHeader}
        modalBody={ModalBody}
        modalFooter={ModalFooter}
      />
      {Array(tasks?.length)
        .fill(0)
        .map((_, index) => (
          <Box className={styles.emptyCardContainer} key={index}></Box>
        ))}
    </>
  )
}

export default TaskList
