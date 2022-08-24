import { Box, Container, Heading, Text } from '@chakra-ui/react'
import React from 'react'

function Footer() {
    return (
      <Box bg='black' py='8' px='4'>
        <Container maxW='6xl' mx='auto'>
          <Heading fontSize='20'>JOTTA</Heading>
          <Text fontSize='sm' textColor='gray'>
            &copy; 2022. All rights reserved.
          </Text>
        </Container>
      </Box>
    );
}

export default Footer