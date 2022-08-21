import {
  Box,
  Heading,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { supabase } from '../lib/supabaseClient';
import DarkModeButton from './DarkModeButton';

function NavHeader({ toggleColorMode, colorMode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drwRef = useRef();

  const user = supabase.auth.user();
  const router = useRouter();
  const [isLoggingOut, setLogOut] = useState(false);
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);

  useEffect(() => {
    if (user) {
      setShowLogoutBtn(true);
    } else {
      setShowLogoutBtn(false);
    }
  }, [user]);

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
    <Box as='nav' bg='#40df6d' position='sticky' top='0' zIndex='50'>
      <HStack
        aria-label='Site navigation'
        pl='4'
        pr='2'
        py={[3, 4]}
        maxW='6xl'
        mx='auto'
        justify='space-between'
        align='center'>
        <Heading
          fontSize={['2xl', '3xl']}
          fontWeight='semibold'
          color='green.600'>
          ENoter
        </Heading>
        <Box>
          <HStack spacing='4' mr='2'>
            <Box>
              <DarkModeButton />
            </Box>

            {showLogoutBtn && (
              <Box>
                <IconButton
                  onClick={logoutHandler}
                  icon={<AiOutlinePoweroff />}
                  color='red.500'
                  bg='red.100'
                  isRound
                  isLoading={isLoggingOut}
                />
              </Box>
            )}

            {/* <Box display={['block', 'none']}>
              <IconButton
                ref={drwRef}
                onClick={onOpen}
                icon={<HiMenuAlt3 size='25' />}
                variant='ghost'
                color='green.600'
              />

              <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement='right'
                finalFocusRef={drwRef}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton size='lg' color='red' />
                  <DrawerBody bg='green.300'>
                    <VStack mt='24' spacing='8'>
                      <Button
                        onClick={() => router.push('/profile')}
                        w='100%'
                        variant='ghost'>
                        Profile
                      </Button>
                      <Button
                        onClick={logoutHandler}
                        isLoading={isLoggingOut}
                        loadingText='logging out...'
                        w='100%'
                        color='red.500'
                        bg='red.200'
                        _hover={{ bg: 'red.100' }}>
                        Logout
                      </Button>
                    </VStack>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box> */}
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
}

export default NavHeader;
