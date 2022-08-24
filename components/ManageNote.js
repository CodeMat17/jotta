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
  Switch,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function ManageNote({ isOpen, onClose, initialRef, reload, note }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [is_completed, setCompleted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDesc(note.desc);
      setCompleted(note.is_completed);
    }
  }, [note]);

  const addHandler = async (e) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage('');

    if (desc.length <= 9) {
      setIsError(true);
      return;
    }
    setLoading(true);

    const user = supabase.auth.user();
    let supabaseError;
    if (note) {
      const { error } = await supabase
        .from('notes')
        .update([
          {
            title,
            desc,
            is_completed,
            user_id: user.id,
            updated_on: new Date(),
          },
        ])
        .eq('id', note.id);

      supabaseError = error;
    } else {
      const { error } = await supabase
        .from('notes')
        .insert([{ title, desc, user_id: user.id }]);
      supabaseError = error;
      // reload();
    }

    setLoading(false);

    toast({
      status: 'success',
      duration: '5000',
      isClosable: 'true',
      position: 'top',
      description: 'Note is successfully added.',
    });
    if (supabaseError) {
      setErrorMessage(supabaseError.message);
    } else {
      closeHandler();
      if (note) {
        router.push('/');
      }
    }
  };

  const closeHandler = () => {
    setTitle('');
    setDesc('');
    setCompleted(false);
    // setNote(null);
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
        <form onSubmit={addHandler}>
          <ModalHeader color='green'>{note ? 'Update' : 'Add'} Note</ModalHeader>
          <ModalCloseButton onClick={closeHandler} />
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

            <FormControl isRequired={true}>
              <FormLabel fontSize='xs' mb='1'>
                Title
              </FormLabel>
              <Input
                ref={initialRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Add your note title here'
              />
            </FormControl>

            <FormControl isRequired={true} mt='4'>
              <FormLabel fontSize='xs' mb='1'>
                Description
              </FormLabel>
              <Textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder='Add your description here'
              />
              {isError ? (
                <FormHelperText color='red' fontSize='xs' mt='1.5'>
                  Description is less than 10 characters
                </FormHelperText>
              ) : (
                <FormHelperText fontSize='xs' mt='1.5'>
                  Description must have more than 10 characters
                </FormHelperText>
              )}
            </FormControl>

            {note && (
              <FormControl mt='4'>
                <FormLabel fontSize='xs' mb='1'>
                  Is Completed?
                </FormLabel>
                <Switch
                  isChecked={is_completed}
                  id='is-completed'
                  onChange={(e) => setCompleted(!is_completed)}
                />
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing='6'>
              <Button
                onClick={closeHandler}
                type='reset'
                isDisabled={isLoading}
                size='sm'
                variant='outline'
                colorScheme='red'>
                Cancel
              </Button>
              <Button
                type='submit'
                isLoading={isLoading}
                loadingText='Adding...'
                size='sm'
                variant='solid'
                colorScheme='green'>
                {note ? 'Update' : 'Add'}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ManageNote;
