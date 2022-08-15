import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Heading, HStack, SimpleGrid, Tag, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ManageNote from '../components/ManageNote';
import NavHeader from '../components/NavHeader';
import NoteCard from '../components/NoteCard';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const user = supabase.auth.user();
  const [notes, setNotes] = useState([]);

  const initialRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // supabase
      //   .from('notes')
      //   .select('*')
      //   .eq('user_id', user?.id)
      //   .order('id', { ascending: false })
      //   .then(({ data, error }) => {
      //     if (!error) {
      //       setNotes(data);
      //     }
      //   });
      getNotes()
    }
  }, [user]);

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

  // useEffect(() => {
  //   const noteListener = supabase
  //     .from('notes')
  //     .on('*', (payload) => {
  //       const newNote = payload.new;
  //       setNotes((oldNotes) => {
  //         const newNotes = [...oldNotes, newNote];
  //         newNotes.sort((a, b) => b.id - a.id);
  //         return newNotes;
  //       });
  //     })
  //     .subscribe();
  //   return () => {
  //     noteListener.unsubscribe();
  //   };
  // }, []);

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
        <NavHeader onOpen={onOpen} />
        <ManageNote isOpen={isOpen} onClose={onClose} initialRef={initialRef} getNotes={getNotes} />
        <Box>
          <Heading
            textAlign='center'
            fontSize={['xl', '2xl', '3xl']}
            fontWeight='semibold'
            mt='6'>
            Notes
          </Heading>
          <HStack mb='8' mt='1' spacing='6' justify='center'>
            <HStack spacing='1'>
              <Tag bg='green.400' borderRadius='3xl' size='sm' />
              <Text fontSize='sm'>Used</Text>
            </HStack>
            <HStack spacing='1'>
              <Tag bg='yellow.400' borderRadius='3xl' size='sm' />
              <Text fontSize='sm'>In use</Text>
            </HStack>
          </HStack>
        </Box>
        <SimpleGrid
          columns={[1, 1, 2, 3]}
          gap={[4]}
          maxW='6xl'
          mx='auto'
          // mx='6'
          px='4'>
          {notes && notes.map((note) => <NoteCard key={note.id} note={note} />)}
        </SimpleGrid>
      </main>
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
