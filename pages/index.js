import { useDisclosure } from '@chakra-ui/hooks';
import { PlusSquareIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Spacer,
  Spinner,
  Tag,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ManageNote from '../components/ManageNote';
import NoteCard from '../components/NoteCard';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const user = supabase.auth.user();
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [isFetching, setFetching] = useState(true);

  const initialRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const getNotes = async () => {
    await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user?.id)
      .order('id', { ascending: false })
      .then(({ data, error }) => {
        if (!error) {
          setNotes(data);
        }
      });
  };

  useEffect(() => {
    if (user) {
      supabase
        .from('notes')
        .select('*')
        .eq('user_id', user?.id)
        .order('id', { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            setNotes(data);
          }
        });
      setFetching(false);
      // getNotes()
    }
  }, [user]);

  const openHandler = (clickedNote) => {
    setNote(clickedNote);
    onOpen();
  };

  return (
    <div>
      <Head>
        <title>Enoter | Home</title>
        <meta
          name='description'
          content='Enoter is an e note app for taking notes electronically.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <ManageNote
          isOpen={isOpen}
          onClose={onClose}
          initialRef={initialRef}
          reload={getNotes}
          note={note}
          setNote={setNote}
        />
        <Box>
          <Heading
            textAlign='center'
            fontSize={['2xl', '3xl']}
            fontWeight='semibold'
            mt='6'>
            Notes
          </Heading>
          <HStack mb='8' mt='1' spacing='6' justify='center'>
            <HStack spacing='1'>
              <Tag bg='yellow.400' borderRadius='3xl' size='sm' />
              <Text fontSize='sm'>In use</Text>
            </HStack>
            <HStack spacing='1'>
              <Tag bg='green.400' borderRadius='3xl' size='sm' />
              <Text fontSize='sm'>Completed</Text>
            </HStack>
          </HStack>
        </Box>
        {isFetching ? (
          <Box maxW='xs' mx='auto' mt='16'>
            <Alert
              flexDirection='column'
              rounded='md'
              py='12'
              alignItems='center'
              textAlign='center'>
              <AlertIcon />
              <Flex mt='4'>
                <AlertDescription letterSpacing='1px' mr='4'>
                  Fetching...
                </AlertDescription>
                <Spinner />
              </Flex>
            </Alert>
          </Box>
        ) : (
          <>
            {notes.length <= 0 ? (
              <Box maxW='xs' mx='auto' mt='16'>
                <Alert
                  flexDirection='column'
                  rounded='md'
                  py='12'
                  alignItems='center'
                  textAlign='center'>
                  <AlertIcon />
                  <Flex mt='4'>
                    <AlertDescription letterSpacing='1px' mr='4'>
                      You do not have any note.
                    </AlertDescription>
                  </Flex>
                </Alert>
              </Box>
            ) : (
              <SimpleGrid
                columns={[1, 1, 2, 3]}
                gap={[4]}
                maxW='6xl'
                mx='auto'
                mb='12'
                px='4'>
                {notes &&
                  notes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      openHandler={openHandler}
                    />
                  ))}
              </SimpleGrid>
            )}
          </>
        )}
      </main>
      <HStack position='fixed' bottom='20' right={[8, 8, 12]} maw='6xl'>
        <Spacer />
        <IconButton
          border='2px'
          onClick={onOpen}
          icon={<PlusSquareIcon />}
          colorScheme='green'
          shadow='dark-lg'
          size='lg'
          isRound={true}
        />
      </HStack>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      props: {},
      redirect: {
        destination: '/auth/signin',
      },
    };
  }
  return {
    props: {},
  };
}
