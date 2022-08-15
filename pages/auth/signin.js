import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

function Signin() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const isError = email === '';

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <Box minH='100vh' px='4' py='28' bg='gray.50'>
      {error && (
        <Alert
          status='error'
          variant='subtle'
          rounded='md'
          flexDirection='column'
          maxW='xs'
          mx='auto'
          mb='6'
          py='6'
          alignItems='center'
          justifyContent='center'
          textAlign='center'>
          <AlertIcon boxSize='30px' />
          <AlertTitle pt='1' pb='4'>
            Error!
          </AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      {isSubmitted ? (
        <Alert
          status='success'
          variant='subtle'
          rounded='md'
          flexDirection='column'
          maxW='xs'
          mx='auto'
          mb='6'
          py='6'
          alignItems='center'
          justifyContent='center'
          textAlign='center'>
          <AlertIcon boxSize='30px' />
          <AlertTitle pt='1' pb='4'>
            Done!
          </AlertTitle>
          <AlertDescription>
            Check your email: {email} for your login link.
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          bg='white'
          py='10'
          px='4'
          maxW={['xs', 'sm']}
          mx='auto'
          rounded='md'
          shadow='2xl'>
          <Heading fontWeight='semibold' fontSize='23' color='#64dd17'>
            Sign in
          </Heading>
          <chakra.form mt='12'>
            <VStack spacing='6'>
              <FormControl isInvalid={isError} isRequired>
                <FormLabel fontSize='xs'>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Eg. abcd@gmail.com'
                  w='100%'
                />
                {isError && (
                  <FormErrorMessage fontSize='xs'>
                    Email is required.
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button
                type='submit'
                onClick={handleSubmit}
                isLoading={isLoading}
                loadingText='Signing, please wait...'
                w='100%'
                colorScheme='green'
                color='white'>
                Sign in
              </Button>
            </VStack>
          </chakra.form>
        </Box>
      )}
    </Box>
  );
}

export default Signin;
