import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { ChakraModal, PrimaryButton, Separator } from 'bloben-components';
import { Context, StoreContext } from '../../context/store';
import { authenticator } from 'otplib';
import Admin2FAApi from '../../api/adminTwoFactor.api';
import AdminApi from '../../api/admin.api';
import QRCode from 'qrcode';
import React, { useContext, useEffect, useState } from 'react';

interface TwoFactorSetupProps {
  handleClose: any;
}
const TwoFactorSetup = (props: TwoFactorSetupProps) => {
  const toast = useToast();
  const [store, dispatch]: [StoreContext, any] = useContext(Context);

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };
  const { handleClose } = props;

  const { user } = store;
  const [otpCode, setOtpCode] = useState('');
  const [qr, setQr] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [secret, setSecret] = useState('');

  const onChange = (e: any) => {
    setOtpCode(e.target.value);
  };

  const handleGenerate = async () => {
    if (!user?.username) {
      return;
    }
    try {
      const response = await Admin2FAApi.generate2FA();

      if (response.status === 200) {
        setSecret(response.data.twoFactorSecret);

        const otpData = authenticator.keyuri(
          user?.username,
          // @ts-ignore
          window?.env?.apiUrl,
          response.data.twoFactorSecret
        );

        const qrCodeString = await QRCode.toDataURL(otpData);

        setQr(qrCodeString);
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

  const reloadUser = async () => {
    const userResponse = await AdminApi.getAdminAccount();

    setContext('user', userResponse.data);
  };

  const handleEnable2FA = async () => {
    try {
      const response = await Admin2FAApi.enable2FA({
        otpCode,
      });

      toast({
        title: response?.data?.message,
      });

      await reloadUser();

      handleClose();
    } catch (e: any) {
      if (e.response?.data?.message) {
        toast({
          title: e.response?.data?.message,
          status: 'error',
        });
      }
    }
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <ChakraModal handleClose={handleClose} title={'Two factor authentication'}>
      <Flex direction={'column'} padding={8}>
        {qr?.length > 0 ? <img src={qr} alt={'qr'} /> : null}
        <FormControl id="username" size="2xl">
          <FormLabel size="2xl">OTP code</FormLabel>
          <Input
            size="lg"
            name={'otpCode'}
            value={otpCode}
            onChange={onChange}
          />
        </FormControl>
        <Separator height={40} />
        <Center>
          <PrimaryButton onClick={handleEnable2FA}>Submit</PrimaryButton>
        </Center>
      </Flex>
    </ChakraModal>
  );
};

export default TwoFactorSetup;
