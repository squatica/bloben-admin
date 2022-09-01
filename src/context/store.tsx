import { BlobenComponentsProvider } from 'bloben-components';
import { GetAdminAccountResponse } from 'bloben-interface';
import React, { createContext, useReducer } from 'react';
import Reducer from './reducer';

// @ts-ignore
export const Context: any = createContext();

interface InitialContext {
  isLogged: boolean;
  version: string | null;
  user: GetAdminAccountResponse | null;
}

const initialContext: InitialContext = {
  isLogged: false,
  version: null,
  user: null,
};

const StoreProvider = ({ children }: any) => {
  const [store, dispatch] = useReducer(Reducer, initialContext);

  return (
    <Context.Provider value={[store, dispatch]}>
      <BlobenComponentsProvider isMobile={store.isMobile} isDark={store.isDark}>
        {children}
      </BlobenComponentsProvider>
    </Context.Provider>
  );
};

export default StoreProvider;
