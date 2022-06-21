import React, { useMemo } from 'react'
import {
  Modal as ModalCompornent,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react'

type ModalProps = {
  modalHeader?: React.ReactNode;
  modalBody?: React.ReactNode;
  modalFooter?: React.ReactNode;
};
export const useModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const Modal: React.FC<ModalProps> = React.memo(
    ({ modalHeader, modalBody, modalFooter }) => {
      return (
        <ModalCompornent isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalHeader}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{modalBody}</ModalBody>
            <ModalFooter>{modalFooter}</ModalFooter>
          </ModalContent>
        </ModalCompornent>
      )
    }
  )

  return useMemo(() => ({ isOpen, onOpen, onClose, Modal }), [isOpen])
}
