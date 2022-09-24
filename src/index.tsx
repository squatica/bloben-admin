import './index.css';
import {
  ChakraProvider,
  ColorModeProvider,
  ColorModeScript,
} from '@chakra-ui/react';
import AuthProvider from './layers/AuthProvider';
import BrowserProvider from './layers/BrowserProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import StoreProvider from './context/store';

// @ts-ignore
window.env = {};

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={'light'} />
    <ChakraProvider>
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
