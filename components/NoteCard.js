import {
  Box,
  Divider,
  Flex,
  Heading,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

function NoteCard({ note }) {
  return (
    <Box
      pos='relative'
      w='xs'
      maxW='xs'
      mx='auto'
      border='1px'
      borderRadius='md'
      borderColor='gray.300'
      overflow='hidden'
      p='4'>
      <Heading fontWeight='semibold' fontSize='lg' mt='2'>
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
            Date created
          </Text>
        </VStack>

        <VStack spacing='-1' align='start'>
          <Text fontSize='xs' color='gray.400'>
            Updated
          </Text>
          <Text fontSize='xs' color='gray.400'>
            Date updated
          </Text>
        </VStack>
      </Flex>
      <Divider my='4' />
      <Text fontSize='sm' color='gray.700' noOfLines={[3]}>
        {note.desc}
      </Text>
    </Box>
  );
}

export default NoteCard;
