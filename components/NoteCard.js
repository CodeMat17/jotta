import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Spacer,
  Tag,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
dayjs.extend(relativeTime);

function NoteCard({ note }) {
  const router = useRouter();
  const toast = useToast();

  const { isOpen, onClose, onToggle } = useDisclosure();

  const isCompletedTextColor = useColorModeValue('gray.400', 'gray.600');
  const grayText = useColorModeValue('gray.400', 'gray.500');
  const textColor = useColorModeValue('gray.800', 'gray.300');

  const getDetails = () => {
    router.push(`/note/${note.id}`);
    toast({
      title: 'Please wait...',
      status: 'loading',
      position: 'top',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box
      pos='relative'
      w='xs'
      maxW='xs'
      mx='auto'
      border='1px'
      borderRadius='md'
      borderColor={useColorModeValue('gray.300', 'gray.700')}
      overflow='hidden'
      px='4'
      pb='4'
      pt='10'
      _hover={{ boxShadow: 'lg' }}>
      <Text
        textTransform='uppercase'
        as='b'
        lineHeight='50%'
        fontSize='2xl'
        color={note.is_completed ? grayText : 'green'}>
        {note?.title}
      </Text>

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
          <Text fontSize='sm' color={grayText}>
            Created
          </Text>
          <Text fontSize='sm' color={grayText}>
            {dayjs(note.created_at).format('MMM D, YYYY')}
          </Text>
        </VStack>

        {note.updated_on && (
          <VStack spacing='-1' align='start'>
            <Text fontSize='sm' color={grayText}>
              Updated
            </Text>
            <Text fontSize='sm' color={grayText}>
              {dayjs(note.updated_on).fromNow()}
            </Text>
          </VStack>
        )}
      </Flex>
      <Divider my='4' />
      <Text
        fontSize='lg'
        color={note.is_completed ? isCompletedTextColor : ''}
        noOfLines='2'>
        {note.desc}
      </Text>
      <ReactMarkdown>{note.desc}</ReactMarkdown>
      <Divider my='4' />
      <HStack>
        <Spacer />
        <Button onClick={getDetails} colorScheme='green'>
          {note.is_completed ? 'Edit/Remove' : 'See Details'}
        </Button>
      </HStack>
    </Box>
  );
}

export default NoteCard;
