import { AxiosResponse } from 'axios';
import { Context } from '../context/store';
import { LoginResponse } from '../bloben-interface/user/user';
import { getHostname } from '../utils/common';
import { useToast } from '@chakra-ui/react';
import AdminApi from '../api/admin.api';
import LoginView from '../components/LoginView';
import React, { useContext, useState } from 'react';
import TwoFactorLogin from '../components/2FA/TwoFactorLogin';

const LoginPage = () => {
  const toast = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorVisible, setTwoFactorVisible] = useState(false);

  const [, dispatch] = useContext(Context);

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const onChange = (e: any) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };
  const handleLogin = async (): Promise<void> => {
    try {
      const apiUrl = `${getHostname()}/api`;

      window.localStorage.setItem('apiUrl', apiUrl);

      // @ts-ignore
      window.env.apiUrl = apiUrl;

      const response: AxiosResponse<LoginResponse> = await AdminApi.login(
        apiUrl,
        {
          username,
          password,
        }
      );

      if (response.data.isLogged && !response.data.isTwoFactorEnabled) {
        // @ts-ignore
        setContext('token', response.data.token);
        const userResponse = await AdminApi.getAdminAccount(
          // @ts-ignore
          response.data?.token
        );

        setContext('user', userResponse.data);

        setContext('isLogged', true);
      } else if (response?.data?.isTwoFactorEnabled) {
        setTwoFactorVisible(true);
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

  return twoFactorVisible ? (
    <TwoFactorLogin username={username} password={password} />
  ) : (
    <LoginView
      username={username}
      password={password}
      handleLogin={handleLogin}
      onChange={onChange}
    />
  );
};

export default LoginPage;
