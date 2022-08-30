import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Context } from '../../context/store';
import { Heading } from '@chakra-ui/react';
import AdminApi from '../../api/admin.api';
import React, { useContext, useState } from 'react';
import Separator from '../Separator';
import admin2FAApi from '../../api/admin2FA.api';

interface TwoFactorLoginProps {
  username: string;
  password: string;
}

const TwoFactorLogin = (props: TwoFactorLoginProps) => {
  const toast = useToast();
  const [, dispatch] = useContext(Context);

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { username, password } = props;

  const [otpCode, setOtpCode] = useState('');

  const onChange = (e: any) => {
    setOtpCode(e.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await admin2FAApi.loginWith2FA({
        username,
        password,
        otpCode,
      });

      if (response.data.isLogged && response.data.isTwoFactorEnabled) {
        // @ts-ignore
        setContext('token', response.data.token);
        const userResponse = await AdminApi.getAdminAccount(
          // @ts-ignore
          response.data?.token
        );

        setContext('user', userResponse.data);

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Container width={400}>
        <Heading as="h2" size="2xl">
          Two factor login
        </Heading>
        <Separator />
        <FormControl id="otpCode" size="2xl">
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
          <Button onClick={handleClick} colorScheme="teal" size="md">
            Confirm
          </Button>
        </Center>
      </Container>
    </div>
  );
};

export default TwoFactorLogin;
