import { BlobenComponentsProvider } from 'bloben-components';
import { GetAdminAccountResponse } from 'bloben-interface';
import { useColorMode } from '@chakra-ui/react';
import React, { createContext, useEffect, useReducer } from 'react';
import Reducer from './reducer';

// @ts-ignore
export const Context: any = createContext();

export interface StoreContext {
  isLogged: boolean;
  version: string | null;
  user: GetAdminAccountResponse | null;
  isDark: boolean;
}

const initialContext: StoreContext = {
  isLogged: false,
  version: null,
  user: null,
  isDark: false,
};

const StoreProvider = ({ children }: any) => {
  const colorMode = useColorMode();

  const [store, dispatch] = useReducer(Reducer, initialContext);

  useEffect(() => {
    colorMode?.setColorMode('light');
  }, []);

  return (
    <Context.Provider value={[store, dispatch]}>
      <BlobenComponentsProvider isMobile={store.isMobile} isDark={false}>
        {children}
      </BlobenComponentsProvider>
    </Context.Provider>
  );
};

export default StoreProvider;
