import { Button, Flex, Heading, useToast } from '@chakra-ui/react';
import { Context } from '../../context/store';
import Admin2FAApi from '../../api/admin2FA.api';
import AdminApi from '../../api/admin.api';
import React, { useContext, useState } from 'react';
import Separator from '../Separator';
import TwoFactorSetup from './TwoFactorSetup';

const TwoFactorSettings = () => {
  const [store, dispatch] = useContext(Context);
  const toast = useToast();

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { user } = store;

  const [setupOpen, openSetup] = useState(false);

  const handleDisable2FA = async () => {
    try {
      const response = await Admin2FAApi.delete2FA(store.token);

      toast({
        title: response?.data?.message,
      });

      const userResponse = await AdminApi.getAdminAccount(store.token);

      setContext('user', userResponse.data);
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
    <Flex direction={'column'} maxWidth={'50%'}>
      <Heading>Two factor authentication</Heading>
      <Separator height={24} />
      {user?.isTwoFactorEnabled ? (
        <Button
          _focus={{ boxShadow: 'none' }}
          h="1.75rem"
          size="sm"
          onClick={handleDisable2FA}
        >
          Disable 2FA
        </Button>
      ) : (
        <Button
          _focus={{ boxShadow: 'none' }}
          size="md"
          onClick={() => openSetup(true)}
        >
          Set up 2FA
        </Button>
      )}

      {setupOpen ? (
        <TwoFactorSetup handleClose={() => openSetup(false)} />
      ) : null}
    </Flex>
  );
};

export default TwoFactorSettings;
