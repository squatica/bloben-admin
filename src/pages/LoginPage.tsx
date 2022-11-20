import { AxiosResponse } from 'axios';
import { Context, StoreContext } from '../context/store';
import { LoginComponent, createToastError } from 'bloben-components';
import { LoginResponse } from 'bloben-interface';
import { getHostname } from '../utils/common';
import { useToast } from '@chakra-ui/react';
import { v4 } from 'uuid';
import AdminApi from '../api/admin.api';
import React, { useContext, useState } from 'react';
import admin2FAApi from '../api/adminTwoFactor.api';

const LoginPage = () => {
  const toast = useToast();

  const [twoFactorVisible, setTwoFactorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [, dispatch]: [StoreContext, any] = useContext(Context);

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const handleLogin = async (
    username: string,
    password: string
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const apiUrl = `${getHostname()}/api`;

      window.localStorage.setItem('apiUrl', apiUrl);
      const browserID = window.localStorage.getItem('browserID');

      // @ts-ignore
      window.env.apiUrl = apiUrl;

      const response: AxiosResponse<LoginResponse> = await AdminApi.login(
        apiUrl,
        {
          username,
          password,
          browserID: browserID || null,
        }
      );

      if (response.data.isLogged && !response.data.isTwoFactorEnabled) {
        const userResponse = await AdminApi.getAdminAccount();

        setContext('user', userResponse.data);

        setContext('isLogged', true);
      } else if (response?.data?.isTwoFactorEnabled) {
        setTwoFactorVisible(true);
      }
    } catch (e: any) {
      toast(createToastError(e));
    }

    setIsLoading(false);
  };

  const handleTwoFactorLogin = async (
    username: string,
    password: string,
    otpCode: string,
    trustBrowser: boolean
  ) => {
    setIsLoading(true);

    try {
      let browserID: null | string = null;
      if (trustBrowser) {
        browserID = v4();

        window.localStorage.setItem('browserID', browserID as string);
      }

      const response = await admin2FAApi.loginWith2FA({
        username,
        password,
        otpCode,
        browserID,
      });

      if (response.data.isLogged && response.data.isTwoFactorEnabled) {
        const userResponse = await AdminApi.getAdminAccount();

        setContext('user', userResponse.data);

        setContext('isLogged', true);
      }
    } catch (e: any) {
      toast(createToastError(e));
    }
    setIsLoading(false);
  };

  return (
    <LoginComponent
      twoFactorVisible={twoFactorVisible}
      onSubmitLogin={handleLogin}
      isLoading={isLoading}
      onSubmitTwoFactorLogin={handleTwoFactorLogin}
      title={'Admin login'}
      enableTrustBrowser={true}
    />
  );
};

export default LoginPage;
