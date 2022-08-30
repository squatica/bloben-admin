import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Context } from '../../../context/store';
import { authenticator } from 'otplib';
import Admin2FAApi from '../../../api/admin2FA.api';
import AdminApi from '../../../api/admin.api';
import ChakraModal from '../../chakraCustom/ChakraModal';
import QRCode from 'qrcode';
import React, { useContext, useEffect, useState } from 'react';
import Separator from 'components/Separator';

interface TwoFactorSetupProps {
  handleClose: any;
}
const TwoFactorSetup = (props: TwoFactorSetupProps) => {
  const toast = useToast();
  const [store, dispatch] = useContext(Context);

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
      const response = await Admin2FAApi.generate2FA(store.token);

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
    const userResponse = await AdminApi.getAdminAccount(store.token);

    setContext('user', userResponse.data);
  };

  const handleEnable2FA = async () => {
    try {
      const response = await Admin2FAApi.enable2FA(
        {
          otpCode,
        },
        store.token
      );

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
    <ChakraModal handleClose={handleClose}>
      <Flex direction={'column'} padding={8}>
        <Heading>Two factor authentication</Heading>
        <Separator height={24} />
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
          <Button onClick={handleEnable2FA} colorScheme="teal" size="md">
            Submit
          </Button>
        </Center>
      </Flex>
    </ChakraModal>
  );
};

export default TwoFactorSetup;
