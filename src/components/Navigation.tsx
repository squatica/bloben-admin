import { APP_PATH } from '../data/enums';
import { AxiosResponse } from 'axios';
import { Button } from '@chakra-ui/react';
import { CommonResponse } from '../data/interface';
import { Context, StoreContext } from '../context/store';
import { EvaIcons, Separator, SettingsButton } from 'bloben-components';
import { useNavigate } from 'react-router-dom';
import AdminApi from '../api/admin.api';
import React, { useContext, useState } from 'react';

const navigationStyle: any = {
  display: 'flex',
  flexDirection: 'column',
  width: 280,
  height: '100%',
  padding: 24,
  borderRight: 'solid 1px gray',
};

const Navigation = () => {
  const [currentPath, setCurrentPath] = useState(APP_PATH.USERS);
  const navigate = useNavigate();

  const navigateTo = (path: APP_PATH) => {
    setCurrentPath(path);
    navigate(`/admin/${path}`);
  };
  const [, dispatch]: [StoreContext, any] = useContext(Context);

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogout = async () => {
    const response: AxiosResponse<CommonResponse> = await AdminApi.logout();

    if (response.status === 200) {
      setContext('isLogged', false);
    }
  };

  return (
    <div style={navigationStyle}>
      <SettingsButton
        onClick={() => {
          navigateTo(APP_PATH.USERS);
        }}
        icon={() => <EvaIcons.Person />}
        text={'Users'}
        path={APP_PATH.USERS}
        selected={currentPath}
      />
      <Separator height={8} />
      <SettingsButton
        onClick={() => {
          navigateTo(APP_PATH.LOGS);
        }}
        icon={() => <EvaIcons.Document />}
        text={'Logs'}
        path={APP_PATH.LOGS}
        selected={currentPath}
      />
      <Separator height={8} />
      <SettingsButton
        onClick={() => {
          navigateTo(APP_PATH.SETTINGS);
        }}
        icon={() => <EvaIcons.Edit />}
        text={'Admin Settings'}
        path={APP_PATH.SETTINGS}
        selected={currentPath}
      />
      <Separator height={8} />
      <SettingsButton
        onClick={() => {
          navigateTo(APP_PATH.SERVER_SETTINGS);
        }}
        icon={() => <EvaIcons.Settings />}
        text={'Server Settings'}
        path={APP_PATH.SERVER_SETTINGS}
        selected={currentPath}
      />
      <Separator height={40} />
      <Button
        onClick={() => {
          handleLogout();
        }}
        colorScheme="gray"
        size={'sm'}
      >
        Log out
      </Button>
      <Separator height={16} />
    </div>
  );
};

export default Navigation;
