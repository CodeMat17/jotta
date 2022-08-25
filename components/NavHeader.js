import {
  Box,
  Heading,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { supabase } from '../lib/supabaseClient';
import DarkModeButton from './DarkModeButton';

function NavHeader({ toggleColorMode, colorMode }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const drwRef = useRef();

  const user = supabase.auth.user();
  const router = useRouter();
  const [isLoggingOut, setLogOut] = useState(false);
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);
  const [totalNotes, setTotalNotes] = useState([]);
  const [isCompleted, setIsCompleted] = useState([]);
  const [notCompleted, setNotCompleted] = useState([]);

  useEffect(() => {
    if (user) {
      setShowLogoutBtn(true);
    } else {
      setShowLogoutBtn(false);
    }
  }, [user]);

  useEffect(() => {
    const getTotalNotes = async () => {
      const { data, error } = await supabase.from('notes').select('*');
      if (!error) {
        setTotalNotes(data);
      }
    };
    getTotalNotes();
  }, []);

  useEffect(() => {
    const getIsCompletedNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('is_completed')
        .is('is_completed', true);
      if (!error) {
        setIsCompleted(data);
      }
    };
    getIsCompletedNotes();
  }, []);

  useEffect(() => {
    const getNotCompletedNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('is_completed')
        .is('is_completed', false);
      if (!error) {
        setNotCompleted(data);
      }
    };
    getNotCompletedNotes();
  }, []);

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
    <Box as='nav' bg='#40df6d' position='sticky' top='0' zIndex='50' w='100%'>
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
          // color='green.600'
          bgGradient='linear(to-l, orange, #FF0080)'
          bgClip='text'>
          JOTTA
        </Heading>
        <Box>
          <HStack spacing='4' mr='2'>
            <Box>
              <DarkModeButton />
            </Box>

            {showLogoutBtn && (
              <HStack spacing='4'>
                <Popover>
                  <PopoverTrigger>
                    <IconButton isRound>
                      <CgProfile size='42' color='green' />
                    </IconButton>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>
                      <CgProfile size='50' />
                      <Text pt='2' fontSize='18' maxW='xs'> {user.email}</Text>
                    </PopoverHeader>
                    <PopoverBody py='12'>
                      <VStack align='start' fontSize='18'>
                        <Text >Total no. of notes: {totalNotes.length}</Text>
                        <Text>No. of in-use notes: {notCompleted.length}</Text>
                        <Text>
                          No. of completed notes: {isCompleted.length}
                        </Text>
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                <IconButton
                  onClick={logoutHandler}
                  isRound
                  bg='red.100'
                  isLoading={isLoggingOut}>
                  <AiOutlinePoweroff size='24' color='red' />
                </IconButton>
              </HStack>
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
