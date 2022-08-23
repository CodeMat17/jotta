import { MoonIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { RiSunFill } from 'react-icons/ri';
import {BsFillMoonFill} from 'react-icons/bs'

function DarkModeButton() {
  const { toggleColorMode, colorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, RiSunFill);

  return (
    <IconButton onClick={toggleColorMode} bg='gray.200' isRound variant='ghost'>
      {colorMode === 'dark' ? (
        <RiSunFill size='24' color='orange' />
      ) : (
        <BsFillMoonFill size='24' color='gray' />
      )}
    </IconButton>
  );
}

export default DarkModeButton;
