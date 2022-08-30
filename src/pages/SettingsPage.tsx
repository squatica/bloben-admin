import { Flex } from '@chakra-ui/react';
import ChangePassword from '../components/changePassword/ChangePassword';
import React from 'react';
import Separator from '../components/Separator';
import TwoFactorSettings from '../components/changePassword/2FA/TwoFactorSettings';

const SettingsPage = () => {
  return (
    <Flex direction={'column'} padding={24}>
      <ChangePassword />
      <Separator height={40} />
      <TwoFactorSettings />
    </Flex>
  );
};

export default SettingsPage;
