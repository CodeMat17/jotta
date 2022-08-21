import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import React from 'react';

function SigninForm({ handleSubmit, email, setEmail, isLoading }) {
  return (
    <chakra.form onSubmit={handleSubmit} mt='12' px='4'>
      <Text
        textAlign='center'
        fontSize='32'
        fontWeight='semibold'
        color='#40df6d'>
        Sign In
      </Text>

      <FormControl isRequired={true} pt='4'>
        <FormLabel fontSize='xs' ml='5'>
          Email
        </FormLabel>
        <Input
          rounded='3xl'
          size='lg'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Eg. abcd@gmail.com'
        />
      </FormControl>
      <Button
        type='submit'
        isLoading={isLoading}
        loadingText='Please wait...'
        rounded='3xl'
        mt='6'
        w='100%'
        bg='#40df6d'
        color='white'
        size='lg'
        _hover={{ bg: 'green' }}>
        Get a login link
      </Button>
    </chakra.form>
  );
}

export default SigninForm;
