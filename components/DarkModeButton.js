import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

function DarkModeButton() {
   const { toggleColorMode, colorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      isRound
      // size='sm'
      color={colorMode === 'dark' ? 'orange.500' : 'gray.400'}
      bg={colorMode === 'dark' ? 'orange.200' : 'blue.900'}
    />
  );
}

export default DarkModeButton;
