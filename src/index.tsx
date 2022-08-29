import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from './layers/AuthProvider';
import BrowserProvider from './layers/BrowserProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import StoreProvider from './context/store';

// @ts-ignore
window.env = {};

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <StoreProvider>
        <BrowserProvider>
          <AuthProvider />
        </BrowserProvider>
      </StoreProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
