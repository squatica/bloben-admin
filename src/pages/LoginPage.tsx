import { AxiosResponse } from 'axios';
import { Context } from '../context/store';
import { LoginResponse } from 'bloben-interface/user/user';
import { getHostname } from '../utils/common';
import { useToast } from '@chakra-ui/react';
import AdminApi from '../api/admin.api';
import LoginView from '../components/LoginView';
import React, { useContext, useState } from 'react';

const LoginPage = () => {
  const toast = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        setContext('isLogged', true);
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

  return (
    <LoginView
      username={username}
      password={password}
      handleLogin={handleLogin}
      onChange={onChange}
    />
  );
};

export default LoginPage;
