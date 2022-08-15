import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function NavHeader({onOpen}) {
  const router = useRouter();
  const [isLoggingOut, setLogOut] = useState(false);

  const logoutHandler = async () => {
    try {
      setLogOut(true);
      await supabase.auth.signOut();
      setLogOut(false);
      router.push('/auth/signin');
    } catch (error) {
      setLogOut(false);
      router.push('/auth/signin');
    }
  };

  return (
    <Box bg='pink.100'>
      <Flex
        as='nav'
        p='5'
        maxW='6xl'
        mx='auto'
        justify='space-between'
        align='center'
        aria-label='Site navigation'>
        <Text
          fontSize='20'
          fontWeight='semibold'
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'>
          ENoter
        </Text>
        <Box>
          <Link href='/profile'>
            <a>Profile</a>
          </Link>
          <ButtonGroup spacing='1' ml='4'>
            <Button
              onClick={onOpen}
              size={['xs', 'sm', 'sm']}
              variant='ghost'
              colorScheme='green'>
              Add Note
            </Button>
            <Button
              onClick={logoutHandler}
              size={['xs', 'sm', 'sm']}
              variant='outline'
              colorScheme='red'
              isLoading={isLoggingOut}>
              Logout
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </Box>
  );
}

export default NavHeader;
