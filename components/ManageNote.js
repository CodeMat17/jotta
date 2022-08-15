import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function ManageNote({ isOpen, onClose, initialRef, getNotes }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  //   const toast = useToast();
  //   const toastIdRef = React.useRef();

  //   const updatedToast = () => {
  //     if (toastIdRef.current) {
  //       toast.update(toastIdRef.current, {
  //         status: 'success',
  //         duration: '9000',
  //         isClosable: 'true',
  //         position: 'top',
  //         description: 'Note is successfully added.',
  //       });
  //     }
  //   };

  //   const showToast = () => {
  //     toastIdRef.current = toast({
  //       status: 'info',
  //       duration: '9000',
  //       isClosable: 'true',
  //       position: 'top',
  //       description: 'Adding note',
  //     });
  //   };

  const addHandler = async (e) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage('');

    if (desc <= 9) {
      setIsError(true);
      return;
    }
    // showToast();
    setLoading(true);

    const user = supabase.auth.user();
    const { error } = await supabase
      .from('notes')
      .insert([{ title, desc, user_id: user.id }]);
    getNotes();
    setLoading(false);
    // updatedToast();
    if (error) {
      setErrorMessage(error.message);
    } else {
      closeHandler();
    }
  };

  const closeHandler = () => {
    setTitle('');
    setDesc('');
    onClose();
  };

  return (
    <Modal
      size={['xs', 'sm', 'sm']}
      isOpen={isOpen}
      onClose={onClose}
      initialRef={initialRef}
      isCentered>
      <ModalOverlay />
      <ModalContent>
        <form>
          <ModalHeader color='green'>Add A Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {errorMessage && (
              <Alert
                status='error'
                variant='subtle'
                py='4'
                mb='6'
                textAlign='center'
                flexDir='column'
                rounded='md'>
                <AlertIcon mr={0} />
                <AlertDescription mt='3' fontSize='sm' color='red'>
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}

            <FormControl isRequired>
              <FormLabel fontSize='xs' mb='1'>
                Title
              </FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Add your note title here'
              />
            </FormControl>

            <FormControl isRequired mt='4'>
              <FormLabel fontSize='xs' mb='1'>
                Description
              </FormLabel>
              <Textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder='Add your description here'
              />
              {isError ? (
                <FormHelperText color='red' fontSize='xs' mt='0'>
                  Description is less than 10 characters
                </FormHelperText>
              ) : (
                <FormHelperText fontSize='xs' mt='0'>
                  Description must have more than 10 characters
                </FormHelperText>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing='6'>
              <Button
                onClick={closeHandler}
                size='sm'
                variant='outline'
                colorScheme='red'>
                Cancel
              </Button>
              <Button
                onClick={addHandler}
                isLoading={isLoading}
                loadingText='Adding note...'
                size='sm'
                variant='solid'
                colorScheme='green'>
                Add
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ManageNote;
