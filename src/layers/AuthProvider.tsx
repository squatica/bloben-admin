import { Context } from '../context/store';
import { Flex, Spacer, useToast } from '@chakra-ui/react';
import AdminApi from '../api/admin.api';
import LayoutProvider from './LayoutLayer';
import LoginPage from '../pages/LoginPage';
import React, { useContext, useEffect } from 'react';

const AuthProvider = () => {
  const toast = useToast();
  const [store, dispatch] = useContext(Context);

  const { isLogged } = store;

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const getVersion = async () => {
    try {
      const response = await AdminApi.getVersion();

      if (response?.data) {
        setContext('version', response.data.version);
      }
    } catch (e: any) {
      if (e.response?.data?.message) {
        toast({
          title: e.response?.data?.message,
          status: 'error',
        });
      }
    }
  };

  const checkLogin = async (): Promise<void> => {
    const apiUrl = window.localStorage.getItem('apiUrl');

    if (!apiUrl) {
      return;
    }

    // @ts-ignore
    window.env.apiUrl = apiUrl;
    try {
      await getVersion();
    } catch (e: any) {
      return;
    }
  };

  const getAccount = async () => {
    try {
      const response = await AdminApi.getAdminAccount();

      if (response.status === 200) {
        if (response.data?.isLogged) {
          setContext('isLogged', true);
        }

        setContext('user', response.data);
      }
    } catch (e: any) {
      return;
    }
  };

  // check login on load
  useEffect(() => {
    checkLogin();
    getAccount();
  }, []);

  return (
    <Flex
      height={'100%'}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {!isLogged ? <LoginPage /> : <LayoutProvider />}
      <Spacer />
      {/*<VersionFooter />*/}
    </Flex>
  );
};

export default AuthProvider;
