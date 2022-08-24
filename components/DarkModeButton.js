import { MoonIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { BsFillMoonFill } from 'react-icons/bs';
import { RiSunFill } from 'react-icons/ri';

function DarkModeButton() {
  const { toggleColorMode, colorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, RiSunFill);

  return (
    <IconButton onClick={toggleColorMode} variant='ghost' isRound>
      {colorMode === 'dark' ? (
        <RiSunFill size='26' color='orange' />
      ) : (
        <BsFillMoonFill size='26' color='gray' />
      )}
    </IconButton>
  );
}

export default DarkModeButton;
