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
      color={colorMode === 'dark' ? 'orange.500' : 'gray.700'}
      bg={colorMode === 'dark' ? 'orange.200' : 'gray.500'}
    />
  );
}

export default DarkModeButton;
