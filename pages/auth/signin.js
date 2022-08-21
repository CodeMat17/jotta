import { WarningIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiMailSend } from 'react-icons/bi';
import SigninForm from '../../components/SigninForm';
import { supabase } from '../../lib/supabaseClient';

function Signin() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const isError = email === '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signIn({ email });
    if (error) {
      setLoading(false);
      setError(error.message);
    }
    if (!error) {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <Box w='100%' h='100vh'>
      <Flex maxW='xs' mx='auto' mt='20' justify='center' flexDir='column'>
        <Flex flexDir='row' justify='center'>
          <Heading justifyContent='center' fontSize='36' color='#40df6d'>
            E
          </Heading>
          <Heading justifyContent='center' fontSize='36'>Noter</Heading>
        </Flex>
        <Box bg='#45FC38' my='8' mx='auto' px='8' h='0.5' rounded='3xl'>
          {/* <Divider border='2px' /> */}
        </Box>
        <Text textAlign='center' fontSize='xl'>
          Save your notes, appointments and other schedules with ENoter.
        </Text>

        {error && (
          <Flex
            mt='8'
            p='6'
            bg='red.100'
            color='red'
            justify='center'
            align='center'
            flexDir='column'
            rounded='md'>
            <WarningIcon fontSize='3xl' />

            <Text textAlign='center' mt='4'>
              {error.message}
            </Text>
          </Flex>
        )}

        {isSubmitted ? (
          <Flex
            mt='12'
            p='6'
            bg='green.50'
            color='green'
            justify='center'
            align='center'
            flexDir='column'
            rounded='md'>
            <BiMailSend size='32' />
            <Text textAlign='center' mt='2' fontWeight='semibold' fontSize='20'>
              Check your email box
            </Text>
            <Text textAlign='center' mt='2'>
              Your login link has been sent to {email}
            </Text>
          </Flex>
        ) : (
          <SigninForm
              email={email}
              setEmail={setEmail}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          />
        )}
      </Flex>
    </Box>
  );
}

// export async function getServerSideProps({ req }) {
//   const { user } = await supabase.auth.api.getUserByCookie(req);
//   if (user) {
//     return {
//       props: {},
//       redirect: {
//         destination: '/',
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// }

export default Signin;
