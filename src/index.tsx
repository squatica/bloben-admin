import './index.css';
import {
  ChakraProvider,
  ColorModeProvider,
  ColorModeScript,
  ComponentStyleConfig,
  extendTheme,
} from '@chakra-ui/react';
import AuthProvider from './layers/AuthProvider';
import BrowserProvider from './layers/BrowserProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import StoreProvider from './context/store';

// @ts-ignore
window.env = {};

const Input: ComponentStyleConfig = {
  defaultProps: {
    size: 'lg',
  },
};

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'base',
    _focus: { boxShadow: 'none' },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    _focus: { boxShadow: 'none' },
  },
};

const theme = extendTheme({
  components: {
    Button,
    Input,
    CheckBox: {
      defaultProps: {
        _focus: { boxShadow: 'none' },
      },
    },
  },
  colors: {
    primary: {
      200: '#EC407AB2',
      400: '#ec407a',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={'light'} />
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{ initialColorMode: 'light' }}>
        <StoreProvider>
          <BrowserProvider>
            <AuthProvider />
          </BrowserProvider>
        </StoreProvider>
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
