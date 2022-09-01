import {
  Alert,
  ChakraModal,
  Separator,
  SettingsRow,
  createToastError,
} from 'bloben-components';
import { Button, Flex, useToast } from '@chakra-ui/react';
import { Context } from '../context/store';
import AdminApi from '../api/admin.api';
import AdminTwoFactorApi from '../api/adminTwoFactor.api';
import ChangePassword from '../components/changePassword/ChangePassword';
import React, { useContext, useState } from 'react';
import TwoFactorSetup from '../components/2FA/TwoFactorSetup';

const menuStyle: any = {
  width: '100%',
  justifyContent: 'flex-start',
  textAlign: 'left',
};

const SettingsPage = () => {
  const [store, dispatch] = useContext(Context);
  const toast = useToast();

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { user } = store;

  const [changePasswordOpen, openChangePassword] = useState(false);
  const [twoFactorModalOpen, openTwoFactorModal] = useState(false);
  const [deleteModalOpen, openDeleteModal] = useState(false);

  const handleDisable2FA = async () => {
    try {
      const response = await AdminTwoFactorApi.delete2FA();

      toast({
        title: response?.data?.message,
      });

      openDeleteModal(false);

      const userResponse = await AdminApi.getAdminAccount();

      setContext('user', userResponse.data);
    } catch (e: any) {
      toast(createToastError(e));
    }
  };

  return (
    <Flex direction={'column'} padding={24}>
      <SettingsRow title={'Password'}>
        <Button
          style={menuStyle}
          _focus={{ boxShadow: 'none' }}
          size={'lg'}
          onClick={() => openChangePassword(true)}
        >
          Change password
        </Button>
      </SettingsRow>
      <Separator height={8} />
      <SettingsRow title={'Two factor authentication'}>
        <Button
          style={menuStyle}
          _focus={{ boxShadow: 'none' }}
          size={'lg'}
          onClick={
            user?.isTwoFactorEnabled
              ? () => openDeleteModal(true)
              : () => openTwoFactorModal(true)
          }
        >
          {user?.isTwoFactorEnabled ? 'Disable' : 'Enable'}
        </Button>
      </SettingsRow>

      {changePasswordOpen ? (
        <ChakraModal
          title={'Change password'}
          handleClose={() => openChangePassword(false)}
        >
          <ChangePassword />
        </ChakraModal>
      ) : null}
      {twoFactorModalOpen ? (
        <TwoFactorSetup handleClose={() => openTwoFactorModal(false)} />
      ) : null}

      <Alert
        isOpen={deleteModalOpen}
        onClose={() => openDeleteModal(false)}
        header={'Two factor authentication'}
        body={`Do you want to disable two factor authentication?`}
        onSubmit={handleDisable2FA}
        submitText={'Disable'}
      />
    </Flex>
  );
};

export default SettingsPage;
