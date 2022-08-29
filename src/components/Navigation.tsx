import { APP_PATH } from '../data/enums';
import { AxiosResponse } from 'axios';
import { Button } from '@chakra-ui/react';
import { CommonResponse } from '../data/interface';
import { Context } from '../context/store';
import { useNavigate } from 'react-router';
import AdminApi from '../api/admin.api';
import React, { useContext } from 'react';
import Separator from './Separator';

const navigationStyle: any = {
  display: 'flex',
  flexDirection: 'column',
  width: 280,
  height: '100%',
  padding: 24,
  borderRight: 'solid 1px gray',
};

const Navigation = () => {
  const navigate = useNavigate();

  const navigateTo = (path: APP_PATH) => {
    navigate(`/admin/${path}`);
  };
  const [store, dispatch] = useContext(Context);

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogout = async () => {
    const response: AxiosResponse<CommonResponse> = await AdminApi.logout(
      store.token
    );

    if (response.status === 200) {
      setContext('isLogged', false);
    }
  };

  return (
    <div style={navigationStyle}>
      <Button
        onClick={() => {
          navigateTo(APP_PATH.USERS);
        }}
        colorScheme="teal"
      >
        Users
      </Button>
      <Separator height={16} />
      <Button
        onClick={() => {
          navigateTo(APP_PATH.LOGS);
        }}
        colorScheme="teal"
      >
        Logs
      </Button>
      <Separator height={16} />
      <Button
        onClick={() => {
          navigateTo(APP_PATH.SETTINGS);
        }}
        colorScheme="teal"
      >
        Admin Settings
      </Button>
      <Separator height={16} />
      <Button
        onClick={() => {
          navigateTo(APP_PATH.SERVER_SETTINGS);
        }}
        colorScheme="teal"
      >
        Server settings
      </Button>
      <Separator height={40} />
      <Button
        onClick={() => {
          handleLogout();
        }}
        colorScheme="gray"
      >
        Log out
      </Button>
      <Separator height={16} />
    </div>
  );
};

export default Navigation;
