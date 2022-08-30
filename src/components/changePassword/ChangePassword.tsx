import { AxiosResponse } from 'axios';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { CommonResponse } from '../../data/interface';
import { Context } from '../../context/store';
import AdminApi from '../../api/admin.api';
import React, { useContext, useState } from 'react';
import Separator from '../Separator';

const ChangePassword = () => {
  const toast = useToast();
  const [store] = useContext(Context);

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
        await AdminApi.changePassword(
          {
            oldPassword,
            password,
          },
          store.token
        );

      if (response.status === 200) {
        toast({
          title: 'Password changed',
        });
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
    <Flex direction={'column'} maxWidth={'50%'}>
      <Heading>Change password</Heading>
      <Separator height={24} />
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
        <Button onClick={handleChangePassword} colorScheme="teal" size="md">
          Confirm
        </Button>
      </Center>
    </Flex>
  );
};

export default ChangePassword;
