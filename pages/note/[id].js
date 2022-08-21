import { ArrowBackIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Tag,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ManageNote from '../../components/ManageNote';
import { supabase } from '../../lib/supabaseClient';
dayjs.extend(relativeTime);

function Note({ note }) {
  const user = supabase.auth.user();
  const cardBg = useColorModeValue('gray.50', 'gray.900');
   const borderColor = useColorModeValue('gray.300', 'gray.700');
  const router = useRouter();
  const toast = useToast();
  const [isDeleting, setDeleting] = useState(false);

  const { onOpen, isOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    }
  }, [user, router]);

  const deleteNote = async () => {
    setDeleting(true);
    const { data, error } = await supabase
      .from('notes')
      .delete()
      .eq('id', `${note.id}`);
    if (data) {
      setDeleting(false);
      toast({
        title: 'Done!',
        description: 'Note is successfully deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      router.back();
    }
    if (error) {
      setDeleting(false);
      toast({
        title: 'Error!',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box w='100%' h='100vh' justify='center' pt='32'>
      <ManageNote
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
        note={note}
      />
      <Box
        pos='relative'
        w={['xs', 'md']}
        maxW='md'
        mx='auto'
        border='1px'
        bg={cardBg}
        boxShadow='md'
        borderRadius='md'
        borderColor={borderColor}
        overflow='hidden'
        p='4'
        _hover={{ boxShadow: '2xl' }}>
        <Heading fontWeight='bold' fontSize='xl' mt='2' color='green'>
          {note?.title}
        </Heading>
        <Tag
          pos='absolute'
          top='3'
          right='4'
          borderRadius='3xl'
          size='sm'
          bg={note?.is_completed ? 'green.400' : 'yellow.400'}
        />
        <Flex justify='space-between'>
          <VStack spacing='-1' align='start'>
            <Text fontSize='xs' color='gray.400'>
              Created
            </Text>
            <Text fontSize='xs' color='gray.400'>
              {dayjs(note.created_at).format('MMM D, YYYY')}
            </Text>
          </VStack>

          {note.updated_on && (
            <VStack spacing='-1' align='start'>
              <Text fontSize='xs' color='gray.400'>
                Updated
              </Text>
              <Text fontSize='xs' color='gray.400'>
                {dayjs(note.updated_on).fromNow()}
              </Text>
            </VStack>
          )}
        </Flex>
        <Divider my='4' />
        <Text fontSize='sm' color='gray.700'>
          {note.desc}
        </Text>
        <Divider my='4' />
        <HStack spacing='4'>
          <IconButton
            onClick={() => router.back()}
            icon={<ArrowBackIcon />}
            isRound
            colorScheme='green'
          />
          <Spacer />
          <IconButton
            onClick={deleteNote}
            icon={<DeleteIcon />}
            isLoading={isDeleting}
            isRound
            colorScheme='red'
          />
          <IconButton
            onClick={onOpen}
            icon={<EditIcon />}
            isRound
            colorScheme='yellow'
          />
        </HStack>
      </Box>
    </Box>
  );
}

export async function getStaticPaths() {
  const { data: notes } = await supabase.from('notes').select('id');
  const paths = notes.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const { data: note } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();

  return {
    props: {
      note,
    },
  };
}

export default Note;
