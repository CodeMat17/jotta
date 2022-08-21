import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
dayjs.extend(relativeTime);

function NoteCard({ note }) {
  const router = useRouter();
  const isCompletedTextColor = useColorModeValue('gray.400', 'gray.600')
  const grayText = useColorModeValue('gray.400', 'gray.500');
  const textColor = useColorModeValue('gray.800', 'gray.300');

  return (
    <Box
      pos='relative'
      w='xs'
      maxW='xs'
      mx='auto'
      border='1px'
      bg=''
      borderRadius='md'
      borderColor={useColorModeValue('gray.300', 'gray.700')}
      overflow='hidden'
      p='4'
      _hover={{ boxShadow: 'lg' }}>
      <Heading
        textTransform='uppercase'
        fontWeight='bold'
        fontSize='xl'
        mt='2'
        color={note.is_completed ? 'green.700' : 'green'}>
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
          <Text fontSize='xs' color={grayText}>
            Created
          </Text>
          <Text fontSize='xs' color={grayText}>
            {dayjs(note.created_at).format('MMM D, YYYY')}
          </Text>
        </VStack>

        {note.updated_on && (
          <VStack spacing='-1' align='start'>
            <Text fontSize='xs' color={grayText}>
              Updated
            </Text>
            <Text fontSize='xs' color={grayText}>
              {dayjs(note.updated_on).fromNow()}
            </Text>
          </VStack>
        )}
      </Flex>
      <Divider my='4' />
      <Text
        fontSize='sm'
        color={note.is_completed ? isCompletedTextColor : textColor}
        noOfLines='2'>
        {note.desc}
      </Text>
      <Divider my='4' />
      <HStack>
        <Spacer />
        <Button
          onClick={() => router.push(`/note/${note.id}`)}
          size='sm'
          fontSize='sm'
          color='white'
          bg='green'
          _hover={{ color: 'green', bg: 'green.100' }}>
          {note.is_completed ? 'Edit/Remove' : 'See detail'}
        </Button>
      </HStack>
    </Box>
  );
}

export default NoteCard;
