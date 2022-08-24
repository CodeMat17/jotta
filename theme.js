// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  fonts: {
    heading: `'Caesar Dressing', sans-serif`,
    body: `'Baloo 2', sans-serif`,
  },
});

export default theme;
