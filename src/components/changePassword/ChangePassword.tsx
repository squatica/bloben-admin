import { AxiosResponse } from 'axios';
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { CommonResponse } from '../../data/interface';
import { PrimaryButton, Separator, createToastError } from 'bloben-components';
import AdminApi from '../../api/admin.api';
import React, { useState } from 'react';

const ChangePassword = () => {
  const toast = useToast();

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const onChange = (e: any) => {
    if (e.target.name === 'oldPassword') {
      setOldPassword(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleChangePassword = async () => {
    try {
      const response: AxiosResponse<CommonResponse> =
        await AdminApi.changePassword({
          oldPassword,
          password,
        });

      if (response.status === 200) {
        toast({
          title: 'Password changed',
        });
      }
    } catch (e: any) {
      if (e.response?.data?.message) {
        toast(createToastError(e));
      }
    }
  };

  return (
    <>
      <FormControl id="username" size="2xl">
        <FormLabel size="2xl">Current password</FormLabel>
        <Input
          name={'oldPassword'}
          type={show ? 'text' : 'password'}
          value={oldPassword}
          onChange={onChange}
        />
      </FormControl>
      <Separator height={20} />
      <FormControl id="password" size="2xl">
        <FormLabel size="2xl">Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            name={'password'}
            value={password}
            onChange={onChange}
          />
          <InputRightElement width="4.5rem">
            <Button
              _focus={{ boxShadow: 'none' }}
              h="1.75rem"
              size="sm"
              onClick={handleClick}
            >
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Separator height={40} />
      <Center>
        <PrimaryButton onClick={handleChangePassword}>Confirm</PrimaryButton>
      </Center>
    </>
  );
};

export default ChangePassword;
